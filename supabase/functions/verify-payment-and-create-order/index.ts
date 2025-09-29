import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Resend } from 'https://esm.sh/resend@2.0.0';
import { createOrderConfirmationEmail } from './email-template.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Check if user is authenticated (optional for guest checkout)
    let user = null;
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      const { data: { user: authUser } } = await supabaseClient.auth.getUser(
        authHeader.replace('Bearer ', '')
      );
      user = authUser;
    }

    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature,
      cartItems,
      shippingAddress,
      totalAmount
    } = await req.json();

    console.log('Verifying payment:', { razorpay_payment_id, razorpay_order_id });

    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
    if (!razorpayKeySecret) {
      return new Response(
        JSON.stringify({ error: 'Payment gateway configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify payment signature
    const crypto = await import('https://deno.land/std@0.208.0/crypto/mod.ts');
    const expectedSignature = await crypto.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(razorpayKeySecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const message = `${razorpay_order_id}|${razorpay_payment_id}`;
    const signature = await crypto.crypto.subtle.sign(
      'HMAC',
      expectedSignature,
      new TextEncoder().encode(message)
    );

    const hexSignature = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    if (hexSignature !== razorpay_signature) {
      console.error('Payment signature verification failed');
      return new Response(
        JSON.stringify({ error: 'Payment verification failed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Payment verification successful, creating order...');

    // Create order in database
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .insert({
        user_id: user?.id || null, // Allow null for guest orders
        total_amount: totalAmount,
        status: 'pending',
        shipping_address: shippingAddress
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return new Response(
        JSON.stringify({ error: 'Failed to create order' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create order items
    console.log('Cart items received:', JSON.stringify(cartItems, null, 2));
    
    const orderItems = cartItems.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.products?.selling_price || item.products?.price || 0
    }));
    
    console.log('Order items to insert:', JSON.stringify(orderItems, null, 2));

    const { error: itemsError } = await supabaseClient
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      return new Response(
        JSON.stringify({ error: 'Failed to create order items' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Clear user's cart (only if user is authenticated)
    if (user) {
      const { error: clearCartError } = await supabaseClient
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (clearCartError) {
        console.error('Error clearing cart:', clearCartError);
      }
    }

    console.log('Order created successfully:', order.id);

    // Send order confirmation email
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        
        // Create tracking URL
        const trackingUrl = `https://brandter.shop/track-order`;
        
        // Get order items for email
        const { data: orderItemsData } = await supabaseClient
          .from('order_items')
          .select(`
            *,
            products (
              id,
              name,
              image_url,
              selling_price,
              price
            )
          `)
          .eq('order_id', order.id);

        const emailData = createOrderConfirmationEmail(
          order.id,
          shippingAddress.fullName || 'Customer',
          shippingAddress.email,
          totalAmount,
          orderItemsData || [],
          shippingAddress,
          trackingUrl
        );

        const { data: emailResult, error: emailError } = await resend.emails.send(emailData);
        
        if (emailError) {
          console.error('Error sending email:', emailError);
        } else {
          console.log('Order confirmation email sent:', emailResult);
        }
      } else {
        console.warn('RESEND_API_KEY not found, skipping email');
      }
    } catch (emailError) {
      console.error('Error sending order confirmation email:', emailError);
      // Don't fail the order if email fails
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        orderId: order.id,
        message: 'Order created successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in verify-payment-and-create-order function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, getTotalPrice, clearCart, isLoading: cartLoading } = useCart();
  const [loading, setLoading] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [shippingData, setShippingData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
  });

  // Handle cart empty check with proper timing
  useEffect(() => {
    if (!cartLoading) {
      if (cartItems.length === 0) {
        console.log('No items in cart, redirecting to cart page');
        navigate("/cart", { replace: true });
        return;
      }
      setPageReady(true);
    }
  }, [cartItems, cartLoading, navigate]);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    
    // Validate shipping form
    if (!shippingData.fullName || !shippingData.address || !shippingData.city || 
        !shippingData.state || !shippingData.pinCode || !shippingData.phone) {
      toast.error('Please fill in all shipping details');
      return;
    }

    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    setLoading(true);
    
    try {
      // Create Razorpay order
      const { data, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: {
          cartItems,
          shippingAddress: shippingData,
          totalAmount: total
        }
      });

      if (error) {
        console.error('Error creating order:', error);
        toast.error('Failed to create order. Please try again.');
        setLoading(false);
        return;
      }

      // Initialize Razorpay
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'Brandter Shop',
        description: 'Purchase from Brandter Shop',
        order_id: data.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment and create order
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-payment-and-create-order', {
              body: {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                cartItems,
                shippingAddress: shippingData,
                totalAmount: total
              }
            });

            if (verifyError || !verifyData.success) {
              toast.error('Payment verification failed. Please contact support.');
              setLoading(false);
              return;
            }

            // Clear cart and redirect to success page
            clearCart();
            toast.success('Order placed successfully!');
            navigate(`/order-success/${verifyData.orderId}`);
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed. Please contact support.');
            setLoading(false);
          }
        },
        prefill: {
          name: shippingData.fullName,
          email: user?.email,
          contact: shippingData.phone
        },
        theme: {
          color: '#6366f1'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      // @ts-ignore - Razorpay is loaded from CDN
      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  // Show loading while cart is loading or page is not ready
  if (cartLoading || !pageReady) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading checkout...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const shipping = 0;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" onClick={() => navigate("/cart")} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Button>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your order securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={shippingData.fullName}
                      onChange={(e) => setShippingData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={shippingData.phone}
                      onChange={(e) => setShippingData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={shippingData.address}
                    onChange={(e) => setShippingData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter full address"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={shippingData.city}
                      onChange={(e) => setShippingData(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={shippingData.state}
                      onChange={(e) => setShippingData(prev => ({ ...prev, state: e.target.value }))}
                      placeholder="Enter state"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pinCode">PIN Code</Label>
                    <Input
                      id="pinCode"
                      value={shippingData.pinCode}
                      onChange={(e) => setShippingData(prev => ({ ...prev, pinCode: e.target.value }))}
                      placeholder="Enter PIN code"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    ✓ Secure payment powered by Razorpay
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    Pay with UPI, Cards, Net Banking, and Wallets
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                       <img
                         src={item.products.image_url || '/placeholder.svg'}
                         alt={item.products.name}
                         className="w-16 h-16 object-cover rounded-lg"
                       />
                       <div className="flex-1">
                         <h4 className="font-medium text-foreground">{item.products.name}</h4>
                         <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                       </div>
                       <p className="font-bold text-primary">₹{((item.products.selling_price || item.products.price) * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>₹{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (GST 18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-xl font-bold text-foreground">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full mt-6"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Processing...
                    </div>
                  ) : (
                    `Pay ₹${total.toFixed(2)}`
                  )}
                </Button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    By placing your order, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};
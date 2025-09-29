// Email template for order confirmation
export const createOrderConfirmationEmail = (orderId, customerName, customerEmail, totalAmount, orderItems, shippingAddress, trackingUrl)=>{
    const formatPrice = (price)=>{
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR"
      }).format(price);
    };
    const orderItemsHtml = orderItems.map((item)=>`
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${item.products?.image_url || '/placeholder.svg'}" 
                 alt="${item.products?.name || 'Product'}" 
                 style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
            <div>
              <div style="font-weight: 600; color: #1f2937;">${item.products?.name || 'Unknown Product'}</div>
              <div style="color: #6b7280; font-size: 14px;">Quantity: ${item.quantity}</div>
            </div>
          </div>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">
          ${formatPrice(Number(item.price) * item.quantity)}
        </td>
      </tr>
    `).join('');
    return {
      from: 'Brandter Store <orders@brandter.shop>',
      to: [
        customerEmail
      ],
      subject: `Order #${orderId.slice(-8).toUpperCase()} Confirmed`,
      text: `Order Confirmation #${orderId.slice(-8).toUpperCase()}

Hello ${customerName},

Thank you for your purchase! Your order has been confirmed.

Order Details:
- Order ID: #${orderId.slice(-8).toUpperCase()}
- Date: ${new Date().toLocaleDateString('en-IN')}
- Total: ${formatPrice(totalAmount)}

Items Ordered:
${orderItems.map(item => `- ${item.products?.name || 'Product'} (Qty: ${item.quantity}) - ${formatPrice(Number(item.price) * item.quantity)}`).join('\n')}

Shipping Address:
${shippingAddress.fullName}
${shippingAddress.address}
${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.pinCode}
Phone: ${shippingAddress.phone}
Email: ${shippingAddress.email}

Track your order: ${trackingUrl}

Thank you for choosing Brandter Store!
Support: support@brandter.shop`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
          <meta name="format-detection" content="telephone=no">
          <meta name="x-apple-disable-message-reformatting">
          <meta name="x-mailer" content="Brandter Store">
          <meta name="reply-to" content="support@brandter.shop">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #374151; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8b5cf6, #a855f7); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
            .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #f9fafb; padding: 20px; border-radius: 0 0 12px 12px; text-align: center; color: #6b7280; }
            .button { display: inline-block; background: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            .order-summary { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .shipping-info { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
            table { width: 100%; border-collapse: collapse; }
            .total-row { background: #f3f4f6; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">🎉 Order Confirmed!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Thank you for your purchase, ${customerName}!</p>
            </div>
            
            <div class="content">
              <h2 style="color: #1f2937; margin-bottom: 20px;">Order Details</h2>
              <div class="order-summary">
                <p><strong>Order ID:</strong> #${orderId.slice(-8).toUpperCase()}</p>
                <p><strong>Order Date:</strong> ${new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}</p>
                <p><strong>Total Amount:</strong> ${formatPrice(totalAmount)}</p>
              </div>
  
              <h3 style="color: #1f2937; margin: 30px 0 15px 0;">Items Ordered</h3>
              <table>
                <thead>
                  <tr style="background: #f9fafb;">
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Product</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderItemsHtml}
                  <tr class="total-row">
                    <td style="padding: 12px; font-weight: 600;">Total</td>
                    <td style="padding: 12px; text-align: right; font-weight: 600;">${formatPrice(totalAmount)}</td>
                  </tr>
                </tbody>
              </table>
  
              <div class="shipping-info">
                <h3 style="color: #1f2937; margin: 0 0 15px 0;">Shipping Address</h3>
                <p><strong>${shippingAddress.fullName}</strong></p>
                <p>${shippingAddress.address}</p>
                <p>${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.pinCode}</p>
                <p>📞 ${shippingAddress.phone}</p>
                <p>📧 ${shippingAddress.email}</p>
              </div>
  
              <div style="text-align: center; margin: 30px 0;">
                <a href="${trackingUrl}" class="button">Track Your Order</a>
              </div>
  
              <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #92400e;"><strong>📧 Important:</strong> You can track your order anytime using your email address or order ID on our website.</p>
              </div>
            </div>
  
            <div class="footer">
              <p style="margin: 0;">Thank you for choosing Brandter Store!</p>
              <p style="margin: 10px 0 0 0; font-size: 14px;">
                Need help? Contact us at <a href="mailto:support@brandter.shop" style="color: #8b5cf6;">support@brandter.shop</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  };
  
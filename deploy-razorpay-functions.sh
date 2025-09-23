#!/bin/bash

# Deploy Razorpay Edge Functions
# This script deploys the updated Razorpay functions to Supabase

echo "🚀 Deploying Razorpay Edge Functions..."

echo "1. Deploying create-razorpay-order function..."
supabase functions deploy create-razorpay-order

echo "2. Deploying verify-payment-and-create-order function..."
supabase functions deploy verify-payment-and-create-order

echo "3. Deploying test-env function..."
supabase functions deploy test-env

echo "✅ All functions deployed successfully!"
echo ""
echo "🧪 Test your setup:"
echo "curl https://vvhbhrnapfmgebtiehxo.supabase.co/functions/v1/test-env"
echo ""
echo "📋 Next steps:"
echo "1. Make sure you have set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Supabase dashboard"
echo "2. Test the payment flow in your application"
echo "3. Check function logs if you encounter issues:"
echo "   supabase functions logs create-razorpay-order"

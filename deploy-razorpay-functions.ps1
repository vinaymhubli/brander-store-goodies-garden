# Deploy Razorpay Edge Functions
# This PowerShell script deploys the updated Razorpay functions to Supabase

Write-Host "🚀 Deploying Razorpay Edge Functions..." -ForegroundColor Green

Write-Host "1. Deploying create-razorpay-order function..." -ForegroundColor Yellow
supabase functions deploy create-razorpay-order

Write-Host "2. Deploying verify-payment-and-create-order function..." -ForegroundColor Yellow
supabase functions deploy verify-payment-and-create-order

Write-Host "3. Deploying test-env function..." -ForegroundColor Yellow
supabase functions deploy test-env

Write-Host "✅ All functions deployed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "🧪 Test your setup:" -ForegroundColor Cyan
Write-Host "curl https://vvhbhrnapfmgebtiehxo.supabase.co/functions/v1/test-env"
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Make sure you have set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in Supabase dashboard"
Write-Host "2. Test the payment flow in your application"
Write-Host "3. Check function logs if you encounter issues:"
Write-Host "   supabase functions logs create-razorpay-order"

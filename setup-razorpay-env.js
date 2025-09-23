// Script to help set up Razorpay environment variables
// This is a helper script - you still need to set the variables in Supabase dashboard

console.log(`
🚨 IMPORTANT: You need to get VALID Razorpay credentials and set them in Supabase!

📋 Steps to fix the 500 error:

1. Get Valid Razorpay Credentials:
   - Go to https://dashboard.razorpay.com/
   - Sign up or log in
   - Go to Settings > API Keys
   - Generate NEW API Keys (the ones below are invalid)
   - Copy both Key ID and Key Secret

2. Set Environment Variables in Supabase:
   - Go to: https://supabase.com/dashboard/project/vvhbhrnapfmgebtiehxo/settings/functions
   - Add these environment variables:
     * Name: RAZORPAY_KEY_ID
       Value: [Your actual Key ID from Razorpay dashboard]
     * Name: RAZORPAY_KEY_SECRET
       Value: [Your actual Key Secret from Razorpay dashboard]

3. Deploy the Edge Functions:
   - Run: supabase functions deploy create-razorpay-order
   - Run: supabase functions deploy verify-payment-and-create-order

4. Test the payment flow again

🔍 Current Issue:
The 500 error occurs because the hardcoded credentials below are INVALID.
You need to get fresh credentials from your Razorpay dashboard.

⚠️  DO NOT USE THE CREDENTIALS BELOW - THEY ARE INVALID!
   Get your own credentials from Razorpay dashboard.

✅ After setting valid environment variables, the payment will work!
`);

// Test function to check if we can call the test endpoint
async function testEnvironment() {
  try {
    const response = await fetch('https://vvhbhrnapfmgebtiehxo.supabase.co/functions/v1/test-env');
    const data = await response.json();
    console.log('Environment test result:', data);
  } catch (error) {
    console.log('Test function not deployed yet. Deploy it first to test environment variables.');
  }
}

// Uncomment the line below to test (after deploying the test function)
// testEnvironment();

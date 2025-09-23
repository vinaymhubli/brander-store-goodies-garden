# Razorpay Setup Guide

## Issue
The payment is failing with a 500 error because the Razorpay environment variables are not configured in your Supabase project.

## Solution

### 1. Get Razorpay Credentials
1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up or log in to your account
3. Go to Settings > API Keys
4. Generate API Keys (Key ID and Key Secret)
5. Copy both the Key ID and Key Secret

### 2. Set Environment Variables in Supabase
1. Go to your Supabase project dashboard
2. Navigate to Settings > Edge Functions
3. Add the following environment variables:
   - `RAZORPAY_KEY_ID` = your_key_id_here
   - `RAZORPAY_KEY_SECRET` = your_key_secret_here

### 3. Deploy the Functions
After setting the environment variables, you need to deploy the Edge Functions:

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref vvhbhrnapfmgebtiehxo

# Deploy the functions
supabase functions deploy create-razorpay-order
supabase functions deploy verify-payment-and-create-order
```

### 4. Test the Payment Flow
1. Make sure you have items in your cart
2. Go to the checkout page
3. Fill in the shipping details
4. Click "Pay" button
5. The Razorpay payment modal should open

## Alternative: Local Development
If you want to test locally, you can set the environment variables in your local Supabase setup:

```bash
# Set environment variables for local development
supabase secrets set RAZORPAY_KEY_ID=your_key_id_here
supabase secrets set RAZORPAY_KEY_SECRET=your_key_secret_here

# Start local Supabase
supabase start
```

## Troubleshooting
- Make sure the Razorpay keys are correct
- Check the Supabase function logs for any errors
- Ensure the functions are deployed after setting environment variables
- Check the browser console for any additional error details

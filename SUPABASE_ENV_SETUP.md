# Setting Razorpay Environment Variables in Supabase

## Method 1: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase project dashboard:**
   - Visit: https://supabase.com/dashboard/project/vvhbhrnapfmgebtiehxo

2. **Navigate to Edge Functions:**
   - Go to Settings → Edge Functions
   - Or go directly to: https://supabase.com/dashboard/project/vvhbhrnapfmgebtiehxo/settings/functions

3. **Add Environment Variables:**
   - Click "Add new secret"
   - Add these two secrets:
     ```
     Name: RAZORPAY_KEY_ID
     Value: rzp_live_RJRh0PacQy1Hv3
     ```
     ```
     Name: RAZORPAY_KEY_SECRET  
     Value: cj2hyY1P6pNLdivejMvT5dvA
     ```

4. **Deploy the Functions:**
   - Go to Edge Functions page
   - Deploy both functions:
     - `create-razorpay-order`
     - `verify-payment-and-create-order`

## Method 2: Using Supabase CLI (Alternative)

If you prefer using CLI, install it first:

### Windows (PowerShell):
```powershell
# Install via Scoop
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### Or download directly:
1. Go to: https://github.com/supabase/cli/releases
2. Download the Windows binary
3. Add to your PATH

### Then set environment variables:
```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref vvhbhrnapfmgebtiehxo

# Set environment variables
supabase secrets set RAZORPAY_KEY_ID=rzp_live_RJRh0PacQy1Hv3
supabase secrets set RAZORPAY_KEY_SECRET=cj2hyY1P6pNLdivejMvT5dvA

# Deploy functions
supabase functions deploy create-razorpay-order
supabase functions deploy verify-payment-and-create-order
```

## Verification

After setting up the environment variables:

1. **Test the payment flow:**
   - Add items to cart
   - Go to checkout
   - Fill shipping details
   - Click "Pay" button

2. **Check function logs:**
   - Go to Edge Functions → Logs
   - Look for any error messages

## Troubleshooting

If you still get 500 errors:
1. Verify the environment variables are set correctly
2. Check the function logs for specific error messages
3. Ensure the functions are deployed after setting environment variables
4. Make sure you're using the correct Razorpay keys (test vs live)

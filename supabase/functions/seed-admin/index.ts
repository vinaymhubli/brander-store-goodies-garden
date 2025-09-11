// Supabase Edge Function: seed-admin
// Creates the admin user if it doesn't exist and assigns admin role via trigger

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
  const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  // Fixed admin credentials per user request
  const email = 'admin@brandter.shop';
  const password = 'admin@123';

  try {
    // Check if profile already exists (implies auth user exists and trigger ran)
    const { data: existingProfile, error: profileErr } = await supabase
      .from('profiles')
      .select('id, email')
      .eq('email', email)
      .maybeSingle();

    if (profileErr) {
      console.error('Error checking profile:', profileErr);
    }

    if (existingProfile) {
      return new Response(
        JSON.stringify({ status: 'exists', message: 'Admin already exists.' }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Create the user with admin email and password, confirm email to avoid email flow
    const { data: created, error: createErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: 'Store Admin' },
    });

    if (createErr) {
      console.error('Error creating admin user:', createErr);
      return new Response(
        JSON.stringify({ status: 'error', message: createErr.message }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ status: 'created', user_id: created.user?.id }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (e) {
    console.error('Unexpected error:', e);
    return new Response(
      JSON.stringify({ status: 'error', message: 'Unexpected error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
});
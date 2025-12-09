# How to Run the Reviews Migration

## Option 1: Using Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to your Supabase project dashboard
   - Navigate to **SQL Editor** in the left sidebar

2. **Run the Migration**
   - Click **New Query**
   - Open the file: `supabase/migrations/20251209131703_create_reviews_system.sql`
   - Copy the entire contents of the file
   - Paste it into the SQL Editor
   - Click **Run** (or press Ctrl+Enter)

3. **Verify the Migration**
   - Go to **Table Editor** in the left sidebar
   - You should see three new tables:
     - `reviews`
     - `review_media`
     - `review_helpful`
   - Check that the `profiles` table now has an `avatar_url` column

## Option 2: Using Supabase CLI

If you have Supabase CLI installed:

```bash
# Make sure you're in the project root directory
cd "C:\PRANAV\VS Code\Boostmysites\SOFTWARES\brander-store-goodies-garden"

# Link to your Supabase project (if not already linked)
supabase link --project-ref your-project-ref

# Push the migration
supabase db push
```

## Option 3: Run SQL Directly in Supabase Dashboard

If you prefer to run SQL directly:

1. Go to **SQL Editor** in Supabase Dashboard
2. Copy the contents from `supabase/migrations/20251209131703_create_reviews_system.sql`
3. Paste and run

## What the Migration Does

1. ✅ Adds `avatar_url` column to `profiles` table (if it doesn't exist)
2. ✅ Creates `reviews` table with all necessary columns and constraints
3. ✅ Creates `review_media` table for storing images/videos
4. ✅ Creates `review_helpful` table for tracking helpful votes
5. ✅ Sets up Row Level Security (RLS) policies
6. ✅ Creates indexes for performance
7. ✅ Creates triggers for automatic helpful count updates
8. ✅ Creates storage bucket for review media files
9. ✅ Sets up storage policies for file uploads

## Troubleshooting

### Error: "relation already exists"
- This means some tables already exist. The migration uses `CREATE TABLE IF NOT EXISTS` so it should be safe to run again.
- If you get this error, you can safely ignore it or comment out the conflicting lines.

### Error: "column already exists" (for avatar_url)
- The migration checks if `avatar_url` exists before adding it, so this shouldn't happen.
- If it does, you can safely ignore it.

### Error: "policy already exists"
- If policies already exist, you may need to drop them first or modify the migration to use `CREATE POLICY IF NOT EXISTS` (though this syntax may not be available in all PostgreSQL versions).

### Storage Bucket Already Exists
- The migration uses `ON CONFLICT (id) DO NOTHING` so it's safe to run again.

## After Running the Migration

1. **Verify Tables Created**
   - Check Table Editor for the three new tables
   - Verify columns match the schema

2. **Test Storage Bucket**
   - Go to **Storage** in Supabase Dashboard
   - Verify `review-media` bucket exists
   - Check that it's set to public

3. **Test RLS Policies**
   - Try creating a review as a logged-in user
   - Verify you can only see approved reviews
   - Verify you can only edit your own reviews

4. **Update Frontend**
   - The frontend code is already updated to use `full_name` instead of `name`
   - Connect the frontend to fetch real reviews (see BACKEND_REVIEWS_IMPLEMENTATION.md)

## Next Steps

After the migration is successful:
1. Update the frontend to fetch real reviews (see BACKEND_REVIEWS_IMPLEMENTATION.md)
2. Test submitting a review with media
3. Test the helpful vote functionality
4. Set up moderation workflow (approve/reject reviews)


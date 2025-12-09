# Backend Implementation Guide for Product Reviews

This document outlines the steps needed to implement the backend for the product reviews feature.

## Overview

The frontend is now complete and ready to connect to the backend. The reviews feature allows users to:
- Submit reviews with ratings (1-5 stars)
- Write review text
- Upload images and videos (up to 5 files, 10MB each)
- View all reviews for a product
- Mark reviews as helpful

## Database Schema

### 1. Create `reviews` Table

```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  helpful_count INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT false, -- For moderation
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one review per user per product
  UNIQUE(product_id, user_id)
);

-- Indexes for performance
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX idx_reviews_approved ON reviews(is_approved) WHERE is_approved = true;
```

### 2. Create `review_media` Table

```sql
CREATE TABLE review_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  file_name TEXT,
  file_size INTEGER, -- in bytes
  mime_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX idx_review_media_review_id ON review_media(review_id);
```

### 3. Create `review_helpful` Table (Optional - for tracking who marked as helpful)

```sql
CREATE TABLE review_helpful (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Prevent duplicate votes
  UNIQUE(review_id, user_id)
);

CREATE INDEX idx_review_helpful_review_id ON review_helpful(review_id);
```

### 4. Enable Row Level Security (RLS)

```sql
-- Enable RLS on reviews table
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read approved reviews
CREATE POLICY "Anyone can view approved reviews"
  ON reviews FOR SELECT
  USING (is_approved = true);

-- Policy: Users can create their own reviews
CREATE POLICY "Users can create their own reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own reviews
CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own reviews
CREATE POLICY "Users can delete their own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = user_id);

-- Enable RLS on review_media
ALTER TABLE review_media ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view media for approved reviews
CREATE POLICY "Anyone can view approved review media"
  ON review_media FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM reviews 
      WHERE reviews.id = review_media.review_id 
      AND reviews.is_approved = true
    )
  );

-- Policy: Users can insert media for their own reviews
CREATE POLICY "Users can insert media for their reviews"
  ON review_media FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM reviews 
      WHERE reviews.id = review_media.review_id 
      AND reviews.user_id = auth.uid()
    )
  );

-- Enable RLS on review_helpful
ALTER TABLE review_helpful ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view helpful votes
CREATE POLICY "Anyone can view helpful votes"
  ON review_helpful FOR SELECT
  USING (true);

-- Policy: Authenticated users can mark reviews as helpful
CREATE POLICY "Users can mark reviews as helpful"
  ON review_helpful FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## API Endpoints / Supabase Functions

### 1. Fetch Reviews for a Product

**Query:**
```typescript
const { data, error } = await supabase
  .from('reviews')
  .select(`
    *,
    profiles!reviews_user_id_fkey (
      id,
      full_name,
      avatar_url
    ),
    review_media (
      id,
      media_url,
      media_type,
      file_name
    )
  `)
  .eq('product_id', productId)
  .eq('is_approved', true)
  .order('created_at', { ascending: false });
```

**Note:** The profiles table uses `full_name` instead of `name`, and the relationship is based on `user_id` matching `profiles.user_id`.

### 2. Submit a Review

**Steps:**
1. Upload media files to Supabase Storage
2. Insert review record
3. Insert review_media records

**Storage Setup:**
```sql
-- Create storage bucket for review media
INSERT INTO storage.buckets (id, name, public)
VALUES ('review-media', 'review-media', true);

-- Storage policies
CREATE POLICY "Anyone can view review media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'review-media');

CREATE POLICY "Authenticated users can upload review media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'review-media' 
    AND auth.role() = 'authenticated'
  );
```

**Upload Media Function:**
```typescript
async function uploadReviewMedia(files: File[]): Promise<string[]> {
  const uploadPromises = files.map(async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `reviews/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('review-media')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('review-media')
      .getPublicUrl(filePath);

    return {
      url: data.publicUrl,
      type: file.type.startsWith('video/') ? 'video' : 'image',
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
    };
  });

  return Promise.all(uploadPromises);
}
```

**Submit Review Function:**
```typescript
async function submitReview(
  productId: string,
  userId: string,
  rating: number,
  comment: string,
  mediaFiles: File[]
) {
  // 1. Upload media files
  const mediaData = await uploadReviewMedia(mediaFiles);

  // 2. Insert review
  const { data: review, error: reviewError } = await supabase
    .from('reviews')
    .insert({
      product_id: productId,
      user_id: userId,
      rating,
      comment,
      is_approved: false, // Require moderation
    })
    .select()
    .single();

  if (reviewError) throw reviewError;

  // 3. Insert media records
  if (mediaData.length > 0) {
    const { error: mediaError } = await supabase
      .from('review_media')
      .insert(
        mediaData.map((media) => ({
          review_id: review.id,
          media_url: media.url,
          media_type: media.type,
          file_name: media.fileName,
          file_size: media.fileSize,
          mime_type: media.mimeType,
        }))
      );

    if (mediaError) throw mediaError;
  }

  return review;
}
```

### 3. Mark Review as Helpful

```typescript
async function markReviewHelpful(reviewId: string, userId: string) {
  // Insert helpful vote
  const { error: insertError } = await supabase
    .from('review_helpful')
    .insert({
      review_id: reviewId,
      user_id: userId,
    });

  if (insertError && insertError.code !== '23505') {
    // 23505 is unique constraint violation (already voted)
    throw insertError;
  }

  // Update helpful count on review
  const { data: helpfulCount } = await supabase
    .from('review_helpful')
    .select('id', { count: 'exact', head: true })
    .eq('review_id', reviewId);

  await supabase
    .from('reviews')
    .update({ helpful_count: helpfulCount?.count || 0 })
    .eq('id', reviewId);
}
```

### 4. Calculate Average Rating (for product display)

```typescript
async function getProductRating(productId: string) {
  const { data, error } = await supabase
    .from('reviews')
    .select('rating')
    .eq('product_id', productId)
    .eq('is_approved', true);

  if (error) throw error;

  const averageRating = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
  const reviewCount = data.length;

  return { averageRating, reviewCount };
}
```

## Database Functions (Optional - for automatic helpful count)

```sql
-- Function to update helpful_count automatically
CREATE OR REPLACE FUNCTION update_review_helpful_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE reviews
  SET helpful_count = (
    SELECT COUNT(*) 
    FROM review_helpful 
    WHERE review_id = NEW.review_id
  )
  WHERE id = NEW.review_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update count on insert
CREATE TRIGGER update_helpful_count_trigger
  AFTER INSERT ON review_helpful
  FOR EACH ROW
  EXECUTE FUNCTION update_review_helpful_count();
```

## Frontend Integration Points

### 1. Update ProductDetail.tsx

Replace the mock `reviews` state with actual data fetching:

```typescript
// Fetch reviews
const { data: reviewsData } = useQuery({
  queryKey: ["reviews", id],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles!reviews_user_id_fkey (
          id,
          full_name,
          avatar_url
        ),
        review_media (
          id,
          media_url,
          media_type,
          file_name
        )
      `)
      .eq('product_id', id)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Transform data to match frontend interface
    return data?.map((review: any) => ({
      ...review,
      user: review.profiles ? {
        id: review.profiles.id,
        full_name: review.profiles.full_name,
        avatar_url: review.profiles.avatar_url,
      } : null,
      media: review.review_media || [],
    })) || [];
  },
  enabled: !!id,
});
```

### 2. Update handleSubmitReview

```typescript
const handleSubmitReview = async () => {
  // ... validation ...

  try {
    const { user } = useAuth(); // Get current user
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a review.",
        variant: "destructive",
      });
      return;
    }

    // Upload media and submit review
    await submitReview(
      product.id,
      user.id,
      reviewRating,
      reviewText,
      reviewMedia
    );

    toast({
      title: "Review submitted!",
      description: "Your review will be published after moderation.",
    });

    // Reset form and refetch reviews
    // ...
  } catch (error) {
    // Handle error
  }
};
```

## Additional Considerations

### 1. Moderation System
- Set `is_approved = false` by default
- Create admin interface to approve/reject reviews
- Send notification when review is submitted

### 2. File Size Limits
- Frontend: 10MB per file (already implemented)
- Backend: Configure Supabase Storage limits
- Consider image compression before upload

### 3. Rate Limiting
- Limit reviews per user per product (already enforced with UNIQUE constraint)
- Limit media uploads per review (5 files max - already in frontend)

### 4. User Profiles
- Ensure `profiles` table exists with `name` and `avatar_url` fields
- If not, create migration for profiles table

### 5. Email Notifications (Optional)
- Notify product owner when review is submitted
- Notify user when review is approved/rejected

## Testing Checklist

- [ ] Create database tables and migrations
- [ ] Set up storage bucket and policies
- [ ] Test review submission with media
- [ ] Test review submission without media
- [ ] Test fetching reviews for a product
- [ ] Test marking reviews as helpful
- [ ] Test RLS policies (users can only edit their own reviews)
- [ ] Test file upload limits and validation
- [ ] Test moderation workflow
- [ ] Test average rating calculation

## Next Steps

1. Run the SQL migrations in your Supabase project
2. Set up the storage bucket for review media
3. Create helper functions for review operations
4. Update the frontend to use real API calls
5. Implement admin moderation interface
6. Add email notifications (optional)


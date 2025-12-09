-- Add avatar_url to profiles table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN avatar_url TEXT;
  END IF;
END $$;

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  helpful_count INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- Ensure one review per user per product
  UNIQUE(product_id, user_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON public.reviews(is_approved) WHERE is_approved = true;

-- Create review_media table
CREATE TABLE IF NOT EXISTS public.review_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  file_name TEXT,
  file_size INTEGER,
  mime_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create index for review_media
CREATE INDEX IF NOT EXISTS idx_review_media_review_id ON public.review_media(review_id);

-- Create review_helpful table (for tracking who marked as helpful)
CREATE TABLE IF NOT EXISTS public.review_helpful (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- Prevent duplicate votes
  UNIQUE(review_id, user_id)
);

-- Create index for review_helpful
CREATE INDEX IF NOT EXISTS idx_review_helpful_review_id ON public.review_helpful(review_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_helpful ENABLE ROW LEVEL SECURITY;

-- RLS Policies for reviews table
-- Policy: Anyone can view approved reviews
CREATE POLICY "Anyone can view approved reviews"
  ON public.reviews FOR SELECT
  USING (is_approved = true);

-- Policy: Users can view their own reviews (even if not approved)
CREATE POLICY "Users can view their own reviews"
  ON public.reviews FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Admins can view all reviews
CREATE POLICY "Admins can view all reviews"
  ON public.reviews FOR SELECT
  USING (public.get_user_role(auth.uid()) = 'admin'::user_role);

-- Policy: Users can create their own reviews
CREATE POLICY "Users can create their own reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own reviews
CREATE POLICY "Users can update their own reviews"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Admins can update any review
CREATE POLICY "Admins can update any review"
  ON public.reviews FOR UPDATE
  USING (public.get_user_role(auth.uid()) = 'admin'::user_role);

-- Policy: Users can delete their own reviews
CREATE POLICY "Users can delete their own reviews"
  ON public.reviews FOR DELETE
  USING (auth.uid() = user_id);

-- Policy: Admins can delete any review
CREATE POLICY "Admins can delete any review"
  ON public.reviews FOR DELETE
  USING (public.get_user_role(auth.uid()) = 'admin'::user_role);

-- RLS Policies for review_media table
-- Policy: Anyone can view media for approved reviews
CREATE POLICY "Anyone can view approved review media"
  ON public.review_media FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.reviews 
      WHERE reviews.id = review_media.review_id 
      AND reviews.is_approved = true
    )
  );

-- Policy: Users can view media for their own reviews
CREATE POLICY "Users can view their own review media"
  ON public.review_media FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.reviews 
      WHERE reviews.id = review_media.review_id 
      AND reviews.user_id = auth.uid()
    )
  );

-- Policy: Users can insert media for their own reviews
CREATE POLICY "Users can insert media for their reviews"
  ON public.review_media FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.reviews 
      WHERE reviews.id = review_media.review_id 
      AND reviews.user_id = auth.uid()
    )
  );

-- Policy: Users can delete media for their own reviews
CREATE POLICY "Users can delete their own review media"
  ON public.review_media FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.reviews 
      WHERE reviews.id = review_media.review_id 
      AND reviews.user_id = auth.uid()
    )
  );

-- Policy: Admins can manage all review media
CREATE POLICY "Admins can manage all review media"
  ON public.review_media FOR ALL
  USING (public.get_user_role(auth.uid()) = 'admin'::user_role);

-- RLS Policies for review_helpful table
-- Policy: Anyone can view helpful votes
CREATE POLICY "Anyone can view helpful votes"
  ON public.review_helpful FOR SELECT
  USING (true);

-- Policy: Authenticated users can mark reviews as helpful
CREATE POLICY "Users can mark reviews as helpful"
  ON public.review_helpful FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can remove their helpful vote
CREATE POLICY "Users can remove their helpful vote"
  ON public.review_helpful FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to update helpful_count automatically
CREATE OR REPLACE FUNCTION public.update_review_helpful_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.reviews
  SET helpful_count = (
    SELECT COUNT(*) 
    FROM public.review_helpful 
    WHERE review_id = COALESCE(NEW.review_id, OLD.review_id)
  )
  WHERE id = COALESCE(NEW.review_id, OLD.review_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update helpful_count on insert
CREATE TRIGGER update_helpful_count_on_insert
  AFTER INSERT ON public.review_helpful
  FOR EACH ROW
  EXECUTE FUNCTION public.update_review_helpful_count();

-- Trigger to update helpful_count on delete
CREATE TRIGGER update_helpful_count_on_delete
  AFTER DELETE ON public.review_helpful
  FOR EACH ROW
  EXECUTE FUNCTION public.update_review_helpful_count();

-- Add trigger for updated_at on reviews table
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for review media
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
  'review-media',
  'review-media',
  true,
  10485760, -- 10MB limit
  ARRAY[
    'image/jpeg', 
    'image/png', 
    'image/webp', 
    'image/gif',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for review-media bucket
-- Policy: Anyone can view review media
CREATE POLICY "Anyone can view review media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'review-media');

-- Policy: Authenticated users can upload review media
CREATE POLICY "Authenticated users can upload review media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'review-media' 
    AND auth.role() = 'authenticated'
  );

-- Policy: Users can update their own review media
CREATE POLICY "Users can update their own review media"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'review-media' 
    AND auth.role() = 'authenticated'
  );

-- Policy: Users can delete their own review media
CREATE POLICY "Users can delete their own review media"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'review-media' 
    AND auth.role() = 'authenticated'
  );

-- Policy: Admins can manage all review media
CREATE POLICY "Admins can manage all review media"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'review-media' 
    AND public.get_user_role(auth.uid()) = 'admin'::user_role
  );


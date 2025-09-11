-- Create wishlist table for user wishlists
CREATE TABLE public.wishlists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable Row Level Security
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- Create policies for wishlist access
CREATE POLICY "Users can view their own wishlist items" 
ON public.wishlists 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own wishlist items" 
ON public.wishlists 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wishlist items" 
ON public.wishlists 
FOR DELETE 
USING (auth.uid() = user_id);

-- Admins can view all wishlist items
CREATE POLICY "Admins can view all wishlist items" 
ON public.wishlists 
FOR SELECT 
USING (get_user_role(auth.uid()) = 'admin'::user_role);

-- Create index for better performance
CREATE INDEX idx_wishlists_user_id ON public.wishlists(user_id);
CREATE INDEX idx_wishlists_product_id ON public.wishlists(product_id);
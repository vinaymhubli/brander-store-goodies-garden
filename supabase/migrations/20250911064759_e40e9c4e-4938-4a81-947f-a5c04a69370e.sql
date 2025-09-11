-- Create product images storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
  'product-images',
  'product-images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Create storage policies for product images bucket
CREATE POLICY "Anyone can view product images"
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Admins can upload product images"
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'product-images' 
  AND get_user_role(auth.uid()) = 'admin'::user_role
);

CREATE POLICY "Admins can update product images"
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'product-images' 
  AND get_user_role(auth.uid()) = 'admin'::user_role
);

CREATE POLICY "Admins can delete product images"
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'product-images' 
  AND get_user_role(auth.uid()) = 'admin'::user_role
);
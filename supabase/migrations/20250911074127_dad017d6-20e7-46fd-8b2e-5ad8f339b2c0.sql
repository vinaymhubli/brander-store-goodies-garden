-- Add selling_price column to products table
ALTER TABLE public.products 
ADD COLUMN selling_price numeric;
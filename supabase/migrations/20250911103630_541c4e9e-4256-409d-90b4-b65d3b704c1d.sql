-- Add foreign key relationships for cart_items table
ALTER TABLE public.cart_items 
ADD CONSTRAINT fk_cart_items_product_id 
FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
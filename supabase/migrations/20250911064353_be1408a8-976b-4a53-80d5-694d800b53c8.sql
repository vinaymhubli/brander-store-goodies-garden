-- Ensure categories exist and get their IDs
WITH upserted_categories AS (
  INSERT INTO public.categories (name, description)
  VALUES 
    ('Hair Accessories', 'Accessories for styling hair including pins and clips'),
    ('Kitchen Appliances', 'Essential and innovative appliances for your kitchen')
  ON CONFLICT (name) DO UPDATE SET updated_at = now()
  RETURNING id, name
),
-- Map category names to IDs (using existing or newly upserted rows)
existing_categories AS (
  SELECT id, name FROM public.categories WHERE name IN ('Hair Accessories', 'Kitchen Appliances')
)
-- Delete all existing products
DELETE FROM public.products;

-- Insert new products referencing category IDs
INSERT INTO public.products (name, price, image_url, description, category_id, stock_quantity, is_active)
VALUES
  (
    'Twist & Shine Hairpin',
    399,
    '/lovable-uploads/0e47b206-5348-4675-8404-0969b160c876.png',
    'Add a graceful twist to your hairdo with this sleek metallic hairpin. Perfect for both casual buns and elegant updos.',
    (SELECT id FROM public.categories WHERE name = 'Hair Accessories' LIMIT 1),
    100,
    true
  ),
  (
    'Elegance Pearl Hairclip',
    499,
    '/lovable-uploads/9c745f4d-f750-4284-a540-39dd602c2848.png',
    'A timeless hair accessory featuring faux pearls and a golden finish. Ideal for formal events or adding charm to your daily look.',
    (SELECT id FROM public.categories WHERE name = 'Hair Accessories' LIMIT 1),
    100,
    true
  ),
  (
    'Bold Bloom Hairclip',
    1199.99,
    '/lovable-uploads/878e4c65-0f31-41e4-a08d-901d3c4b56e9.png',
    'Make a statement with this vibrant floral clip, designed to hold thick hair while adding a touch of playful boldness.',
    (SELECT id FROM public.categories WHERE name = 'Hair Accessories' LIMIT 1),
    100,
    true
  ),
  (
    'Heat Mat Pro - Food Heating Pad',
    1,
    '/lovable-uploads/84e3fe74-3fe5-4aa1-b8f7-c02c0b8b19a1.png',
    'Adjustable temperature electric food warmer with compact portable design, built-in timer and child lock safety features. Keep your meals perfectly warm with premium kitchen technology.',
    (SELECT id FROM public.categories WHERE name = 'Kitchen Appliances' LIMIT 1),
    100,
    true
  );
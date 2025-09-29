-- Fix orders table to allow guest orders (user_id can be null)
-- This migration allows guest orders by making user_id nullable

-- First, drop the NOT NULL constraint on user_id
ALTER TABLE public.orders 
ALTER COLUMN user_id DROP NOT NULL;

-- Update the foreign key constraint to allow null values
-- Drop the existing foreign key constraint
ALTER TABLE public.orders 
DROP CONSTRAINT IF EXISTS orders_user_id_fkey;

-- Add the foreign key constraint back, but allow null values
ALTER TABLE public.orders 
ADD CONSTRAINT orders_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update RLS policies to handle guest orders
-- Allow users to view their own orders OR guest orders (no user_id)
CREATE POLICY "Users can view their own orders or guest orders"
ON public.orders FOR SELECT
USING (
  auth.uid() = user_id OR 
  user_id IS NULL OR 
  public.get_user_role(auth.uid()) = 'admin'
);

-- Allow users to create their own orders
CREATE POLICY "Users can create their own orders"
ON public.orders FOR INSERT
WITH CHECK (
  auth.uid() = user_id OR 
  user_id IS NULL
);

-- Allow admins to manage all orders
CREATE POLICY "Admins can manage all orders"
ON public.orders FOR ALL
USING (public.get_user_role(auth.uid()) = 'admin');

-- Update order_items RLS policies to handle guest orders
CREATE POLICY "Users can view order items for their orders or guest orders"
ON public.order_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND (
      orders.user_id = auth.uid() OR 
      orders.user_id IS NULL OR 
      public.get_user_role(auth.uid()) = 'admin'
    )
  )
);

CREATE POLICY "Users can create order items for their orders or guest orders"
ON public.order_items FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND (
      orders.user_id = auth.uid() OR 
      orders.user_id IS NULL
    )
  )
);

CREATE POLICY "Admins can manage all order items"
ON public.order_items FOR ALL
USING (public.get_user_role(auth.uid()) = 'admin');

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';
import type { Tables } from '@/integrations/supabase/types';

export interface CartItemWithProduct {
  id: string;
  product_id: string;
  quantity: number;
  products: Tables<'products'>;
}

export const useCart = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch cart items from database
  const fetchCartItems = useCallback(async () => {
    if (!user) {
      setCartItems([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data: cartData, error: cartError } = await supabase
        .from('cart_items')
        .select('id, product_id, quantity')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (cartError) throw cartError;

      if (cartData && cartData.length > 0) {
        const productIds = cartData.map(item => item.product_id);
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .in('id', productIds);

        if (productsError) throw productsError;

        const cartWithProducts = cartData.map(cartItem => {
          const product = productsData?.find(product => product.id === cartItem.product_id);
          if (!product) {
            console.error(`Product not found for cart item ${cartItem.id}`);
            return null;
          }
          return {
            ...cartItem,
            products: product
          };
        }).filter(Boolean) as CartItemWithProduct[];

        setCartItems(cartWithProducts);
        console.log('Cart items updated:', cartWithProducts.length, 'items');
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  // Add item to cart
  const addToCart = async (product: Tables<'products'>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to add items to cart",
        variant: "destructive",
      });
      return;
    }

    try {
      // Check if item already exists
      const existingItem = cartItems.find(item => item.product_id === product.id);
      
      if (existingItem) {
        // Update quantity
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);

        if (error) throw error;
      } else {
        // Add new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity: 1
          });

        if (error) throw error;
      }

      // Refresh cart items to update the state
      console.log('Refreshing cart after adding item...');
      await fetchCartItems();
      
      toast({
        title: "Success",
        description: `${product.name} added to cart`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      await fetchCartItems();
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    }
  };

  // Update quantity
  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!user || quantity < 1) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) throw error;
      await fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    }
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.products.selling_price || item.products.price;
      return total + (price * item.quantity);
    }, 0);
  };

  // Get cart count
  const getCartCount = useCallback(() => {
    const count = cartItems.reduce((count, item) => count + item.quantity, 0);
    console.log('Cart count calculated:', count, 'from items:', cartItems.length);
    return count;
  }, [cartItems]);

  useEffect(() => {
    fetchCartItems();

    if (!user) return;
    // Realtime updates for cart changes
    const channel = supabase
      .channel('cart_items_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'cart_items', filter: `user_id=eq.${user.id}` },
        () => {
          fetchCartItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchCartItems, user]);

  return {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getCartCount,
    refreshCart: fetchCartItems
  };
};
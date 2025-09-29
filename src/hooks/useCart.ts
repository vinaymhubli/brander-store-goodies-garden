import { useEffect, useState, useCallback, useMemo } from 'react';
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

// Guest cart interface for localStorage
export interface GuestCartItem {
  id: string;
  product_id: string;
  quantity: number;
  products: Tables<'products'>;
}

export const useCart = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load guest cart from localStorage
  const loadGuestCart = useCallback(() => {
    console.log('loadGuestCart called');
    try {
      const guestCart = localStorage.getItem('guest_cart');
      console.log('Guest cart from localStorage:', guestCart);
      if (guestCart) {
        const parsedCart: GuestCartItem[] = JSON.parse(guestCart);
        console.log('Parsed guest cart:', parsedCart);
        setCartItems(parsedCart);
      } else {
        console.log('No guest cart found, setting empty array');
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error loading guest cart:', error);
      setCartItems([]);
    } finally {
      console.log('Setting isLoading to false');
      setIsLoading(false);
    }
  }, []);

  // Save guest cart to localStorage
  const saveGuestCart = useCallback((items: CartItemWithProduct[]) => {
    try {
      localStorage.setItem('guest_cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving guest cart:', error);
    }
  }, []);

  // Fetch cart items from database
  const fetchCartItems = useCallback(async () => {
    console.log('fetchCartItems called - user:', !!user, 'isLoading:', isLoading);
    if (!user) {
      console.log('Loading guest cart');
      loadGuestCart();
      setIsLoading(false);
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
  const addToCart = async (product: Tables<'products'>, quantityToAdd: number = 1) => {
    if (!user) {
      // Handle guest cart
      const existingItem = cartItems.find(item => item.product_id === product.id);
      
      let updatedItems: CartItemWithProduct[];
      if (existingItem) {
        updatedItems = cartItems.map(item => 
          item.product_id === product.id 
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        const newItem: CartItemWithProduct = {
          id: `guest_${Date.now()}_${product.id}`,
          product_id: product.id,
          quantity: quantityToAdd,
          products: product
        };
        updatedItems = [...cartItems, newItem];
      }
      
      setCartItems(updatedItems);
      saveGuestCart(updatedItems);
      
      toast({
        title: "Success",
        description: `${product.name} added to cart`,
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
          .update({ quantity: existingItem.quantity + quantityToAdd })
          .eq('id', existingItem.id);

        if (error) throw error;
      } else {
        // Add new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity: quantityToAdd
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
    if (!user) {
      // Handle guest cart
      const updatedItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedItems);
      saveGuestCart(updatedItems);
      return;
    }

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
    if (quantity < 1) return;

    if (!user) {
      // Handle guest cart
      const updatedItems = cartItems.map(item => 
        item.id === itemId 
          ? { ...item, quantity }
          : item
      );
      setCartItems(updatedItems);
      saveGuestCart(updatedItems);
      return;
    }

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
    if (!user) {
      // Handle guest cart
      setCartItems([]);
      localStorage.removeItem('guest_cart');
      return;
    }

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

  // Get cart count as a value (not function) so components re-render
  const cartCount = useMemo(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
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

  // Fallback to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.warn('Cart loading timeout, setting loading to false');
        setIsLoading(false);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [isLoading]);

  // Sync guest cart to database when user logs in
  useEffect(() => {
    if (user && cartItems.length > 0 && cartItems[0].id.startsWith('guest_')) {
      // User logged in with guest cart items, sync to database
      const syncGuestCartToDatabase = async () => {
        try {
          for (const item of cartItems) {
            const { error } = await supabase
              .from('cart_items')
              .insert({
                user_id: user.id,
                product_id: item.product_id,
                quantity: item.quantity
              });
            
            if (error) {
              console.error('Error syncing cart item:', error);
            }
          }
          
          // Clear guest cart and fetch from database
          localStorage.removeItem('guest_cart');
          await fetchCartItems();
        } catch (error) {
          console.error('Error syncing guest cart:', error);
        }
      };
      
      syncGuestCartToDatabase();
    }
  }, [user, cartItems, fetchCartItems]);

  return {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    cartCount,
    getCartCount: () => cartCount, // Keep for backward compatibility
    refreshCart: fetchCartItems
  };
};
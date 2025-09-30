import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';
import { useCartCountStore } from '@/store/cartCountStore';
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

// Utility function to generate temporary IDs
const generateTempId = (prefix: string = 'temp') => {
  return `${prefix}-${crypto.randomUUID?.() || Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const useCart = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { setCartItemCount, setCartTotalQuantity, resetCartCount } = useCartCountStore();
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const fetchingRef = useRef(false);

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
        // Update global count
        setCartItemCount(parsedCart.length);
        setCartTotalQuantity(parsedCart.reduce((total, item) => total + item.quantity, 0));
      } else {
        console.log('No guest cart found, setting empty array');
        setCartItems([]);
        resetCartCount();
      }
    } catch (error) {
      console.error('Error loading guest cart:', error);
      setCartItems([]);
      resetCartCount();
    } finally {
      console.log('Setting isLoading to false');
      setIsLoading(false);
    }
  }, [setCartItemCount, setCartTotalQuantity, resetCartCount]);

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
    console.log('fetchCartItems called - user:', !!user);
    
    // Prevent multiple simultaneous calls
    if (fetchingRef.current) {
      console.log('fetchCartItems already in progress, skipping');
      return;
    }
    
    if (!user) {
      console.log('Loading guest cart');
      loadGuestCart();
      return;
    }

    fetchingRef.current = true;
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
        // Update global count
        setCartItemCount(cartWithProducts.length);
        setCartTotalQuantity(cartWithProducts.reduce((total, item) => total + item.quantity, 0));
        console.log('Cart items updated:', cartWithProducts.length, 'items');
      } else {
        setCartItems([]);
        resetCartCount();
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
      fetchingRef.current = false;
    }
  }, [user, toast, loadGuestCart, setCartItemCount, setCartTotalQuantity, resetCartCount]);

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
          id: generateTempId('guest'),
          product_id: product.id,
          quantity: quantityToAdd,
          products: product
        };
        updatedItems = [...cartItems, newItem];
      }
      
      setCartItems(updatedItems);
      saveGuestCart(updatedItems);
      // Update global count immediately
      setCartItemCount(updatedItems.length);
      setCartTotalQuantity(updatedItems.reduce((total, item) => total + item.quantity, 0));
      
      toast({
        title: "Success",
        description: `${product.name} added to cart`,
      });
      return;
    }

    try {
      setIsUpdating(true);
      
      // Check if item already exists
      const existingItem = cartItems.find(item => item.product_id === product.id);
      
      // Update local state immediately for instant UI feedback
      let updatedItems: CartItemWithProduct[];
      if (existingItem) {
        updatedItems = cartItems.map(item => 
          item.product_id === product.id 
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        const newItem: CartItemWithProduct = {
          id: generateTempId('temp'),
          product_id: product.id,
          quantity: quantityToAdd,
          products: product
        };
        updatedItems = [...cartItems, newItem];
      }
      
      // Update local state immediately
      setCartItems(updatedItems);
      // Update global count immediately
      setCartItemCount(updatedItems.length);
      setCartTotalQuantity(updatedItems.reduce((total, item) => total + item.quantity, 0));
      
      if (existingItem) {
        // Update quantity in database
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantityToAdd })
          .eq('id', existingItem.id);

        if (error) throw error;
      } else {
        // Add new item to database
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity: quantityToAdd
          });

        if (error) throw error;
      }

      // Real-time subscription will handle syncing with database and updating IDs
      
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
    } finally {
      // Small delay to ensure database operation completes before allowing real-time updates
      setTimeout(() => {
        setIsUpdating(false);
      }, 100);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId: string) => {
    if (!user) {
      // Handle guest cart
      const updatedItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedItems);
      saveGuestCart(updatedItems);
      // Update global count immediately
      setCartItemCount(updatedItems.length);
      setCartTotalQuantity(updatedItems.reduce((total, item) => total + item.quantity, 0));
      return;
    }

    try {
      setIsUpdating(true);
      
      // Update local state immediately for instant UI feedback
      const updatedItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedItems);
      // Update global count immediately
      setCartItemCount(updatedItems.length);
      setCartTotalQuantity(updatedItems.reduce((total, item) => total + item.quantity, 0));
      
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) {
        // Revert local state if database operation failed
        setCartItems(cartItems);
        throw error;
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    } finally {
      // Small delay to ensure database operation completes before allowing real-time updates
      setTimeout(() => {
        setIsUpdating(false);
      }, 100);
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
      // Update global count immediately
      setCartItemCount(updatedItems.length);
      setCartTotalQuantity(updatedItems.reduce((total, item) => total + item.quantity, 0));
      return;
    }

    try {
      setIsUpdating(true);
      
      // Update local state immediately for instant UI feedback
      const updatedItems = cartItems.map(item => 
        item.id === itemId 
          ? { ...item, quantity }
          : item
      );
      setCartItems(updatedItems);
      // Update global count immediately
      setCartItemCount(updatedItems.length);
      setCartTotalQuantity(updatedItems.reduce((total, item) => total + item.quantity, 0));
      
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) {
        // Revert local state if database operation failed
        setCartItems(cartItems);
        throw error;
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    } finally {
      // Small delay to ensure database operation completes before allowing real-time updates
      setTimeout(() => {
        setIsUpdating(false);
      }, 100);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!user) {
      // Handle guest cart
      setCartItems([]);
      localStorage.removeItem('guest_cart');
      resetCartCount();
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      setCartItems([]);
      resetCartCount();
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
    console.log('Cart count calculated:', count, 'from items:', cartItems.length, 'items:', cartItems.map(i => i.product_id));
    return count;
  }, [cartItems]);

  useEffect(() => {
    console.log('useEffect: fetchCartItems called');
    fetchCartItems();
  }, [fetchCartItems]);

  useEffect(() => {
    if (!user) return;
    
    // Realtime updates for cart changes
    const channel = supabase
      .channel('cart_items_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'cart_items', filter: `user_id=eq.${user.id}` },
        () => {
          // Only fetch if we're not currently updating to prevent race conditions
          if (!isUpdating) {
            fetchCartItems();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isUpdating, fetchCartItems]);

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
    if (user && cartItems.length > 0 && cartItems[0].id.startsWith('guest-')) {
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
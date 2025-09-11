import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  selling_price?: number;
  image: string;
}

interface WishlistData {
  id: string;
  product_id: string;
  products: {
    id: string;
    name: string;
    price: number;
    selling_price: number | null;
    image_url: string;
  };
}

export const useWishlist = () => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchWishlist = async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select(`
          id,
          product_id,
          products (
            id,
            name,
            price,
            selling_price,
            image_url
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const wishlistItems: WishlistItem[] = (data as WishlistData[]).map(item => ({
        id: item.products.id,
        name: item.products.name,
        price: item.products.selling_price || item.products.price,
        selling_price: item.products.selling_price,
        image: item.products.image_url
      }));

      setItems(wishlistItems);
    } catch (error: any) {
      console.error('Error fetching wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to load wishlist",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: WishlistItem) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add items to your wishlist",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('wishlists')
        .insert({
          user_id: user.id,
          product_id: item.id
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already in Wishlist",
            description: "This item is already in your wishlist",
          });
          return false;
        }
        throw error;
      }

      await fetchWishlist();
      toast({
        title: "Added to Wishlist",
        description: `${item.name} has been added to your wishlist`,
      });
      return true;
    } catch (error: any) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to add item to wishlist",
        variant: "destructive",
      });
      return false;
    }
  };

  const removeItem = async (productId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;

      await fetchWishlist();
      toast({
        title: "Removed from Wishlist",
        description: "Item has been removed from your wishlist",
      });
      return true;
    } catch (error: any) {
      console.error('Error removing from wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist",
        variant: "destructive",
      });
      return false;
    }
  };

  const isInWishlist = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  const clearWishlist = async () => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setItems([]);
      toast({
        title: "Wishlist Cleared",
        description: "All items have been removed from your wishlist",
      });
      return true;
    } catch (error: any) {
      console.error('Error clearing wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to clear wishlist",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  return {
    items,
    loading,
    addItem,
    removeItem,
    isInWishlist,
    clearWishlist,
    refetch: fetchWishlist,
  };
};
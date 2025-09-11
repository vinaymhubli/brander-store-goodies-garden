
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistStore {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        console.log('Adding item to wishlist:', item);
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            console.log('Item already in wishlist');
            return state;
          }
          console.log('Adding new item to wishlist');
          return { items: [...state.items, item] };
        });
      },
      removeItem: (id) => {
        console.log('Removing item from wishlist:', id);
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      clearWishlist: () => {
        console.log('Clearing wishlist');
        set({ items: [] });
      },
      isInWishlist: (id) => {
        const { items } = get();
        return items.some(item => item.id === id);
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);

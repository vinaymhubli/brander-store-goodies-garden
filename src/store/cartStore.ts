
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        console.log('Adding item to cart:', item);
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            console.log('Item already exists, updating quantity');
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          console.log('Adding new item to cart');
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },
      removeItem: (id) => {
        console.log('Removing item from cart:', id);
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      updateQuantity: (id, quantity) => {
        console.log('Updating quantity for item:', id, 'to:', quantity);
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => {
        console.log('Clearing cart');
        set({ items: [] });
      },
      getTotalPrice: () => {
        const { items } = get();
        const total = items.reduce((total, item) => total + item.price * item.quantity, 0);
        console.log('Cart total:', total);
        return total;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

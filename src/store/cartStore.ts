
// Legacy cart store - now using useCart hook with Supabase
// This file is kept for backward compatibility but functionality moved to useCart hook

import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

// Legacy store - use useCart hook instead
export const useCartStore = create<CartStore>()(() => ({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getTotalPrice: () => 0,
}));

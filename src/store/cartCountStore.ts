import { create } from 'zustand';

interface CartCountState {
  cartItemCount: number; // Number of different items in cart
  cartTotalQuantity: number; // Total quantity of all items
  setCartItemCount: (count: number) => void;
  setCartTotalQuantity: (quantity: number) => void;
  incrementCartItemCount: () => void;
  decrementCartItemCount: () => void;
  resetCartCount: () => void;
}

export const useCartCountStore = create<CartCountState>((set) => ({
  cartItemCount: 0,
  cartTotalQuantity: 0,
  
  setCartItemCount: (count: number) => set({ cartItemCount: count }),
  setCartTotalQuantity: (quantity: number) => set({ cartTotalQuantity: quantity }),
  
  incrementCartItemCount: () => set((state) => ({ cartItemCount: state.cartItemCount + 1 })),
  decrementCartItemCount: () => set((state) => ({ cartItemCount: Math.max(0, state.cartItemCount - 1) })),
  
  resetCartCount: () => set({ cartItemCount: 0, cartTotalQuantity: 0 }),
}));

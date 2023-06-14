import { Cart } from '@/types';
import { create } from 'zustand';

interface StoreState {
  cart: Cart[];
  addItem: (cartItem: Cart) => void;
  updateCart: (cart: Cart[]) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
}

// Define el store de Zustand
const useCart = create<StoreState>((set) => ({
  cart: [],
  addItem: (cartItem) => set((state) => ({ cart: [...state.cart, cartItem] })),
  removeItem: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
  updateCart: (cart) => set(() => ({ cart })),
  clearCart: () => set({ cart: [] }),
}));

export default useCart;

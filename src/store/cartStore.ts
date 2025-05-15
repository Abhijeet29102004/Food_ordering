import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, MenuItem } from '../types';
import { getDiscountedPrice } from '../lib/utils';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem: CartItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
          
          if (existingItemIndex !== -1) {
            // Item exists, update quantity
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
            };
            
            return { items: updatedItems };
          } else {
            // Item doesn't exist, add it
            return { items: [...state.items, newItem] };
          }
        });
      },
      
      removeItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== itemId),
        }));
      },
      
      updateQuantity: (itemId: string, quantity: number) => {
        set((state) => ({
          items: state.items.map(item => 
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      calculateTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const price = item.discount ? getDiscountedPrice(item.price, item.discount) : item.price;
          return total + (price * item.quantity);
        }, 0);
      },
    }),
    {
      name: 'tasty-bites-cart',
    }
  )
);
import { create } from 'zustand';

export const useWishlist = create((set, get) => ({
  items: [],
  isOpen: false,
  
  openWishlist: () => set({ isOpen: true }),
  closeWishlist: () => set({ isOpen: false }),

  toggleProduct: (product) => set((state) => {
    const exists = state.items.find(item => item.id === product.id);
    if (exists) {
      return { items: state.items.filter(item => item.id !== product.id) };
    }
    return { items: [...state.items, product] };
  }),

  removeFromWishlist: (productId) => set((state) => ({
    items: state.items.filter(item => item.id !== productId)
  })),
  
  isInWishlist: (productId) => {
    return get().items.some(item => item.id === productId);
  }
}));

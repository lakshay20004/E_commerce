import { create } from 'zustand';

export const useCart = create((set, get) => ({
  items: [],
  isOpen: false,
  
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addToCart: (product) => set((state) => {
    // Check if item already exists
    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem) {
      return {
        items: state.items.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
        isOpen: true // automatically open sidebar on add
      };
    }
    return { 
      items: [...state.items, { ...product, quantity: 1 }],
      isOpen: true 
    };
  }),

  removeFromCart: (productId) => set((state) => ({
    items: state.items.filter(item => item.id !== productId)
  })),

  updateQuantity: (productId, quantity) => set((state) => {
    if (quantity <= 0) {
      return { items: state.items.filter(item => item.id !== productId) };
    }
    return {
      items: state.items.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    };
  }),

  getTotalPrice: () => {
    return get().items.reduce((total, item) => {
      // Check if price is a string like "$199.00" -> Parse it first
      const numericPrice = typeof item.price === 'string' 
        ? parseFloat(item.price.replace(/[^0-9.-]+/g,"")) 
        : item.price;
      return total + (numericPrice * item.quantity);
    }, 0);
  },

  clearCart: () => set({ items: [] })
}));

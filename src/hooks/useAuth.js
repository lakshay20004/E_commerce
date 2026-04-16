import { create } from 'zustand';

export const useAuth = create((set) => ({
  isLoginModalOpen: false,
  user: null,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
  login: (userData) => set({ user: userData, isLoginModalOpen: false }),
  logout: () => set({ user: null })
}));

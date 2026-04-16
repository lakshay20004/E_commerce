import React from 'react';
import Navbar from './Navbar';
import CartSidebar from './CartSidebar';
import LoginModal from './LoginModal';
import WishlistSidebar from './WishlistSidebar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar />
      <CartSidebar />
      <WishlistSidebar />
      <LoginModal />
      <main className="flex-1 relative">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 font-medium">© 2026 Elevate E-commerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

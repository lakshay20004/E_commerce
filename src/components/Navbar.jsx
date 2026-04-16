import React from 'react';
import { ShoppingCart, Search, Menu, User, Heart } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useWishlist } from '../hooks/useWishlist';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { items, openCart } = useCart();
  const { openLoginModal, user } = useAuth();
  const { items: wishlistItems, openWishlist } = useWishlist();
  
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
            <div className="h-10 w-10 bg-gradient-to-tr from-[#2563eb] to-blue-400 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-2 shadow-lg">
              E
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-[#0f172a]">
              Elevate
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition duration-150 ease-in-out sm:text-sm"
                placeholder="Search premium products..."
              />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-[#2563eb] font-medium transition-colors">Shop</a>
            <a href="#" className="text-gray-600 hover:text-[#2563eb] font-medium transition-colors">Collections</a>
            <a href="#" className="text-gray-600 hover:text-[#2563eb] font-medium transition-colors">About</a>
            <Link to="/checkout" className="text-gray-600 hover:text-[#2563eb] font-medium transition-colors">
              Checkout
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <Link
              to="/checkout"
              className="inline-flex items-center rounded-full bg-[#2563eb] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-600"
            >
              Payment
            </Link>
            <button 
              onClick={openLoginModal}
              className="group flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 hover:bg-gray-100 transition-colors"
            >
              <div className="p-1 rounded-full bg-white shadow-sm border border-gray-100">
                 <User className="h-4 w-4 text-[#2563eb]" />
              </div>
              <span className="text-sm font-semibold text-gray-700 pr-1">
                {user ? user.name : "Sign In"}
              </span>
            </button>
            <button 
              className="text-gray-600 hover:text-red-500 transition-colors relative"
              onClick={openWishlist}
            >
              <Heart className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#2563eb] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button 
              className="text-gray-600 hover:text-[#2563eb] transition-colors relative"
              onClick={openCart}
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>
            <button className="md:hidden text-gray-600 hover:text-[#2563eb] transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

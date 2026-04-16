import React from 'react';
import { X, Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

export default function WishlistSidebar() {
  const { items, isOpen, closeWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#0f172a]/50 backdrop-blur-sm z-50 transition-opacity duration-300" 
          onClick={closeWishlist}
        />
      )}
      
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-[60] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.3,0,0,1)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-3">
            <Heart className="w-7 h-7 text-red-500 fill-red-500" /> 
            Saved Items
          </h2>
          <button 
            onClick={closeWishlist}
            className="p-2 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="bg-gray-50 p-6 rounded-full mb-4">
                <Heart className="w-12 h-12 text-gray-300" />
              </div>
              <p className="font-medium text-lg text-gray-500 mb-2">You haven't saved any items.</p>
              <button 
                onClick={closeWishlist}
                className="mt-4 text-[#2563eb] font-semibold hover:underline"
              >
                Browse Products &rarr;
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group bg-white border border-gray-100 rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow">
                <Link to={`/product/${item.id}`} onClick={closeWishlist} className="w-24 h-24 overflow-hidden rounded-xl bg-gray-100 flex-shrink-0 cursor-pointer">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform" />
                </Link>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="pr-2">
                       <Link to={`/product/${item.id}`} onClick={closeWishlist} className="font-bold text-gray-900 leading-tight hover:text-[#2563eb] transition-colors">{item.name}</Link>
                       <p className="text-[#2563eb] font-bold mt-1">{item.price}</p>
                    </div>
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="mt-3">
                    <button 
                       onClick={() => addToCart(item)}
                       className="w-full text-sm font-bold bg-[#0f172a] text-white rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-sm"
                    >
                      <ShoppingBag className="w-4 h-4" /> Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

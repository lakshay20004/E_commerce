import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Loader2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handlePayment = async () => {
    if (items.length === 0) return;

    setIsProcessing(true);

    // Bypassing real Razorpay SDK since we don't have a valid Dashboard Key
    // Simulating identical frontend load time & success logic natively!
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Payment Successful! \nMock Transaction ID: pay_${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
      clearCart();
      closeCart();
    }, 2000);
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[#0f172a]/50 backdrop-blur-sm z-50 transition-opacity duration-300" 
          onClick={closeCart}
        />
      )}
      
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-[60] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.3,0,0,1)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-extrabold text-[#0f172a]">Shopping Cart</h2>
          <button 
            onClick={closeCart}
            className="p-2 text-gray-400 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingBag className="w-16 h-16 mb-4 text-gray-200" />
              <p className="font-medium text-lg">Your cart is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-20 overflow-hidden rounded-xl bg-gray-100 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 leading-tight pr-2">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1 border border-gray-100">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-600"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-gray-900 min-w-[1.5rem] text-center">{item.quantity}</span>
                      <button 
                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
                         className="p-1 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-600"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[#2563eb] font-bold">{item.price}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gray-50/50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-semibold">Subtotal</span>
              <span className="text-2xl font-extrabold text-[#0f172a]">₹{getTotalPrice().toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <button 
              onClick={handlePayment} 
              disabled={isProcessing}
              className="w-full bg-[#2563eb] text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all outline-none flex items-center justify-center gap-3 disabled:opacity-80 disabled:cursor-wait"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Securing Payment...
                </>
              ) : (
                "Proceed to Checkout"
              )}
            </button>
            <p className="text-center text-xs text-gray-400 font-medium mt-4">
              Secure testing checkout logic via App State.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

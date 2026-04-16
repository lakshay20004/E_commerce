import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { products } from '../data/products';
import { Link } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';

const ProductCard = ({ product }) => {
  const addToCart = useCart((state) => state.addToCart);
  const { toggleProduct, isInWishlist } = useWishlist();
  const isLiked = isInWishlist(product.id);

  return (
    <Link to={`/product/${product.id}`} className="group cursor-pointer bg-white rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100 flex flex-col relative w-full">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 mb-4 relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleProduct(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors shadow-sm ${isLiked ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'}`}
        >
           <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
        </button>
      </div>
      <div className="flex flex-col flex-1 pb-1">
        <span className="text-sm text-gray-500 mb-1">{product.category}</span>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#2563eb] transition-colors line-clamp-1">{product.name}</h3>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-base sm:text-lg font-medium text-[#2563eb]">{product.price}</span>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="p-2 sm:p-2.5 rounded-full bg-gray-50 text-[#0f172a] hover:bg-[#2563eb] hover:text-white transition-all duration-300 transform hover:scale-110 shadow-sm flex-shrink-0 ml-2"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default function ProductGrid() {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current.children;
    gsap.fromTo(cards, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power2.out",
        delay: 0.2 
      }
    );
  }, []);

  return (
    <div className="bg-gray-50 py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-12 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">Trending Now</h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500">Discover our most popular premium items.</p>
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

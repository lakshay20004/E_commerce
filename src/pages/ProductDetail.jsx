import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Heart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCart((state) => state.addToCart);
  const { toggleProduct, isInWishlist } = useWishlist();
  
  const product = products.find(p => p.id === id);

  // Scroll to top when 'id' changes (vital for Related Items clicks)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const relatedProducts = useMemo(() => {
    if(!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 3); // Max 3 related items
  }, [id, product]);

  if (!product) return <div className="pt-32 text-center text-2xl font-bold">Product not found</div>;

  const isLiked = isInWishlist(product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-500 hover:text-[#2563eb] font-medium transition-colors mb-8 sm:mb-12"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Shop
      </button>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20 lg:mb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-3xl bg-gray-100 shadow-sm border border-gray-100"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center" />
        </motion.div>

        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-sm font-bold text-[#2563eb] uppercase tracking-widest">{product.category}</span>
            <h1 className="mt-3 sm:mt-4 text-3xl sm:text-5xl font-extrabold text-[#0f172a] tracking-tight">{product.name}</h1>
            <p className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-medium text-gray-900">{product.price}</p>
            
            <p className="mt-6 sm:mt-8 text-base sm:text-lg text-gray-500 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={() => addToCart(product)}
                className="w-full sm:flex-1 bg-[#0f172a] hover:bg-gray-800 text-white px-8 py-4 sm:py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                <ShoppingBag className="w-6 h-6" />
                Add to Cart
              </button>
              
              <button 
                onClick={() => toggleProduct(product)}
                className={`w-full sm:w-auto px-8 py-4 sm:py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-xl hover:-translate-y-1 border-2 ${isLiked ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'}`}
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                {isLiked ? 'Saved' : 'Wishlist'}
              </button>
            </div>
          </motion.div>

          <hr className="my-10 sm:my-12 border-gray-200" />
          
          <div className="grid grid-cols-2 gap-4 sm:gap-8 text-sm text-gray-500 font-medium">
            <div>
              <strong className="block text-gray-900 mb-1 text-base">Free Shipping</strong>
              On all orders over ₹15,000.
            </div>
            <div>
              <strong className="block text-gray-900 mb-1 text-base">Returns</strong>
              30-day return policy.
            </div>
          </div>

        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-100 pt-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {relatedProducts.map((relatedItem) => (
              <Link to={`/product/${relatedItem.id}`} key={relatedItem.id} className="group cursor-pointer bg-white rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100 flex flex-col">
                <div className="aspect-w-1 w-full h-64 overflow-hidden rounded-xl bg-gray-200 mb-4">
                  <img src={relatedItem.image} alt={relatedItem.name} className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-sm text-gray-500 mb-1">{relatedItem.category}</span>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#2563eb] transition-colors line-clamp-1">{relatedItem.name}</h3>
                  <p className="mt-2 text-lg font-medium text-[#2563eb]">{relatedItem.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

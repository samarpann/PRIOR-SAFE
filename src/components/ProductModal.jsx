import React from 'react';
import { X, ShoppingBag, ShieldCheck, Truck, RefreshCw, Star, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductModal = ({ product, isOpen, onClose, onAddToCart, onBuyNow }) => {
  const [quantity, setQuantity] = React.useState(1);

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-industrial-900/70 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="relative w-full max-w-5xl bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-premium flex flex-col md:flex-row max-h-[95vh] sm:max-h-[85vh] md:max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-20 p-2.5 bg-white/80 backdrop-blur rounded-full text-industrial-400 hover:text-industrial-900 shadow-soft border border-industrial-100 premium-transition"
          >
            <X size={20} />
          </button>

          {/* Left: Image Section */}
          <div className="w-full md:w-1/2 bg-industrial-50 p-12 flex items-center justify-center relative min-h-[400px]">
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-contain max-h-[450px]"
            />
            {/* Image dots */}
            <div className="absolute bottom-10 flex gap-2.5">
              {[0, 1, 2].map(i => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-industrial-900 w-6' : 'bg-industrial-200'} transition-all`} />
              ))}
            </div>
          </div>

          {/* Right: Details Section */}
          <div className="w-full md:w-1/2 p-10 md:p-14 overflow-y-auto">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-accent">
                  {[1, 2, 3, 4, 5].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-xs font-black text-industrial-400 uppercase tracking-widest bg-industrial-50 px-3 py-1 rounded-full">4.9 / 5.0</span>
              </div>
              
              <div className="flex items-center gap-4 mb-3">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-dark">
                  {product.reference}
                </span>
                <span className="w-1 h-1 bg-industrial-300 rounded-full"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-industrial-400">In Stock</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-industrial-900 mb-6 tracking-tight leading-none">
                {product.name}
              </h2>
              
              <p className="text-industrial-500 text-lg leading-relaxed mb-8 font-medium italic">
                {product.subtitle}
              </p>

              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-5xl font-black text-industrial-900 tabular-nums">₹{product.price || '49.99'}</span>
                <span className="text-xl text-industrial-300 font-bold line-through tabular-nums">₹{(parseFloat(product.price || 49.99) * 1.25).toFixed(2)}</span>
                <span className="bg-red-50 text-red-600 font-black text-xs px-2.5 py-1 rounded-lg">-22%</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 border-y border-industrial-100 py-8">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-industrial-50 rounded-xl flex items-center justify-center text-industrial-900">
                  <ShieldCheck size={22} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-industrial-600">Certified</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-industrial-50 rounded-xl flex items-center justify-center text-industrial-900">
                  <Truck size={22} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-industrial-600">Express</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-industrial-50 rounded-xl flex items-center justify-center text-industrial-900">
                  <RefreshCw size={22} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-industrial-600">30-Day</span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm font-bold text-industrial-900 uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center bg-industrial-50 rounded-xl border border-industrial-200">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-industrial-600 hover:text-industrial-900"
                  >-</button>
                  <span className="w-12 text-center font-bold text-industrial-900 tabular-nums">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-industrial-600 hover:text-industrial-900"
                  >+</button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onAddToCart(product, quantity)}
                  className="flex-grow flex items-center justify-center gap-3 bg-accent text-industrial-900 font-black py-5 px-8 rounded-2xl hover:bg-industrial-900 hover:text-white premium-transition shadow-soft active:scale-[0.98]"
                >
                  <ShoppingBag size={20} />
                  ADD TO CART
                </button>
                <button 
                  className="sm:w-20 w-full h-16 sm:h-auto bg-industrial-50 text-industrial-400 hover:text-red-500 rounded-2xl flex items-center justify-center premium-transition border border-industrial-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </button>
              </div>
              
              <button 
                onClick={() => onBuyNow(product, quantity)}
                className="w-full flex items-center justify-center gap-3 bg-industrial-900 text-white font-black py-5 px-8 rounded-2xl hover:bg-accent hover:text-industrial-900 premium-transition shadow-premium active:scale-[0.98]"
              >
                <Zap size={20} fill="currentColor" />
                BUY NOW
              </button>
            </div>
            
            <div className="mt-10 flex items-center justify-center gap-2 text-industrial-400">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-[10px] font-black uppercase tracking-widest">
                24 people are viewing this right now
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;

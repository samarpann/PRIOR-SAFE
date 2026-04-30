import React from 'react';
import { X, ShoppingBag, ShieldCheck, Truck, RefreshCw, Star, Zap, Minus, Plus } from 'lucide-react';
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
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="relative w-full max-w-5xl bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[95vh] sm:max-h-[85vh] md:max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-20 p-3 bg-white/80 backdrop-blur rounded-full text-slate-400 hover:text-slate-900 shadow-sm border border-slate-100 transition-all active:scale-90"
          >
            <X size={20} />
          </button>

          {/* Left: Image Section */}
          <div className="w-full md:w-1/2 bg-slate-50 p-12 flex items-center justify-center relative min-h-[300px] md:min-h-[500px]">
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-contain max-h-[400px]"
            />
            {/* Image dots */}
            <div className="absolute bottom-10 flex gap-2">
              {[0, 1, 2].map(i => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i === 0 ? 'bg-blue-600 w-8' : 'bg-slate-200 w-2'}`} />
              ))}
            </div>
          </div>

          {/* Right: Details Section */}
          <div className="w-full md:w-1/2 p-10 md:p-16 overflow-y-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">4.9 Rating</span>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                  REF: {product.reference || 'PS-001'}
                </span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">In Stock</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
                {product.name}
              </h2>
              
              <p className="text-slate-500 text-base leading-relaxed mb-8 font-medium">
                {product.subtitle || product.description}
              </p>

              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-4xl font-black text-slate-900">₹{(product.price || 49.99).toFixed(2)}</span>
                <span className="text-lg text-slate-300 font-bold line-through">₹{(parseFloat(product.price || 49.99) * 1.25).toFixed(2)}</span>
                <span className="bg-blue-50 text-blue-600 font-black text-xs px-2.5 py-1 rounded-lg">PROMO</span>
              </div>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-3 gap-4 mb-10 pb-10 border-b border-slate-100">
              <div className="text-center">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 mx-auto mb-2">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Certified</span>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 mx-auto mb-2">
                  <Truck size={20} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Express</span>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 mx-auto mb-2">
                  <RefreshCw size={20} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">30-Day</span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Quantity</span>
                <div className="flex items-center bg-slate-50 rounded-2xl border border-slate-100 p-1">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all"
                  ><Minus size={18} /></button>
                  <span className="w-10 text-center font-black text-slate-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all"
                  ><Plus size={18} /></button>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => onAddToCart(product, quantity)}
                  className="flex-grow flex items-center justify-center gap-3 bg-blue-600 text-white font-black py-5 px-8 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95"
                >
                  <ShoppingBag size={20} />
                  ADD TO CART
                </button>
                <button 
                  onClick={() => onBuyNow(product, quantity)}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900 text-white font-black py-5 px-10 rounded-2xl hover:bg-slate-800 transition-all shadow-xl active:scale-95"
                >
                  <Zap size={20} className="text-amber-400" fill="currentColor" />
                  BUY NOW
                </button>
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Authorized Ecom Experts Retailer
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;

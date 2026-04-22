import React, { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import ProductModal from '../components/ProductModal';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShoppingBag, Search, Shield, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API_BASE from '../config/api';

const CATEGORIES = [
  'All Products',
  'Skull protection',
  'Respiratory protection',
  'Hearing protection',
  'Protective eyewear',
];

const ProductCategoryPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All Products');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page,
          limit: 8,
          search: searchQuery,
          category: category === 'All Products' ? '' : category,
        });
        const res = await fetch(`${API_BASE}/api/products?${params}`);
        const data = await res.json();
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };
    const t = setTimeout(fetchProducts, 300);
    return () => clearTimeout(t);
  }, [page, searchQuery, category]);

  const handleAddToCart = (product, qty = 1) => {
    showToast(`${qty}x ${product.name} added to cart!`);
    setSelectedProduct(null);
  };

  const handleBuyNow = (product) => {
    showToast(`Preparing order for ${product.name}...`);
    setTimeout(() => navigate('/checkout'), 1200);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AppLayout>
      {/* Search Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100 px-4 md:px-8 py-3">
        <div className="flex items-center gap-3 max-w-3xl mx-auto lg:mx-0">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 rounded-xl text-sm font-medium text-slate-900 outline-none focus:ring-2 transition-all"
              style={{ '--tw-ring-color': 'rgba(178,58,134,0.2)' }}
            />
          </div>
        </div>
      </div>

      <div className="p-4 md:p-8">
        {/* Hero Banner */}
        <div
          className="relative rounded-3xl overflow-hidden mb-8 p-8 md:p-14"
          style={{ background: 'linear-gradient(135deg, #6e2553 0%, #b23a86 100%)' }}
        >
          <div className="relative z-10 max-w-lg">
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.25em] text-white/70 bg-white/10 px-4 py-1.5 rounded-full mb-4">
              Premium Partner 2025
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-[1.1] mb-5">
              Industrial Excellence Simplified
            </h1>
            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8 max-w-md">
              Ecom Experts — the most comprehensive platform for industrial sales and safety procurement.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 bg-white font-black px-7 py-3.5 rounded-2xl text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
              style={{ color: '#b23a86' }}
            >
              Explore Products
            </button>
          </div>
          <Shield size={260} className="absolute -right-8 -bottom-8 text-white/5 pointer-events-none" />
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className="whitespace-nowrap flex-shrink-0 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all border-2"
              style={
                category === cat
                  ? { background: '#b23a86', borderColor: '#b23a86', color: 'white' }
                  : { background: 'white', borderColor: '#e2e8f0', color: '#94a3b8' }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div
              className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: '#b23a86', borderTopColor: 'transparent' }}
            />
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Syncing inventory...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Package size={48} className="text-slate-300" />
            <p className="font-black text-slate-400 uppercase tracking-widest text-xs">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {products.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedProduct(product)}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 cursor-pointer"
                style={{ transition: 'box-shadow 0.2s, transform 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(178,58,134,0.15)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = ''; }}
              >
                {/* Image */}
                <div className="relative h-56 bg-slate-50 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg font-black text-sm text-slate-900 shadow-sm">
                    ₹{(product.price || 49.99).toFixed(2)}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <span
                    className="text-[9px] font-black uppercase tracking-[0.3em] block mb-1"
                    style={{ color: '#b23a86' }}
                  >
                    {product.category}
                  </span>
                  <h3 className="font-black text-slate-900 text-base mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-5 line-clamp-2">
                    {product.description || product.subtitle}
                  </p>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      if (!user) navigate('/login');
                      else setSelectedProduct(product);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all bg-slate-50 text-slate-700 hover:text-white"
                    onMouseEnter={e => { e.currentTarget.style.background = '#b23a86'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = ''; }}
                  >
                    <ShoppingBag size={16} /> Buy Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-6 py-3 rounded-xl font-black text-sm border-2 border-slate-100 bg-white text-slate-600 disabled:opacity-40 transition-all"
            >
              ← Prev
            </button>
            <span className="px-5 py-3 rounded-xl bg-white border-2 border-slate-100 font-black text-sm text-slate-600">
              {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="px-6 py-3 rounded-xl font-black text-sm border-2 border-slate-100 bg-white text-slate-600 disabled:opacity-40 transition-all"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      )}

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-3 text-white px-6 py-4 rounded-2xl shadow-2xl pointer-events-none"
            style={{ background: '#1e293b' }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#b23a86' }}>
              <CheckCircle size={18} />
            </div>
            <span className="font-bold text-sm whitespace-nowrap">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
};

export default ProductCategoryPage;

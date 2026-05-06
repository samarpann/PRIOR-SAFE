import React, { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import ProductModal from '../components/ProductModal';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShoppingBag, Search, Shield, Package, ArrowRight } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import API_BASE from '../config/api';
import { CATEGORY_STRUCTURE } from '../data/categories';

import ProductSidebar from '../components/ProductSidebar';

const ProductCategoryPage = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const category = searchParams.get('category') || 'All Products';
  const subCategory = searchParams.get('subCategory') || '';
  const selectedSectors = searchParams.getAll('sectors');
  const selectedRisks = searchParams.getAll('risks');
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleFilterSelect = (cat, sub) => {
    if (cat === 'All Products') {
      setSearchParams({});
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('category', cat);
      newParams.set('subCategory', sub);
      setSearchParams(newParams);
    }
    setPage(1);
  };

  const handleFilterToggle = (type, value) => {
    const newParams = new URLSearchParams(searchParams);
    const currentValues = newParams.getAll(type);
    
    if (currentValues.includes(value)) {
      // Remove value
      const updated = currentValues.filter(v => v !== value);
      newParams.delete(type);
      updated.forEach(v => newParams.append(type, v));
    } else {
      // Add value
      newParams.append(type, value);
    }
    setSearchParams(newParams);
    setPage(1);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page,
          limit: 8,
          search: searchQuery,
          ...(category !== 'All Products' && { category }),
          ...(subCategory && subCategory !== 'All products' && { subCategory }),
        });
        
        // Add multi-value filters
        selectedSectors.forEach(s => params.append('sectors', s));
        selectedRisks.forEach(r => params.append('risks', r));

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
  }, [page, searchQuery, category, subCategory, searchParams]);

  const handleAddToCart = (product, qty = 1) => {
    addToCart({
        ...product,
        image: product.image_url // map image_url to image for cart
    }, qty);
    showToast(`${qty}x ${product.name} added to cart!`);
    setSelectedProduct(null);
  };

  const handleBuyNow = (product, qty = 1) => {
    addToCart({
        ...product,
        image: product.image_url
    }, qty);
    navigate('/checkout');
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AppLayout>
      {/* Search Bar & Primary Actions */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 md:px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto lg:mx-0 gap-6">
          <div className="relative flex-1 max-w-2xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by product name, category or safety standard..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 outline-none focus:ring-4 focus:ring-industrial-600/5 focus:border-industrial-600 transition-all"
            />
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Support</span>
                <span className="text-sm font-bold text-slate-900">+91 1800-SAFE-PR</span>
            </div>
            <div className="w-px h-8 bg-slate-100"></div>
            <button className="flex items-center gap-2 text-slate-600 hover:text-industrial-600 transition-colors">
                <Shield size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Verify Certs</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row p-4 md:p-8 gap-8">
        {/* New Premium Sidebar */}
        <ProductSidebar 
          activeCategory={category} 
          activeSubCategory={subCategory} 
          activeFilters={{
            sectors: selectedSectors,
            risks: selectedRisks
          }}
          onSelect={handleFilterSelect} 
          onFilterToggle={handleFilterToggle}
        />

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {/* Hero Banner (Minimalized) */}
          <div className="relative rounded-[2.5rem] overflow-hidden mb-12 h-[280px] bg-slate-900 group">
            <img 
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80" 
              alt="Safety Excellence"
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-[10s]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-center px-12">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 tracking-tighter max-w-lg">
                Setting the Standard in <span className="text-industrial-500">Industrial Safety.</span>
              </h2>
              <p className="text-slate-400 text-sm max-w-md leading-relaxed font-medium">
                Explore our range of ISO certified safety equipment engineered for the world's most demanding environments.
              </p>
            </div>
          </div>

        {/* Filters and Sorting (Placeholder for expansion) */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
            <p className="text-sm font-black text-slate-900 uppercase tracking-widest">
                Showing {products.length} Products <span className="text-slate-400 font-medium ml-2">in {category}</span>
            </p>
            <div className="flex gap-4">
                <select className="bg-transparent text-xs font-black uppercase tracking-widest text-slate-500 outline-none cursor-pointer">
                    <option>Sort By: Best Seller</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                </select>
            </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-16 h-16 border-8 border-slate-100 border-t-industrial-600 rounded-full animate-spin" />
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 animate-pulse">Synchronizing Inventory...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Package size={48} className="text-slate-200" />
            <p className="font-black text-slate-400 uppercase tracking-widest text-xs">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedProduct(product)}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 cursor-pointer hover:shadow-3xl transition-all duration-500"
              >
                {/* Image & Badges */}
                <div className="relative h-72 bg-slate-50 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-contain p-10 group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Karam Style Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {i % 3 === 0 && (
                        <span className="bg-industrial-600 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-industrial-600/30">
                            New Launch
                        </span>
                    )}
                    {i % 4 === 0 && (
                        <span className="bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-emerald-500/30">
                            Best Seller
                        </span>
                    )}
                  </div>

                  <button className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </button>
                </div>

                {/* Info Container */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-industrial-600 mb-1 block">
                            {product.category}
                        </span>
                        <h3 className="font-black text-slate-900 text-lg leading-tight line-clamp-1 group-hover:text-industrial-600 transition-colors">
                            {product.name}
                        </h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest line-through">₹{(parseFloat(product.price || 49) * 1.25).toFixed(2)}</span>
                        <span className="text-2xl font-black text-slate-900">₹{(product.price || 49.99).toFixed(2)}</span>
                    </div>
                    <span className="bg-blue-50 text-industrial-600 text-[10px] font-black px-2 py-1 rounded-lg">SAVE 25%</span>
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      if (!user) navigate('/login');
                      else setSelectedProduct(product);
                    }}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all bg-slate-900 text-white hover:bg-industrial-600 group/btn"
                  >
                    Quick Specification <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-16">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border border-slate-200 bg-white text-slate-600 disabled:opacity-40 transition-all active:scale-95"
            >
              ← Prev
            </button>
            <span className="px-6 py-4 rounded-2xl bg-white border border-slate-200 font-black text-xs text-slate-900">
              {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border border-slate-200 bg-white text-slate-600 disabled:opacity-40 transition-all active:scale-95"
            >
              Next →
            </button>
          </div>
        )}
        </div>
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
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-4 text-white px-8 py-5 rounded-[2rem] shadow-2xl border border-white/10 backdrop-blur-xl"
            style={{ background: 'rgba(15, 23, 42, 0.95)' }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-industrial-600 shadow-lg shadow-industrial-600/40">
              <CheckCircle size={20} />
            </div>
            <span className="font-bold text-sm whitespace-nowrap tracking-tight">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
};

export default ProductCategoryPage;

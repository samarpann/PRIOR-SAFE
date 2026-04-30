import React, { useState, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import HeroCarousel from '../components/HeroCarousel';
import ProductModal from '../components/ProductModal';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, Award, Zap, Users, Globe, HardHat, Eye, Activity, CheckCircle2, ChevronRight, Package, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import API_BASE from '../config/api';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products?limit=8`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product, qty = 1) => {
    addToCart({ ...product, image: product.image_url }, qty);
    showToast(`${qty}x ${product.name} added to cart!`);
    setSelectedProduct(null);
  };

  const handleBuyNow = (product, qty = 1) => {
    addToCart({ ...product, image: product.image_url }, qty);
    navigate('/checkout');
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <AppLayout>
      <div className="bg-slate-50 min-h-screen px-4 md:px-8 pb-12">
        
        {/* Dynamic Hero Carousel */}
        <HeroCarousel />

        {/* Client Logos / Trust Bar */}
        <div className="max-w-7xl mx-auto py-12 border-b border-slate-200 mb-12">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-8">Trusted by Global Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using text logos for simplicity, but could be SVGs */}
            {['VOLTAS', 'TATA STEEL', 'L&T', 'RELIANCE', 'JINDAL'].map(logo => (
              <span key={logo} className="text-2xl font-black text-slate-900 tracking-tighter">{logo}</span>
            ))}
          </div>
        </div>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto mb-24">
          {[
            { value: '15+', label: 'Years Experience' },
            { value: '500+', label: 'Enterprise Clients' },
            { value: '1M+', label: 'Products Delivered' },
            { value: '100%', label: 'Safety Certified' }
          ].map((metric, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow"
            >
              <h3 className="text-4xl font-black text-blue-600 mb-1">{metric.value}</h3>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-blue-600 font-black text-xs uppercase tracking-widest block mb-4">Latest Additions</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">Featured Products.</h2>
            </div>
            <Link to="/products" className="group flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-widest hover:text-blue-600 transition-colors">
              View Entire Catalogue <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <div className="w-16 h-16 border-8 border-slate-100 border-t-blue-600 rounded-full animate-spin" />
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 animate-pulse">Loading Products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Package size={48} className="text-slate-200" />
              <p className="font-black text-slate-400 uppercase tracking-widest text-xs">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
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
                  <div className="relative h-72 bg-slate-50 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-contain p-10 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      {i % 3 === 0 && (
                          <span className="bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-blue-600/30">
                              New Launch
                          </span>
                      )}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600 mb-1 block">
                              {product.category}
                          </span>
                          <h3 className="font-black text-slate-900 text-lg leading-tight line-clamp-1 group-hover:text-blue-600 transition-colors">
                              {product.name}
                          </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest line-through">₹{(parseFloat(product.price || 49) * 1.25).toFixed(2)}</span>
                          <span className="text-2xl font-black text-slate-900">₹{(product.price || 49.99).toFixed(2)}</span>
                      </div>
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        if (!user) navigate('/login');
                        else setSelectedProduct(product);
                      }}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all bg-slate-900 text-white hover:bg-blue-600 group/btn"
                    >
                      Quick Specification <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Featured Divisions */}
        <section className="max-w-7xl mx-auto mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-blue-600 font-black text-xs uppercase tracking-widest block mb-4">Core Competencies</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">Specialized Safety Solutions for Every Industry.</h2>
            </div>
            <Link to="/products" className="group flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-widest hover:text-blue-600 transition-colors">
              View All Categories <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Head Protection', icon: <HardHat size={32} />, img: 'https://images.unsplash.com/photo-1541888081682-965a396ba259?auto=format&fit=crop&q=80', desc: 'High-impact resistant helmets for construction and heavy industry.' },
              { title: 'Eye Protection', icon: <Eye size={32} />, img: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80', desc: 'Anti-fog, UV-resistant safety goggles and premium visors.' },
              { title: 'Respiratory Gear', icon: <Activity size={32} />, img: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80', desc: 'Advanced filtration masks protecting against fumes and particulates.' }
            ].map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <div className="h-64 relative overflow-hidden">
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-4 text-white">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      {cat.icon}
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight">{cat.title}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-slate-500 font-medium leading-relaxed mb-6">{cat.desc}</p>
                  <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                    Explore Series <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Feature Split Section */}
        <section className="max-w-7xl mx-auto mb-32 bg-slate-900 rounded-[3rem] overflow-hidden shadow-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-12 md:p-20 flex flex-col justify-center">
              <span className="text-blue-500 font-black text-xs uppercase tracking-widest mb-6">Engineered for Extremes</span>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8">Safety Without Compromise.</h2>
              
              <div className="space-y-8">
                {[
                  { title: 'Global Compliance', desc: 'Our products meet or exceed CE, ANSI, and ISO safety standards globally.' },
                  { title: 'Impact Resistance', desc: 'Advanced materials designed to absorb 98% of kinetic impact energy.' },
                  { title: '12-Hour Comfort', desc: 'Ergonomically weighted gear built for the longest shifts.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <CheckCircle2 className="text-blue-500 shrink-0" size={24} />
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Link to="/about" className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">
                  Our Technical Standards <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] md:h-auto overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80" 
                 alt="Industrial Engineering" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
            </div>
          </div>
        </section>

        {/* Interactive CTA */}
        <section className="max-w-7xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-500/20">
            {/* Abstract Background Shapes */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black text-white leading-none mb-8 tracking-tighter">
                Ready to Upgrade Your <br className="hidden md:block" /> Safety Standard?
              </h2>
              <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium opacity-80">
                Join 500+ enterprises who trust Ecom Experts for their critical PPE requirements and zero-incident workplace goals.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Link to="/products" className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform active:scale-95">
                  Shop the Catalogue
                </Link>
                <Link to="/contact" className="bg-blue-500/20 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all">
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

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
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 shadow-lg shadow-blue-600/40">
              <CheckCircle size={20} />
            </div>
            <span className="font-bold text-sm whitespace-nowrap tracking-tight">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </AppLayout>
  );
}

export default HomePage;

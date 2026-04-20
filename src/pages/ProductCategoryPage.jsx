import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import SidebarFilter from '../components/SidebarFilter';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import ProductModal from '../components/ProductModal';
import productsData from '../data/products.json';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ShoppingBag, Search, Filter, ChevronRight, Star, Shield, Truck, Clock, User, LogOut, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

const ProductCategoryPage = () => {
  const { page_info, filters } = productsData;
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartCount, setCartCount] = useState(2);
  const [toast, setToast] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    'Product category': [],
    'Sectors': [],
    'Risks': []
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://prior-safe.onrender.com/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCartCount(prev => prev + 1);
    showToast(`${product.name} added to your cart!`);
  };

  const handleBuyNow = (product) => {
    showToast(`Finalizing your order for ${product.name}...`);
    setTimeout(() => {
      navigate('/checkout');
    }, 1200);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Handle filter changes
  const handleFilterToggle = (category, option) => {
    setActiveFilters(prev => {
      const current = prev[category] || [];
      const updated = current.includes(option)
        ? current.filter(item => item !== option)
        : [...current, option];
      return { ...prev, [category]: updated };
    });
  };

  const handleClearFilters = () => {
     setActiveFilters({
      'Product category': [],
      'Sectors': [],
      'Risks': []
    });
  };

  const filteredProducts = useMemo(() => {
    const isAnySelected = Object.values(activeFilters).some(arr => arr.length > 0);
    if (!isAnySelected) return products;

    return products.filter((product) => {
      const categoriesSelected = activeFilters['Product category'];
      if (categoriesSelected.length > 0) {
        // Improved filtering based on actual category field from DB
        return categoriesSelected.includes(product.category);
      }
      return true;
    });
  }, [products, activeFilters]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-industrial-50">
        <div className="text-2xl font-black text-industrial-900 animate-pulse">LOADING PRODUCTS...</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', background: '#f8fafc' }}>
      <Sidebar isAdmin={false} />
      
      <main style={{ flex: 1, marginLeft: '280px', minHeight: '100vh', padding: '2rem' }}>
        {/* Modern Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          background: 'white',
          padding: '1.5rem 2rem',
          borderRadius: '1.25rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>
              Safety Solutions
            </h1>
            <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.9rem' }}>
              Premium personal protective equipment
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text" 
                placeholder="Search products..." 
                style={{ 
                  padding: '0.65rem 1rem 0.65rem 2.5rem', 
                  borderRadius: '0.75rem', 
                  border: '1px solid #e2e8f0',
                  width: '240px',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
            {user ? (
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '0.75rem' }}>
                  <div style={{ width: '32px', height: '32px', background: '#2563eb', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.8rem' }}>
                    {user.name.charAt(0)}
                  </div>
                  <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{user.name}</span>
               </div>
            ) : (
               <Link to="/login" className="admin-btn admin-btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}>
                  Sign In
               </Link>
            )}
          </div>
        </div>

        {/* Featured Banner */}
        <div style={{ 
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', 
          borderRadius: '1.5rem', 
          padding: '3rem', 
          color: 'white',
          marginBottom: '2.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '500px' }}>
            <div style={{ background: '#2563eb', display: 'inline-block', padding: '0.35rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '700', marginBottom: '1.5rem' }}>
              NEW ARRIVALS 2024
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1rem' }}>
              Ultimate Skull Protection
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Experience uncompromised safety with our latest range of industrial strength helmets.
            </p>
            <button className="admin-btn admin-btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
              Explore Collection
            </button>
          </div>
          <Shield size={240} style={{ position: 'absolute', right: '-40px', bottom: '-40px', opacity: 0.05, color: 'white' }} />
        </div>

        {/* Categories / Filters */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {['All Products', 'Skull protection', 'Respiratory', 'Hearing', 'Eye protection'].map(cat => (
            <button key={cat} style={{ 
              padding: '0.65rem 1.25rem', 
              borderRadius: '2rem', 
              border: cat === 'All Products' ? 'none' : '1px solid #e2e8f0',
              background: cat === 'All Products' ? '#2563eb' : 'white',
              color: cat === 'All Products' ? 'white' : '#64748b',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {loading ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem' }}>
              <div className="admin-loading-spinner" />
              <p>Loading premium safety gear...</p>
            </div>
          ) : products.map(product => (
            <div 
              key={product._id} 
              className="admin-card" 
              style={{ padding: '0', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}
              onClick={() => setSelectedProduct(product)}
            >
              <div style={{ height: '280px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.35rem 0.75rem', borderRadius: '0.5rem', fontWeight: '800', fontSize: '0.9rem', color: '#1e293b' }}>
                  ${(product.price || 49.99).toFixed(2)}
                </div>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase' }}>
                  {product.category}
                </span>
                <h3 style={{ marginTop: '0.25rem', marginBottom: '0.5rem', fontWeight: '800' }}>{product.name}</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {product.description || product.subtitle}
                </p>
                <button 
                   className="admin-btn admin-btn-primary" 
                   style={{ width: '100%', justifyContent: 'center' }}
                   onClick={(e) => {
                     e.stopPropagation();
                     if (!user) navigate('/login');
                     else setSelectedProduct(product);
                   }}
                >
                  <ShoppingBag size={18} /> Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)} 
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        )}
      </main>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-industrial-900 text-white px-6 py-4 rounded-2xl shadow-premium flex items-center gap-4 border border-industrial-700 pointer-events-none"
          >
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-industrial-900">
              <CheckCircle size={20} />
            </div>
            <span className="font-bold text-sm uppercase tracking-wider">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default ProductCategoryPage;

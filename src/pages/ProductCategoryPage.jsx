import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import SidebarFilter from '../components/SidebarFilter';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import ProductModal from '../components/ProductModal';
import productsData from '../data/products.json';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCategoryPage = () => {
  const { page_info, filters } = productsData;
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
    <div className="min-h-screen bg-industrial-50 selection:bg-accent selection:text-industrial-900 relative">
      <Navbar cartCount={cartCount} />
      
      <main>
        {/* Header Section */}
        <div className="bg-white border-b border-industrial-100">
          <Breadcrumb items={page_info.breadcrumbs.slice(1)} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-1 bg-industrial-900 rounded-full"></span>
                <span className="text-sm font-black uppercase tracking-[0.3em] text-industrial-400">Products Category</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-industrial-900 mb-6 tracking-tight">
                {page_info.title}
              </h1>
              <p className="text-xl text-industrial-500 leading-relaxed font-medium">
                {page_info.description}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
            <SidebarFilter 
              filters={filters} 
              activeFilters={activeFilters}
              onToggle={handleFilterToggle}
              onClear={handleClearFilters}
            />

            <ProductGrid 
              products={filteredProducts} 
              onProductClick={(p) => setSelectedProduct(p)}
            />
          </div>
        </div>
      </main>

      <Footer />
      
      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

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

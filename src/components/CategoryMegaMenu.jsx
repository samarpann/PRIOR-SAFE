import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { CATEGORY_STRUCTURE } from '../data/categories';

const CategoryMegaMenu = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(Object.keys(CATEGORY_STRUCTURE)[0]);

  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-0 w-[800px] bg-white shadow-2xl rounded-b-[2rem] border-t border-slate-100 flex overflow-hidden z-[100]"
      onMouseLeave={onClose}
    >
      {/* Left Sidebar: Main Categories */}
      <div className="w-[300px] bg-slate-50 p-6 space-y-1">
        {Object.entries(CATEGORY_STRUCTURE).map(([name, data]) => {
          const Icon = data.icon;
          const isActive = activeCategory === name;
          
          return (
            <button
              key={name}
              onMouseEnter={() => setActiveCategory(name)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-white shadow-md text-blue-600' 
                  : 'text-slate-600 hover:bg-white hover:text-blue-600'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'
                }`}>
                  <Icon size={20} />
                </div>
                <span className="text-sm font-black uppercase tracking-widest leading-none">
                  {name}
                </span>
              </div>
              <ChevronRight 
                size={16} 
                className={`transition-transform duration-200 ${isActive ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'}`} 
              />
            </button>
          );
        })}
      </div>

      {/* Right Content: Sub-categories */}
      <div className="flex-1 p-10 bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-6"
          >
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-4">
              Explore {activeCategory}
            </h3>
            
            <div className="grid grid-cols-1 gap-y-4">
              {CATEGORY_STRUCTURE[activeCategory].subCategories.map((sub) => (
                <Link
                  key={sub}
                  to={`/products?category=${encodeURIComponent(activeCategory)}&subCategory=${encodeURIComponent(sub)}`}
                  onClick={onClose}
                  className="text-lg font-black text-slate-800 hover:text-blue-600 transition-colors tracking-tight flex items-center gap-2 group"
                >
                  {sub}
                  <ChevronRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>

            {/* Featured Image / Banner in Mega Menu */}
            <div className="mt-8 relative h-[180px] rounded-[2rem] overflow-hidden group/banner">
              <img 
                src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?auto=format&fit=crop&q=80" 
                alt="Industrial Safety"
                className="w-full h-full object-cover group-hover/banner:scale-110 transition-transform duration-[5s]"
              />
              <div className="absolute inset-0 bg-blue-950/40" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <p className="text-white font-black text-sm uppercase tracking-widest">Safety Excellence</p>
                <p className="text-white/60 text-[10px] font-medium uppercase tracking-[0.2em]">New Standard {activeCategory}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CategoryMegaMenu;

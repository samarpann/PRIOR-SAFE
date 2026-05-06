import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck, HelpCircle } from 'lucide-react';
import { CATEGORY_STRUCTURE } from '../data/categories';

const ProductSidebar = ({ activeCategory, activeSubCategory, activeFilters = {}, onSelect, onFilterToggle }) => {
  const [expanded, setExpanded] = useState(activeCategory || Object.keys(CATEGORY_STRUCTURE)[0]);

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 relative">
      <div className="lg:sticky lg:top-[120px] space-y-6 z-20 max-h-[calc(100vh-140px)] overflow-y-auto pr-2 custom-scrollbar">
        {/* Header */}
        <div className="px-2">
          <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-1">
            Product Navigation
          </h3>
          <p className="text-2xl font-black text-slate-900 tracking-tighter">Collections</p>
        </div>

        {/* All Products Button */}
        <button
          onClick={() => onSelect('All Products', '')}
          className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
            activeCategory === 'All Products' 
              ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' 
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
          }`}
        >
          <div className={`p-2 rounded-xl ${activeCategory === 'All Products' ? 'bg-white/20' : 'bg-blue-50 text-blue-600'}`}>
            <ShieldCheck size={18} />
          </div>
          <span className="text-sm font-black uppercase tracking-widest">All Products</span>
        </button>

        {/* Categories Accordion */}
        <div className="space-y-3">
          {Object.entries(CATEGORY_STRUCTURE).map(([name, data]) => {
            const Icon = data.icon;
            const isExpanded = expanded === name;
            const isActive = activeCategory === name;

            return (
              <div key={name} className="bg-white rounded-[1.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <button
                  onClick={() => setExpanded(isExpanded ? null : name)}
                  className={`w-full flex items-center justify-between p-4 transition-colors ${
                    isExpanded ? 'bg-slate-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <Icon size={18} />
                    </div>
                    <span className={`text-xs font-black uppercase tracking-widest ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                      {name}
                    </span>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-4 pb-4 pt-2 flex flex-col gap-1">
                        {data.subCategories.map(sub => (
                          <button
                            key={sub}
                            onClick={() => onSelect(name, sub)}
                            className={`w-full text-left px-11 py-2 text-xs font-bold transition-all flex items-center gap-2 group ${
                              activeSubCategory === sub 
                                ? 'text-blue-600' 
                                : 'text-slate-400 hover:text-slate-900'
                            }`}
                          >
                            <div className={`w-1 h-1 rounded-full transition-all ${
                              activeSubCategory === sub ? 'bg-blue-600 scale-150' : 'bg-slate-200 group-hover:bg-slate-400'
                            }`} />
                            {sub}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>


        {/* Support Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2rem] p-6 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
              <HelpCircle size={20} />
            </div>
            <h4 className="font-black text-lg leading-tight mb-2 tracking-tight">Need a Custom Safety Quote?</h4>
            <p className="text-blue-100 text-[10px] font-medium leading-relaxed mb-4 opacity-80 uppercase tracking-wider">
              Get bulk pricing and professional consultation for your project.
            </p>
            <button className="w-full bg-white text-blue-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-lg">
              Contact Sales
            </button>
          </div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
        </div>
      </div>
    </aside>
  );
};

export default ProductSidebar;

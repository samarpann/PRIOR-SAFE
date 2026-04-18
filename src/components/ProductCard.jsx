import React from 'react';
import { ExternalLink, ShoppingBag, Heart } from 'lucide-react';

const ProductCard = ({ product, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-2xl border border-industrial-100 p-4 hover:shadow-premium premium-transition relative flex flex-col h-full cursor-pointer"
    >
      {/* Top badges/actions */}
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 premium-transition space-y-2">
        <button 
          onClick={(e) => { e.stopPropagation(); /* handle heart */ }}
          className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-soft text-industrial-400 hover:text-industrial-900 premium-transition"
        >
          <Heart size={16} />
        </button>
      </div>

      {/* Image Container */}
      <div className="aspect-square mb-6 overflow-hidden rounded-xl bg-industrial-50 flex items-center justify-center relative">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-110 premium-transition"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-industrial-900/0 group-hover:bg-industrial-900/5 premium-transition pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col">
        <div className="mb-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-industrial-400">
            {product.reference}
          </span>
          <h3 className="text-industrial-900 font-bold text-lg group-hover:text-accent-dark premium-transition leading-tight mt-1">
            {product.name}
          </h3>
        </div>
        
        <p className="text-industrial-500 text-sm line-clamp-2 mb-4 leading-relaxed">
          {product.subtitle}
        </p>

        {/* Footer actions */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-industrial-50">
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-industrial-900 hover:gap-3 premium-transition">
            View Details <ExternalLink size={14} className="text-industrial-400" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); /* handle cart */ }}
            className="p-2.5 bg-industrial-900 rounded-lg text-white hover:bg-accent-dark hover:text-industrial-900 shadow-soft premium-transition"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

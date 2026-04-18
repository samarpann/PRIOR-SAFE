import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onProductClick }) => {
  return (
    <div className="flex-grow">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-industrial-900 tracking-tight">
            RESULTS ({products.length})
          </h2>
          <div className="h-1 w-12 bg-accent mt-1 rounded-full"></div>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <span className="text-industrial-400 font-medium">Sort by:</span>
          <select className="bg-transparent border-none font-bold text-industrial-900 focus:ring-0 cursor-pointer outline-none">
            <option>Featured</option>
            <option>Newest</option>
            <option>A-Z</option>
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-industrial-200">
          <p className="text-industrial-400 font-bold uppercase tracking-widest text-sm">No products found matching your filters.</p>
          <button className="mt-4 text-accent-dark font-black text-xs uppercase tracking-[0.2em] hover:text-industrial-900">Reset Filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {products.map((product, index) => (
            <ProductCard 
              key={index} 
              product={product} 
              onClick={() => onProductClick(product)}
            />
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div className="mt-16 flex justify-center">
          <button className="group flex items-center gap-3 bg-white border-2 border-industrial-900 text-industrial-900 font-black px-10 py-4 rounded-xl hover:bg-industrial-900 hover:text-white premium-transition shadow-soft">
            LOAD MORE PRODUCTS
            <div className="w-1.5 h-1.5 bg-accent rounded-full group-hover:scale-150 premium-transition"></div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;

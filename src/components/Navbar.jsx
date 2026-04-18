import React, { useState } from 'react';
import { Search, Menu, X, ShoppingCart, User, ChevronDown } from 'lucide-react';

const Navbar = ({ cartCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-lg border-b border-industrial-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-industrial-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl">DP</span>
              </div>
              <div className="flex flex-col">
                <span className="text-industrial-900 font-black text-xl leading-none tracking-tight">DELTA PLUS</span>
                <span className="text-industrial-500 text-[10px] uppercase tracking-widest font-bold">Industrial Safety</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-industrial-600 hover:text-industrial-900 font-medium premium-transition flex items-center gap-1">
              Products <ChevronDown size={16} />
            </a>
            <a href="#" className="text-industrial-600 hover:text-industrial-900 font-medium premium-transition">Industries</a>
            <a href="#" className="text-industrial-600 hover:text-industrial-900 font-medium premium-transition">Innovation</a>
            <a href="#" className="text-industrial-600 hover:text-industrial-900 font-medium premium-transition">Services</a>
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <Search className="text-industrial-400 group-hover:text-industrial-900 premium-transition cursor-pointer" size={20} />
            </div>
            <User className="text-industrial-400 hover:text-industrial-900 premium-transition cursor-pointer" size={20} />
            <div className="relative cursor-pointer group">
              <div className="p-2 transition-colors">
                <ShoppingCart className="text-industrial-400 group-hover:text-industrial-900 premium-transition" size={20} />
              </div>
              <span className="absolute top-0 right-0 bg-accent text-industrial-900 text-[10px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-white">
                {cartCount}
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-industrial-600 hover:text-industrial-900 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-industrial-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <a href="#" className="block px-3 py-4 text-base font-semibold text-industrial-900 border-b border-industrial-50">Products</a>
            <a href="#" className="block px-3 py-4 text-base font-semibold text-industrial-900 border-b border-industrial-50">Industries</a>
            <a href="#" className="block px-3 py-4 text-base font-semibold text-industrial-900 border-b border-industrial-50">Innovation</a>
            <a href="#" className="block px-3 py-4 text-base font-semibold text-industrial-900">Services</a>
            <div className="pt-4 flex items-center justify-between">
              <div className="flex space-x-6">
                <Search size={22} className="text-industrial-600" />
                <User size={22} className="text-industrial-600" />
              </div>
              <div className="flex items-center gap-2 bg-industrial-50 px-4 py-2 rounded-full">
                <ShoppingCart size={20} className="text-industrial-900" />
                <span className="font-bold text-sm">Cart ({cartCount})</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

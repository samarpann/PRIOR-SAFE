import React, { useState } from 'react';
import { Search, Menu, X, ShoppingCart, User, ChevronDown } from 'lucide-react';

const Logo = () => (
  <div className="flex flex-col items-center">
    <svg width="40" height="40" viewBox="0 0 100 100" className="drop-shadow-sm">
      {/* Base trapezoid */}
      <path 
        d="M20 85 L80 85 L65 15 L35 15 Z" 
        stroke="currentColor" 
        fill="none" 
        strokeWidth="5" 
        strokeLinejoin="round"
      />
      {/* Horizontal lines */}
      <line x1="30" y1="65" x2="70" y2="65" stroke="currentColor" strokeWidth="5" />
      <line x1="38" y1="40" x2="62" y2="40" stroke="currentColor" strokeWidth="5" />
    </svg>
    <span className="text-[6px] font-black uppercase tracking-[0.2em] text-industrial-600 mt-0.5 leading-none">
      ONLINE SALES PLATFORM
    </span>
  </div>
);

const Navbar = ({ cartCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-lg border-b border-industrial-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo & Brand */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center gap-4">
              <div className="text-industrial-600">
                <Logo />
              </div>
              <div className="flex flex-col">
                <span className="text-industrial-600 font-black text-2xl leading-none tracking-tight">
                  Ecom Experts
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <a href="#" className="text-industrial-700 hover:text-industrial-600 font-bold premium-transition flex items-center gap-1 uppercase tracking-widest text-sm">
              Products <ChevronDown size={14} />
            </a>
            <a href="#" className="text-industrial-700 hover:text-industrial-600 font-bold premium-transition uppercase tracking-widest text-sm">Solutions</a>
            <a href="#" className="text-industrial-700 hover:text-industrial-600 font-bold premium-transition uppercase tracking-widest text-sm">Services</a>
            <a href="#" className="text-industrial-700 hover:text-industrial-600 font-bold premium-transition uppercase tracking-widest text-sm">About</a>
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <Search className="text-industrial-400 group-hover:text-industrial-600 premium-transition cursor-pointer" size={20} />
            </div>
            <User className="text-industrial-400 hover:text-industrial-600 premium-transition cursor-pointer" size={20} />
            <div className="relative cursor-pointer group">
              <div className="p-2 transition-colors">
                <ShoppingCart className="text-industrial-400 group-hover:text-industrial-600 premium-transition" size={20} />
              </div>
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-white">
                {cartCount}
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-industrial-700 hover:text-industrial-600 focus:outline-none"
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
            <a href="#" className="block px-3 py-4 text-base font-black text-industrial-900 border-b border-industrial-50 uppercase tracking-widest">Products</a>
            <a href="#" className="block px-3 py-4 text-base font-black text-industrial-900 border-b border-industrial-50 uppercase tracking-widest">Solutions</a>
            <a href="#" className="block px-3 py-4 text-base font-black text-industrial-900 border-b border-industrial-50 uppercase tracking-widest">Services</a>
            <a href="#" className="block px-3 py-4 text-base font-black text-industrial-900 uppercase tracking-widest">About</a>
            <div className="pt-6 flex items-center justify-between border-t border-industrial-100 mt-4">
              <div className="flex space-x-6">
                <Search size={22} className="text-industrial-600" />
                <User size={22} className="text-industrial-600" />
              </div>
              <div className="flex items-center gap-2 bg-industrial-100 px-5 py-2.5 rounded-full">
                <ShoppingCart size={20} className="text-industrial-600" />
                <span className="font-black text-industrial-900 text-sm">({cartCount})</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

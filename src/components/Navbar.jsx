import React, { useState } from 'react';
import { Search, Menu, X, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-lg border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo & Brand */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <div className="flex items-center gap-4">
              <div className="text-slate-900">
                <Logo />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-900 font-black text-2xl leading-none tracking-tight">
                  Ecom Experts
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/products" className="text-slate-600 hover:text-blue-600 font-bold transition-colors flex items-center gap-1 uppercase tracking-widest text-[10px]">
              Products <ChevronDown size={14} />
            </Link>
            <Link to="/solutions" className="text-slate-600 hover:text-blue-600 font-bold transition-colors uppercase tracking-widest text-[10px]">Solutions</Link>
            <Link to="/services" className="text-slate-600 hover:text-blue-600 font-bold transition-colors uppercase tracking-widest text-[10px]">Services</Link>
            <Link to="/about" className="text-slate-600 hover:text-blue-600 font-bold transition-colors uppercase tracking-widest text-[10px]">About</Link>
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <Search className="text-slate-400 group-hover:text-slate-900 transition-colors cursor-pointer" size={20} />
            </div>
            <Link to="/login">
              <User className="text-slate-400 hover:text-slate-900 transition-colors cursor-pointer" size={20} />
            </Link>
            <Link to="/cart" className="relative cursor-pointer group">
              <div className="p-2 transition-colors">
                <ShoppingCart className="text-slate-400 group-hover:text-slate-900 transition-colors" size={20} />
              </div>
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[8px] font-black w-5 h-5 flex items-center justify-center rounded-full ring-4 ring-white">
                {cartCount}
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-4 pt-4 pb-6 space-y-2">
            <Link to="/products" className="block px-3 py-4 text-base font-black text-slate-900 border-b border-slate-50 uppercase tracking-widest">Products</Link>
            <Link to="/solutions" className="block px-3 py-4 text-base font-black text-slate-900 border-b border-slate-50 uppercase tracking-widest">Solutions</Link>
            <Link to="/services" className="block px-3 py-4 text-base font-black text-slate-900 border-b border-slate-50 uppercase tracking-widest">Services</Link>
            <Link to="/about" className="block px-3 py-4 text-base font-black text-slate-900 uppercase tracking-widest">About</Link>
            <div className="pt-6 flex items-center justify-between border-t border-slate-100 mt-4">
              <div className="flex space-x-6">
                <Search size={22} className="text-slate-900" />
                <Link to="/login"><User size={22} className="text-slate-900" /></Link>
              </div>
              <Link to="/cart" className="flex items-center gap-2 bg-slate-100 px-5 py-2.5 rounded-full">
                <ShoppingCart size={20} className="text-slate-900" />
                <span className="font-black text-slate-900 text-sm">({cartCount})</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

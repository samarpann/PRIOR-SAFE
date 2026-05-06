import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { closeSidebar, openSidebar } from '../store/uiSlice';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Home, Package, Phone, ShoppingCart, Info,
  LogOut, Settings, LayoutDashboard, Users,
  X, Menu, Shield, ShieldCheck, Truck, Lock
} from 'lucide-react';

/* ── Brand Logo ── */
const Logo = ({ size = 26, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M20 85 L80 85 L65 15 L35 15 Z" stroke={color} fill="none" strokeWidth="7" strokeLinejoin="round" />
    <line x1="30" y1="65" x2="70" y2="65" stroke={color} strokeWidth="7" />
    <line x1="38" y1="40" x2="62" y2="40" stroke={color} strokeWidth="7" />
  </svg>
);

/* ── Sidebar content ── */
const SidebarContent = ({ isAdmin, onLinkClick }) => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const userLinks = [
    { to: '/', icon: <Home size={20} />, label: 'Home' },
    { to: '/about', icon: <Info size={20} />, label: 'About Us' },
    { to: '/products', icon: <Package size={20} />, label: 'Products' },
    { to: '/cart', icon: (
      <div className="relative">
        <ShoppingCart size={20} />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
      </div>
    ), label: 'My Cart' },
    { to: '/contact', icon: <Phone size={20} />, label: 'Contact Us' },
    ...(user ? [{ to: '/orders', icon: <ShieldCheck size={20} />, label: 'My Orders' }] : []),
  ];

  const adminLinks = [
    { to: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/admin/inventory', icon: <Package size={20} />, label: 'Inventory' },
    { to: '/admin/orders', icon: <ShoppingCart size={20} />, label: 'All Orders' },
    { to: '/admin/users', icon: <Users size={20} />, label: 'Manage Users' },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
    onLinkClick?.();
  };

  return (
    <div className="flex flex-col h-full w-[280px] bg-white border-r border-slate-100">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-100">
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-md bg-blue-600"
        >
          <Logo size={22} color="white" />
        </div>
        <div>
          <p className="font-black text-slate-900 text-[1rem] leading-tight tracking-tight">Ecom Experts</p>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.18em]">
            {isAdmin ? 'Admin Portal' : 'Online Sales'}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-3 py-2">
          Main Menu
        </p>
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            onClick={onLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}

        {isAdmin && (
          <>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] px-3 pt-5 pb-2">
              Settings
            </p>
            <NavLink
              to="/admin/settings"
              onClick={onLinkClick}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            >
              <Settings size={20} />
              <span>System Settings</span>
            </NavLink>
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-slate-100 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0 bg-blue-600"
          >
            {user?.name?.charAt(0)?.toUpperCase() || 'G'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-black text-slate-800 truncate leading-tight">
              {user?.name || 'Guest User'}
            </p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              {user?.role || 'Guest'}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

/* ── AppLayout — wraps ALL user-facing pages ── */
const AppLayout = ({ children, isAdmin = false }) => {
  const sidebarOpen = useSelector(state => state.ui.sidebarOpen);
  const dispatch = useDispatch();

  return (
    <div className="flex bg-slate-50" style={{ minHeight: '100vh' }}>

      {/* ── DESKTOP SIDEBAR (sticky, stays visible on scroll) ── */}
      <aside
        className="hidden lg:block flex-shrink-0"
        style={{
          width: '280px',
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
          alignSelf: 'flex-start',
        }}
      >
        <SidebarContent isAdmin={isAdmin} />
      </aside>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => dispatch(closeSidebar())}
              className="fixed inset-0 z-[400] bg-black/50 lg:hidden"
            />
            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 left-0 z-[500] h-full lg:hidden"
              style={{ overflowY: 'auto' }}
            >
              <div className="relative">
                {/* Close button */}
                <button
                  onClick={() => dispatch(closeSidebar())}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900"
                >
                  <X size={16} />
                </button>
                <SidebarContent isAdmin={isAdmin} onLinkClick={() => dispatch(closeSidebar())} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 min-w-0 flex flex-col" style={{ minHeight: '100vh' }}>
        {/* Mobile Top Bar */}
        <header className="lg:hidden sticky top-0 z-50 flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-100">
          <button
            onClick={() => dispatch(openSidebar())}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-[#fdf4f9] hover:text-[#b23a86] transition-colors flex-shrink-0"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Logo size={20} color="#2563eb" />
            <span className="font-black text-slate-900 text-base">Ecom Experts</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>

        {/* Trust Bar (Karam Inspired) */}
        <section className="bg-white border-t border-slate-100 py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { icon: <ShieldCheck className="text-blue-600" size={32} />, title: "Quality Assured", desc: "ISO 9001:2015 Certified" },
                    { icon: <Truck className="text-blue-600" size={32} />, title: "Free Shipping", desc: "On orders above ₹5000" },
                    { icon: <Lock className="text-blue-600" size={32} />, title: "Secure Payment", desc: "Cashfree Secure Gateway" },
                    { icon: <Users className="text-blue-600" size={32} />, title: "Expert Support", desc: "Professional safety advice" }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                            {item.icon}
                        </div>
                        <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                        <p className="text-slate-400 text-xs font-medium">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Global Footer (Karam Style) */}
        <footer className="bg-slate-950 py-16 px-4 md:px-8 text-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-3 mb-6">
                        <Logo size={28} color="#2563eb" />
                        <span className="font-black text-2xl tracking-tighter text-white">Ecom Experts</span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                        Leading provider of professional industrial safety equipment and engineering solutions. Setting the standard for workplace protection.
                    </p>
                </div>
                <div>
                    <h5 className="font-black text-[10px] uppercase tracking-[0.3em] text-blue-500 mb-6">Quick Links</h5>
                    <ul className="space-y-4 text-sm font-bold text-slate-400">
                        <li><a href="/products" className="hover:text-white transition-colors">Safety Catalogue</a></li>
                        <li><a href="/about" className="hover:text-white transition-colors">Our Story</a></li>
                        <li><a href="/contact" className="hover:text-white transition-colors">Contact Expert</a></li>
                        <li><a href="/orders" className="hover:text-white transition-colors">Track Order</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-black text-[10px] uppercase tracking-[0.3em] text-blue-500 mb-6">Support</h5>
                    <ul className="space-y-4 text-sm font-bold text-slate-400">
                        <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Refund & Returns</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Safety Standards</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-black text-[10px] uppercase tracking-[0.3em] text-blue-500 mb-6">Newsletter</h5>
                    <p className="text-slate-500 text-xs mb-4">Get the latest safety insights and exclusive offers.</p>
                    <div className="flex gap-2">
                        <input type="email" placeholder="Email Address" className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs w-full focus:border-blue-600 outline-none" />
                        <button className="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-black">JOIN</button>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">© 2025 Ecom Experts. All Rights Reserved.</p>
                <div className="flex gap-6 grayscale opacity-30">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { closeSidebar, openSidebar } from '../store/uiSlice';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Home, Package, Phone, ShoppingCart, Info,
  LogOut, Settings, LayoutDashboard, Users,
  X, Menu, Shield,
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
  const navigate = useNavigate();

  const userLinks = [
    { to: '/', icon: <Home size={20} />, label: 'Home' },
    { to: '/about', icon: <Info size={20} />, label: 'About Us' },
    { to: '/products', icon: <Package size={20} />, label: 'Products' },
    { to: '/contact', icon: <Phone size={20} />, label: 'Contact Us' },
    ...(user ? [{ to: '/orders', icon: <ShoppingCart size={20} />, label: 'My Orders' }] : []),
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
          className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-md"
          style={{ background: '#b23a86' }}
        >
          <Logo size={22} color="white" />
        </div>
        <div>
          <p className="font-black text-slate-900 text-[1rem] leading-tight">Ecom Experts</p>
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
                  ? 'bg-[#fdf4f9] text-[#b23a86]'
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
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
            style={{ background: '#b23a86' }}
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
      <div className="flex-1 min-w-0 flex flex-col" style={{ overflowX: 'hidden', minHeight: '100vh' }}>
        {/* Mobile Top Bar */}
        <header className="lg:hidden sticky top-0 z-50 flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-100">
          <button
            onClick={() => dispatch(openSidebar())}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-[#fdf4f9] hover:text-[#b23a86] transition-colors flex-shrink-0"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Logo size={20} color="#b23a86" />
            <span className="font-black text-slate-900 text-base">Ecom Experts</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

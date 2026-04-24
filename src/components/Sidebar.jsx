import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut, 
  Shield, 
  LayoutDashboard,
  ShieldCheck,
  Info,
  Phone
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../sidebar.css';

function Sidebar({ isAdmin, isOpen }) {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  const userLinks = [
    { to: '/', icon: <Home size={20} />, label: 'Home' },
    { to: '/about', icon: <Info size={20} />, label: 'About Us' },
    { to: '/products', icon: <Package size={20} />, label: 'Products' },
    { to: '/cart', icon: (
      <div className="relative">
        <ShoppingCart size={20} />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
      </div>
    ), label: 'My Cart' },
    { to: '/contact', icon: <Phone size={20} />, label: 'Contact Us' },
    ...(user ? [{ to: '/orders', icon: <ShieldCheck size={20} />, label: 'My Orders' }] : [])
  ];

  const adminLinks = [
    { to: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/admin/inventory', icon: <Package size={20} />, label: 'Inventory' },
    { to: '/admin/orders', icon: <ShoppingCart size={20} />, label: 'All Orders' },
    { to: '/admin/users', icon: <Users size={20} />, label: 'Manage Users' },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-icon" style={{ color: 'var(--color-industrial-600)' }}>
          <svg width="28" height="28" viewBox="0 0 100 100">
            <path d="M20 85 L80 85 L65 15 L35 15 Z" stroke="currentColor" fill="none" strokeWidth="8" strokeLinejoin="round"/>
            <line x1="30" y1="65" x2="70" y2="65" stroke="currentColor" strokeWidth="8" />
            <line x1="38" y1="40" x2="62" y2="40" stroke="currentColor" strokeWidth="8" />
          </svg>
        </div>
        <div className="brand-text">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--color-industrial-900)' }}>Prior Safe</h2>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>{isAdmin ? 'ADMIN PORTAL' : 'ONLINE SALES'}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <span className="section-title">Main Menu</span>
          {links.map((link) => (
            <NavLink 
              key={link.to} 
              to={link.to} 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>

        {isAdmin && (
          <div className="nav-section">
            <span className="section-title">Settings</span>
            <NavLink to="/admin/settings" className="nav-link">
              <Settings size={20} />
              <span>System Settings</span>
            </NavLink>
          </div>
        )}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name || 'Guest User'}</span>
            <span className="user-role">{user?.role || 'Guest'}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={logout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

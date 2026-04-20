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
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../sidebar.css';

function Sidebar({ isAdmin }) {
  const { user, logout } = useAuth();

  const userLinks = [
    { to: '/', icon: <Home size={20} />, label: 'Home' },
    { to: '/orders', icon: <ShoppingCart size={20} />, label: 'My Orders' },
  ];

  const adminLinks = [
    { to: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/admin/inventory', icon: <Package size={20} />, label: 'Inventory' },
    { to: '/admin/orders', icon: <ShoppingCart size={20} />, label: 'All Orders' },
    { to: '/admin/users', icon: <Users size={20} />, label: 'Manage Users' },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <ShieldCheck size={28} />
        </div>
        <div className="brand-text">
          <h2>Prior Safe</h2>
          <span>{isAdmin ? 'Admin Portal' : 'Storefront'}</span>
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

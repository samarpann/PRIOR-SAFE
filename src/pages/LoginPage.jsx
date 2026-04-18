import React, { useState } from 'react';
import { Lock, User, ShieldCheck } from 'lucide-react';
import '../admin.css';

function LoginPage({ onLogin }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hardcoded credentials for simplicity as requested "ask for id and password"
    if (userId === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      setError('Invalid ID or Password');
    }
  };

  return (
    <div className="admin-body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="admin-login-card">
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: '#eff6ff', 
            borderRadius: '1rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: '#2563eb'
          }}>
            <ShieldCheck size={32} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 0.5rem' }}>Admin Access</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Please enter your credentials</p>
        </div>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div className="admin-form-group">
            <label>Admin ID</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                style={{ paddingLeft: '40px' }}
                type="text" 
                value={userId} 
                onChange={(e) => setUserId(e.target.value)} 
                placeholder="Enter ID"
                required 
              />
            </div>
          </div>
          <div className="admin-form-group">
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                style={{ paddingLeft: '40px' }}
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                required 
              />
            </div>
          </div>
          
          {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
          
          <button className="admin-btn admin-btn-primary" style={{ width: '100%', padding: '1rem', justifyContent: 'center', fontSize: '1rem' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../admin.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid Credentials');
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 0.5rem' }}>Access Portal</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div className="admin-form-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                style={{ paddingLeft: '40px' }}
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter email"
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

          <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#64748b', textAlign: 'center' }}>
            Don't have an account? <Link to="/signup" style={{ color: '#2563eb', fontWeight: '600' }}>Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

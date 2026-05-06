import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import '../admin.css';

function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { googleLogin, emailLogin } = useAuth();
  const navigate = useNavigate();

  const handleSuccessRedirect = (user) => {
    if (user.role === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await emailLogin(email, password);
      handleSuccessRedirect(user);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError('');
    try {
      const user = await googleLogin(credentialResponse.credential);
      handleSuccessRedirect(user);
    } catch (err) {
      setError('Google Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="admin-login-card" style={{ maxWidth: '400px', width: '90%' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ 
            width: '72px', 
            height: '72px', 
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', 
            borderRadius: '1.25rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: '#2563eb',
            boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.1)'
          }}>
            <ShieldCheck size={36} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', margin: '0 0 0.5rem', color: '#1e293b' }}>Welcome Back</h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Access your Ecom Experts account securely</p>
        </div>

        {error && (
          <div style={{ 
            background: '#fef2f2', 
            color: '#ef4444', 
            padding: '1rem', 
            borderRadius: '0.75rem', 
            fontSize: '0.85rem', 
            marginBottom: '1.5rem', 
            textAlign: 'center',
            border: '1px solid #fee2e2'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
              placeholder="admin@priorsafe.com"
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: '#475569' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              background: '#2563eb', 
              color: 'white', 
              padding: '0.85rem', 
              borderRadius: '0.5rem', 
              border: 'none', 
              fontWeight: '600', 
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '0.5rem',
              opacity: loading ? 0.7 : 1,
              width: '100%'
            }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ 
          background: '#f8fafc', 
          padding: '1.5rem', 
          borderRadius: '1rem', 
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Or continue with
          </p>
          
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google Login Failed')}
              useOneTap
              shape="rectangular"
              theme="filled_blue"
              size="large"
              width="320"
              disabled={loading}
            />
          </div>
        </div>
        
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', fontWeight: '500' }}>
            Don't have an account? {' '}
            <span 
              onClick={() => navigate('/signup')}
              style={{ color: '#2563eb', fontWeight: '700', cursor: 'pointer', textDecoration: 'none' }}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}
            >
              Sign Up
            </span>
          </p>
        </div>

        <div style={{ marginTop: '2.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
          <p>By continuing, you agree to our <br/> 
            <span style={{ color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}>Terms of Service</span> and <span style={{ color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

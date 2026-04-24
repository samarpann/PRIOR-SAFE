import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import '../admin.css';

function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSuccessRedirect = (user) => {
    if (user.role === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/');
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
    <div className="admin-body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
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
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Access your Prior Safe account securely</p>
        </div>

        {error && (
          <div style={{ 
            background: '#fef2f2', 
            color: '#ef4444', 
            padding: '1rem', 
            borderRadius: '0.75rem', 
            fontSize: '0.85rem', 
            marginBottom: '2rem', 
            textAlign: 'center',
            border: '1px solid #fee2e2'
          }}>
            {error}
          </div>
        )}

        <div style={{ 
          background: '#f8fafc', 
          padding: '2rem', 
          borderRadius: '1rem', 
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Continue with
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

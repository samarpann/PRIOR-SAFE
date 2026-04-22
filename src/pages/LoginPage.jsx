import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck, Eye, EyeOff, KeyRound, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import '../admin.css';

function LoginPage() {
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' or 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, googleLogin, sendOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const handleSuccessRedirect = (user) => {
    if (user.role === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await login(email, password);
      handleSuccessRedirect(user);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email first.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await sendOtp(email);
      setOtpSent(true);
      setSuccess('OTP sent to your email. Please check your inbox.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await verifyOtp(email, otp);
      handleSuccessRedirect(user);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or Expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const user = await googleLogin(credentialResponse.credential);
      handleSuccessRedirect(user);
    } catch (err) {
      setError('Google Login failed');
    }
  };

  return (
    <div className="admin-body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="admin-login-card" style={{ maxWidth: '450px' }}>
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
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Securely log in to your account</p>
        </div>

        {error && <div style={{ background: '#fef2f2', color: '#ef4444', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}
        {success && <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>{success}</div>}

        {/* Google Login */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Login Failed')}
            useOneTap
            shape="rectangular"
            theme="outline"
            size="large"
            width="100%"
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', color: '#cbd5e1' }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
          <span style={{ padding: '0 1rem', fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
        </div>

        {/* Method Toggle */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: '#f8fafc', padding: '0.25rem', borderRadius: '0.75rem' }}>
          <button 
            type="button"
            onClick={() => { setLoginMethod('password'); setOtpSent(false); setError(''); setSuccess(''); }}
            style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem', fontWeight: '600', borderRadius: '0.5rem', border: 'none', background: loginMethod === 'password' ? 'white' : 'transparent', color: loginMethod === 'password' ? '#1e293b' : '#64748b', boxShadow: loginMethod === 'password' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer' }}
          >
            Password
          </button>
          <button 
             type="button"
             onClick={() => { setLoginMethod('otp'); setError(''); setSuccess(''); }}
             style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem', fontWeight: '600', borderRadius: '0.5rem', border: 'none', background: loginMethod === 'otp' ? 'white' : 'transparent', color: loginMethod === 'otp' ? '#1e293b' : '#64748b', boxShadow: loginMethod === 'otp' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', cursor: 'pointer' }}
          >
            Email OTP
          </button>
        </div>

        {loginMethod === 'password' ? (
          <form onSubmit={handlePasswordSubmit} style={{ textAlign: 'left' }}>
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
                  style={{ paddingLeft: '40px', paddingRight: '40px' }}
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••"
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <button disabled={loading} className="admin-btn admin-btn-primary" style={{ width: '100%', padding: '1rem', justifyContent: 'center', fontSize: '1rem' }}>
              {loading ? 'Processing...' : 'Sign In'}
            </button>
          </form>
        ) : (
          <form onSubmit={otpSent ? handleOtpSubmit : handleSendOtp} style={{ textAlign: 'left' }}>
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
                  disabled={otpSent}
                  required 
                />
              </div>
            </div>

            {otpSent && (
              <div className="admin-form-group">
                <label>One-Time Password (OTP)</label>
                <div style={{ position: 'relative' }}>
                  <KeyRound size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input 
                    style={{ paddingLeft: '40px', letterSpacing: '0.2em', fontWeight: 'bold' }}
                    type="text" 
                    maxLength="6"
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                    placeholder="123456"
                    required 
                  />
                </div>
              </div>
            )}
            
            <button disabled={loading} className="admin-btn admin-btn-primary" style={{ width: '100%', padding: '1rem', justifyContent: 'center', fontSize: '1rem' }}>
              {loading ? 'Processing...' : (otpSent ? 'Verify & Login' : 'Send OTP')}
            </button>
          </form>
        )}

        <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#64748b', textAlign: 'center' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#2563eb', fontWeight: '600' }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

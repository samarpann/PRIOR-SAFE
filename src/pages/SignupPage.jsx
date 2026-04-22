import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import '../admin.css';

function SignupPage() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { signup, googleLogin } = useAuth();
    const navigate = useNavigate();

    const handleSuccessRedirect = (user) => {
        if (user.role === 'ADMIN') {
            navigate('/admin');
        } else {
            navigate('/');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await signup(formData);
            handleSuccessRedirect(user);
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const user = await googleLogin(credentialResponse.credential);
            handleSuccessRedirect(user);
        } catch (err) {
            setError('Google Signup failed');
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
                        <User size={32} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 0.5rem' }}>Create Account</h2>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Join Prior Safe for premium protection</p>
                </div>

                {error && <div style={{ background: '#fef2f2', color: '#ef4444', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}

                {/* Google Signup */}
                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => setError('Google Signup Failed')}
                        useOneTap
                        shape="rectangular"
                        theme="outline"
                        size="large"
                        width="100%"
                        text="signup_with"
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', color: '#cbd5e1' }}>
                    <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                    <span style={{ padding: '0 1rem', fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8' }}>OR EMAIL</span>
                    <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
                </div>

                <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                    <div className="admin-form-group">
                        <label>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input 
                                style={{ paddingLeft: '40px' }}
                                type="text" 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                placeholder="Your Name"
                                required 
                            />
                        </div>
                    </div>
                    <div className="admin-form-group">
                        <label>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input 
                                style={{ paddingLeft: '40px' }}
                                type="email" 
                                value={formData.email} 
                                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                placeholder="name@company.com"
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
                                value={formData.password} 
                                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                                placeholder="••••••••"
                                required 
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ 
                                    position: 'absolute', 
                                    right: '12px', 
                                    top: '50%', 
                                    transform: 'translateY(-50%)', 
                                    background: 'none', 
                                    border: 'none', 
                                    color: '#94a3b8',
                                    cursor: 'pointer',
                                    padding: 0
                                }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    
                    <button className="admin-btn admin-btn-primary" style={{ width: '100%', padding: '1rem', justifyContent: 'center', fontSize: '1rem' }}>
                        Sign Up
                    </button>
                    
                    <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#64748b', textAlign: 'center' }}>
                        Already have an account? <Link to="/login" style={{ color: '#2563eb', fontWeight: '600' }}>Log In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;

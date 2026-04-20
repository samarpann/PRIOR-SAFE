import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ShieldCheck } from 'lucide-react';
import '../admin.css';

function SignupPage() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
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
                        <User size={32} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 0.5rem' }}>Create Account</h2>
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Join Prior Safe for premium protection</p>
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
                                style={{ paddingLeft: '40px' }}
                                type="password" 
                                value={formData.password} 
                                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                                placeholder="••••••••"
                                required 
                            />
                        </div>
                    </div>
                    
                    {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
                    
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

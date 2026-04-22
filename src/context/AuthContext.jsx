import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../config/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        const response = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
        const { data } = response.data;
        setToken(response.data.token);
        setUser(data.user);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data.user;
    };

    const signup = async (userData) => {
        const response = await axios.post(`${API_BASE}/api/auth/signup`, userData);
        const { data } = response.data;
        setToken(response.data.token);
        setUser(data.user);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data.user;
    };

    const googleLogin = async (googleToken) => {
        const response = await axios.post(`${API_BASE}/api/auth/google`, { token: googleToken });
        const { data } = response.data;
        setToken(response.data.token);
        setUser(data.user);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data.user;
    };

    const sendOtp = async (email) => {
        const response = await axios.post(`${API_BASE}/api/auth/send-otp`, { email });
        return response.data;
    };

    const verifyOtp = async (email, otp) => {
        const response = await axios.post(`${API_BASE}/api/auth/verify-otp`, { email, otp });
        const { data } = response.data;
        setToken(response.data.token);
        setUser(data.user);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data.user;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, token, login, signup, logout, loading, googleLogin, sendOtp, verifyOtp }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

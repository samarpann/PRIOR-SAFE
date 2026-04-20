import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Optional: Fetch user profile to verify token
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
        const response = await axios.post('https://prior-safe.onrender.com/api/auth/login', { email, password });
        const { data } = response.data;
        setToken(response.data.token);
        setUser(data.user);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return data.user;
    };

    const signup = async (userData) => {
        const response = await axios.post('https://prior-safe.onrender.com/api/auth/signup', userData);
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
    };

    return (
        <AuthContext.Provider value={{ user, token, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

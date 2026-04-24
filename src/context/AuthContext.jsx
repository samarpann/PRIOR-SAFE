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
                try {
                    setUser(JSON.parse(storedUser));
                } catch (e) {
                    console.error("Error parsing stored user", e);
                    logout();
                }
            }
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
        setLoading(false);
    }, [token]);

    const googleLogin = async (googleToken) => {
        const response = await axios.post(`${API_BASE}/api/auth/google`, { token: googleToken });
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
        <AuthContext.Provider value={{ user, token, logout, loading, googleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

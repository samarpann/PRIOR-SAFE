import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ProductCategoryPage from './pages/ProductCategoryPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CartPage from './pages/CartPage'
import AdminDashboard from './pages/AdminDashboard'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

import { GoogleOAuthProvider } from '@react-oauth/google';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user && user.role === 'ADMIN' ? children : <Navigate to="/login" />;
};

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "dummy-client-id"}>
    <AuthProvider>
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductCategoryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Router>
    </CartProvider>
    </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default App


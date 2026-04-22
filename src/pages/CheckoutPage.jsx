import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Lock, CreditCard, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import qrCode from '../assets/qr-code.png';

const CheckoutPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        items: cartItems.map(item => ({
          product: item._id,
          quantity: item.quantity || 1,
          price: item.price
        })),
        totalPrice,
        shippingAddress: 'Pending'
      };

      await axios.post('http://localhost:5000/api/orders', orderData);
      localStorage.removeItem('cart');
      alert('Order placed successfully!');
      navigate('/');
    } catch (err) {
      console.error('Failed to place order', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-industrial-50 selection:bg-accent selection:text-white flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-premium overflow-hidden border border-industrial-100"
      >
        {/* Header */}
        <div className="p-8 border-b border-industrial-100 flex items-center justify-between bg-white relative z-10">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 hover:bg-industrial-50 rounded-full premium-transition text-industrial-400 hover:text-industrial-600 flex items-center gap-2 font-black text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 100 100">
              <path d="M20 85 L80 85 L65 15 L35 15 Z" stroke="#b23a86" fill="none" strokeWidth="8" strokeLinejoin="round"/>
              <line x1="30" y1="65" x2="70" y2="65" stroke="#b23a86" strokeWidth="8" />
              <line x1="38" y1="40" x2="62" y2="40" stroke="#b23a86" strokeWidth="8" />
            </svg>
            <span className="font-black text-industrial-600 text-lg tracking-tight uppercase">Checkout</span>
          </div>
          <div className="w-10"></div>
        </div>

        <div className="p-10 md:p-16 flex flex-col items-center text-center">
          <div className="mb-10">
            <div className="w-20 h-20 bg-industrial-50 rounded-full flex items-center justify-center text-industrial-600 mb-6 mx-auto">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-industrial-900 mb-4 tracking-tight">Secure Payment</h1>
            <p className="text-industrial-500 font-medium max-w-md mx-auto leading-relaxed">
              Scan the QR code below using your mobile banking app or UPI wallet to complete your transaction with Ecom Experts.
            </p>
          </div>

          {/* QR Code Container */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="p-8 bg-white border-4 border-industrial-600 rounded-[2.5rem] shadow-soft mb-12 relative group"
          >
            <div className="aspect-square w-64 md:w-80 overflow-hidden rounded-2xl bg-white flex items-center justify-center">
              <img 
                src={qrCode} 
                alt="Payment QR Code" 
                className="w-full h-full object-contain group-hover:scale-105 premium-transition"
              />
            </div>
            
            <div className="absolute top-1/2 left-0 w-full h-1 bg-industrial-400/20 -translate-y-1/2 animate-bounce blur-sm pointer-events-none"></div>
          </motion.div>

          {/* Total Price Display */}
          <div className="mb-10 p-6 bg-industrial-100 rounded-3xl w-full max-w-sm">
            <span className="text-xs font-black uppercase tracking-widest text-industrial-500 block mb-1">Amount to Pay</span>
            <span className="text-4xl font-black text-industrial-900">${totalPrice.toFixed(2)}</span>
          </div>

          {/* Payment Info */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-industrial-50 rounded-2xl flex flex-col items-center gap-2">
              <Smartphone className="text-industrial-600" size={24} />
              <span className="text-[10px] font-black uppercase tracking-widest text-industrial-400">Mobile Wallet</span>
            </div>
            <div className="p-6 bg-industrial-50 rounded-2xl flex flex-col items-center gap-2">
              <CreditCard className="text-industrial-600" size={24} />
              <span className="text-[10px] font-black uppercase tracking-widest text-industrial-400">Bank Transfer</span>
            </div>
            <div className="p-6 bg-industrial-50 rounded-2xl flex flex-col items-center gap-2 border-2 border-accent">
              <Lock className="text-accent" size={24} />
              <span className="text-[10px] font-black uppercase tracking-widest text-accent">Encrypted</span>
            </div>
          </div>

          <div className="text-industrial-400 text-[10px] font-black uppercase tracking-[0.3em]">
            <p className="mb-2">Transaction ID: #EE-9283-4817</p>
            <p>Authorized by Ecom Experts Secure Gateway</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-10 bg-industrial-900 text-white text-center">
          {loading ? (
            <div className="flex justify-center gap-3">
              {[0, 1, 2].map(i => (
                <motion.div 
                  key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  className="w-2 h-2 bg-accent rounded-full"
                />
              ))}
            </div>
          ) : (
            <button 
              onClick={handlePlaceOrder}
              className="w-full bg-accent hover:bg-accent-dark text-white font-black py-5 rounded-2xl uppercase tracking-[0.2em] transition-all shadow-premium"
            >
              Confirm Payment
            </button>
          )}
        </div>
      </motion.div>
      
      <p className="mt-8 text-industrial-400 text-[10px] font-black uppercase tracking-[0.4em] opacity-60">
        Ecom Experts Secure Payment System
      </p>
    </div>
  );
};

export default CheckoutPage;

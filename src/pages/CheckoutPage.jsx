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

  // Scroll to top on load
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

      await axios.post('https://prior-safe.onrender.com/api/orders', orderData);
      localStorage.removeItem('cart');
    } catch (err) {
      console.error('Failed to place order', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-industrial-50 selection:bg-accent selection:text-industrial-900 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-premium overflow-hidden border border-industrial-100"
      >
        {/* Header */}
        <div className="p-8 border-b border-industrial-100 flex items-center justify-between bg-white relative z-10">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 hover:bg-industrial-50 rounded-full premium-transition text-industrial-400 hover:text-industrial-900 flex items-center gap-2 font-bold text-sm uppercase tracking-widest"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-industrial-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs">DP</span>
            </div>
            <span className="font-black text-industrial-900 text-lg tracking-tight uppercase">Checkout</span>
          </div>
          <div className="w-10"></div> {/* Spacer */}
        </div>

        <div className="p-10 md:p-16 flex flex-col items-center text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6 mx-auto">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-industrial-900 mb-4 tracking-tight">Secure Payment</h1>
            <p className="text-industrial-500 font-medium max-w-md mx-auto leading-relaxed">
              Scan the QR code below using your mobile banking app or UPI wallet to complete your transaction safely.
            </p>
          </div>

          {/* QR Code Container */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="p-6 bg-white border-4 border-industrial-900 rounded-[2rem] shadow-soft mb-10 relative group"
          >
            <div className="aspect-square w-64 md:w-80 overflow-hidden rounded-xl bg-white flex items-center justify-center">
              <img 
                src={qrCode} 
                alt="Payment QR Code" 
                className="w-full h-full object-contain group-hover:scale-105 premium-transition"
              />
            </div>
            
            {/* Pulsing Scan Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-accent/30 -translate-y-1/2 animate-bounce blur-sm pointer-events-none"></div>
          </motion.div>

          {/* Payment Info */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-industrial-50 rounded-2xl flex flex-col items-center gap-2">
              <Smartphone className="text-industrial-900" size={24} />
              <span className="text-[10px] font-black uppercase tracking-widest text-industrial-400">Mobile Wallet</span>
            </div>
            <div className="p-6 bg-industrial-50 rounded-2xl flex flex-col items-center gap-2">
              <CreditCard className="text-industrial-900" size={24} />
              <span className="text-[10px] font-black uppercase tracking-widest text-industrial-400">Bank Transfer</span>
            </div>
            <div className="p-6 bg-industrial-50 rounded-2xl flex flex-col items-center gap-2 border-2 border-accent">
              <Lock className="text-accent-dark" size={24} />
              <span className="text-[10px] font-black uppercase tracking-widest text-accent-dark">Encrypted</span>
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-industrial-400 text-xs font-bold uppercase tracking-[0.2em]">
            <p className="mb-2">Transaction ID: #DP-9283-4817</p>
            <p>Authorized by Delta Plus Secure Gateway</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-8 bg-industrial-900 text-white text-center">
          <p className="text-sm font-bold opacity-80 mb-4 uppercase tracking-widest">Awaiting Payment Confirmation...</p>
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
        </div>
      </motion.div>
      
      <p className="mt-8 text-industrial-400 text-xs font-medium uppercase tracking-widest opacity-60">
        Safe & Secure Industrial Payment System
      </p>
    </div>
  );
};

export default CheckoutPage;

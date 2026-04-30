import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Lock, CreditCard, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_BASE from '../config/api';

const CheckoutPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Load Cashfree script
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!user) {
        alert("Please login to complete payment");
        navigate('/login');
        return;
    }

    setLoading(true);
    try {
      // 1. Create order on server to get payment_session_id
      const { data: cfOrder } = await axios.post(`${API_BASE}/api/payment/create-order`, {
        amount: totalPrice,
        customer_details: {
            phone: "9999999999" // You should ideally get this from a form
        }
      });

      if (!cfOrder.payment_session_id) {
          throw new Error("No payment session ID received");
      }

      // 2. Initialize Cashfree
      const cashfree = window.Cashfree({
          mode: "sandbox" // Change to "production" for live
      });

      // 3. Open Checkout
      const checkoutOptions = {
          paymentSessionId: cfOrder.payment_session_id,
          redirectTarget: "_self", // Or "_modal"
      };

      // Since we want to handle verification, we can use a return_url or poll
      // For this implementation, we'll let it redirect or we can use the modal approach
      cashfree.checkout(checkoutOptions).then((result) => {
          if (result.error) {
              alert(result.error.message);
          }
          if (result.redirect) {
              console.log("Redirecting to payment page...");
          }
      });

    } catch (err) {
      console.error('Failed to initiate payment', err);
      alert('Could not initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100"
      >
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-600 flex items-center gap-2 font-bold text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <div className="flex items-center gap-3">
             <ShieldCheck className="text-emerald-600" size={24} />
            <span className="font-bold text-slate-900 text-lg uppercase tracking-tight">Checkout</span>
          </div>
          <div className="w-10"></div>
        </div>

        <div className="p-10 md:p-16 flex flex-col items-center text-center">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Complete Payment</h1>
            <p className="text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
              Securely complete your purchase using Cashfree Payments. Supports UPI, Cards, and Net Banking.
            </p>
          </div>

          {/* Cart Summary */}
          <div className="w-full mb-10 text-left bg-slate-50 p-6 rounded-2xl">
             <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Order Summary</h3>
             <div className="space-y-3">
                {cartItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-slate-600">{item.name} x {item.quantity || 1}</span>
                        <span className="font-bold text-slate-900">₹{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                    </div>
                ))}
                <div className="h-px bg-slate-200 my-4"></div>
                <div className="flex justify-between items-center text-lg font-black">
                    <span className="text-slate-900">Total Amount</span>
                    <span className="text-emerald-600">₹{totalPrice.toFixed(2)}</span>
                </div>
             </div>
          </div>

          {/* Payment Info */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-slate-50 rounded-2xl flex flex-col items-center gap-2">
              <Smartphone className="text-slate-600" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">UPI / QR</span>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl flex flex-col items-center gap-2">
              <CreditCard className="text-slate-600" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Cards / Net</span>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl flex flex-col items-center gap-2 border-2 border-emerald-100">
              <Lock className="text-emerald-600" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Secure</span>
            </div>
          </div>

          <div className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
            <p>Authorized by Ecom Experts & Cashfree Payments</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-10 bg-slate-900 text-white text-center">
          {loading ? (
            <div className="flex justify-center gap-3">
              {[0, 1, 2].map(i => (
                <motion.div 
                  key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  className="w-2 h-2 bg-emerald-500 rounded-full"
                />
              ))}
            </div>
          ) : (
            <button 
              onClick={handlePayment}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-2xl uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95"
            >
              Pay Now ₹{totalPrice.toFixed(2)}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;

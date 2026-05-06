import React from 'react';
import AppLayout from '../components/AppLayout';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
    const navigate = useNavigate();

    return (
        <AppLayout>
            <div className="min-h-[80vh] bg-slate-50 py-12 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-12 bg-industrial-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <ShoppingBag size={24} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Your Cart</h1>
                            <p className="text-slate-500 font-medium">{cartCount} items ready for protection</p>
                        </div>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="bg-white rounded-[3rem] p-20 text-center shadow-sm border border-slate-100">
                            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                                <ShoppingBag size={48} className="text-slate-300" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
                            <p className="text-slate-500 mb-10 max-w-sm mx-auto font-medium">Looks like you haven't added any safety gear to your cart yet.</p>
                            <Link 
                                to="/products"
                                className="inline-flex items-center gap-2 bg-industrial-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-industrial-700 transition-all shadow-xl shadow-blue-100"
                            >
                                Browse Products <ArrowRight size={18} />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Items List */}
                            <div className="lg:col-span-2 space-y-6">
                                {cartItems.map((item) => (
                                    <motion.div 
                                        layout
                                        key={item._id}
                                        className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6 group hover:shadow-md transition-all"
                                    >
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-black text-slate-900 mb-1">{item.name}</h3>
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">{item.category}</p>
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-xl border border-slate-100">
                                                    <button 
                                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-slate-600 transition-colors"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-8 text-center font-black text-slate-900">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-slate-600 transition-colors"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                                <button 
                                                    onClick={() => removeFromCart(item._id)}
                                                    className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="text-right pl-6 border-l border-slate-100">
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total</p>
                                            <p className="text-xl font-black text-industrial-600">₹{(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Summary Card */}
                            <div className="lg:col-span-1">
                                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl sticky top-32">
                                    <h3 className="text-2xl font-black mb-8 tracking-tight">Order Summary</h3>
                                    
                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between text-slate-400 font-medium">
                                            <span>Subtotal</span>
                                            <span className="text-white">₹{cartTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-400 font-medium">
                                            <span>Shipping</span>
                                            <span className="text-emerald-400 font-bold uppercase text-[10px] tracking-widest mt-1">Free Protection</span>
                                        </div>
                                        <div className="h-px bg-white/10 my-6"></div>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-1">Total Amount</p>
                                                <p className="text-4xl font-black text-industrial-500">₹{cartTotal.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => navigate('/checkout')}
                                        className="w-full bg-industrial-600 hover:bg-industrial-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-900/40 mb-6 flex items-center justify-center gap-3 group"
                                    >
                                        Checkout Securely <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                    
                                    <div className="flex items-center justify-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                        <Lock size={12} />
                                        <span>256-Bit SSL Encryption</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default CartPage;

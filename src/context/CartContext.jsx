import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import API_BASE from '../config/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user, token } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // 1. Initial Load from LocalStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Error parsing cart", e);
            }
        }
        setIsInitialLoad(false);
    }, []);

    // 2. Fetch Cart from DB when User Logs In
    useEffect(() => {
        const fetchDBCart = async () => {
            if (token && user) {
                try {
                    const response = await axios.get(`${API_BASE}/api/cart`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (response.data && response.data.items) {
                        // Merge logic or overwrite? Karam usually overwrites with DB or merges.
                        // Let's overwrite with DB cart if it exists, otherwise keep local.
                        if (response.data.items.length > 0) {
                            setCartItems(response.data.items);
                        }
                    }
                } catch (err) {
                    console.error("Failed to fetch cart from DB", err);
                }
            }
        };
        if (!isInitialLoad) fetchDBCart();
    }, [token, user, isInitialLoad]);

    // 3. Sync Cart to DB and LocalStorage whenever it changes
    useEffect(() => {
        if (isInitialLoad) return;

        localStorage.setItem('cart', JSON.stringify(cartItems));

        const syncCartWithDB = async () => {
            if (token && user) {
                try {
                    await axios.post(`${API_BASE}/api/cart`, { items: cartItems }, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                } catch (err) {
                    console.error("Failed to sync cart with DB", err);
                }
            }
        };

        const timeoutId = setTimeout(syncCartWithDB, 1000); // Debounce sync
        return () => clearTimeout(timeoutId);
    }, [cartItems, token, user, isInitialLoad]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id || item.productId === product._id);
            if (existingItem) {
                return prevItems.map(item => 
                    (item._id === product._id || item.productId === product._id)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { 
                productId: product._id, 
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity 
            }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => (item._id !== productId && item.productId !== productId)));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return removeFromCart(productId);
        setCartItems(prevItems => 
            prevItems.map(item => 
                (item._id === productId || item.productId === productId) ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart,
            cartCount,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

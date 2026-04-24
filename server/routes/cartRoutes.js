const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// @route   GET /api/cart
// @desc    Get user cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [] });
      await cart.save();
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/cart
// @desc    Update/Sync user cart
router.post('/', auth, async (req, res) => {
  const { items } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.userId });
    if (cart) {
      cart.items = items;
      cart.updatedAt = Date.now();
    } else {
      cart = new Cart({ userId: req.userId, items });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

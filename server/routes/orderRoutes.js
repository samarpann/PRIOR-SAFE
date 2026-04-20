const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// User actions
router.post('/', protect, async (req, res) => {
    try {
        const newOrder = await Order.create({
            ...req.body,
            user: req.user._id
        });
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/my-orders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin actions
router.get('/all', protect, restrictTo('ADMIN'), async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email').populate('items.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', protect, restrictTo('ADMIN'), async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

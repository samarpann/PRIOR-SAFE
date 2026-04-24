const express = require('express');
const router = express.Router();
const { Cashfree, CFEnvironment } = require('cashfree-pg');
const crypto = require('crypto');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

// Initialize Cashfree
Cashfree.XClientId = process.env.CASHFREE_APP_ID || "dummy";
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY || "dummy";
Cashfree.XEnvironment = process.env.NODE_ENV === 'production' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX;

// @route   POST /api/payment/create-order
// @desc    Create a Cashfree order
// @access  Private
router.post('/create-order', protect, async (req, res) => {
    try {
        const { amount, customer_details, order_meta } = req.body;

        const request = {
            order_amount: amount,
            order_currency: "INR",
            order_id: `order_${Date.now()}`,
            customer_details: {
                customer_id: req.user._id.toString(),
                customer_phone: customer_details.phone || "9999999999",
                customer_email: req.user.email,
                customer_name: req.user.name
            },
            order_meta: {
                return_url: order_meta?.return_url || "http://localhost:5173/admin",
                notify_url: order_meta?.notify_url || ""
            }
        };

        const response = await Cashfree.PGCreateOrder("2023-08-01", request);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Cashfree Create Order Error:', error.response?.data || error.message);
        res.status(500).json({ message: error.response?.data?.message || error.message });
    }
});

// @route   POST /api/payment/verify
// @desc    Verify Cashfree payment
// @access  Private
router.post('/verify', protect, async (req, res) => {
    try {
        const { order_id, orderData } = req.body;

        const response = await Cashfree.PGOrderFetchPayments("2023-08-01", order_id);
        const payments = response.data;

        const successfulPayment = payments.find(p => p.payment_status === 'SUCCESS');

        if (successfulPayment) {
            // Create or update the order in our database
            const newOrder = await Order.create({
                user: req.user._id,
                items: orderData.items,
                totalPrice: orderData.totalPrice,
                shippingAddress: orderData.shippingAddress,
                status: 'PAID',
                cfOrderId: order_id,
                cfPaymentId: successfulPayment.cf_payment_id.toString(),
                paymentStatus: 'SUCCESS'
            });

            return res.status(200).json({
                status: 'success',
                message: "Payment verified successfully",
                order: newOrder
            });
        } else {
            return res.status(400).json({ status: 'fail', message: "Payment not successful yet" });
        }
    } catch (error) {
        console.error('Cashfree Verify Error:', error.response?.data || error.message);
        res.status(500).json({ message: error.response?.data?.message || error.message });
    }
});

module.exports = router;

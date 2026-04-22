const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const sendEmail = require('../utils/email');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || 'dummy');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const sendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

// Signup
router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'USER'
        });

        sendToken(newUser, 201, res);
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1) Check if email and password exist
        if (!email || !password) {
            return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
        }

        // 2) Check if user exists && password is correct
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password, user.password))) {
            return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
        }

        // 3) If everything ok, send token to client
        sendToken(user, 200, res);
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
});

// Send OTP
router.post('/send-otp', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email is required' });

        let user = await User.findOne({ email });
        // If user doesn't exist, we can optionally create a temporary user or just send OTP to create them later
        if (!user) {
            user = await User.create({ email, name: email.split('@')[0], role: 'USER' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
        user.otp = crypto.createHash('sha256').update(otp).digest('hex');
        user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save({ validateBeforeSave: false });

        try {
            await sendEmail({
                email: user.email,
                subject: 'Your Login OTP - Prior Safe',
                message: `Your OTP is ${otp}. It is valid for 10 minutes.`
            });
            res.status(200).json({ status: 'success', message: 'OTP sent to email' });
        } catch (error) {
            user.otp = undefined;
            user.otpExpires = undefined;
            await user.save({ validateBeforeSave: false });
            console.error('Email error:', error);
            res.status(500).json({ status: 'fail', message: 'There was an error sending the email. Try again later!' });
        }
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

        const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
        const user = await User.findOne({
            email,
            otp: hashedOtp,
            otpExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ status: 'fail', message: 'OTP is invalid or has expired' });
        }

        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save({ validateBeforeSave: false });

        sendToken(user, 200, res);
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
});

// Google Auth
router.post('/google', async (req, res) => {
    try {
        const { token } = req.body;
        let payload;

        try {
            // Try to verify token if GOOGLE_CLIENT_ID is set
            if (process.env.GOOGLE_CLIENT_ID) {
                 const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: process.env.GOOGLE_CLIENT_ID,
                 });
                 payload = ticket.getPayload();
            } else {
                 // For local testing without a real client ID, we can decode the JWT manually
                 // NOT FOR PRODUCTION!
                 payload = jwt.decode(token);
                 if (!payload || !payload.email) throw new Error('Invalid Google Token');
            }
        } catch (error) {
            return res.status(401).json({ status: 'fail', message: 'Invalid Google token' });
        }

        const { email, name, sub: googleId } = payload;

        // Find or create user
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name,
                email,
                googleId,
                role: 'USER'
            });
        } else if (!user.googleId) {
            user.googleId = googleId;
            await user.save({ validateBeforeSave: false });
        }

        sendToken(user, 200, res);
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
});

module.exports = router;

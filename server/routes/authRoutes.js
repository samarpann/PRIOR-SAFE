const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || 'dummy');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const sendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    // Remove sensitive data from output
    user.password = undefined;
    user.otp = undefined;
    user.otpExpires = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

// @route   POST /api/auth/google
// @desc    Google OAuth Login/Signup
// @access  Public
router.post('/google', async (req, res) => {
    try {
        const { token } = req.body;
        let payload;

        try {
            // Try to verify token if GOOGLE_CLIENT_ID is set
            if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== 'dummy') {
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
            console.error('Google Auth Error:', error);
            return res.status(401).json({ status: 'fail', message: 'Invalid Google token' });
        }

        const { email, name, sub: googleId, picture } = payload;

        // Find or create user
        let user = await User.findOne({ email });
        
        if (!user) {
            // Create new user if they don't exist
            user = await User.create({
                name,
                email,
                googleId,
                role: 'USER',
                image: picture // Save Google profile picture if available
            });
        } else {
            // Update existing user with Google ID if they don't have one
            let updated = false;
            if (!user.googleId) {
                user.googleId = googleId;
                updated = true;
            }
            // Sync name/image if needed
            if (!user.image && picture) {
                user.image = picture;
                updated = true;
            }
            
            if (updated) {
                await user.save({ validateBeforeSave: false });
            }
        }

        sendToken(user, 200, res);
    } catch (err) {
        console.error('Auth Route Error:', err);
        res.status(400).json({ status: 'fail', message: err.message });
    }
});

// @route   POST /api/auth/login
// @desc    Email/Password Login
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check if email and password exist
        if (!email || !password) {
            return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
        }

        // 2. Check if user exists && password is correct
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password, user.password))) {
            return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
        }

        // 3. If everything ok, send token to client
        sendToken(user, 200, res);
    } catch (err) {
        console.error('Login Error:', err);
        res.status(400).json({ status: 'fail', message: err.message });
    }
});

module.exports = router;

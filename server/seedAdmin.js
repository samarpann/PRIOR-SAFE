require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB...');

        const adminExists = await User.findOne({ email: 'admin@priorsafe.com' });
        
        if (adminExists) {
            console.log('Admin already exists!');
            process.exit();
        }

        const admin = await User.create({
            name: 'System Admin',
            email: 'admin@priorsafe.com',
            password: 'admin123',
            role: 'ADMIN'
        });

        console.log('Admin user created successfully!');
        console.log('Email: admin@priorsafe.com');
        console.log('Password: admin123');
        process.exit();
    } catch (err) {
        console.error('Error seeding admin:', err);
        process.exit(1);
    }
};

seedAdmin();

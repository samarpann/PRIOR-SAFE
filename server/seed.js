require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const productsData = require('../src/data/products.json');

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Product.deleteMany({});
        console.log('Old products deleted');

        // Use data from JSON
        const productsToSeed = productsData.products.map(p => ({
            ...p,
            category: p.category,
            subCategory: p.subCategory,
            price: p.price || 99.99
        }));

        await Product.insertMany(productsToSeed);
        console.log('Database seeded successfully');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();

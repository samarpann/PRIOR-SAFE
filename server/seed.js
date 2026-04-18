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

        // Transform data if needed (the JSON has a different structure)
        const productsToSeed = productsData.products.map(p => ({
            ...p,
            category: 'Skull protection', // Default category since JSON doesn't specify per product
            price: 50.0 // Default price
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

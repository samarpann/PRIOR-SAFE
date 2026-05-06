const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({ path: './server/.env' });

const Product = require('./server/models/Product');

const updateDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const productsPath = path.join(__dirname, 'src', 'data', 'products.json');
        const localProducts = JSON.parse(fs.readFileSync(productsPath, 'utf8')).products;

        for (const lp of localProducts) {
            await Product.findOneAndUpdate(
                { reference: lp.reference },
                { $set: { itemCode: lp.itemCode } },
                { upsert: false }
            );
        }

        console.log('Database updated with item codes');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

updateDatabase();

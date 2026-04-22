const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { upload } = require('../config/cloudinary');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Get all products (with pagination, search, filter)
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const category = req.query.category || '';

        // Build query
        let query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { reference: { $regex: search, $options: 'i' } }
            ];
        }
        if (category && category !== 'All Products') {
            query.category = category;
        }

        const skip = (page - 1) * limit;

        const total = await Product.countDocuments(query);
        const products = await Product.find(query).skip(skip).limit(limit);

        res.json({
            products,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalProducts: total
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Custom upload handler to catch errors
const handleUpload = (req, res, next) => {
    upload.single('image')(req, res, function (err) {
        if (err) {
            console.error('MULTER/CLOUDINARY ERROR:', err);
            return res.status(500).json({ message: 'Error uploading image', error: err.message });
        }
        next();
    });
};

// Create product (Admin only)
router.post('/', protect, restrictTo('ADMIN'), handleUpload, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        reference: req.body.reference,
        subtitle: req.body.subtitle,
        category: req.body.category,
        image_url: req.file ? req.file.path : req.body.image_url,
        description: req.body.description,
        price: req.body.price
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error('SERVER ERROR (CREATE PRODUCT):', err);
        res.status(400).json({ message: err.message });
    }
});

// Update product (Admin only)
router.put('/:id', protect, restrictTo('ADMIN'), handleUpload, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (req.body.name) product.name = req.body.name;
        if (req.body.reference) product.reference = req.body.reference;
        if (req.body.subtitle) product.subtitle = req.body.subtitle;
        if (req.body.category) product.category = req.body.category;
        if (req.body.description) product.description = req.body.description;
        if (req.body.price) product.price = req.body.price;
        
        if (req.file) {
            product.image_url = req.file.path;
        } else if (req.body.image_url) {
            product.image_url = req.body.image_url;
        }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete product (Admin only)
router.delete('/:id', protect, restrictTo('ADMIN'), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await product.deleteOne();
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

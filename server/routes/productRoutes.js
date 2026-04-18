const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { upload } = require('../config/cloudinary');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create product
router.post('/', upload.single('image'), async (req, res) => {
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
        res.status(400).json({ message: err.message });
    }
});

// Update product
router.put('/:id', upload.single('image'), async (req, res) => {
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

// Delete product
router.delete('/:id', async (req, res) => {
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

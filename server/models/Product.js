const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true
    },
    reference: {
        type: String,
        required: [true, 'Please enter product reference'],
        unique: true
    },
    subtitle: {
        type: String,
        required: [true, 'Please enter product subtitle']
    },
    image_url: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: [true, 'Please select category for this product']
    },
    subCategory: {
        type: String,
        required: [true, 'Please select sub-category for this product']
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0.0
    },
    // Business & Inventory Fields
    itemCode: {
        type: String,
        trim: true
    },
    color: {
        type: String,
        trim: true
    },
    hsnCode: {
        type: String,
        trim: true
    },
    gstPercentage: {
        type: Number,
        default: 18
    },
    dealerPrice: {
        type: Number,
        default: 0.0
    },
    mrp: {
        type: Number,
        default: 0.0
    },
    stock: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);

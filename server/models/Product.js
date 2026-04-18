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
        required: [true, 'Please select category for this product'],
        enum: {
            values: [
                'Skull protection',
                'Hearing protection',
                'Protective eyewear',
                'Respiratory protection'
            ],
            message: 'Please select correct category'
        }
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0.0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    requiresDeviceRegistration: {
        type: Boolean,
        default: false
    },
    specifications: {
        type: Map,
        of: String,
        default: {}
    }
}, {
    timestamps: true
});

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text', category: 'text' });
productSchema.index({ category: 1, price: 1 });

module.exports = mongoose.model('Product', productSchema);

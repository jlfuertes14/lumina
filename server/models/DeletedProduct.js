const mongoose = require('mongoose');

const deletedProductSchema = new mongoose.Schema({
    // Original product fields
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true
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
        type: String
    },
    requiresDeviceRegistration: {
        type: Boolean,
        default: false
    },
    specifications: {
        type: Map,
        of: String,
        default: {}
    },

    // Archive metadata
    originalId: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    deletedBy: {
        id: Number,
        name: String,
        email: String
    },
    deleteReason: {
        type: String,
        default: ''
    },

    // Original timestamps preserved
    originalCreatedAt: Date,
    originalUpdatedAt: Date
}, {
    timestamps: true
});

// Index for efficient queries
deletedProductSchema.index({ deletedAt: -1 });
deletedProductSchema.index({ originalId: 1 });

module.exports = mongoose.model('DeletedProduct', deletedProductSchema);

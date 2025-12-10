const mongoose = require('mongoose');

const deletedUserSchema = new mongoose.Schema({
    // Original user fields
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'customer', 'staff'],
        default: 'customer'
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        fullName: String,
        phone: String,
        region: String,
        province: String,
        city: String,
        barangay: String,
        postalCode: String,
        street: String,
        details: String
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    birthDate: {
        type: Date
    },
    savedCart: [{
        productId: { type: Number, required: true },
        name: String,
        price: Number,
        image: String,
        quantity: { type: Number, default: 1 },
        category: String,
        selected: { type: Boolean, default: true }
    }],

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
deletedUserSchema.index({ deletedAt: -1 });
deletedUserSchema.index({ originalId: 1 });
deletedUserSchema.index({ role: 1 });

module.exports = mongoose.model('DeletedUser', deletedUserSchema);

const mongoose = require('mongoose');

const userAddressSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
        ref: 'User'
    },
    fullName: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    region: {
        type: String,
        trim: true
    },
    province: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    barangay: {
        type: String,
        trim: true
    },
    postalCode: {
        type: String,
        trim: true
    },
    street: {
        type: String,
        trim: true
    },
    details: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Index for quick lookup by userId
userAddressSchema.index({ userId: 1 });

module.exports = mongoose.model('UserAddress', userAddressSchema);

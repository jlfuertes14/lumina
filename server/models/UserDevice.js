const mongoose = require('mongoose');

const userDeviceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    deviceId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    deviceToken: {
        type: String,
        required: true,
        unique: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    deviceName: {
        type: String,
        default: 'My Smart Car'
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'offline', 'inactive'],
        default: 'pending',
        index: true
    },
    lastOnline: {
        type: Date,
        default: null
    },
    firmwareVersion: {
        type: String,
        default: '1.0.0'
    },
    registeredAt: {
        type: Date,
        default: Date.now
    },
    // Additional metadata from the order
    orderReference: {
        type: String
    }
}, {
    timestamps: true
});

// Index for efficient queries
userDeviceSchema.index({ userId: 1, status: 1 });

// Methods
userDeviceSchema.methods.updateOnlineStatus = function (isOnline) {
    this.status = isOnline ? 'active' : 'offline';
    if (isOnline) {
        this.lastOnline = new Date();
    }
    return this.save();
};

module.exports = mongoose.model('UserDevice', userDeviceSchema);

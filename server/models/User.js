const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: s
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
    avatar: {
        type: String  // Base64 encoded image (customers only)
    },
    savedCart: [{
        productId: { type: Number, required: true },
        name: String,
        price: Number,
        image: String,
        quantity: { type: Number, default: 1 },
        category: String,
        selected: { type: Boolean, default: true }
    }]
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const userCouponSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    couponCode: { type: String, required: true },
    claimedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
    usedAt: { type: Date }
}, { timestamps: true });
// Prevent duplicate claims
userCouponSchema.index({ userId: 1, couponCode: 1 }, { unique: true });
module.exports = mongoose.model('UserCoupon', userCouponSchema);

import mongoose, { Schema } from 'mongoose';

const ReviewSchema = new Schema({
    productId: {
        type: String,
        required: [true, 'productId is required']
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Review', ReviewSchema);

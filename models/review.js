import mongoose, { Schema } from 'mongoose';

const ReviewSchema = new Schema({
    productId: String,
    content: String
});

module.exports = mongoose.model('Review', ReviewSchema);

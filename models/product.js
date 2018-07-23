import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
    name: String,
    price: Number
});

module.exports = mongoose.model('Product', ProductSchema);

import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true
    },
    price: {
      type: Number,
      min: 0
    },
    lastModifiedDate: {
      type: Date,
      default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);

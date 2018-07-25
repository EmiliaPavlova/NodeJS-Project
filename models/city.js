import mongoose, { Schema } from 'mongoose';

const CitySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  country: {
    type: String,
    required: [true, 'Country is required']
  },
  capital: {
    type: Boolean,
    required: [true, 'Set as capital or not']
  },
  location: {
    lat: Number,
    long: Number
  },
  lastModifiedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('City', CitySchema);

import mongoose, { Schema } from 'mongoose';

const CitySchema = new Schema({
    name: String,
    country: String,
    capital: Boolean,
    location: {
      lat: Number,
      long: Number
    }
});

module.exports = mongoose.model('City', CitySchema);

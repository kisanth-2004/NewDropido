

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingCode: {
      type: String,
      unique: true,
      default: () => 'DRP-' + Math.floor(100000 + Math.random() * 900000) // எப்போதும் தனித்துவமான 6 இலக்க குறியீடு உருவாகும்
    },
    tripType: {
      type: String,
      required: true,
      enum: ['oneway', 'roundtrip']
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    pickup: {
      type: String,
      required: true,
      trim: true
    },
    drop: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    },
    selectedCar: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
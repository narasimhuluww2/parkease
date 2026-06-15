const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    slotId: {
      type: String,
      required: true,
    },
    floor: {
      type: String,
      enum: ['Ground Floor', 'First Floor'],
      required: true,
    },
    zone: {
      type: String,
      enum: ['A', 'B', 'C', 'D'],
      required: true,
    },
    slotNumber: {
      type: Number,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
      uppercase: true,
    },
    vehicleType: {
      type: String,
      enum: ['car', 'motorcycle', 'suv', 'truck'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
    bookingTime: {
      type: Date,
      default: Date.now,
    },
    exitTime: {
      type: Date,
      default: null,
    },
    duration: {
      // in minutes
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);

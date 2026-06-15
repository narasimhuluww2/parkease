const mongoose = require('mongoose');

const parkingSlotSchema = new mongoose.Schema(
  {
    slotId: {
      type: String,
      required: true,
      unique: true,
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
    isAvailable: {
      type: Boolean,
      default: true,
    },
    currentUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    currentBooking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      default: null,
    },
    features: {
      type: [String],
      default: [],
      // e.g., ['covered', 'cctv', 'charging']
    },
    handicapAccessible: {
      type: Boolean,
      default: false,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ParkingSlot', parkingSlotSchema);

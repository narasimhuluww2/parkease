const Booking = require('../models/Booking');
const ParkingSlot = require('../models/ParkingSlot');
const User = require('../models/User');

exports.getAvailableSlots = async (req, res) => {
  try {
    const { floor, zone } = req.query;

    let filter = { isAvailable: true };

    if (floor) filter.floor = floor;
    if (zone) filter.zone = zone;

    const slots = await ParkingSlot.find(filter).sort({ slotNumber: 1 });

    res.json({
      success: true,
      count: slots.length,
      slots,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllSlots = async (req, res) => {
  try {
    const slots = await ParkingSlot.find().sort({ floor: 1, zone: 1, slotNumber: 1 });

    res.json({
      success: true,
      count: slots.length,
      slots,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.bookSlot = async (req, res) => {
  try {
    const { slotId, vehicleNumber, vehicleType, notes } = req.body;

    // Find parking slot
    const slot = await ParkingSlot.findOne({ slotId });

    if (!slot) {
      return res.status(404).json({ success: false, message: 'Slot not found' });
    }

    if (!slot.isAvailable) {
      return res.status(400).json({ success: false, message: 'Slot is not available' });
    }

    // Check if user already has an active booking
    const existingBooking = await Booking.findOne({
      userId: req.user._id,
      status: 'active',
    });

    if (existingBooking) {
      return res.status(400).json({ success: false, message: 'You already have an active booking' });
    }

    // Create booking
    const booking = new Booking({
      userId: req.user._id,
      slotId,
      floor: slot.floor,
      zone: slot.zone,
      slotNumber: slot.slotNumber,
      vehicleNumber: vehicleNumber.toUpperCase(),
      vehicleType,
      notes,
    });

    await booking.save();

    // Update slot
    slot.isAvailable = false;
    slot.currentUser = req.user._id;
    slot.currentBooking = booking._id;
    await slot.save();

    // Update user
    const user = await User.findById(req.user._id);
    user.totalBookings += 1;
    user.activeBooking = booking._id;
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Slot booked successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.completeBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    // Calculate duration and cost
    const exitTime = new Date();
    const duration = Math.ceil((exitTime - booking.bookingTime) / (1000 * 60)); // in minutes
    const cost = Math.ceil(duration / 30) * 10; // ₹10 per 30 minutes

    booking.status = 'completed';
    booking.exitTime = exitTime;
    booking.duration = duration;
    booking.cost = cost;
    await booking.save();

    // Free up the slot
    const slot = await ParkingSlot.findOne({ slotId: booking.slotId });
    if (slot) {
      slot.isAvailable = true;
      slot.currentUser = null;
      slot.currentBooking = null;
      await slot.save();
    }

    // Update user
    const user = await User.findById(req.user._id);
    user.activeBooking = null;
    await user.save();

    res.json({
      success: true,
      message: 'Booking completed successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyCurrentBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      userId: req.user._id,
      status: 'active',
    });

    if (!booking) {
      return res.json({
        success: true,
        booking: null,
        message: 'No active booking',
      });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    if (booking.status !== 'active') {
      return res.status(400).json({ success: false, message: 'Can only cancel active bookings' });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Free up the slot
    const slot = await ParkingSlot.findOne({ slotId: booking.slotId });
    if (slot) {
      slot.isAvailable = true;
      slot.currentUser = null;
      slot.currentBooking = null;
      await slot.save();
    }

    // Update user
    const user = await User.findById(req.user._id);
    user.activeBooking = null;
    await user.save();

    res.json({
      success: true,
      message: 'Booking cancelled',
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getParkingStats = async (req, res) => {
  try {
    const totalSlots = await ParkingSlot.countDocuments();
    const availableSlots = await ParkingSlot.countDocuments({ isAvailable: true });
    const bookedSlots = totalSlots - availableSlots;

    const activeBookings = await Booking.countDocuments({ status: 'active' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });

    const slotsByFloor = await ParkingSlot.aggregate([
      {
        $group: {
          _id: '$floor',
          total: { $sum: 1 },
          available: { $sum: { $cond: ['$isAvailable', 1, 0] } },
          booked: { $sum: { $cond: ['$isAvailable', 0, 1] } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      stats: {
        totalSlots,
        availableSlots,
        bookedSlots,
        occupancyRate: ((bookedSlots / totalSlots) * 100).toFixed(2),
        activeBookings,
        completedBookings,
        slotsByFloor,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getNearestAvailableSlot = async (req, res) => {
  try {
    const { floor, zone } = req.query;

    let filter = { isAvailable: true };

    if (floor) {
      filter.floor = floor;
    } else {
      // If no floor specified, find nearest slot in either floor
      filter.floor = { $in: ['Ground Floor', 'First Floor'] };
    }

    if (zone) {
      filter.zone = zone;
    }

    const slot = await ParkingSlot.findOne(filter).sort({ slotNumber: 1 });

    if (!slot) {
      return res.json({
        success: true,
        slot: null,
        message: 'No available slots',
      });
    }

    res.json({
      success: true,
      slot,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

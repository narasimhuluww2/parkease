const express = require('express');
const bookingController = require('../controllers/bookingController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Get available slots
router.get('/slots/available', bookingController.getAvailableSlots);

// Get all slots
router.get('/slots', bookingController.getAllSlots);

// Get nearest available slot (for QR scan simulation)
router.get('/slots/nearest', bookingController.getNearestAvailableSlot);

// Book a slot
router.post('/book', authenticate, bookingController.bookSlot);

// Complete booking
router.post('/complete', authenticate, bookingController.completeBooking);

// Cancel booking
router.post('/cancel', authenticate, bookingController.cancelBooking);

// Get my bookings
router.get('/my-bookings', authenticate, bookingController.getMyBookings);

// Get current active booking
router.get('/current-booking', authenticate, bookingController.getMyCurrentBooking);

// Get parking statistics
router.get('/stats', bookingController.getParkingStats);

module.exports = router;

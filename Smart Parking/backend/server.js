const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const { errorHandler } = require('./middleware/errorHandler');
const ParkingSlot = require('./models/ParkingSlot');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/parkease', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✓ MongoDB connected'))
  .catch(err => console.error('✗ MongoDB connection error:', err));

// Initialize parking slots (run once)
const initializeParkingSlots = async () => {
  try {
    const slotCount = await ParkingSlot.countDocuments();
    if (slotCount === 0) {
      const slots = [];
      const floors = ['Ground Floor', 'First Floor'];
      const zones = ['A', 'B', 'C', 'D'];

      floors.forEach(floor => {
        zones.forEach(zone => {
          const slotsPerZone = zone === 'A' || zone === 'B' ? 25 : 25;
          for (let i = 1; i <= slotsPerZone; i++) {
            slots.push({
              slotId: `${zone}${String(i).padStart(2, '0')}`,
              floor,
              zone,
              slotNumber: i,
              isAvailable: true,
            });
          }
        });
      });

      await ParkingSlot.insertMany(slots);
      console.log(`✓ Initialized ${slots.length} parking slots`);
    }
  } catch (error) {
    console.error('Error initializing parking slots:', error);
  }
};

// Initialize slots after MongoDB connection
mongoose.connection.once('open', initializeParkingSlots);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/booking', bookingRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n╔══════════════════════════════════╗`);
  console.log(`║  ParkEase Backend Server`);
  console.log(`║  Running on port ${PORT}`);
  console.log(`║  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`╚══════════════════════════════════╝\n`);
});

#!/usr/bin/env node

/**
 * ParkEase Database Seed Script
 * Initializes MongoDB with test data
 * Usage: node seed.js
 */

const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Booking = require('./models/Booking');
const ParkingSlot = require('./models/ParkingSlot');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/parkease';

// Test users to create
const testUsers = [
  {
    fullName: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '+91 9876543210',
    vehicleNumber: 'ABC-1234',
    vehicleType: 'car',
  },
  {
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    phone: '+91 9876543211',
    vehicleNumber: 'XYZ-5678',
    vehicleType: 'suv',
  },
  {
    fullName: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    phone: '+91 9876543212',
    vehicleNumber: 'TEST-001',
    vehicleType: 'car',
  },
];

async function seedDatabase() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ Connected to MongoDB\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Booking.deleteMany({});
    await ParkingSlot.deleteMany({});
    console.log('✓ Cleared existing data\n');

    // Create test users
    console.log('👥 Creating test users...');
    const createdUsers = [];
    for (const userData of testUsers) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
      console.log(`  ✓ Created: ${user.email}`);
    }
    console.log();

    // Create parking slots
    console.log('🅿️  Creating parking slots...');
    const slots = [];
    const floors = ['Ground Floor', 'First Floor'];
    const zones = ['A', 'B', 'C', 'D'];

    floors.forEach(floor => {
      zones.forEach(zone => {
        const slotsPerZone = 25;
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
    console.log(`✓ Created ${slots.length} parking slots\n`);

    // Create sample bookings
    console.log('📅 Creating sample bookings...');
    
    // Completed booking
    const completedBooking = new Booking({
      userId: createdUsers[0]._id,
      slotId: 'A01',
      floor: 'Ground Floor',
      zone: 'A',
      slotNumber: 1,
      vehicleNumber: 'ABC-1234',
      vehicleType: 'car',
      status: 'completed',
      bookingTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      exitTime: new Date(Date.now() - 60 * 60 * 1000),
      duration: 60,
      cost: 20,
    });
    await completedBooking.save();
    console.log('  ✓ Created completed booking');

    // Active booking
    const activeBooking = new Booking({
      userId: createdUsers[1]._id,
      slotId: 'B05',
      floor: 'Ground Floor',
      zone: 'B',
      slotNumber: 5,
      vehicleNumber: 'XYZ-5678',
      vehicleType: 'suv',
      status: 'active',
      bookingTime: new Date(Date.now() - 30 * 60 * 1000),
      exitTime: null,
      duration: 0,
      cost: 0,
    });
    await activeBooking.save();
    console.log('  ✓ Created active booking');

    // Update user with active booking
    createdUsers[1].activeBooking = activeBooking._id;
    await createdUsers[1].save();

    console.log();
    console.log('╔════════════════════════════════════╗');
    console.log('║  Database Seeded Successfully!      ║');
    console.log('╚════════════════════════════════════╝');
    console.log();
    console.log('📊 Summary:');
    console.log(`  • Users created: ${createdUsers.length}`);
    console.log(`  • Parking slots created: ${slots.length}`);
    console.log(`  • Sample bookings created: 2`);
    console.log();
    console.log('🔐 Test Credentials:');
    testUsers.forEach(user => {
      console.log(`  • Email: ${user.email}`);
      console.log(`    Password: ${user.password}`);
    });
    console.log();
    console.log('✅ You can now login and start testing!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

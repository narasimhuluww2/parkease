# 🅿️ ParkEase Backend - Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/parkease
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
CLIENT_URL=http://localhost:5500
```

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows
mongod

# Mac/Linux
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
- Create account at mongodb.com
- Create cluster
- Get connection string
- Update `MONGODB_URI` in `.env`

### 4. Start Backend Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/logout` - Logout

### Parking Slots
- `GET /api/booking/slots` - Get all slots
- `GET /api/booking/slots/available` - Get available slots only
- `GET /api/booking/slots/nearest` - Get nearest available slot (for QR scan)

### Bookings
- `POST /api/booking/book` - Book a slot
- `GET /api/booking/current-booking` - Get user's active booking
- `GET /api/booking/my-bookings` - Get all user's bookings
- `POST /api/booking/complete` - Complete and leave
- `POST /api/booking/cancel` - Cancel booking

### Statistics
- `GET /api/booking/stats` - Get parking statistics

---

## 📁 Project Structure

```
backend/
├── models/              # Database schemas
│   ├── User.js         # User model
│   ├── Booking.js      # Booking model
│   └── ParkingSlot.js  # Parking slot model
├── routes/             # API routes
│   ├── authRoutes.js   # Authentication routes
│   └── bookingRoutes.js# Booking routes
├── controllers/        # Business logic
│   ├── authController.js
│   └── bookingController.js
├── middleware/         # Express middleware
│   ├── auth.js        # JWT authentication
│   └── errorHandler.js# Error handling
├── server.js           # Main server file
├── package.json
├── .env.example
└── README.md
```

---

## 🔐 Authentication Flow

1. **Register**: User creates account with email/password
2. **Login**: Credentials validated, JWT token generated
3. **Token Storage**: Token saved in browser localStorage
4. **Protected Routes**: All booking APIs require valid JWT token
5. **Token in Header**: `Authorization: Bearer <token>`

---

## 📊 Database Models

### User
```javascript
{
  fullName, email, password (hashed), phone,
  vehicleNumber, vehicleType, totalBookings,
  activeBooking (reference), createdAt, updatedAt
}
```

### Booking
```javascript
{
  userId, slotId, floor, zone, slotNumber,
  vehicleNumber, vehicleType, status (active/completed/cancelled),
  bookingTime, exitTime, duration (minutes), cost,
  createdAt, updatedAt
}
```

### ParkingSlot
```javascript
{
  slotId (unique), floor, zone, slotNumber,
  isAvailable, currentUser (reference), currentBooking (reference),
  features (array), handicapAccessible, lastUpdated
}
```

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+91 9876543210",
    "vehicleType": "car"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Available Slots
```bash
curl http://localhost:5000/api/booking/slots/available \
  -H "Authorization: Bearer <token>"
```

### Book Slot
```bash
curl -X POST http://localhost:5000/api/booking/book \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "slotId": "A01",
    "vehicleNumber": "ABC-1234",
    "vehicleType": "car"
  }'
```

---

## 🚀 Deployment

### Heroku
1. Create Heroku account and app
2. Set environment variables
3. Deploy: `git push heroku main`

### Railway.app
1. Connect GitHub repo
2. Add MongoDB service
3. Deploy automatically

### AWS/DigitalOcean
1. Setup EC2/Droplet
2. Install Node.js and MongoDB
3. Clone repo and run with PM2

---

## 🛠️ Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify firewall allows port 27017

### CORS Errors
- Update `CLIENT_URL` in `.env`
- Check `cors()` configuration in server.js

### JWT Token Expired
- Token expires in 30 days
- User must login again
- Store refresh token for auto-renewal

### Slots Not Initializing
- Check MongoDB connection
- Clear old data: `db.parkingslots.deleteMany({})`
- Restart server

---

## 📝 Environment Variables

| Variable | Description | Default |
|---|---|---|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection | mongodb://localhost:27017/parkease |
| JWT_SECRET | JWT signing key | CHANGE ME! |
| NODE_ENV | Environment | development |
| CLIENT_URL | Frontend URL | http://localhost:5500 |

---

## 📚 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator

---

## ✅ Features Implemented

- ✅ User registration & authentication
- ✅ Secure password hashing
- ✅ JWT token-based authorization
- ✅ Parking slot booking system
- ✅ Real-time slot availability
- ✅ Booking history & statistics
- ✅ Cost calculation (₹10 per 30 min)
- ✅ User profile management
- ✅ Multiple vehicle types support
- ✅ Error handling & validation

---

## 🤝 Support

For issues or questions:
1. Check logs for error messages
2. Verify environment variables
3. Ensure MongoDB is running
4. Test API endpoints with cURL

---

**Built with ❤️ for Smart Parking**

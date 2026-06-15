# 🅿️ ParkEase – Smart Parking Slot Booking System

> A modern, full-stack parking management system with user authentication, real-time slot booking, and comprehensive analytics.

**Live. Smart. Secure. Your parking solution.**

---

## 🎯 What's New

✨ **Now with full backend & authentication!**
- 🔐 Secure user registration & login with JWT
- 💾 MongoDB database for persistent data storage
- 🚀 RESTful API for all parking operations
- 📊 Real-time booking statistics
- 👤 User profile management
- 💳 Automated cost calculation
- 🔒 Token-based authorization

---

## 🚨 Problem Statement

In large parking areas like **malls, hospitals, and airports**, users face critical challenges:

- 🔴 **10–20 minutes wasted** searching for empty slots
- 🔴 **No visibility** of available spaces
- 🔴 **Forgotten location** of parked vehicle
- 🔴 **Data loss** on page refresh (offline only)
- 🔴 **Security concerns** with unsecured local storage

---

## ✅ Our Solution

**ParkEase** is a complete parking management platform:

| Feature | Status | Description |
|---|---|---|
| 🔐 User Auth | ✅ | Secure registration & login with JWT tokens |
| 🗺️ Slot Booking | ✅ | Real-time booking with database persistence |
| 💾 Data Storage | ✅ | MongoDB cloud database |
| 📊 Dashboard | ✅ | Live occupancy stats & analytics |
| 🚗 Booking History | ✅ | Complete booking records & cost tracking |
| 👤 Profile Mgmt | ✅ | User information & vehicle management |
| 💰 Cost Calc | ✅ | Automatic pricing (₹10 per 30 min) |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────┐
│                  Frontend (Browser)              │
│  ├─ login.html      (Authentication)            │
│  ├─ register.html   (Sign up)                   │
│  └─ app.html        (Main parking app)          │
├─────────────────────────────────────────────────┤
│           Backend API (Node.js + Express)       │
│  ├─ /api/auth       (User auth routes)          │
│  └─ /api/booking    (Booking routes)            │
├─────────────────────────────────────────────────┤
│         Database (MongoDB)                      │
│  ├─ users collection    (User accounts)         │
│  ├─ bookings collection (Booking records)       │
│  └─ parkingslots collection (Slot status)      │
└─────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
Smart Parking/
├── backend/
│   ├── models/                  # Database schemas
│   │   ├── User.js             # User model with password hashing
│   │   ├── Booking.js          # Booking records
│   │   └── ParkingSlot.js      # Parking slot schema
│   ├── controllers/            # Business logic
│   │   ├── authController.js   # Auth logic
│   │   └── bookingController.js# Booking logic
│   ├── routes/                 # API routes
│   │   ├── authRoutes.js       # /api/auth/*
│   │   └── bookingRoutes.js    # /api/booking/*
│   ├── middleware/             # Custom middleware
│   │   ├── auth.js             # JWT authentication
│   │   └── errorHandler.js     # Error handling
│   ├── server.js               # Main server file
│   ├── package.json            # Dependencies
│   ├── .env                    # Configuration
│   └── SETUP.md                # Backend setup guide
├── frontend/
│   ├── login.html              # Login page
│   ├── register.html           # Registration page
│   └── app.html                # Main parking app
├── SETUP_GUIDE.md              # Complete setup instructions
├── API_DOCUMENTATION.md        # API reference
├── start.bat                   # Windows quick start
├── start.sh                    # Mac/Linux quick start
└── README.md                   # This file
```

---

## 🏗️ Parking Layout

| Floor | Zones | Slots | Slot IDs |
|---|---|---|---|
| Ground Floor | A, B | 50 | A01–A25, B01–B25 |
| First Floor | C, D | 50 | C01–C25, D01–D25 |
| **Total** | **4 zones** | **100** | — |

---

## 🎨 Slot Status Colors

| Color | Status | Meaning |
|---|---|---|
| 🟢 Green | Available | Click to book |
| 🔴 Red | Booked | Occupied (unavailable) |
| 🟡 Yellow | Selected | Pending confirmation |

---

## 🚀 Quick Start (5 Minutes)

### Windows Users
```bash
cd "Smart Parking"
start.bat
```

### Mac/Linux Users
```bash
cd "Smart Parking"
chmod +x start.sh
./start.sh
```

Then open: **http://localhost:5500/frontend/login.html**

---

## 📋 Manual Setup

### Prerequisites
- ✅ Node.js (v14+)
- ✅ MongoDB (local or Atlas account)
- ✅ npm (comes with Node.js)

### Step 1: Install Backend
```bash
cd backend
npm install
```

### Step 2: Configure Environment
Create `.env` file in `backend/`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/parkease
JWT_SECRET=your_secret_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:5500
```

### Step 3: Start Backend
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

### Step 4: Start Frontend
Open new terminal:
```bash
cd frontend

# Python (any version)
python -m http.server 5500

# Or Node.js
npx http-server -p 5500
```

Frontend runs on: **http://localhost:5500**

### Step 5: Access Application
1. Open: http://localhost:5500/frontend/login.html
2. Click "Sign Up" to create account
3. Login with your credentials
4. Start booking!

---

## ✨ Key Features

### 🔐 Authentication
- Secure user registration
- Password hashing with bcryptjs
- JWT token-based authentication
- 30-day session tokens
- Protected API endpoints

### 🅿️ Slot Booking
- Real-time slot availability
- One-click booking
- Floor & zone filtering
- Booking confirmation
- Cancel anytime

### 📊 Dashboard
- Live occupancy stats
- Per-floor breakdown
- Available/booked counts
- Occupancy percentages
- Auto-refresh

### 👤 User Account
- Profile management
- Vehicle information
- Booking history
- Statistics tracking
- Account settings

### 💰 Cost Management
- Automatic calculation: ₹10 per 30 min
- Duration tracking
- Payment ready (integration upcoming)

---

## 🔑 API Endpoints

### Authentication
```
POST   /api/auth/register      → Create account
POST   /api/auth/login         → Login user
GET    /api/auth/profile       → Get profile
PUT    /api/auth/profile       → Update profile
POST   /api/auth/logout        → Logout
```

### Bookings
```
GET    /api/booking/slots                → All slots
GET    /api/booking/slots/available      → Available only
POST   /api/booking/book                 → Book slot
GET    /api/booking/current-booking      → Active booking
GET    /api/booking/my-bookings          → Booking history
POST   /api/booking/complete             → Exit parking
POST   /api/booking/cancel               → Cancel booking
```

### Statistics
```
GET    /api/booking/stats      → Parking statistics
```

For complete API docs: See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 🔐 Security Features

✅ **Password Security**
- Hashed with bcryptjs (10 salt rounds)
- Never stored in plain text
- Secure comparison algorithm

✅ **Token Security**
- JWT with expiration (30 days)
- Verified on every request
- Stored in localStorage

✅ **API Security**
- CORS protection
- Input validation
- Rate limiting ready
- Error message sanitization

✅ **Data Protection**
- MongoDB encryption
- Secure connections ready
- No sensitive data in logs

---

## 💾 Database Models

### User
```javascript
{
  fullName, email, password(hashed), phone,
  vehicleNumber, vehicleType, totalBookings,
  activeBooking, createdAt, updatedAt
}
```

### Booking
```javascript
{
  userId, slotId, floor, zone, slotNumber,
  vehicleNumber, vehicleType, status(active/completed/cancelled),
  bookingTime, exitTime, duration(minutes), cost
}
```

### ParkingSlot
```javascript
{
  slotId(unique), floor, zone, slotNumber,
  isAvailable, currentUser, currentBooking,
  features, handicapAccessible
}
```

---

## 📊 Usage Statistics

### Pricing Model
| Duration | Cost |
|---|---|
| 30 minutes | ₹10 |
| 1 hour | ₹20 |
| 90 minutes | ₹30 |
| 2 hours | ₹40 |

---

## 🧪 Testing

### Test Credentials
```
Email:    test@example.com
Password: password123
```

### Create Test Account
1. Click "Sign Up"
2. Enter email: `test123@example.com`
3. Enter password: `password123`
4. Enter phone: `+91 9876543210`
5. Click "Create Account"

### Test Booking Flow
1. Login
2. Click "Book a Slot"
3. Select any green slot
4. Enter vehicle details
5. Click "Confirm Booking"
6. View in "My Booking" tab
7. Click "Complete & Leave"
8. See cost calculated

---

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT (JSON Web Tokens) |
| **Password Hashing** | bcryptjs |
| **Validation** | express-validator |
| **Middleware** | CORS, Custom Auth |

**Total Dependencies**: ~12 npm packages

---

## 📱 Browser Support

| Browser | Support |
|---|---|
| Chrome/Edge | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Opera | ✅ Full |
| IE 11 | ❌ Not supported |

---

## 🚀 Deployment

### Deploy to Cloud

**Railway.app** (Recommended)
```bash
git push origin main
# Auto-deploys to Railway
```

**Heroku**
```bash
heroku create parkease-app
git push heroku main
```

**AWS/DigitalOcean**
- Create server
- Install Node.js
- Clone repo
- Run with PM2

See [SETUP_GUIDE.md](SETUP_GUIDE.md#-going-live) for details.

---

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Ensure mongod is running
- Check connection string in .env
- For Atlas, whitelist your IP

**Can't book slot**
- Verify you're logged in
- Check token in browser console
- Make sure slot is available (green)

**CORS Error**
- Ensure backend runs on :5000
- Frontend on :5500
- Check CLIENT_URL in .env

**Port Already in Use**
```bash
# Windows: Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

See [SETUP_GUIDE.md](SETUP_GUIDE.md#-troubleshooting) for more help.

---

## 📚 Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete installation guide
- **[backend/SETUP.md](backend/SETUP.md)** - Backend configuration
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - API reference

---

## 🎯 Roadmap

### Phase 2 (Planned)
- [ ] Payment integration (Razorpay/Stripe)
- [ ] SMS & email notifications
- [ ] QR code generation & scanning
- [ ] Real-time WebSocket updates
- [ ] Mobile app (React Native)
- [ ] Admin dashboard
- [ ] Advanced reporting

### Phase 3 (Future)
- [ ] AI slot recommendations
- [ ] License plate recognition
- [ ] IoT sensor integration
- [ ] Multi-location support
- [ ] Subscription plans

---

## 👨‍💼 Built With ❤️

- **Architecture**: Microservices-ready
- **Security**: Industry standards
- **Scalability**: Ready for growth
- **Performance**: Optimized queries
- **Reliability**: Error handling

---

## 📄 License

MIT License - Open for educational and commercial use

---

## 🤝 Support & Contributions

Found a bug? Have a suggestion?

1. Create GitHub issue
2. Submit pull request
3. Contact: support@parkease.local

---

## 📞 Contact

- **Issues**: GitHub Issues
- **Email**: support@parkease.local
- **Website**: Coming soon

---

**Last Updated**: January 15, 2025  
**Version**: 1.0.0  
**Status**: Production Ready ✅

---

**🎉 Thank you for using ParkEase!**

Made with ❤️ for smarter parking management.

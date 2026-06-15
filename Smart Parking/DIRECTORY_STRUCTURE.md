# 📁 ParkEase - Complete Directory Structure

## Project Root
```
Smart Parking/
│
├── 📄 README.md                    ← Start here! Main documentation
├── 📄 SETUP_GUIDE.md              ← Installation & setup instructions
├── 📄 API_DOCUMENTATION.md         ← Complete API reference
├── 📄 PROJECT_SUMMARY.md           ← Project overview & checklist
├── 📄 QUICK_REFERENCE.md           ← Developer quick reference
├── 🔧 start.bat                    ← Windows quick start (run this!)
├── 🔧 start.sh                     ← Mac/Linux quick start (chmod +x, then ./start.sh)
├── 📄 index.html                   ← Original project file (reference)
│
├── 📂 backend/                     ← Node.js + Express API Server
│   │
│   ├── 📄 server.js                ← Main server file (entry point)
│   ├── 📄 package.json             ← Node dependencies
│   ├── 📄 package-lock.json        ← Locked dependency versions
│   ├── 📄 .env                     ← Configuration (DB, JWT, ports)
│   ├── 📄 .env.example             ← Template for .env
│   ├── 📄 seed.js                  ← Database seeding script
│   ├── 📄 SETUP.md                 ← Backend setup guide
│   │
│   ├── 📂 models/                  ← MongoDB Schemas
│   │   ├── User.js                 ← User model (password hashing)
│   │   ├── Booking.js              ← Booking model
│   │   └── ParkingSlot.js          ← Parking slot model
│   │
│   ├── 📂 controllers/             ← Business Logic
│   │   ├── authController.js       ← Authentication logic
│   │   └── bookingController.js    ← Booking operations
│   │
│   ├── 📂 routes/                  ← API Routes
│   │   ├── authRoutes.js           ← /api/auth/* endpoints
│   │   └── bookingRoutes.js        ← /api/booking/* endpoints
│   │
│   ├── 📂 middleware/              ← Custom Middleware
│   │   ├── auth.js                 ← JWT authentication
│   │   └── errorHandler.js         ← Error handling
│   │
│   └── 📂 node_modules/            ← Installed dependencies
│       ├── express/
│       ├── mongoose/
│       ├── bcryptjs/
│       ├── jsonwebtoken/
│       ├── cors/
│       ├── dotenv/
│       └── ... (12 total packages)
│
├── 📂 frontend/                    ← Frontend Applications
│   ├── 📄 login.html               ← Login page
│   │   • Email/password form
│   │   • JWT token storage
│   │   • Auto-redirect to app
│   │
│   ├── 📄 register.html            ← Registration page
│   │   • Sign up form
│   │   • Vehicle info
│   │   • Password validation
│   │
│   └── 📄 app.html                 ← Main Parking Application
│       • Slot booking interface
│       • My booking view
│       • Dashboard with stats
│       • User profile management
│       • Real-time API calls
│
└── 📂 .git/                        ← Version control (if initialized)

```

---

## 📊 File Statistics

| Category | Count | Files |
|---|---|---|
| **Configuration** | 5 | .env, .env.example, package.json, package-lock.json, start scripts |
| **Backend Core** | 3 | server.js, seed.js, SETUP.md |
| **Models** | 3 | User.js, Booking.js, ParkingSlot.js |
| **Controllers** | 2 | authController.js, bookingController.js |
| **Routes** | 2 | authRoutes.js, bookingRoutes.js |
| **Middleware** | 2 | auth.js, errorHandler.js |
| **Frontend** | 3 | login.html, register.html, app.html |
| **Documentation** | 6 | README.md, SETUP_GUIDE.md, API_DOCUMENTATION.md, PROJECT_SUMMARY.md, QUICK_REFERENCE.md, backend/SETUP.md |
| **Startup Scripts** | 2 | start.bat, start.sh |
| **Total** | 30+ | Plus npm dependencies |

---

## 🚀 Getting Started

### Step 1: Read Documentation
1. Start with **README.md** for overview
2. Follow **SETUP_GUIDE.md** for installation
3. Refer to **QUICK_REFERENCE.md** during development

### Step 2: Install & Run
**Windows**: Double-click `start.bat`
**Mac/Linux**: `chmod +x start.sh && ./start.sh`

### Step 3: Access Application
- Frontend: http://localhost:5500/frontend/login.html
- Backend: http://localhost:5000/api/health

### Step 4: Create Test Account
Register new account or use test credentials (after running seed.js)

---

## 📝 Key Files by Purpose

### Configuration
- **backend/.env** → Database, JWT, ports
- **backend/package.json** → Dependencies & scripts
- **backend/server.js** → Server initialization

### Authentication
- **backend/models/User.js** → User schema with password hashing
- **backend/controllers/authController.js** → Register/login logic
- **backend/routes/authRoutes.js** → Auth endpoints
- **backend/middleware/auth.js** → JWT verification
- **frontend/login.html** → Login form
- **frontend/register.html** → Registration form

### Booking System
- **backend/models/Booking.js** → Booking schema
- **backend/models/ParkingSlot.js** → Slot schema
- **backend/controllers/bookingController.js** → Booking logic
- **backend/routes/bookingRoutes.js** → Booking endpoints
- **frontend/app.html** → Main app with booking UI

### Documentation
- **README.md** → Main documentation
- **SETUP_GUIDE.md** → Installation guide
- **API_DOCUMENTATION.md** → API reference
- **PROJECT_SUMMARY.md** → Complete details
- **QUICK_REFERENCE.md** → Developer guide
- **backend/SETUP.md** → Backend config

---

## 🔄 Data Flow Architecture

```
frontend/login.html
        ↓
    Submit credentials
        ↓
backend/authController.js (login)
        ↓
backend/models/User.js (verify password)
        ↓
Generate JWT token
        ↓
Store token in localStorage
        ↓
Redirect to frontend/app.html
        ↓
frontend/app.html
        ↓
Include token in API calls
        ↓
backend/middleware/auth.js (verify token)
        ↓
backend/controllers/bookingController.js
        ↓
backend/models/*.js (CRUD operations)
        ↓
MongoDB (persistence)
```

---

## 🔐 Security Layers

```
Client (Browser)
    ↓ HTTPS
API Gateway (CORS Middleware)
    ↓ Express
Authentication Middleware (JWT)
    ↓
Route Handler
    ↓
Controller (Business Logic)
    ↓
Database Layer (Mongoose)
    ↓
MongoDB (Encrypted Storage)
```

---

## 📦 Dependencies Graph

```
express.js (Web Server)
├── cors (Cross-origin requests)
├── dotenv (Environment variables)
├── express-validator (Input validation)
│
mongoose (Database)
├── MongoDB Connection
├── Schema Validation
└── Query Builder
    
jsonwebtoken (Authentication)
├── Token Generation
└── Token Verification
    
bcryptjs (Password Hashing)
├── Hash Generation
└── Password Comparison
```

---

## 🗄️ MongoDB Collections

```
parkease (Database)
│
├── users (Collection)
│   ├── _id: ObjectId
│   ├── fullName: String
│   ├── email: String (unique)
│   ├── password: String (hashed)
│   ├── phone: String
│   ├── vehicleNumber: String
│   ├── vehicleType: String
│   ├── activeBooking: ObjectId (ref: bookings)
│   └── ... (timestamps, etc)
│
├── bookings (Collection)
│   ├── _id: ObjectId
│   ├── userId: ObjectId (ref: users)
│   ├── slotId: String
│   ├── floor: String
│   ├── zone: String
│   ├── vehicleNumber: String
│   ├── status: String (active/completed/cancelled)
│   ├── bookingTime: Date
│   ├── exitTime: Date
│   ├── duration: Number (minutes)
│   ├── cost: Number
│   └── ... (timestamps, etc)
│
└── parkingslots (Collection)
    ├── _id: ObjectId
    ├── slotId: String (unique)
    ├── floor: String
    ├── zone: String
    ├── slotNumber: Number
    ├── isAvailable: Boolean
    ├── currentUser: ObjectId (ref: users)
    ├── currentBooking: ObjectId (ref: bookings)
    └── ... (timestamps, features, etc)
```

---

## 🌐 Network Architecture

```
Client Machine
    │
    ├──→ http://localhost:5500
    │    (Frontend - HTML/CSS/JS)
    │
    └──→ http://localhost:5000/api/*
         (Backend - Node.js/Express)
              ↓
         MongoDB Driver
              ↓
         mongodb://localhost:27017/parkease
         (MongoDB Database)
```

---

## 📱 Frontend Page Structure

### login.html
```
┌─────────────────────────┐
│     ParkEase Logo       │
├─────────────────────────┤
│  Email: [input field]   │
│  Password: [input]      │
│  [Sign In Button]       │
├─────────────────────────┤
│  Don't have account?    │
│  [Sign Up Link]         │
└─────────────────────────┘
```

### register.html
```
┌─────────────────────────┐
│     Join ParkEase       │
├─────────────────────────┤
│  Full Name: [input]     │
│  Email: [input]         │
│  Phone: [input]         │
│  Vehicle Type: [select] │
│  Vehicle Number: [input]│
│  Password: [input]      │
│  [Create Account Btn]   │
├─────────────────────────┤
│  Already have account?  │
│  [Sign In Link]         │
└─────────────────────────┘
```

### app.html
```
┌────────────────────────────────┐
│  ParkEase    [Book] [My Booking]│
│             [Dashboard][Profile]│
│             [Logout Button]     │
├────────────────────────────────┤
│  Book a Slot Section           │
│  - Floor Filter                │
│  - Zone Filter                 │
│  - Slot Grid                   │
│  [Booking Modal]               │
├────────────────────────────────┤
│  My Current Booking            │
│  Booking History Table         │
├────────────────────────────────┤
│  Dashboard Stats               │
│  - Total/Available/Booked      │
│  - Occupancy Rate              │
│  - Floor Breakdown             │
├────────────────────────────────┤
│  User Profile                  │
│  - Name, Email, Phone          │
│  - Vehicle Info                │
│  [Save Changes Button]         │
└────────────────────────────────┘
```

---

## 🔧 Configuration Files

### .env (Configuration)
```
PORT=5000                          # Backend port
MONGODB_URI=mongodb://localhost:27017/parkease  # DB connection
JWT_SECRET=your_secret_key        # JWT signing key
NODE_ENV=development              # Environment mode
CLIENT_URL=http://localhost:5500 # Frontend URL (for CORS)
```

### package.json (Dependencies)
```json
{
  "name": "parkease-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",      // Production
    "dev": "nodemon server.js"      // Development
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express-validator": "^7.0.0"
  }
}
```

---

## 🧪 Testing Files

### seed.js (Database Seeding)
Creates test data:
- 3 test users
- 100 parking slots  
- 2 sample bookings

Run: `node backend/seed.js`

---

## 📋 Quick Navigation

| What You Need | File/Folder |
|---|---|
| **Start Application** | start.bat or start.sh |
| **Setup Instructions** | SETUP_GUIDE.md |
| **API Reference** | API_DOCUMENTATION.md |
| **Quick Help** | QUICK_REFERENCE.md |
| **Backend Config** | backend/.env |
| **Database Schema** | backend/models/* |
| **API Endpoints** | backend/routes/* |
| **Login Page** | frontend/login.html |
| **Main App** | frontend/app.html |
| **Project Overview** | README.md |
| **Complete Details** | PROJECT_SUMMARY.md |

---

## 🚀 Startup Sequence

1. **start.bat/start.sh** (runs automatically)
   ↓
2. **npm install** (if needed)
   ↓
3. **backend/server.js** (starts on :5000)
   ↓
4. **Initialize parking slots** (auto on first run)
   ↓
5. **Frontend server** (starts on :5500)
   ↓
6. **Browser** (open login page)

---

## 💾 File Size Overview

```
backend/
├── server.js              ~100 lines
├── models/               ~300 lines total
├── controllers/          ~400 lines total
├── routes/              ~100 lines total
├── middleware/          ~60 lines total
└── node_modules/        ~50,000 files (dependencies)

frontend/
├── login.html           ~200 lines
├── register.html        ~250 lines
└── app.html            ~1000+ lines

Documentation/
└── ~3000+ lines combined
```

---

## ✅ Verification Checklist

After setup, verify these exist:

- [ ] backend/.env file
- [ ] backend/node_modules/ folder
- [ ] frontend/ folder with 3 HTML files
- [ ] Documentation files (README, SETUP_GUIDE, etc.)
- [ ] start.bat and start.sh files
- [ ] Can run start script without errors
- [ ] Frontend loads at localhost:5500
- [ ] Backend API responds at localhost:5000/api/health
- [ ] Can register & login successfully
- [ ] Can book parking slots

---

**You're all set! 🅿️**

Start with the **start.bat** (Windows) or **start.sh** (Mac/Linux) script.

For help, check **README.md** or **QUICK_REFERENCE.md**.

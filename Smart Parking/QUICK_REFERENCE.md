# 🅿️ ParkEase - Developer Quick Reference

## 🚀 Start Development

### Windows
```bash
start.bat
```

### Mac/Linux
```bash
chmod +x start.sh
./start.sh
```

---

## 📍 URLs

| Service | URL |
|---|---|
| Frontend | http://localhost:5500/frontend/login.html |
| Backend API | http://localhost:5000 |
| Health Check | http://localhost:5000/api/health |
| MongoDB | localhost:27017 |

---

## 🔑 Test Accounts

```
Email: test@example.com
Password: password123
```

Or create new account via registration page.

---

## 📚 API Quick Examples

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName":"John","email":"john@test.com",
    "password":"pass123","phone":"+91 9876543210"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get Slots
```bash
curl http://localhost:5000/api/booking/slots \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Book Slot
```bash
curl -X POST http://localhost:5000/api/booking/book \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "slotId":"A01","vehicleNumber":"ABC-1234",
    "vehicleType":"car"
  }'
```

---

## 📂 File Organization

```
backend/
├── models/          → Database schemas
├── controllers/     → Business logic
├── routes/          → API endpoints
├── middleware/      → Auth & errors
└── server.js        → Entry point

frontend/
├── login.html       → Auth page
├── register.html    → Sign up page
└── app.html         → Main app
```

---

## 🔧 Backend Commands

```bash
cd backend

# Install dependencies
npm install

# Start dev server (auto-reload)
npm run dev

# Start production server
npm start

# Seed database with test data
node seed.js

# Install new package
npm install package-name
```

---

## 🎨 Frontend Commands

```bash
cd frontend

# Python web server
python -m http.server 5500

# Node.js web server
npx http-server -p 5500

# Live reload (if using VS Code Live Server extension)
# Just click "Go Live" button
```

---

## 🗄️ Database Seeding

```bash
cd backend
node seed.js
```

Creates:
- 3 test users
- 100 parking slots
- 2 sample bookings

---

## 🐛 Debug Mode

### Browser Console (F12)
```javascript
// Check stored token
localStorage.getItem('token')

// Check stored user
JSON.parse(localStorage.getItem('user'))

// Clear all storage
localStorage.clear()
```

### Backend Logs
Watch console output for API errors and database operations.

---

## 📊 Database Commands

### Connect to MongoDB
```bash
# Using MongoDB shell
mongo

# Or use MongoDB Compass (GUI)
```

### Check Collections
```javascript
// In MongoDB shell
use parkease
db.users.find()
db.bookings.find()
db.parkingslots.find()
```

---

## 🔑 Environment Variables

Location: `backend/.env`

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/parkease
JWT_SECRET=your_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5500
```

Change as needed for your setup.

---

## 🚨 Common Errors & Fixes

### "Cannot find module"
```bash
cd backend && npm install
```

### "Port already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000 && kill -9 <PID>
```

### "MongoDB connection failed"
- Start MongoDB: `mongod`
- Or update MONGODB_URI in .env

### "CORS error in browser"
- Ensure backend on :5000
- Frontend on :5500
- Check CLIENT_URL in .env

---

## 📱 Endpoints Summary

### Auth (`/api/auth`)
```
POST   /register      → Sign up
POST   /login         → Sign in
GET    /profile       → Get profile
PUT    /profile       → Update profile
POST   /logout        → Sign out
```

### Booking (`/api/booking`)
```
GET    /slots         → All slots
GET    /slots/available → Available only
POST   /book          → Book slot
GET    /current-booking → Active booking
GET    /my-bookings   → History
POST   /complete      → End booking
POST   /cancel        → Cancel booking
GET    /stats         → Statistics
```

---

## 💾 Data Models

### User
Fields: fullName, email, password, phone, vehicleNumber, vehicleType, activeBooking, totalBookings

### Booking
Fields: userId, slotId, floor, zone, vehicleNumber, status, bookingTime, exitTime, duration, cost

### ParkingSlot
Fields: slotId, floor, zone, isAvailable, currentUser, currentBooking

---

## 📋 Testing Workflow

1. **Register**: Create test account
2. **Login**: Use credentials
3. **Browse**: View available slots
4. **Book**: Select a slot
5. **Confirm**: Complete booking
6. **View**: Check "My Booking"
7. **Complete**: Click "Leave" to finish
8. **Check**: View cost & history

---

## 🎯 Parking System Layout

### Slots Configuration
- **Ground Floor**: Zones A & B (50 slots)
- **First Floor**: Zones C & D (50 slots)
- **Format**: [ZONE][NUMBER] → A01, A02, ..., D25

### Status Colors
- 🟢 Green → Available
- 🔴 Red → Booked
- 🟡 Yellow → Selected

### Pricing
- ₹10 per 30 minutes (rounded up)
- 30 min = ₹10, 60 min = ₹20, etc.

---

## 🔒 Authentication

### JWT Token Flow
1. User logs in
2. Server returns JWT token
3. Token stored in localStorage
4. Token sent in `Authorization: Bearer <token>` header
5. Server validates token on each request
6. Token expires in 30 days

### Password Security
- Hashed with bcryptjs (10 salt rounds)
- Never stored plain text
- Verified with secure comparison

---

## 🔄 Data Flow

```
User Registration
↓
Validate input
↓
Hash password
↓
Save to MongoDB
↓
Generate JWT token
↓
Return token & user data

User Booking
↓
Check token validity
↓
Verify slot availability
↓
Create booking record
↓
Update slot status
↓
Update user record
↓
Return confirmation
```

---

## 🚀 Deployment Checklist

- [ ] Update JWT_SECRET
- [ ] Set NODE_ENV=production
- [ ] Update CLIENT_URL
- [ ] Use HTTPS
- [ ] Setup MongoDB Atlas
- [ ] Configure firewall
- [ ] Enable CORS properly
- [ ] Setup logging
- [ ] Add monitoring
- [ ] Test all endpoints

---

## 📞 Quick Help

### Need MongoDB?
- Local: `mongod`
- Cloud: mongodb.com/cloud/atlas

### Need Node.js?
- Download: nodejs.org

### Port conflicts?
- Change PORT in .env
- Update CLIENT_URL accordingly

### Want to reset?
- Delete database: `db.dropDatabase()`
- Run seed: `node seed.js`

---

## 📖 Documentation Files

- **README.md** → Project overview
- **SETUP_GUIDE.md** → Installation steps
- **API_DOCUMENTATION.md** → API endpoints
- **PROJECT_SUMMARY.md** → Complete details
- **backend/SETUP.md** → Backend config

---

## 🎉 You're Ready!

Everything configured and ready to use. Start development with:
- Windows: `start.bat`
- Mac/Linux: `./start.sh`

**Happy coding! 🅿️**

---

**Version**: 1.0.0 | **Updated**: Jan 15, 2025

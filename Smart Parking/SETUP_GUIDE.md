# 🅿️ ParkEase - Complete Setup Guide

## System Requirements

- **Node.js**: v14+ (Get from nodejs.org)
- **MongoDB**: Local or Atlas account
- **npm**: Comes with Node.js
- **Text Editor**: VS Code recommended

---

## 📦 Installation Steps

### Step 1: Install Node.js
Download and install from https://nodejs.org

Verify installation:
```bash
node --version
npm --version
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

This installs:
- express (web server)
- mongoose (MongoDB driver)
- bcryptjs (password hashing)
- jsonwebtoken (JWT auth)
- cors (cross-origin requests)
- dotenv (environment config)
- express-validator (input validation)

### Step 3: Setup MongoDB

**Option A: Local MongoDB (Recommended for Dev)**
- Download from mongodb.com
- Install & run MongoDB service
- Default: mongodb://localhost:27017

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update in `.env` file

### Step 4: Configure Environment

Create `.env` file in `backend/` folder:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/parkease
JWT_SECRET=parkease_super_secret_key_2025
NODE_ENV=development
CLIENT_URL=http://localhost:5500
```

### Step 5: Start Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
╔══════════════════════════════════╗
║  ParkEase Backend Server
║  Running on port 5000
║  Environment: development
╚══════════════════════════════════╝
```

### Step 6: Run Frontend

In a new terminal:

```bash
cd frontend
# If you have Python 3
python -m http.server 5500

# Or if you have Node.js, use http-server
npx http-server -p 5500
```

Frontend runs on: http://localhost:5500

---

## 🎯 Access the Application

1. **Open browser** → http://localhost:5500/frontend/login.html
2. **Register** new account or login
3. **Start booking** parking slots!

---

## 📱 Features to Try

### 1. Register & Login
- Create account with email/password
- Login with credentials
- Profile management

### 2. Book a Slot
- View available parking slots
- Filter by floor and zone
- Click slot to book
- Enter vehicle details
- Confirm booking

### 3. My Booking
- View current active booking
- See booking details
- Complete & leave (calculates cost)
- View booking history

### 4. Dashboard
- Real-time occupancy stats
- Slots available/booked
- Per-floor breakdown
- Occupancy percentage

### 5. Profile
- Update personal info
- Change vehicle details
- Manage account settings

---

## 🔧 API Testing

### Test Login API
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Get Slots
```bash
curl http://localhost:5000/api/booking/slots \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🐛 Troubleshooting

### Issue: Cannot connect to MongoDB
**Solution**: 
- Check if MongoDB is running
- Verify connection string in `.env`
- For MongoDB Atlas, whitelist your IP

### Issue: CORS errors in browser console
**Solution**:
- Ensure backend is running on port 5000
- Check `CLIENT_URL` in `.env` matches frontend URL

### Issue: "Port 5000 already in use"
**Solution**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Issue: Parking slots not showing
**Solution**:
- Restart backend server
- Check MongoDB connection
- Slots auto-initialize on first backend start

### Issue: Cannot book slot
**Solution**:
- Ensure you're logged in
- Verify token is being sent
- Check browser console for errors
- Make sure slot is available (green)

---

## 📊 Database Structure

### Collections Created Automatically

1. **users** - User accounts
2. **bookings** - Parking bookings
3. **parkingslots** - 100 parking slots (4 zones × 2 floors)

### Initial Slots
- **Ground Floor**: Zones A & B (50 slots)
- **First Floor**: Zones C & D (50 slots)
- **Total**: 100 slots

---

## 🔐 Security Notes

### Password Protection
- Passwords hashed with bcryptjs
- Never stored in plain text
- Uses bcrypt salt (10 rounds)

### Token Security
- JWT tokens valid for 30 days
- Token stored in browser localStorage
- Sent in `Authorization` header
- Change `JWT_SECRET` in production!

### CORS Protection
- Only frontend URL allowed to access API
- Update `CLIENT_URL` in `.env`

---

## 📈 Cost Calculation

**Pricing Model**: ₹10 per 30 minutes

Examples:
- 30 min stay = ₹10
- 60 min stay = ₹20
- 90 min stay = ₹30
- 1 hour 15 min = ₹50

---

## 🚀 Going Live

### Before Deployment

1. Change `JWT_SECRET` to strong random string
2. Set `NODE_ENV=production`
3. Use MongoDB Atlas (not local)
4. Update `CLIENT_URL` to your domain
5. Enable HTTPS
6. Setup proper logging

### Deployment Platforms

**Option 1: Railway.app (Recommended)**
```bash
# Push to GitHub
git push origin main

# Connect GitHub to Railway
# Railway auto-deploys on push
```

**Option 2: Heroku**
```bash
heroku login
heroku create parkease-app
git push heroku main
```

**Option 3: DigitalOcean/AWS**
- Create server
- Install Node.js & MongoDB
- Clone repo
- Run with PM2

---

## 📞 Common Commands

```bash
# Start backend dev server
npm run dev

# Start backend production server
npm start

# Install new package
npm install package-name

# Check installed packages
npm list

# Update packages
npm update

# Run tests (if configured)
npm test
```

---

## 💡 Tips & Tricks

1. **Use browser DevTools** (F12) to debug
2. **Check network tab** for API calls
3. **Test with different vehicles** types
4. **Try booking multiple slots** (should fail - only 1 active per user)
5. **Monitor MongoDB** collections via MongoDB Compass GUI

---

## 📚 File Structure

```
Smart Parking/
├── backend/
│   ├── models/              # Database schemas
│   ├── controllers/         # Business logic
│   ├── routes/              # API endpoints
│   ├── middleware/          # Auth & error handling
│   ├── server.js            # Main server
│   ├── package.json         # Dependencies
│   ├── .env                 # Configuration (create this)
│   └── SETUP.md             # Backend setup
├── frontend/
│   ├── login.html           # Login page
│   ├── register.html        # Registration page
│   └── app.html             # Main parking app
└── README.md                # Project info
```

---

## ✅ Checklist

- [ ] Node.js installed
- [ ] MongoDB running
- [ ] Backend `.env` created
- [ ] `npm install` completed
- [ ] Backend running on :5000
- [ ] Frontend running on :5500
- [ ] Can access login page
- [ ] Can register & login
- [ ] Can book a slot
- [ ] Can view dashboard

---

## 🎓 Next Steps

1. **Customize**: Add your logo, colors, brand
2. **Extend**: Add payment integration, SMS alerts
3. **Scale**: Deploy to cloud, handle more users
4. **Monitor**: Add analytics, logging, error tracking

---

**🎉 You're all set! Start parking smart with ParkEase!**

For questions or issues, check the troubleshooting section above.

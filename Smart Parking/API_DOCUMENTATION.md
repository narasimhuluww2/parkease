# 🅿️ ParkEase API Documentation

**Base URL**: `http://localhost:5000/api`

**Authentication**: JWT Token in `Authorization: Bearer <token>` header

---

## 📝 Authentication Endpoints

### Register User
```
POST /auth/register
```

**Request:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+91 9876543210",
  "vehicleType": "car",
  "vehicleNumber": "ABC-1234"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "vehicleType": "car",
    "vehicleNumber": "ABC-1234",
    "totalBookings": 0,
    "activeBooking": null,
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

---

### Login User
```
POST /auth/login
```

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "vehicleType": "car",
    "vehicleNumber": "ABC-1234",
    "totalBookings": 5,
    "activeBooking": null
  }
}
```

---

### Get User Profile
```
GET /auth/profile
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "vehicleType": "car",
    "vehicleNumber": "ABC-1234",
    "totalBookings": 5,
    "activeBooking": "607f2f88bcf86cd799439012"
  }
}
```

---

### Update User Profile
```
PUT /auth/profile
Authorization: Bearer <token>
```

**Request:**
```json
{
  "fullName": "John Smith",
  "phone": "+91 9876543211",
  "vehicleType": "suv",
  "vehicleNumber": "XYZ-5678"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullName": "John Smith",
    "phone": "+91 9876543211",
    "vehicleType": "suv",
    "vehicleNumber": "XYZ-5678"
  }
}
```

---

### Logout
```
POST /auth/logout
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## 🅿️ Parking Slot Endpoints

### Get All Slots
```
GET /booking/slots?floor=Ground%20Floor&zone=A
Authorization: Bearer <token>
```

**Query Parameters:**
- `floor`: "Ground Floor" or "First Floor" (optional)
- `zone`: "A", "B", "C", or "D" (optional)

**Response (200):**
```json
{
  "success": true,
  "count": 25,
  "slots": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "slotId": "A01",
      "floor": "Ground Floor",
      "zone": "A",
      "slotNumber": 1,
      "isAvailable": true,
      "currentUser": null,
      "currentBooking": null,
      "features": ["covered", "cctv"],
      "handicapAccessible": false,
      "lastUpdated": "2025-01-15T10:30:00Z"
    }
  ]
}
```

---

### Get Available Slots
```
GET /booking/slots/available?floor=Ground%20Floor&zone=A
Authorization: Bearer <token>
```

**Response (200):** Same as Get All Slots (only available slots returned)

---

### Get Nearest Available Slot
```
GET /booking/slots/nearest?floor=Ground%20Floor
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "slot": {
    "_id": "507f1f77bcf86cd799439011",
    "slotId": "A01",
    "floor": "Ground Floor",
    "zone": "A",
    "isAvailable": true
  }
}
```

---

## 📅 Booking Endpoints

### Book a Slot
```
POST /booking/book
Authorization: Bearer <token>
```

**Request:**
```json
{
  "slotId": "A01",
  "vehicleNumber": "ABC-1234",
  "vehicleType": "car",
  "notes": "Ground floor preference"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Slot booked successfully",
  "booking": {
    "_id": "607f2f88bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "slotId": "A01",
    "floor": "Ground Floor",
    "zone": "A",
    "slotNumber": 1,
    "vehicleNumber": "ABC-1234",
    "vehicleType": "car",
    "status": "active",
    "bookingTime": "2025-01-15T10:30:00Z",
    "exitTime": null,
    "duration": 0,
    "cost": 0,
    "notes": "Ground floor preference",
    "createdAt": "2025-01-15T10:30:00Z"
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "You already have an active booking"
}
```

---

### Get Current Active Booking
```
GET /booking/current-booking
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "booking": {
    "_id": "607f2f88bcf86cd799439012",
    "slotId": "A01",
    "floor": "Ground Floor",
    "zone": "A",
    "vehicleNumber": "ABC-1234",
    "status": "active",
    "bookingTime": "2025-01-15T10:30:00Z"
  }
}
```

**When No Active Booking:**
```json
{
  "success": true,
  "booking": null,
  "message": "No active booking"
}
```

---

### Get Booking History
```
GET /booking/my-bookings
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "bookings": [
    {
      "_id": "607f2f88bcf86cd799439012",
      "slotId": "A01",
      "floor": "Ground Floor",
      "zone": "A",
      "vehicleNumber": "ABC-1234",
      "status": "completed",
      "bookingTime": "2025-01-15T10:30:00Z",
      "exitTime": "2025-01-15T11:30:00Z",
      "duration": 60,
      "cost": 20
    }
  ]
}
```

---

### Complete Booking (Exit)
```
POST /booking/complete
Authorization: Bearer <token>
```

**Request:**
```json
{
  "bookingId": "607f2f88bcf86cd799439012"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Booking completed successfully",
  "booking": {
    "_id": "607f2f88bcf86cd799439012",
    "slotId": "A01",
    "status": "completed",
    "exitTime": "2025-01-15T11:30:00Z",
    "duration": 60,
    "cost": 20
  }
}
```

**Cost Calculation**: ₹10 per 30 minutes (rounded up)

---

### Cancel Booking
```
POST /booking/cancel
Authorization: Bearer <token>
```

**Request:**
```json
{
  "bookingId": "607f2f88bcf86cd799439012"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Booking cancelled",
  "booking": {
    "_id": "607f2f88bcf86cd799439012",
    "status": "cancelled"
  }
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "Can only cancel active bookings"
}
```

---

## 📊 Statistics Endpoints

### Get Parking Statistics
```
GET /booking/stats
```

**Response (200):**
```json
{
  "success": true,
  "stats": {
    "totalSlots": 100,
    "availableSlots": 75,
    "bookedSlots": 25,
    "occupancyRate": "25.00",
    "activeBookings": 20,
    "completedBookings": 150,
    "slotsByFloor": [
      {
        "_id": "Ground Floor",
        "total": 50,
        "available": 40,
        "booked": 10
      },
      {
        "_id": "First Floor",
        "total": 50,
        "available": 35,
        "booked": 15
      }
    ]
  }
}
```

---

## 🔐 Authentication

### Token Format
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Lifespan
- Valid for **30 days**
- Expires after inactivity
- Must login again after expiration

### Common Errors

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Invalid token"
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "message": "Access denied"
}
```

---

## 🔑 Request Headers

Required for all protected endpoints:
```
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

---

## ❌ Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation error",
  "errors": ["Email already exists", "Password too short"]
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Slot not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Server error"
}
```

---

## 🧪 Example cURL Requests

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

### Book Slot
```bash
curl -X POST http://localhost:5000/api/booking/book \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "slotId": "A01",
    "vehicleNumber": "ABC-1234",
    "vehicleType": "car"
  }'
```

### Get Stats
```bash
curl http://localhost:5000/api/booking/stats
```

---

## 📞 Rate Limiting

Currently **unlimited** requests. Plan to add:
- 100 requests per minute per user
- 1000 requests per minute per IP

---

## 🚀 WebSocket Support (Future)

Real-time slot updates coming soon:
```javascript
// Example (not yet implemented)
const socket = io('http://localhost:5000');
socket.emit('subscribe:slots');
socket.on('slot:updated', (data) => {
  // Handle real-time updates
});
```

---

**API Version**: 1.0.0  
**Last Updated**: January 15, 2025

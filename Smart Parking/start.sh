#!/bin/bash

# ParkEase Quick Start Script for Mac/Linux

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║  ParkEase Smart Parking - Quick Start            ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo "Please download and install from https://nodejs.org"
    echo ""
    exit 1
fi

echo "[✓] Node.js found: $(node --version)"

# Check if MongoDB is running
if ! nc -z localhost 27017 &>/dev/null; then
    echo "[WARNING] MongoDB connection failed"
    echo "Make sure MongoDB is running:"
    echo "  brew services start mongodb-community"
    echo "Or update MONGODB_URI in backend/.env for MongoDB Atlas"
    echo ""
fi

# Install backend dependencies
echo ""
echo "[*] Installing backend dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] npm install failed!"
        exit 1
    fi
fi
echo "[✓] Backend dependencies installed"

# Start backend in background
echo ""
echo "[*] Starting backend server..."
npm run dev &
BACKEND_PID=$!
sleep 3

# Start frontend in background
echo ""
echo "[*] Starting frontend server..."
cd ..
if command -v python3 &> /dev/null; then
    cd frontend && python3 -m http.server 5500 &
else
    cd frontend && npx http-server -p 5500 &
fi
FRONTEND_PID=$!
sleep 2

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║  ParkEase is running!                            ║"
echo "║  Backend:  http://localhost:5000                 ║"
echo "║  Frontend: http://localhost:5500                 ║"
echo "║                                                  ║"
echo "║  Open your browser and go to:                   ║"
echo "║  http://localhost:5500/login.html               ║"
echo "║                                                  ║"
echo "║  Test Account:                                  ║"
echo "║  Email: test@example.com                        ║"
echo "║  Password: password123                          ║"
echo "║                                                  ║"
echo "║  Press Ctrl+C to stop servers                   ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# Wait for signals
wait

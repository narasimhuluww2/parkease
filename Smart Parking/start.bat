http://localhost:5500/frontend/login.html@echo off
REM ParkEase Quick Start Script for Windows

echo.
echo ╔══════════════════════════════════════════════════╗
echo ║  ParkEase Smart Parking - Quick Start            ║
echo ╚══════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo [✓] Node.js found

REM Check if MongoDB is running
powershell -Command "try { $null = [System.Net.Dns]::GetHostAddresses('localhost') } catch { exit 1 }" 2>nul
if errorlevel 1 (
    echo [WARNING] MongoDB connection failed
    echo Make sure MongoDB is running: mongod
    echo Or update MONGODB_URI in backend\.env for MongoDB Atlas
    echo.
)

REM Install backend dependencies
echo.
echo [*] Installing backend dependencies...
cd backend
if not exist node_modules (
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed!
        pause
        exit /b 1
    )
)
echo [✓] Backend dependencies installed

REM Start backend in new window
echo.
echo [*] Starting backend server...
start cmd /k "npm run dev"
timeout /t 3 /nobreak

REM Start frontend in new window
echo.
echo [*] Starting frontend server...
cd ..
start cmd /k "cd frontend && python -m http.server 5500 || npx http-server -p 5500"
timeout /t 2 /nobreak

echo.
echo ╔══════════════════════════════════════════════════╗
echo ║  ParkEase is starting...                         ║
echo ║  Backend:  http://localhost:5000                 ║
echo ║  Frontend: http://localhost:5500                 ║
echo ║                                                  ║
echo ║  Open your browser and go to:                   ║
echo ║  http://localhost:5500/frontend/login.html      ║
echo ║                                                  ║
echo ║  Login with test account:                       ║
echo ║  Email: test@example.com                        ║
echo ║  Password: password123                          ║
echo ╚══════════════════════════════════════════════════╝
echo.

pause

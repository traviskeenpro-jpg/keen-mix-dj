@echo off
REM Keen Mix DJ - Start Script for Windows

echo.
echo 🎧 Starting Keen Mix DJ...
echo.

if not exist node_modules (
    echo 📦 Dependencies not installed. Running npm install...
    npm install
)

echo 🚀 Starting services...
echo    Frontend: http://localhost:5173
echo    Backend: http://localhost:5000
echo.
echo Press Ctrl+C to stop
echo.

npm start

pause

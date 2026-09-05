@echo off
REM Keen Mix DJ - Automated Setup Script for Windows

echo.
echo 🎧 Welcome to Keen Mix DJ Setup!
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed!
    echo 📥 Please install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found: 
node --version
echo ✅ npm found:
npm --version
echo.

REM Create uploads directory
echo 📁 Creating uploads directory...
if not exist uploads mkdir uploads
echo ✅ Uploads directory created
echo.

REM Install dependencies
echo 📦 Installing dependencies...
echo    (This may take 2-3 minutes...)
echo.
npm install

if %errorlevel% equ 0 (
    echo.
    echo ✅ Setup Complete!
    echo.
    echo 🚀 To start the app, run:
    echo    npm start
    echo.
    echo 📱 Then open: http://localhost:5173
    echo.
    pause
) else (
    echo.
    echo ❌ Setup failed! Please check errors above.
    pause
    exit /b 1
)

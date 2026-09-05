#!/bin/bash

# Keen Mix DJ - Automated Setup Script

echo "🎧 Welcome to Keen Mix DJ Setup!"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "📥 Please install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"
echo ""

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p uploads
echo "✅ Uploads directory created"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
echo "   (This may take 2-3 minutes...)"
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Setup Complete!"
    echo ""
    echo "🚀 To start the app, run:"
    echo "   npm start"
    echo ""
    echo "📱 Then open: http://localhost:5173"
    echo ""
else
    echo "❌ Setup failed! Please check errors above."
    exit 1
fi

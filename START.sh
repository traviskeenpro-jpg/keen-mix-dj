#!/bin/bash

# Keen Mix DJ - Start Script

echo "🎧 Starting Keen Mix DJ..."
echo ""

if [ ! -d "node_modules" ]; then
    echo "📦 Dependencies not installed. Running npm install..."
    npm install
fi

echo "🚀 Starting services..."
echo "   Frontend: http://localhost:5173"
echo "   Backend: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop"
echo ""

npm start

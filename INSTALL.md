# 🎧 Keen Mix DJ - Installation Guide

## Quick Start (5 minutes)

### Prerequisites
Make sure you have:
- **Node.js** v16+ ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **npm** (comes with Node.js)

### Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/traviskeenpro-jpg/keen-mix-dj.git
cd keen-mix-dj

# Install all dependencies
npm install
```

### Step 2: Create Required Folders

```bash
# Create uploads folder for media files
mkdir uploads
```

### Step 3: Start the App

**Option A: Run Both Frontend & Backend (Easiest)**

```bash
npm start
```

This will automatically start:
- 🎨 Frontend at `http://localhost:5173`
- 🔧 Backend at `http://localhost:5000`

**Option B: Run Separately (More Control)**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run server
```

### Step 4: Open in Browser

Go to: **`http://localhost:5173`**

✅ You're ready to mix!

---

## 🎯 First Time Usage

1. **Load Track**: Click "🎧 Load" on Deck A
2. **Select Audio File**: Choose an MP3, WAV, or other audio file
3. **Play**: Click ▶️ button
4. **Adjust**: Use sliders for tempo and volume
5. **Switch Modes**: Click "Audio", "Video", or "Hybrid" at the top
6. **Add Effects**: Click effect cards to customize
7. **Record**: Click "📹 Record" to save your mix

---

## 🛠️ Available Commands

```bash
npm start              # Run frontend + backend together
npm run dev           # Run frontend only (http://localhost:5173)
npm run server        # Run backend only (http://localhost:5000)
npm run build         # Build for production
npm run preview       # Preview production build
npm install           # Install dependencies
```

---

## 📁 Folder Structure

```
keen-mix-dj/
├── src/                    # Frontend React code
│   ├── components/         # React components
│   ├── services/           # Audio & Video engines
│   ├── styles/             # CSS files
│   └── App.jsx             # Main app
├── server/                 # Backend (Express.js)
├── public/                 # Static files
├── uploads/                # User uploaded files (create this)
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── README.md               # Full documentation
```

---

## 🔧 Troubleshooting

### Issue: "npm: command not found"
**Solution**: Install Node.js from https://nodejs.org/

### Issue: Port 5173 already in use
**Solution**:
```bash
npm run dev -- --port 3000
```

### Issue: Port 5000 already in use
**Solution**: Edit `server/server.js`, change `PORT = 5000` to another port (e.g., 8000)

### Issue: Audio files won't load
**Solution**:
1. Make sure `uploads/` folder exists
2. Check if file format is supported (MP3, WAV, OGG)
3. Open browser console (F12) and check for errors

### Issue: "Cannot find module" errors
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🌐 Production Deployment

### Build for Production
```bash
npm run build
```

This creates a `dist/` folder with optimized files.

### Deploy to Vercel, Netlify, or Heroku

**Vercel:**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 📊 System Requirements

- **OS**: Windows, macOS, or Linux
- **Node.js**: v16 or higher
- **RAM**: 2GB minimum (4GB recommended)
- **Disk Space**: 500MB for node_modules
- **Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

---

## 🎵 Supported File Formats

**Audio**: MP3, WAV, OGG, FLAC, M4A
**Video**: MP4, WebM, OGG, MOV

---

## 💬 Need Help?

- Check [README.md](README.md) for detailed features
- Open GitHub Issues for bugs
- Join our community discussions

---

## ⚡ Performance Tips

1. Use high-quality audio files (320kbps MP3 or higher)
2. Close other apps to free up RAM
3. Use Chrome for best performance
4. Don't load files larger than 500MB
5. Clear browser cache periodically

---

**Happy Mixing! 🎧🎉**

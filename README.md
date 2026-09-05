# Keen Mix DJ

A comprehensive DJ application with professional audio and video mixing capabilities, inspired by the djay algorithm.

## Features

### Audio Mixing
- **Dual Deck System**: Two independent audio decks with separate controls
- **Real-time Beat Matching**: Automatic BPM detection and synchronization
- **Crossfader**: Smooth transitions between tracks
- **EQ Controls**: 3-band equalizer (Bass, Mid, Treble) per deck
- **Effects**: Reverb, Delay, Echo, Filter, Flanger, Phaser
- **Vinyl Simulation**: Scratching and pitch control
- **Waveform Visualization**: Real-time audio waveform display
- **Cue Points**: Mark and navigate to specific positions in tracks
- **Hot Cues**: Quick access to preset cue points

### Video Mixing
- **Dual Video Decks**: Mix and blend video tracks
- **Real-time Video Blending**: Crossfade between video sources
- **Video Effects**: Color correction, brightness, contrast, saturation
- **Transition Effects**: Fade, Slide, Wipe, Dissolve
- **Video Synchronization**: Sync video playback with audio BPM
- **Live Camera Input**: Support for webcam/camera sources
- **Screen Capture**: Record screen content as video source

### Advanced Features
- **Playlist Management**: Organize and queue tracks
- **Loop & Cue**: Set and control loop points
- **Tempo Control**: Speed up/slow down tracks independently
- **Frequency Spectrum Analyzer**: Visual frequency analysis
- **Recording**: Record your DJ mixes (audio and video)
- **Sync Library**: Search and manage music library
- **History**: Track played tracks and mixes

## Project Structure

```
keen-mix-dj/
├── src/
│   ├── components/
│   │   ├── Deck.jsx
│   │   ├── Mixer.jsx
│   │   ├── Effects.jsx
│   │   ├── Waveform.jsx
│   │   ├── VideoPlayer.jsx
│   │   └── Visualizer.jsx
│   ├── services/
│   │   ├── audioEngine.js
│   │   ├── videoEngine.js
│   │   ├── beatDetection.js
│   │   └── effectsProcessor.js
│   ├── stores/
│   │   ├── audioStore.js
│   │   └── videoStore.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   └── App.jsx
├── server/
│   └── server.js
├── public/
└── package.json
```

## Installation

```bash
git clone https://github.com/traviskeenpro-jpg/keen-mix-dj.git
cd keen-mix-dj
npm install
```

## Usage

### Development

```bash
npm run dev
```

The app will run on `http://localhost:5173`

### Production Build

```bash
npm run build
```

## Core Technologies

- **Tone.js**: Audio synthesis and playback
- **WaveSurfer.js**: Waveform visualization
- **FFmpeg.wasm**: Video processing
- **Three.js**: 3D visualizations
- **Canvas API**: Real-time graphics rendering
- **Web Audio API**: Low-level audio control
- **React**: UI framework
- **Vite**: Build tool

## API Endpoints

### Audio
- `POST /api/upload/audio` - Upload audio file
- `GET /api/audio/:id` - Get audio file
- `GET /api/audio/:id/analyze` - Analyze BPM and frequencies

### Video
- `POST /api/upload/video` - Upload video file
- `GET /api/video/:id` - Get video file
- `POST /api/video/blend` - Blend two video streams

### Mix Recording
- `POST /api/recording/start` - Start recording mix
- `POST /api/recording/stop` - Stop and save recording
- `GET /api/recordings` - List all recordings

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Roadmap

- [ ] Video mixing implementation
- [ ] GPU acceleration for effects
- [ ] Machine learning-based beat detection
- [ ] Cloud storage integration
- [ ] Multi-track support (4+ decks)
- [ ] Mobile app version
- [ ] AI-powered smart mixing
- [ ] Real-time collaboration features

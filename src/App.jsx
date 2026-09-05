import React, { useState, useEffect } from 'react';
import './App.css';
import Mixer from './components/Mixer';
import AudioEngine from './services/audioEngine';
import VideoEngine from './services/videoEngine';

function App() {
  const [audioEngine] = useState(() => new AudioEngine());
  const [videoEngine] = useState(() => new VideoEngine());
  const [mode, setMode] = useState('audio'); // 'audio' or 'video' or 'hybrid'

  useEffect(() => {
    return () => {
      audioEngine.cleanup();
      videoEngine.cleanup();
    };
  }, [audioEngine, videoEngine]);

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎧 Keen Mix DJ</h1>
        <div className="mode-selector">
          <button
            className={`mode-btn ${mode === 'audio' ? 'active' : ''}`}
            onClick={() => setMode('audio')}
          >
            🎵 Audio
          </button>
          <button
            className={`mode-btn ${mode === 'video' ? 'active' : ''}`}
            onClick={() => setMode('video')}
          >
            🎬 Video
          </button>
          <button
            className={`mode-btn ${mode === 'hybrid' ? 'active' : ''}`}
            onClick={() => setMode('hybrid')}
          >
            🎙️ Hybrid
          </button>
        </div>
      </header>
      <main className="app-main">
        <Mixer
          audioEngine={audioEngine}
          videoEngine={videoEngine}
          mode={mode}
        />
      </main>
    </div>
  );
}

export default App;

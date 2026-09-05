import React, { useState } from 'react';
import '../styles/Deck.css';

const Deck = ({ side, audioEngine, videoEngine, mode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [tempo, setTempo] = useState(100);
  const [volume, setVolume] = useState(0.8);
  const [bpm, setBpm] = useState(120);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (mode === 'audio' || mode === 'hybrid') {
      try {
        const analysis = await audioEngine.loadTrack(file, side);
        setCurrentTrack(file.name);
        setBpm(analysis.bpm);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    }

    if (mode === 'video' || mode === 'hybrid') {
      try {
        await videoEngine.loadTrack(file, side);
      } catch (error) {
        console.error('Error loading video:', error);
      }
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioEngine.pause(side);
      if (mode === 'video' || mode === 'hybrid') {
        videoEngine.pause(side);
      }
    } else {
      audioEngine.play(side);
      if (mode === 'video' || mode === 'hybrid') {
        videoEngine.play(side);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleTempoChange = (value) => {
    setTempo(value);
    audioEngine.setTempo(side, value / 100);
    if (mode === 'video' || mode === 'hybrid') {
      videoEngine.setSpeed(side, value / 100);
    }
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    audioEngine.setVolume(side, value);
    if (mode === 'video' || mode === 'hybrid') {
      videoEngine.setVolume(side, value);
    }
  };

  return (
    <div className={`deck deck-${side}`}>
      <div className="deck-header">
        <h2>Deck {side === 'left' ? 'A' : 'B'}</h2>
        <span className="bpm-display">BPM: {bpm}</span>
      </div>

      <div className="deck-waveform">
        <div className="waveform-placeholder">
          {currentTrack ? (
            <div className="track-info">
              <p>{currentTrack}</p>
            </div>
          ) : (
            <p>No track loaded</p>
          )}
        </div>
      </div>

      <div className="deck-controls">
        <button className="play-btn" onClick={togglePlayPause}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <label className="file-input-label">
          📁 Load
          <input
            type="file"
            accept={mode === 'video' || mode === 'hybrid' ? 'video/*,audio/*' : 'audio/*'}
            onChange={handleFileUpload}
            className="file-input"
          />
        </label>
      </div>

      <div className="deck-sliders">
        <div className="slider-group">
          <label>Tempo</label>
          <input
            type="range"
            min="50"
            max="150"
            step="1"
            value={tempo}
            onChange={(e) => handleTempoChange(parseInt(e.target.value))}
            className="tempo-slider"
          />
          <span>{tempo}%</span>
        </div>

        <div className="slider-group">
          <label>Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="volume-slider"
          />
          <span>{Math.round(volume * 100)}%</span>
        </div>
      </div>
    </div>
  );
};

export default Deck;

import React, { useState } from 'react';
import Deck from './Deck';
import Effects from './Effects';
import Visualizer from './Visualizer';
import '../styles/Mixer.css';

const Mixer = ({ audioEngine, videoEngine, mode }) => {
  const [crossfadeValue, setCrossfadeValue] = useState(0.5);
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [isMixing, setIsMixing] = useState(false);

  const handleCrossfade = (value) => {
    setCrossfadeValue(value);
    audioEngine.setCrossfader(value);
    if (mode === 'video' || mode === 'hybrid') {
      videoEngine.setCrossfader(value);
    }
  };

  const handleMasterVolume = (value) => {
    setMasterVolume(value);
    audioEngine.setMasterVolume(value);
  };

  const startRecording = () => {
    setIsMixing(true);
    audioEngine.startRecording();
    if (mode === 'video' || mode === 'hybrid') {
      videoEngine.startRecording();
    }
  };

  const stopRecording = () => {
    setIsMixing(false);
    audioEngine.stopRecording();
    if (mode === 'video' || mode === 'hybrid') {
      videoEngine.stopRecording();
    }
  };

  return (
    <div className="mixer-container">
      <div className="decks-section">
        <Deck
          side="left"
          audioEngine={audioEngine}
          videoEngine={videoEngine}
          mode={mode}
        />
        <div className="mixer-center">
          <Visualizer audioEngine={audioEngine} />
          <div className="controls-section">
            <div className="crossfader-control">
              <label>Crossfader</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={crossfadeValue}
                onChange={(e) => handleCrossfade(parseFloat(e.target.value))}
                className="crossfader-slider"
              />
            </div>
            <div className="master-volume-control">
              <label>Master Volume</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={masterVolume}
                onChange={(e) => handleMasterVolume(parseFloat(e.target.value))}
                className="volume-slider"
              />
              <span>{Math.round(masterVolume * 100)}%</span>
            </div>
            <div className="recording-controls">
              {!isMixing ? (
                <button className="record-btn" onClick={startRecording}>
                  ⏺️ Record
                </button>
              ) : (
                <button className="stop-btn" onClick={stopRecording}>
                  ⏹️ Stop
                </button>
              )}
            </div>
          </div>
          <Effects audioEngine={audioEngine} />
        </div>
        <Deck
          side="right"
          audioEngine={audioEngine}
          videoEngine={videoEngine}
          mode={mode}
        />
      </div>
    </div>
  );
};

export default Mixer;

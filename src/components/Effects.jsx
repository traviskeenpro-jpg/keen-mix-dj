import React, { useState } from 'react';
import '../styles/Effects.css';

const Effects = ({ audioEngine }) => {
  const [activeEffect, setActiveEffect] = useState(null);
  const [effects, setEffects] = useState({
    reverb: { dry: 1, wet: 0.3, decay: 2.5 },
    delay: { time: 0.5, feedback: 0.4, wet: 0.3 },
    filter: { frequency: 20000, type: 'lowpass' },
    flanger: { rate: 0.5, depth: 0.2 },
    phaser: { rate: 0.5, depth: 0.2 },
    echo: { time: 0.5, feedback: 0.4, wet: 0.3 },
  });

  const handleEffectToggle = (effectName) => {
    setActiveEffect(activeEffect === effectName ? null : effectName);
    audioEngine.toggleEffect(effectName);
  };

  const handleEffectChange = (effectName, param, value) => {
    setEffects((prev) => ({
      ...prev,
      [effectName]: {
        ...prev[effectName],
        [param]: parseFloat(value),
      },
    }));
    audioEngine.setEffectParam(effectName, param, parseFloat(value));
  };

  return (
    <div className="effects-panel">
      <h3>Effects</h3>
      <div className="effects-grid">
        {Object.keys(effects).map((effectName) => (
          <div
            key={effectName}
            className={`effect-card ${activeEffect === effectName ? 'active' : ''}`}
            onClick={() => handleEffectToggle(effectName)}
          >
            <h4>{effectName.toUpperCase()}</h4>
            {activeEffect === effectName && (
              <div className="effect-controls">
                {Object.entries(effects[effectName]).map(([param, value]) => (
                  <div key={param} className="effect-control">
                    <label>{param}</label>
                    <input
                      type="range"
                      min="0"
                      max={param === 'frequency' ? '20000' : '1'}
                      step="0.01"
                      value={value}
                      onChange={(e) =>
                        handleEffectChange(effectName, param, e.target.value)
                      }
                    />
                    <span>{typeof value === 'number' ? value.toFixed(2) : value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Effects;

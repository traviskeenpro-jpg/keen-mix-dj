import React, { useEffect, useRef } from 'react';
import '../styles/Visualizer.css';

const Visualizer = ({ audioEngine }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const draw = () => {
      // Get frequency data from audio engine
      const frequencyData = audioEngine.getFrequencyData();
      const waveformData = audioEngine.getWaveformData();

      // Clear canvas
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw frequency bars
      if (frequencyData && frequencyData.length > 0) {
        const barWidth = canvas.width / frequencyData.length;
        frequencyData.forEach((value, index) => {
          const height = (value / 255) * canvas.height;
          const hue = (index / frequencyData.length) * 360;
          ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
          ctx.fillRect(index * barWidth, canvas.height - height, barWidth - 2, height);
        });
      }

      // Draw waveform
      if (waveformData && waveformData.length > 0) {
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const sliceWidth = (canvas.width * 1.0) / waveformData.length;
        let x = 0;

        waveformData.forEach((value, index) => {
          const y = ((value + 128) / 256) * canvas.height;
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        });
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [audioEngine]);

  return (
    <div className="visualizer-container">
      <canvas ref={canvasRef} width={800} height={200} className="visualizer-canvas" />
    </div>
  );
};

export default Visualizer;

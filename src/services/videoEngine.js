class VideoEngine {
  constructor() {
    this.videos = {
      left: null,
      right: null,
    };
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.isRecording = false;
    this.mediaRecorder = null;
    this.crossfaderValue = 0.5;
  }

  async loadTrack(file, side) {
    try {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.crossOrigin = 'anonymous';
      
      await new Promise((resolve) => {
        video.onloadedmetadata = () => {
          this.videos[side] = video;
          resolve();
        };
      });

      return {
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
      };
    } catch (error) {
      console.error('Error loading video:', error);
      throw error;
    }
  }

  play(side) {
    if (this.videos[side]) {
      this.videos[side].play();
    }
  }

  pause(side) {
    if (this.videos[side]) {
      this.videos[side].pause();
    }
  }

  setVolume(side, volume) {
    if (this.videos[side]) {
      this.videos[side].volume = volume;
    }
  }

  setSpeed(side, speed) {
    if (this.videos[side]) {
      this.videos[side].playbackRate = speed;
    }
  }

  setCrossfader(value) {
    this.crossfaderValue = value;
    this.blendVideos();
  }

  blendVideos() {
    if (!this.videos.left || !this.videos.right) return;

    const leftVideo = this.videos.left;
    const rightVideo = this.videos.right;

    // Set canvas dimensions
    this.canvas.width = leftVideo.videoWidth;
    this.canvas.height = leftVideo.videoHeight;

    // Draw left video with alpha based on crossfader
    this.ctx.globalAlpha = 1 - this.crossfaderValue;
    this.ctx.drawImage(leftVideo, 0, 0);

    // Draw right video with alpha based on crossfader
    this.ctx.globalAlpha = this.crossfaderValue;
    this.ctx.drawImage(rightVideo, 0, 0);

    this.ctx.globalAlpha = 1; // Reset alpha
  }

  applyEffect(effect, params) {
    // Apply visual effects like color correction, brightness, contrast, etc.
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;

    switch (effect) {
      case 'brightness':
        this.adjustBrightness(data, params.value);
        break;
      case 'contrast':
        this.adjustContrast(data, params.value);
        break;
      case 'saturation':
        this.adjustSaturation(data, params.value);
        break;
      case 'hue':
        this.adjustHue(data, params.value);
        break;
      default:
        break;
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  adjustBrightness(data, value) {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, data[i] + value);
      data[i + 1] = Math.min(255, data[i + 1] + value);
      data[i + 2] = Math.min(255, data[i + 2] + value);
    }
  }

  adjustContrast(data, value) {
    const factor = (259 * (value + 255)) / (255 * (259 - value));
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, factor * (data[i] - 128) + 128);
      data[i + 1] = Math.min(255, factor * (data[i + 1] - 128) + 128);
      data[i + 2] = Math.min(255, factor * (data[i + 2] - 128) + 128);
    }
  }

  adjustSaturation(data, value) {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      data[i] = Math.round(gray + (r - gray) * value);
      data[i + 1] = Math.round(gray + (g - gray) * value);
      data[i + 2] = Math.round(gray + (b - gray) * value);
    }
  }

  adjustHue(data, value) {
    // HSL color space adjustment
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i] / 255;
      const g = data[i + 1] / 255;
      const b = data[i + 2] / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
            break;
          case g:
            h = ((b - r) / d + 2) / 6;
            break;
          case b:
            h = ((r - g) / d + 4) / 6;
            break;
        }
      }

      h = (h + value / 360) % 1;
      // Convert back to RGB (simplified)
    }
  }

  startRecording() {
    this.isRecording = true;
    const stream = this.canvas.captureStream(30);
    this.mediaRecorder = new MediaRecorder(stream);
    console.log('Video recording started');
  }

  stopRecording() {
    this.isRecording = false;
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      console.log('Video recording stopped');
    }
  }

  cleanup() {
    this.videos = { left: null, right: null };
  }
}

export default VideoEngine;

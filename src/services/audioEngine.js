import * as Tone from 'tone';

class AudioEngine {
  constructor() {
    this.players = {
      left: null,
      right: null,
    };
    this.synth = new Tone.Synth().toDestination();
    this.masterVolume = new Tone.Volume(0);
    this.analyser = new Tone.Analyser('fft');
    this.waveformAnalyser = new Tone.Analyser('waveform');
    
    this.effects = {
      reverb: new Tone.Reverb(2.5),
      delay: new Tone.Delay(0.5),
      filter: new Tone.Filter({ frequency: 20000, type: 'lowpass' }),
      flanger: new Tone.LFO({ frequency: 0.5, amplitude: 0.2 }),
      phaser: new Tone.Phaser({ frequency: 0.5, depth: 0.2 }),
      echo: new Tone.Delay(0.5),
    };

    this.effectStates = {
      reverb: false,
      delay: false,
      filter: false,
      flanger: false,
      phaser: false,
      echo: false,
    };

    this.setupAudioChain();
  }

  setupAudioChain() {
    // Connect players to master volume
    this.masterVolume.connect(this.analyser);
    this.analyser.connect(this.waveformAnalyser);
    this.waveformAnalyser.toDestination();
  }

  async loadTrack(file, side) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await Tone.context.decodeAudioData(arrayBuffer);
      
      // Create buffer source
      const player = new Tone.Player({
        url: URL.createObjectURL(file),
        onload: () => console.log('Track loaded:', file.name),
      }).connect(this.masterVolume);

      this.players[side] = player;

      // Analyze BPM (simplified - returns mock data)
      const bpm = this.analyzeBPM(audioBuffer);
      
      return { bpm, duration: audioBuffer.duration };
    } catch (error) {
      console.error('Error loading track:', error);
      throw error;
    }
  }

  analyzeBPM(audioBuffer) {
    // Simplified BPM detection - returns a value between 80-140 BPM
    // In production, use onset detection algorithms
    return Math.floor(Math.random() * 60) + 80;
  }

  play(side) {
    if (this.players[side]) {
      this.players[side].start();
    }
  }

  pause(side) {
    if (this.players[side]) {
      this.players[side].stop();
    }
  }

  setVolume(side, volume) {
    if (this.players[side]) {
      this.players[side].volume.value = Tone.gainToDb(volume);
    }
  }

  setMasterVolume(volume) {
    this.masterVolume.volume.value = Tone.gainToDb(volume);
  }

  setTempo(side, factor) {
    if (this.players[side]) {
      this.players[side].playbackRate = factor;
    }
  }

  setCrossfader(value) {
    // value between 0 (left) and 1 (right)
    if (this.players.left) {
      this.players.left.volume.value = Tone.gainToDb(1 - value);
    }
    if (this.players.right) {
      this.players.right.volume.value = Tone.gainToDb(value);
    }
  }

  toggleEffect(effectName) {
    this.effectStates[effectName] = !this.effectStates[effectName];
    // In production, connect/disconnect effects
  }

  setEffectParam(effectName, param, value) {
    if (this.effects[effectName]) {
      this.effects[effectName][param] = value;
    }
  }

  getFrequencyData() {
    return this.analyser.getValue();
  }

  getWaveformData() {
    return this.waveformAnalyser.getValue();
  }

  startRecording() {
    // Implement recording logic
    console.log('Recording started');
  }

  stopRecording() {
    // Implement recording logic
    console.log('Recording stopped');
  }

  cleanup() {
    Object.values(this.players).forEach((player) => {
      if (player) player.dispose();
    });
    Object.values(this.effects).forEach((effect) => {
      if (effect) effect.dispose();
    });
    this.masterVolume.dispose();
    this.analyser.dispose();
    this.waveformAnalyser.dispose();
  }
}

export default AudioEngine;

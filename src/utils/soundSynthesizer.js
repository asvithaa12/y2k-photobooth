// Web Audio API Sound Synthesizer
let audioCtx = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
};

export const playClickSound = () => {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.08);
    
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (err) {
    console.warn('Sound synthesis failed', err);
  }
};

export const playShutterSound = () => {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    const bufferSize = ctx.sampleRate * 0.2; // 0.2 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Fill the buffer with white noise for the shutter click
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
    
    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    noiseNode.start();
    
    // Add a sharp click osc
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.frequency.setValueAtTime(2000, ctx.currentTime);
    clickOsc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.04);
    clickGain.gain.setValueAtTime(0.4, ctx.currentTime);
    clickGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
    
    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start();
    clickOsc.stop(ctx.currentTime + 0.04);
    
    // Add a trailing wind-down whir sound
    const whirOsc = ctx.createOscillator();
    const whirGain = ctx.createGain();
    whirOsc.type = 'triangle';
    whirOsc.frequency.setValueAtTime(150, ctx.currentTime + 0.1);
    whirOsc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.25);
    whirGain.gain.setValueAtTime(0.12, ctx.currentTime + 0.1);
    whirGain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.25);
    
    whirOsc.connect(whirGain);
    whirGain.connect(ctx.destination);
    whirOsc.start(ctx.currentTime + 0.1);
    whirOsc.stop(ctx.currentTime + 0.25);
    
  } catch (err) {
    console.warn('Sound synthesis failed', err);
  }
};

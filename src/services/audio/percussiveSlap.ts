/**
 * Authentic Acoustic Guitar Thumb-Slap / Percussive Snare Synthesizer
 * Emulates the acoustic guitar percussive string slap (dead note / 'x' on tablature)
 * as heard in fingerstyle pieces like John Mayer's Neon.
 */

class PercussiveSlapSynth {
  private audioContext: AudioContext | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private volume: number = 0.85;

  private getAudioContext(): AudioContext {
    if (!this.audioContext || this.audioContext.state === 'closed') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioCtx();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  private getNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (this.noiseBuffer) return this.noiseBuffer;
    const bufferSize = ctx.sampleRate * 0.15; // 150ms buffer
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    this.noiseBuffer = buffer;
    return buffer;
  }

  setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  playSlap(customVolume?: number) {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const vol = (customVolume !== undefined ? customVolume : this.volume);

      // --- 1. Low Resonant Body Thump (Guitar soundboard acoustic thump) ---
      const thumpOsc = ctx.createOscillator();
      const thumpGain = ctx.createGain();

      thumpOsc.type = 'triangle';
      // Pitch drop: 160Hz -> 42Hz
      thumpOsc.frequency.setValueAtTime(160, now);
      thumpOsc.frequency.exponentialRampToValueAtTime(42, now + 0.05);

      thumpGain.gain.setValueAtTime(0.8 * vol, now);
      thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

      thumpOsc.connect(thumpGain);
      thumpGain.connect(ctx.destination);

      thumpOsc.start(now);
      thumpOsc.stop(now + 0.08);

      // --- 2. String Snare / Slap Click (Fretboard string strike) ---
      const noiseBuffer = this.getNoiseBuffer(ctx);
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(2400, now);
      bandpass.Q.setValueAtTime(1.5, now);

      const snareGain = ctx.createGain();
      snareGain.gain.setValueAtTime(0.9 * vol, now);
      snareGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      noiseSource.connect(bandpass);
      bandpass.connect(snareGain);
      snareGain.connect(ctx.destination);

      noiseSource.start(now);
      noiseSource.stop(now + 0.05);

      // --- 3. High Transient Snap (Nail / Fret contact click) ---
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();

      clickOsc.type = 'sine';
      clickOsc.frequency.setValueAtTime(950, now);
      clickOsc.frequency.exponentialRampToValueAtTime(200, now + 0.02);

      clickGain.gain.setValueAtTime(0.4 * vol, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);

      clickOsc.start(now);
      clickOsc.stop(now + 0.03);
    } catch (e) {
      // AudioContext may be restricted before user gesture
    }
  }
}

export const percussiveSlap = new PercussiveSlapSynth();

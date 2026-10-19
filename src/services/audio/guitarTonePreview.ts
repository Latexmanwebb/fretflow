/**
 * Realistic WebAudio Guitar Timbre Synthesizer for instant patch preview
 * Provides audibly distinct sonic signatures across Nylon, Steel, Strat, Overdrive, and Distortion.
 */

class GuitarTonePreviewService {
  private ctx: AudioContext | null = null;

  private getAudioContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  private makeDistortionCurve(amount: number, type: 'soft' | 'hard'): Float32Array {
    const k = amount;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;

    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      if (type === 'soft') {
        // Warm tube-like soft saturation
        curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
      } else {
        // High gain hard clipping metal distortion
        const gain = 1 + k * 0.1;
        const val = x * gain;
        curve[i] = Math.max(-0.85, Math.min(0.85, val));
      }
    }
    return curve;
  }

  /**
   * Synthesize an instant plucked guitar tone with distinct timbre characteristics
   */
  public playPluck(patchId: number, freq = 220, startTimeOffset = 0, duration = 0.65) {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime + startTimeOffset;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.connect(ctx.destination);

      // Fundamental and Harmonic Oscillators for string richness
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const oscGain2 = ctx.createGain();

      const filter = ctx.createBiquadFilter();

      switch (patchId) {
        case 24: // Classical Nylon Guitar (Warm, mellow, round, soft attack)
          osc1.type = 'triangle';
          osc1.frequency.setValueAtTime(freq, now);

          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(freq * 2, now);
          oscGain2.gain.setValueAtTime(0.2, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1400, now);
          filter.frequency.exponentialRampToValueAtTime(600, now + duration);

          masterGain.gain.setValueAtTime(0.35, now);
          masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

          osc1.connect(filter);
          osc2.connect(oscGain2);
          oscGain2.connect(filter);
          filter.connect(masterGain);
          break;

        case 25: // Acoustic Steel (Bright, rich metallic harmonics, crisp attack)
          osc1.type = 'sawtooth';
          osc1.frequency.setValueAtTime(freq, now);

          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(freq * 3, now);
          oscGain2.gain.setValueAtTime(0.3, now);

          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(2800, now);
          filter.Q.setValueAtTime(1.2, now);

          // Percussive pick click
          const clickOsc = ctx.createOscillator();
          const clickGain = ctx.createGain();
          clickOsc.type = 'square';
          clickOsc.frequency.setValueAtTime(3200, now);
          clickGain.gain.setValueAtTime(0.18, now);
          clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          clickOsc.connect(clickGain);
          clickGain.connect(masterGain);
          clickOsc.start(now);
          clickOsc.stop(now + 0.05);

          masterGain.gain.setValueAtTime(0.4, now);
          masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

          osc1.connect(filter);
          osc2.connect(oscGain2);
          oscGain2.connect(filter);
          filter.connect(masterGain);
          break;

        case 27: // Clean Stratocaster (Glassy single-coil chime, scooped mids, bell attack)
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(freq, now);

          osc2.type = 'sawtooth';
          osc2.frequency.setValueAtTime(freq * 2, now);
          oscGain2.gain.setValueAtTime(0.45, now);

          filter.type = 'peaking';
          filter.frequency.setValueAtTime(3200, now);
          filter.gain.setValueAtTime(6, now);
          filter.Q.setValueAtTime(2.0, now);

          masterGain.gain.setValueAtTime(0.38, now);
          masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

          osc1.connect(filter);
          osc2.connect(oscGain2);
          oscGain2.connect(filter);
          filter.connect(masterGain);
          break;

        case 29: // Overdriven Rock (Warm saturated tube grit, singing sustain)
          osc1.type = 'sawtooth';
          osc1.frequency.setValueAtTime(freq, now);

          osc2.type = 'square';
          osc2.frequency.setValueAtTime(freq * 0.5, now); // Sub-octave body
          oscGain2.gain.setValueAtTime(0.25, now);

          const shaperOd = ctx.createWaveShaper();
          shaperOd.curve = this.makeDistortionCurve(35, 'soft') as any;
          shaperOd.oversample = '4x';

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(2400, now);

          masterGain.gain.setValueAtTime(0.32, now);
          masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.2);

          osc1.connect(shaperOd);
          osc2.connect(oscGain2);
          oscGain2.connect(shaperOd);
          shaperOd.connect(filter);
          filter.connect(masterGain);
          break;

        case 30: // Distortion Metal (Aggressive high-gain fuzz, tight low-end chug)
          osc1.type = 'sawtooth';
          osc1.frequency.setValueAtTime(freq, now);

          osc2.type = 'sawtooth';
          osc2.frequency.setValueAtTime(freq * 1.006, now); // Detuned doubling
          oscGain2.gain.setValueAtTime(0.5, now);

          const shaperDist = ctx.createWaveShaper();
          shaperDist.curve = this.makeDistortionCurve(95, 'hard') as any;
          shaperDist.oversample = '4x';

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(3800, now);

          masterGain.gain.setValueAtTime(0.3, now);
          masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.3);

          osc1.connect(shaperDist);
          osc2.connect(oscGain2);
          oscGain2.connect(shaperDist);
          shaperDist.connect(filter);
          filter.connect(masterGain);
          break;

        default:
          osc1.type = 'triangle';
          osc1.frequency.setValueAtTime(freq, now);
          masterGain.gain.setValueAtTime(0.3, now);
          masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
          osc1.connect(masterGain);
          break;
      }

      osc1.start(now);
      osc1.stop(now + duration + 0.1);
      if (patchId !== 0) {
        osc2.start(now);
        osc2.stop(now + duration + 0.1);
      }
    } catch (err) {
      console.warn('Tone preview audio error:', err);
    }
  }

  /**
   * Play an instant 2-note guitar flourish to showcase the selected patch's timbre
   */
  public playPatchPreview(patchId: number) {
    // Note 1: E3 (164.81 Hz), Note 2: B3 (246.94 Hz)
    this.playPluck(patchId, 164.81, 0, 0.45);
    this.playPluck(patchId, 246.94, 0.15, 0.7);
  }
}

export const guitarTonePreview = new GuitarTonePreviewService();

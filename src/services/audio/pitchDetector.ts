import { PitchDetectionResult } from '../../types';

const NOTE_STRINGS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export class PitchDetector {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private microphoneStream: MediaStream | null = null;
  private isListening = false;
  private rafId: number | null = null;
  private onPitchCallback: ((result: PitchDetectionResult | null) => void) | null = null;
  private sessionToken = 0;

  async start(callback: (result: PitchDetectionResult | null) => void): Promise<boolean> {
    const currentToken = ++this.sessionToken;
    try {
      this.onPitchCallback = callback;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      if (this.sessionToken !== currentToken) {
        stream.getTracks().forEach((track) => track.stop());
        return false;
      }

      this.microphoneStream = stream;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioCtx();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;

      const source = this.audioContext.createMediaStreamSource(stream);
      
      // High-sensitivity preamp gain node & dynamic compressor for guitar plucks
      const preampGain = this.audioContext.createGain();
      preampGain.gain.setValueAtTime(4.5, this.audioContext.currentTime);

      const compressor = this.audioContext.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-45, this.audioContext.currentTime);
      compressor.knee.setValueAtTime(10, this.audioContext.currentTime);
      compressor.ratio.setValueAtTime(8, this.audioContext.currentTime);
      compressor.attack.setValueAtTime(0.003, this.audioContext.currentTime);
      compressor.release.setValueAtTime(0.15, this.audioContext.currentTime);

      source.connect(preampGain);
      preampGain.connect(compressor);
      compressor.connect(this.analyser);

      this.isListening = true;
      this.detectLoop();
      return true;
    } catch (err) {
      console.warn('Microphone access denied or error:', err);
      return false;
    }
  }

  stop() {
    this.sessionToken++;
    this.isListening = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.microphoneStream) {
      this.microphoneStream.getTracks().forEach((track) => track.stop());
      this.microphoneStream = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  private detectLoop = () => {
    if (!this.isListening || !this.analyser) return;

    const buffer = new Float32Array(this.analyser.fftSize);
    this.analyser.getFloatTimeDomainData(buffer);

    const { pitch, clarity } = this.autoCorrelate(buffer, this.audioContext?.sampleRate || 44100);

    if (pitch !== -1 && pitch > 50 && pitch < 1200) {
      const result = this.frequencyToNote(pitch, clarity);
      if (this.onPitchCallback) {
        this.onPitchCallback(result);
      }
    } else {
      if (this.onPitchCallback) {
        this.onPitchCallback(null);
      }
    }

    this.rafId = requestAnimationFrame(this.detectLoop);
  };

  private autoCorrelate(buffer: Float32Array, sampleRate: number): { pitch: number; clarity: number } {
    let size = buffer.length;
    let sumOfSquares = 0;
    for (let i = 0; i < size; i++) {
      const val = buffer[i];
      sumOfSquares += val * val;
    }
    const rootMeanSquare = Math.sqrt(sumOfSquares / size);
    // Sensitive threshold allowing soft, delicate plucks and sustained notes
    if (rootMeanSquare < 0.003) {
      return { pitch: -1, clarity: 0 };
    }

    // Trim zero crossings
    let r1 = 0;
    let r2 = size - 1;
    const threshold = 0.04;
    for (let i = 0; i < size / 2; i++) {
      if (Math.abs(buffer[i]) < threshold) {
        r1 = i;
        break;
      }
    }
    for (let i = 1; i < size / 2; i++) {
      if (Math.abs(buffer[size - i]) < threshold) {
        r2 = size - i;
        break;
      }
    }

    const trimmedBuffer = buffer.slice(r1, r2);
    size = trimmedBuffer.length;

    const correlations = new Float32Array(size);
    for (let lag = 0; lag < size; lag++) {
      for (let i = 0; i < size - lag; i++) {
        correlations[lag] += trimmedBuffer[i] * trimmedBuffer[i + lag];
      }
    }

    let d = 0;
    while (correlations[d] > correlations[d + 1]) {
      d++;
    }

    let maxval = -1;
    let maxpos = -1;
    for (let i = d; i < size; i++) {
      if (correlations[i] > maxval) {
        maxval = correlations[i];
        maxpos = i;
      }
    }

    const zeroLag = correlations[0] || 1;
    const rawClarity = maxval > 0 ? maxval / zeroLag : 0;
    const clarity = Math.max(0, Math.min(1, rawClarity));

    if (clarity < 0.6) {
      return { pitch: -1, clarity };
    }

    let T0 = maxpos;
    if (maxpos > 0 && maxpos < size - 1) {
      const x1 = correlations[maxpos - 1];
      const x2 = correlations[maxpos];
      const x3 = correlations[maxpos + 1];
      const a = (x1 + x3 - 2 * x2) / 2;
      const b = (x3 - x1) / 2;
      if (a) {
        T0 = T0 - b / (2 * a);
      }
    }

    return { pitch: sampleRate / T0, clarity };
  }

  private frequencyToNote(frequency: number, clarity = 0.9): PitchDetectionResult {
    const midiNum = 12 * (Math.log(frequency / 440) / Math.log(2)) + 69;
    const roundedMidi = Math.round(midiNum);
    const noteIndex = roundedMidi % 12;
    const octave = Math.floor(roundedMidi / 12) - 1;
    const noteName = `${NOTE_STRINGS[noteIndex]}${octave}`;

    // Standard guitar open strings: E2=40, A2=45, D3=50, G3=55, B3=59, E4=64
    let targetString: number | undefined;
    if (Math.abs(roundedMidi - 40) <= 2) targetString = 6;
    else if (Math.abs(roundedMidi - 45) <= 2) targetString = 5;
    else if (Math.abs(roundedMidi - 50) <= 2) targetString = 4;
    else if (Math.abs(roundedMidi - 55) <= 2) targetString = 3;
    else if (Math.abs(roundedMidi - 59) <= 2) targetString = 2;
    else if (Math.abs(roundedMidi - 64) <= 2) targetString = 1;

    const standardFreq = 440 * Math.pow(2, (roundedMidi - 69) / 12);
    const cents = Math.floor(1200 * (Math.log(frequency / standardFreq) / Math.log(2)));

    return {
      note: noteName,
      frequency: Math.round(frequency * 10) / 10,
      cents,
      isInTune: Math.abs(cents) < 8,
      targetString,
      clarity: Math.round(clarity * 100) / 100,
    };
  }
}

export const pitchDetector = new PitchDetector();

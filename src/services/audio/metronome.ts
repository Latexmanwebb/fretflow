export type MetronomeBeatMode = 'every-beat' | 'downbeat-only';
export type CountInMode = 'off' | 'always' | 'loops';

export class MetronomeService {
  private audioContext: AudioContext | null = null;
  private isRunning = false;
  private tempo = 120;
  private beatsPerMeasure = 4;
  private currentBeat = 0;
  private nextNoteTime = 0.0;
  private timerId: number | null = null;
  private lookahead = 25.0; // milliseconds
  private scheduleAheadTime = 0.1; // seconds
  private mode: MetronomeBeatMode = 'every-beat';
  private volume = 0.8;
  private countInMode: CountInMode = 'always';
  private countInBars: 1 | 2 = 1;

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

  setTempo(bpm: number) {
    this.tempo = Math.max(30, Math.min(300, bpm));
  }

  getTempo(): number {
    return this.tempo;
  }

  setBeatsPerMeasure(beats: number) {
    this.beatsPerMeasure = Math.max(1, beats);
  }

  getBeatsPerMeasure(): number {
    return this.beatsPerMeasure;
  }

  setMode(mode: MetronomeBeatMode) {
    this.mode = mode;
  }

  getMode(): MetronomeBeatMode {
    return this.mode;
  }

  setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  getVolume(): number {
    return this.volume;
  }

  setCountInMode(mode: CountInMode) {
    this.countInMode = mode;
  }

  getCountInMode(): CountInMode {
    return this.countInMode;
  }

  setCountInBars(bars: 1 | 2) {
    this.countInBars = bars;
  }

  getCountInBars(): 1 | 2 {
    return this.countInBars;
  }

  getIsRunning() {
    return this.isRunning;
  }

  start(onBeat?: (beatNumber: number) => void) {
    if (this.isRunning) return;
    const ctx = this.getAudioContext();
    this.isRunning = true;
    this.currentBeat = 0;
    this.nextNoteTime = ctx.currentTime + 0.05;

    const scheduler = () => {
      while (this.nextNoteTime < ctx.currentTime + this.scheduleAheadTime) {
        this.scheduleNote(this.currentBeat, this.nextNoteTime);
        if (onBeat) onBeat(this.currentBeat);
        this.nextNote();
      }
      if (this.isRunning) {
        this.timerId = window.setTimeout(scheduler, this.lookahead);
      }
    };

    scheduler();
  }

  private countInTimeouts: number[] = [];
  private countInOscillators: OscillatorNode[] = [];
  private countInReject: ((reason?: any) => void) | null = null;
  private isCountingInActive = false;

  cancelCountIn() {
    this.isCountingInActive = false;
    for (const tid of this.countInTimeouts) {
      clearTimeout(tid);
    }
    this.countInTimeouts = [];

    for (const osc of this.countInOscillators) {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    }
    this.countInOscillators = [];

    if (this.countInReject) {
      const reject = this.countInReject;
      this.countInReject = null;
      reject(new Error('Count-in cancelled'));
    }
  }

  stop() {
    this.isRunning = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.cancelCountIn();
  }

  private nextNote() {
    const secondsPerBeat = 60.0 / this.tempo;
    this.nextNoteTime += secondsPerBeat;
    this.currentBeat = (this.currentBeat + 1) % this.beatsPerMeasure;
  }

  private scheduleNote(beatNumber: number, time: number) {
    // If downbeats-only mode, silence beats other than beat 1 (index 0)
    if (this.mode === 'downbeat-only' && beatNumber !== 0) {
      return;
    }

    const ctx = this.getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (beatNumber === 0) {
      // Accent on beat 1 (crisp high woodblock click)
      osc.frequency.setValueAtTime(1250, time);
      gain.gain.setValueAtTime(0.55 * this.volume, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
      osc.start(time);
      osc.stop(time + 0.08);
    } else {
      // Secondary beats
      osc.frequency.setValueAtTime(700, time);
      gain.gain.setValueAtTime(0.3 * this.volume, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
      osc.start(time);
      osc.stop(time + 0.05);
    }
  }

  async playCountIn(
    bpm: number,
    beats?: number,
    onCountBeat?: (count: number) => void
  ): Promise<void> {
    // Abort any active count-in to strictly prevent overlapping countdowns
    this.cancelCountIn();
    this.isCountingInActive = true;

    const effectiveBeats = beats || this.beatsPerMeasure * this.countInBars;
    const ctx = this.getAudioContext();
    const intervalSec = 60 / bpm;
    const startTime = ctx.currentTime + 0.05;

    return new Promise<void>((resolve, reject) => {
      this.countInReject = reject;

      for (let i = 0; i < effectiveBeats; i++) {
        const beatTime = startTime + i * intervalSec;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        // Pitch: high for last beat or downbeat
        const isDownbeat = i % this.beatsPerMeasure === 0;
        const isFinal = i === effectiveBeats - 1;
        osc.frequency.setValueAtTime(isDownbeat || isFinal ? 1300 : 750, beatTime);
        gain.gain.setValueAtTime(0.55 * this.volume, beatTime);
        gain.gain.exponentialRampToValueAtTime(0.001, beatTime + 0.09);

        osc.start(beatTime);
        osc.stop(beatTime + 0.09);
        this.countInOscillators.push(osc);

        const tid = window.setTimeout(() => {
          if (!this.isCountingInActive) return;
          if (onCountBeat) onCountBeat((i % this.beatsPerMeasure) + 1);
        }, Math.max(0, (beatTime - ctx.currentTime) * 1000));
        this.countInTimeouts.push(tid);
      }

      const finishTid = window.setTimeout(() => {
        this.isCountingInActive = false;
        this.countInOscillators = [];
        this.countInTimeouts = [];
        this.countInReject = null;
        resolve();
      }, (0.05 + effectiveBeats * intervalSec) * 1000);
      this.countInTimeouts.push(finishTid);
    });
  }
}

export const metronome = new MetronomeService();

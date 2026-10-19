export interface ActiveNote {
  string: number; // 1 (high E) to 6 (low E)
  fret: number;
  pitch?: string;
  finger?: number;
  duration?: number;
  midi?: number;
}

export interface PracticeChunk {
  id: string;
  index: number;
  title: string;
  startBar: number;
  endBar: number;
  startTick?: number;
  endTick?: number;
  targetBpm: number;
  currentBpmPercent: number; // e.g. 50%
  cleanReps: number;
  requiredCleanReps: number;
  status: 'pending' | 'active' | 'mastered';
  keyTechnique?: string;
  aiAdvice?: string;
  measuresDescription?: string;
}

export interface LearningConfig {
  startSpeedPercent: number; // default 50%
  targetSpeedPercent: number; // default 100%
  speedIncrementPercent: number; // default 10%
  repsToAdvanceSpeed: number; // default 3
  autoAdvanceSpeed: boolean; // default true
  autoAdvanceChunk: boolean; // default true
  enableMetronome: boolean;
  enableCountIn: boolean;
  countInBars: number;
  micListeningMode: boolean;
}


export interface CuratedSong {
  id: string;
  title: string;
  artist: string;
  genre: 'Classical' | 'Rock' | 'Metal' | 'Blues' | 'Jazz & Neo-Soul' | 'Technique & Warmup' | 'Exercises' | 'Classical & Flamenco';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tuning: string;
  defaultBpm: number;
  tex: string;
  description: string;
  keyTechniques: string[];
}

export interface TrackInfo {
  index: number;
  name: string;
  instrument: string;
  isMute: boolean;
  isSolo: boolean;
  volume: number;
  noteCount?: number;
}

export interface PitchDetectionResult {
  note: string; // e.g. 'E2', 'A2', 'D3', 'G3', 'B3', 'E4'
  frequency: number;
  cents: number;
  isInTune: boolean;
  targetString?: number;
  clarity: number;
}

export interface SongLoadedInfo {
  title: string;
  artist?: string;
  barsCount: number;
  tracks: TrackInfo[];
  bpm: number;
  timeSignatureNumerator?: number;
  timeSignatureDenominator?: number;
  selectedTrackIndex?: number;
}


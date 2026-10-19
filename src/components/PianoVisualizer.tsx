import React from 'react';
import { ActiveNote } from '../types';

interface PianoVisualizerProps {
  activeNotes: ActiveNote[];
}

interface WhiteKey {
  note: string;
  octave: number;
  midi: number;
  whiteIndex: number;
}

interface BlackKey {
  note: string;
  octave: number;
  midi: number;
  leftPercent: number;
}

// Generate 3+ octave keyboard from C2 (MIDI 36) to E5 (MIDI 76) covering the full standard guitar range
const { WHITE_KEYS, BLACK_KEYS } = (() => {
  const white: WhiteKey[] = [];
  const black: BlackKey[] = [];

  let whiteCount = 0;
  // Count total white keys from C2 to E5
  for (let midi = 36; midi <= 76; midi++) {
    const semitone = midi % 12;
    if (![1, 3, 6, 8, 10].includes(semitone)) {
      whiteCount++;
    }
  }

  const whiteKeyWidthPercent = 100 / whiteCount;
  const blackKeyWidthPercent = whiteKeyWidthPercent * 0.72;

  let currentWhiteIndex = 0;
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  for (let midi = 36; midi <= 76; midi++) {
    const semitone = midi % 12;
    const octave = Math.floor(midi / 12) - 1;
    const name = noteNames[semitone];
    const isBlack = [1, 3, 6, 8, 10].includes(semitone);

    if (isBlack) {
      // Center black key on the boundary between currentWhiteIndex - 1 and currentWhiteIndex
      const center = currentWhiteIndex * whiteKeyWidthPercent;
      black.push({
        note: name,
        octave,
        midi,
        leftPercent: center - blackKeyWidthPercent / 2,
      });
    } else {
      white.push({
        note: name,
        octave,
        midi,
        whiteIndex: currentWhiteIndex,
      });
      currentWhiteIndex++;
    }
  }

  return { WHITE_KEYS: white, BLACK_KEYS: black };
})();

// Open string base MIDI in Standard Tuning (E2=40, A2=45, D3=50, G3=55, B3=59, E4=64)
const STRING_BASE_MIDI: Record<number, number> = {
  6: 40,
  5: 45,
  4: 50,
  3: 55,
  2: 59,
  1: 64,
};

export const PianoVisualizer: React.FC<PianoVisualizerProps> = ({ activeNotes }) => {
  // Extract sounding MIDI pitches directly from ActiveNote.midi (with alternate tuning & transpose support)
  const activeMidiSet = React.useMemo(() => {
    const set = new Set<number>();
    for (const n of activeNotes) {
      if (n.midi !== undefined && n.midi !== null) {
        set.add(n.midi);
      } else {
        const base = STRING_BASE_MIDI[n.string];
        if (base !== undefined) {
          set.add(base + n.fret);
        }
      }
    }
    return set;
  }, [activeNotes]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 shadow-xl backdrop-blur select-none">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          Sounding Pitch Piano Key Visualizer
        </span>
        <span className="text-[10px] text-slate-400 font-mono">
          C2 – E5 (Full Guitar Pitch Range &amp; Sounding Octaves)
        </span>
      </div>

      <div className="relative h-20 w-full bg-slate-950 rounded-lg overflow-hidden border-2 border-slate-700 shadow-inner flex">
        {/* White Keys */}
        {WHITE_KEYS.map((key) => {
          const isActive = activeMidiSet.has(key.midi);

          return (
            <div
              key={`w-${key.note}${key.octave}-${key.midi}`}
              className={`flex-1 h-full border-r border-slate-400/30 relative flex items-end justify-center pb-1 transition-colors duration-150 ${
                isActive
                  ? 'bg-gradient-to-t from-amber-400 to-amber-300 shadow-[inset_0_-4px_12px_#f59e0b]'
                  : 'bg-gradient-to-b from-slate-100 to-slate-200 hover:bg-slate-50'
              }`}
              title={`${key.note}${key.octave} (MIDI ${key.midi})`}
            >
              <span
                className={`text-[8px] font-bold ${
                  isActive ? 'text-slate-950 font-black' : 'text-slate-500'
                }`}
              >
                {key.note === 'C' ? `${key.note}${key.octave}` : key.note}
              </span>
            </div>
          );
        })}

        {/* Black Keys */}
        {BLACK_KEYS.map((key) => {
          const isActive = activeMidiSet.has(key.midi);

          return (
            <div
              key={`b-${key.note}${key.octave}-${key.midi}`}
              style={{ left: `${key.leftPercent}%`, width: `${(100 / WHITE_KEYS.length) * 0.72}%` }}
              className={`absolute top-0 h-[60%] rounded-b z-20 transition-colors duration-150 flex items-end justify-center pb-0.5 ${
                isActive
                  ? 'bg-amber-500 border border-amber-300 shadow-[0_0_8px_#f59e0b]'
                  : 'bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700'
              }`}
              title={`${key.note}${key.octave} (MIDI ${key.midi})`}
            >
              {isActive && (
                <span className="text-[6.5px] text-slate-950 font-black leading-none">
                  {key.note}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

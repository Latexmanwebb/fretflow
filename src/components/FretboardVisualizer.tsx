import React, { useState } from 'react';
import { ActiveNote } from '../types';

interface FretboardVisualizerProps {
  activeNotes: ActiveNote[];
  tuning?: string[]; // e.g. ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'] (strings 1 to 6)
  selectedScale?: string;
  onFretClick?: (stringNum: number, fret: number) => void;
}

const CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Tuning note definitions [string 1 (high), ... string 6 (low)]
const DEFAULT_TUNINGS: Record<string, string[]> = {
  Standard: ['E', 'B', 'G', 'D', 'A', 'E'],
  'Drop D': ['E', 'B', 'G', 'D', 'A', 'D'],
  DADGAD: ['D', 'A', 'G', 'D', 'A', 'D'],
  'Half-Step Down': ['D#', 'A#', 'F#', 'C#', 'G#', 'D#'],
};

// Scales interval maps from root
const SCALES: Record<string, number[]> = {
  'Minor Pentatonic': [0, 3, 5, 7, 10],
  'Blues Scale': [0, 3, 5, 6, 7, 10],
  'Major Scale': [0, 2, 4, 5, 7, 9, 11],
  'Natural Minor': [0, 2, 3, 5, 7, 8, 10],
  'Harmonic Minor': [0, 2, 3, 5, 7, 8, 11],
  Dorian: [0, 2, 3, 5, 7, 9, 10],
};

export const FretboardVisualizer: React.FC<FretboardVisualizerProps> = ({
  activeNotes,
  tuning,
  onFretClick,
}) => {
  const [selectedTuning, setSelectedTuning] = useState<string>('Standard');
  const [scaleRoot, setScaleRoot] = useState<string>('E');
  const [activeScale, setActiveScale] = useState<string>('None');
  const [showNoteNames, setShowNoteNames] = useState<boolean>(true);
  const [isLeftHanded, setIsLeftHanded] = useState<boolean>(false);

  const numFrets = 22;
  const stringNotes = React.useMemo(() => {
    if (tuning && tuning.length >= 6) {
      return tuning.map((t) => t.replace(/[0-9]/g, ''));
    }
    return DEFAULT_TUNINGS[selectedTuning] || DEFAULT_TUNINGS['Standard'];
  }, [tuning, selectedTuning]);

  // Calculate notes in selected scale
  const scaleNotes = React.useMemo(() => {
    if (activeScale === 'None') return new Set<string>();
    const intervals = SCALES[activeScale];
    if (!intervals) return new Set<string>();
    const rootIndex = CHROMATIC.indexOf(scaleRoot);
    if (rootIndex === -1) return new Set<string>();

    const set = new Set<string>();
    for (const step of intervals) {
      set.add(CHROMATIC[(rootIndex + step) % 12]);
    }
    return set;
  }, [scaleRoot, activeScale]);

  const getNoteAt = (openNote: string, fret: number): string => {
    const baseIdx = CHROMATIC.indexOf(openNote);
    if (baseIdx === -1) return '';
    return CHROMATIC[(baseIdx + fret) % 12];
  };

  // Helper to check if a single dot marker is on this fret
  const isSingleDotFret = (f: number) => [3, 5, 7, 9, 15, 17, 19, 21].includes(f);
  const isDoubleDotFret = (f: number) => f === 12;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            Dynamic Fretboard Visualizer
          </span>
          <span className="text-xs text-slate-400">| 22 Frets</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Tuning selector */}
          <div className="flex items-center gap-1 bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
            <span className="text-slate-400">Tuning:</span>
            <select
              value={selectedTuning}
              onChange={(e) => setSelectedTuning(e.target.value)}
              aria-label="Guitar Tuning"
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              {Object.keys(DEFAULT_TUNINGS).map((t) => (
                <option key={t} value={t} className="bg-slate-900 text-slate-200">
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Scale Overlay selector */}
          <div className="flex items-center gap-1 bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
            <span className="text-slate-400">Scale:</span>
            <select
              value={scaleRoot}
              onChange={(e) => setScaleRoot(e.target.value)}
              aria-label="Scale Root Note"
              className="bg-transparent text-amber-400 font-medium focus:outline-none cursor-pointer"
            >
              {CHROMATIC.map((note) => (
                <option key={note} value={note} className="bg-slate-900 text-slate-200">
                  {note}
                </option>
              ))}
            </select>
            <select
              value={activeScale}
              onChange={(e) => setActiveScale(e.target.value)}
              aria-label="Scale Pattern"
              className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="None" className="bg-slate-900 text-slate-200">Off</option>
              {Object.keys(SCALES).map((s) => (
                <option key={s} value={s} className="bg-slate-900 text-slate-200">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Toggle note names */}
          <button
            onClick={() => setShowNoteNames(!showNoteNames)}
            className={`px-2.5 py-1 rounded border transition ${
              showNoteNames
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {showNoteNames ? 'Notes ON' : 'Frets Only'}
          </button>

          {/* Soundslice-style Left-Handed Flip */}
          <button
            onClick={() => setIsLeftHanded(!isLeftHanded)}
            className={`px-2.5 py-1 rounded border transition ${
              isLeftHanded
                ? 'bg-orange-500/20 border-orange-500 text-orange-300 shadow'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Flip guitar neck for left-handed players (Soundslice feature)"
          >
            {isLeftHanded ? 'Left-Handed (Flipped)' : 'Right-Handed'}
          </button>
        </div>
      </div>

      {/* Interactive Fretboard Neck */}
      <div className="overflow-x-auto select-none py-1">
        <div className={`min-w-[920px] relative bg-gradient-to-b from-[#2a2421] via-[#1f1a18] to-[#2a2421] rounded-lg p-2 border-2 border-[#453c38] shadow-inner ${isLeftHanded ? 'scale-x-[-1]' : ''}`}>
          {/* Fret Markers along the bottom/inlays */}
          <div className="flex pl-12 pr-2 mb-1.5">
            {Array.from({ length: numFrets + 1 }).map((_, f) => (
              <div
                key={f}
                className="flex-1 text-center font-mono text-[10px] text-slate-500 flex flex-col items-center justify-center"
              >
                <span className={isLeftHanded ? 'scale-x-[-1] inline-block' : ''}>{f === 0 ? 'Nut' : f}</span>
                {isDoubleDotFret(f) && (
                  <div className="flex gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400/70 inline-block shadow"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400/70 inline-block shadow"></span>
                  </div>
                )}
                {isSingleDotFret(f) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400/70 inline-block mt-0.5 shadow"></span>
                )}
              </div>
            ))}
          </div>

          {/* 6 Strings */}
          <div className="relative flex flex-col gap-2.5 my-1">
            {stringNotes.map((openNote, stringIdx) => {
              const stringNum = stringIdx + 1; // 1 to 6
              // Thicker strings at bottom (low E), thinner at top (high E)
              const stringHeight = 1 + stringIdx * 0.45;

              return (
                <div key={stringNum} className="relative flex items-center h-6">
                  {/* String Open Note Tuning Tag */}
                  <div className={`w-10 pr-2 flex items-center justify-between font-mono text-xs font-bold text-amber-400/90 border-r-2 border-slate-600 ${isLeftHanded ? 'scale-x-[-1]' : ''}`}>
                    <span className="text-[10px] text-slate-500">#{stringNum}</span>
                    <span>{openNote}</span>
                  </div>

                  {/* Physical Guitar String Wire */}
                  <div
                    className="absolute left-10 right-0 pointer-events-none z-0"
                    style={{
                      height: `${stringHeight}px`,
                      background: `linear-gradient(to bottom, #d1d5db, #6b7280)`,
                      boxShadow: '0 1px 2px rgba(0,0,0,0.8)',
                    }}
                  />

                  {/* Frets along this string */}
                  <div className="flex-1 flex pl-2 z-10">
                    {Array.from({ length: numFrets + 1 }).map((_, fret) => {
                      const noteName = getNoteAt(openNote, fret);
                      const isScaleNote = scaleNotes.has(noteName);
                      const isRootNote = isScaleNote && noteName === scaleRoot;

                      // Check if active during playback
                      const isActive = activeNotes.some(
                        (n) => n.string === stringNum && n.fret === fret
                      );

                      return (
                        <div
                          key={fret}
                          onClick={() => onFretClick && onFretClick(stringNum, fret)}
                          className={`flex-1 h-6 flex items-center justify-center relative ${
                            onFretClick ? 'cursor-pointer hover:bg-white/10' : 'cursor-default'
                          } border-r ${
                            fret === 0
                              ? 'border-r-4 border-amber-200/60 bg-amber-950/20'
                              : 'border-r-2 border-slate-600/70'
                          }`}
                        >
                          {/* Active Note being played right now (Bright Glow) */}
                          {isActive ? (
                            <div className={`w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 text-slate-950 font-bold text-[10px] flex items-center justify-center shadow-[0_0_12px_#f97316] ring-2 ring-white animate-bounce ${isLeftHanded ? 'scale-x-[-1]' : ''}`}>
                              {showNoteNames ? noteName : fret}
                            </div>
                          ) : isRootNote ? (
                            /* Scale Root note (Golden halo) */
                            <div className={`w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[9px] flex items-center justify-center shadow ring-1 ring-amber-300 ${isLeftHanded ? 'scale-x-[-1]' : ''}`}>
                              {showNoteNames ? noteName : fret}
                            </div>
                          ) : isScaleNote ? (
                            /* Scale pattern tone (Translucent cyan/amber dot) */
                            <div className={`w-3.5 h-3.5 rounded-full bg-slate-700/80 text-cyan-300 font-semibold text-[8px] flex items-center justify-center border border-cyan-500/40 ${isLeftHanded ? 'scale-x-[-1]' : ''}`}>
                              {showNoteNames ? noteName : fret}
                            </div>
                          ) : (
                            /* Normal fret space - shows subtle fret or note on hover */
                            <div className="opacity-0 hover:opacity-100 transition w-3 h-3 rounded-full bg-slate-800 text-[8px] text-slate-400 flex items-center justify-center">
                              {showNoteNames ? noteName : fret}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

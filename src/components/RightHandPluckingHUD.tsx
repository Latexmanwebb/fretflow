import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight, Hand } from 'lucide-react';
import { CuratedSong, ActiveNote } from '../types';
import { GIULIANI_120_EXERCISES } from '../services/parsers/giulianiExercises';

interface RightHandPluckingHUDProps {
  currentSong: CuratedSong | { id: string; title: string; genre?: string; keyTechniques?: string[] };
  activeNotes?: ActiveNote[];
  isPlaying?: boolean;
  onSelectExercise?: (exerciseNumber: number) => void;
}

export const RightHandPluckingHUD: React.FC<RightHandPluckingHUDProps> = ({
  currentSong,
  activeNotes = [],
  isPlaying = false,
  onSelectExercise,
}) => {
  const isGiuliani = Boolean(currentSong.id && currentSong.id.startsWith('giuliani-'));

  // Parse exercise number (1 to 120)
  const currentExNumber = useMemo(() => {
    if (!isGiuliani) return 1;
    const match = currentSong.id.match(/^giuliani-120-(\d+)$/);
    if (match) return parseInt(match[1], 10);
    const numMatch = currentSong.title?.match(/No\.\s*(\d+)/i);
    return numMatch ? parseInt(numMatch[1], 10) : 1;
  }, [currentSong.id, currentSong.title, isGiuliani]);

  const exercise = useMemo(() => {
    return GIULIANI_120_EXERCISES.find((e) => e.number === currentExNumber);
  }, [currentExNumber]);

  // Compute which right-hand fingers are currently plucking based on active string positions:
  // String 1 (high E) -> 'a' (anular)
  // String 2 (B) -> 'm' (medio)
  // String 3 (G) -> 'i' (indice)
  // Strings 4, 5, 6 (D, A, low E) -> 'p' (pulgar)
  const activeFingers = useMemo(() => {
    if (!isPlaying || !activeNotes || activeNotes.length === 0) return new Set<string>();
    const set = new Set<string>();
    for (const n of activeNotes) {
      if (n.string === 1) set.add('a');
      else if (n.string === 2) set.add('m');
      else if (n.string === 3) set.add('i');
      else if (n.string >= 4 && n.string <= 6) set.add('p');
    }
    return set;
  }, [activeNotes, isPlaying]);

  if (!isGiuliani) {
    return null;
  }

  const patternSteps = exercise?.pattern ? exercise.pattern.split('-').map((s) => s.trim()) : [];

  return (
    <div className="shrink-0 z-20 bg-slate-950/95 backdrop-blur-md border-b border-white/10 text-xs shadow-sm select-none">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Exercise Navigation Carousel */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-0.5 bg-slate-900 border border-white/10 rounded-lg p-0.5 shadow-inner">
            <button
              onClick={() => onSelectExercise && onSelectExercise(Math.max(1, currentExNumber - 1))}
              disabled={currentExNumber <= 1}
              className="p-1 rounded hover:bg-white/10 text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition active:scale-95"
              title="Previous Exercise"
              aria-label="Previous Exercise"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono font-bold text-amber-400 text-xs px-2 select-none whitespace-nowrap">
              Ex #{currentExNumber}
              <span className="text-[10px] text-slate-500 font-normal"> / 120</span>
            </span>
            <button
              onClick={() => onSelectExercise && onSelectExercise(Math.min(120, currentExNumber + 1))}
              disabled={currentExNumber >= 120}
              className="p-1 rounded hover:bg-white/10 text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition active:scale-95"
              title="Next Exercise"
              aria-label="Next Exercise"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-slate-300 text-xs font-semibold truncate hidden lg:inline max-w-[200px]">
            {exercise?.title || currentSong.title}
          </span>
        </div>

        {/* Center: Live Real-Time P-I-M-A Finger Plucking HUD */}
        <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1 rounded-xl border border-white/10 shadow-inner">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Hand className="w-3.5 h-3.5 text-amber-400" />
            <span>Right Hand:</span>
          </span>

          <div className="flex items-center gap-1.5 font-mono font-bold">
            {/* P - Pulgar (Thumb) */}
            <span
              className={`px-2 py-0.5 rounded transition-all duration-100 flex items-center gap-1 ${
                activeFingers.has('p')
                  ? 'bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.9)] scale-110 ring-2 ring-white'
                  : 'bg-slate-800/80 text-amber-400/70 border border-amber-500/20'
              }`}
              title="p = Pulgar (Thumb: Strings 4, 5, 6)"
            >
              <span>p</span>
              <span className="text-[9px] font-normal opacity-70">4–6</span>
            </span>

            {/* I - Indice (Index) */}
            <span
              className={`px-2 py-0.5 rounded transition-all duration-100 flex items-center gap-1 ${
                activeFingers.has('i')
                  ? 'bg-sky-400 text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.9)] scale-110 ring-2 ring-white'
                  : 'bg-slate-800/80 text-sky-400/70 border border-sky-400/20'
              }`}
              title="i = Indice (Index: String 3)"
            >
              <span>i</span>
              <span className="text-[9px] font-normal opacity-70">3</span>
            </span>

            {/* M - Medio (Middle) */}
            <span
              className={`px-2 py-0.5 rounded transition-all duration-100 flex items-center gap-1 ${
                activeFingers.has('m')
                  ? 'bg-emerald-400 text-slate-950 shadow-[0_0_12px_rgba(52,211,153,0.9)] scale-110 ring-2 ring-white'
                  : 'bg-slate-800/80 text-emerald-400/70 border border-emerald-400/20'
              }`}
              title="m = Medio (Middle: String 2)"
            >
              <span>m</span>
              <span className="text-[9px] font-normal opacity-70">2</span>
            </span>

            {/* A - Anular (Ring) */}
            <span
              className={`px-2 py-0.5 rounded transition-all duration-100 flex items-center gap-1 ${
                activeFingers.has('a')
                  ? 'bg-purple-400 text-slate-950 shadow-[0_0_12px_rgba(192,132,252,0.9)] scale-110 ring-2 ring-white'
                  : 'bg-slate-800/80 text-purple-400/70 border border-purple-400/20'
              }`}
              title="a = Anular (Ring: String 1)"
            >
              <span>a</span>
              <span className="text-[9px] font-normal opacity-70">1</span>
            </span>
          </div>
        </div>

        {/* Right: Arpeggio Pattern Sequence Pills */}
        {patternSteps.length > 0 && (
          <div className="hidden sm:flex items-center gap-1 bg-slate-900/60 px-2.5 py-1 rounded-xl border border-white/5">
            <span className="text-[10px] text-slate-400 mr-1 font-semibold">Pattern:</span>
            {patternSteps.map((step, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-slate-800/90 px-1.5 py-0.5 rounded font-mono font-bold text-slate-300 border border-white/10"
              >
                {step.split('+').map((char, cIdx) => {
                  const low = char.trim().toLowerCase();
                  const isPlucking = activeFingers.has(low);
                  const colorClass = isPlucking
                    ? 'text-white font-black underline'
                    : low === 'p'
                    ? 'text-amber-400'
                    : low === 'i'
                    ? 'text-sky-400'
                    : low === 'm'
                    ? 'text-emerald-400'
                    : low === 'a'
                    ? 'text-purple-400'
                    : 'text-slate-300';
                  return (
                    <span key={cIdx}>
                      {cIdx > 0 && <span className="opacity-40 text-slate-500">+</span>}
                      <span className={colorClass}>{char.trim()}</span>
                    </span>
                  );
                })}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

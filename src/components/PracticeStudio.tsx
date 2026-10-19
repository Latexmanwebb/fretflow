import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  CheckCircle2,
  Sparkles,
  Flame,
  ChevronRight,
  ChevronLeft,
  X,
  Activity,
  Settings,
  Mic,
} from 'lucide-react';
import { PracticeChunk } from '../types';
import { metronome } from '../services/audio/metronome';

interface PracticeStudioProps {
  songTitle: string;
  songId?: string;
  totalBars: number;
  currentBpm: number;
  currentBar: number;
  onSetPlaybackRange: (startBar: number, endBar: number) => void;
  onFocusChunk?: (startBar: number, endBar: number) => void;
  onSetSpeed: (speed: number) => void;
  onPlayPause: () => void;
  onStop: () => void;
  isPlaying: boolean;
  onClose: () => void;
  onOpenTuner?: () => void;
}

export const PracticeStudio: React.FC<PracticeStudioProps> = ({
  songTitle,
  songId,
  totalBars,
  currentBpm,
  currentBar,
  onSetPlaybackRange,
  onFocusChunk,
  onSetSpeed,
  onPlayPause,
  onStop,
  isPlaying,
  onClose,
  onOpenTuner,
}) => {
  const [chunks, setChunks] = useState<PracticeChunk[]>([]);
  const [activeChunkIndex, setActiveChunkIndex] = useState(0);
  const [currentSpeedPercent, setCurrentSpeedPercent] = useState(50);
  const [cleanRepCount, setCleanRepCount] = useState(0);
  const [isCountingIn, setIsCountingIn] = useState(false);
  const [countBeat, setCountBeat] = useState<number | null>(null);
  const [continuousMode, setContinuousMode] = useState(true);

  // Tempo mode & step settings (Percentage vs BPM)
  const [tempoUnit, setTempoUnit] = useState<'percent' | 'bpm'>('percent');
  const [percentStep, setPercentStep] = useState<number>(5);
  const [bpmStep, setBpmStep] = useState<number>(10);
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const prevBarRef = useRef(currentBar);
  const storageKey = `fretflow_practice_${songId || songTitle}`;

  // Close settings popover on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setShowSettings(false);
      }
    };
    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettings]);

  // Generate chunks on mount or totalBars change and restore saved progress
  useEffect(() => {
    const bars = Math.max(1, totalBars || 8);
    const generated: PracticeChunk[] = [];
    const chunkSize = 2; // Deliberate practice 2-bar chunking
    let idx = 0;

    for (let b = 1; b <= bars; b += chunkSize) {
      let end = Math.min(bars, b + chunkSize - 1);
      // If only 1 bar remains after this chunk, absorb it so we never orphan a solitary 1-bar chunk
      if (bars - end === 1) {
        end = bars;
      }
      idx++;
      generated.push({
        id: `chunk-${idx}`,
        index: idx,
        title: `Chunk ${idx}: Bars ${b}-${end}`,
        startBar: b,
        endBar: end,
        targetBpm: currentBpm,
        currentBpmPercent: 60,
        cleanReps: 0,
        requiredCleanReps: 3,
        status: idx === 1 ? 'active' : 'pending',
        measuresDescription: `Deliberate practice isolation for bars ${b} to ${end}.`,
      });
      if (end >= bars) break;
    }

    setChunks(generated);

    // Restore saved progress for this piece
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw);
        if (typeof saved.activeChunkIndex === 'number' && saved.activeChunkIndex < generated.length) {
          setActiveChunkIndex(saved.activeChunkIndex);
        } else {
          setActiveChunkIndex(0);
        }
        if (typeof saved.cleanRepCount === 'number') {
          setCleanRepCount(saved.cleanRepCount);
        }
        if (typeof saved.currentSpeedPercent === 'number') {
          setCurrentSpeedPercent(saved.currentSpeedPercent);
        }
      } else {
        setActiveChunkIndex(0);
      }
    } catch {
      setActiveChunkIndex(0);
    }
  }, [totalBars, currentBpm, storageKey]);

  // Save progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          activeChunkIndex,
          cleanRepCount,
          currentSpeedPercent,
        })
      );
    } catch {}
  }, [storageKey, activeChunkIndex, cleanRepCount, currentSpeedPercent]);

  const activeChunk = chunks[activeChunkIndex] || {
    startBar: 1,
    endBar: 2,
    title: 'Chunk 1: Bars 1-2',
  };

  const safeCurrentBpm = currentBpm > 0 ? currentBpm : 120;
  const effectiveBpm = Math.round((safeCurrentBpm * currentSpeedPercent) / 100);

  // 1. Sync speed ratio without resetting playback or re-triggering focusRange
  useEffect(() => {
    onSetSpeed(currentSpeedPercent / 100);
  }, [currentSpeedPercent, onSetSpeed]);

  // 2. Isolate chunk range ONLY when activeChunkIndex or chunks change
  useEffect(() => {
    if (!activeChunk) return;
    if (onFocusChunk) {
      onFocusChunk(activeChunk.startBar, activeChunk.endBar);
    } else {
      onSetPlaybackRange(activeChunk.startBar, activeChunk.endBar);
    }
  }, [activeChunkIndex, chunks]);

  // Continuous auto-progression loop tracking
  useEffect(() => {
    if (!isPlaying || !continuousMode || isCountingIn) return;
    if (prevBarRef.current >= activeChunk.endBar && currentBar <= activeChunk.startBar) {
      handleNailedRepetition();
    }
    prevBarRef.current = currentBar;
  }, [currentBar, isPlaying, continuousMode, isCountingIn]);

  const handleStartPracticing = () => {
    if (isPlaying) {
      onPlayPause();
      return;
    }

    if (onFocusChunk) {
      onFocusChunk(activeChunk.startBar, activeChunk.endBar);
    } else {
      onSetPlaybackRange(activeChunk.startBar, activeChunk.endBar);
    }
    onPlayPause();
  };

  const handleTempoStepDown = () => {
    if (tempoUnit === 'percent') {
      const next = Math.max(25, currentSpeedPercent - percentStep);
      setCurrentSpeedPercent(next);
      setCleanRepCount(0);
    } else {
      const nextBpm = Math.max(30, effectiveBpm - bpmStep);
      const nextPct = Math.max(25, Math.round((nextBpm / safeCurrentBpm) * 100));
      setCurrentSpeedPercent(nextPct);
      setCleanRepCount(0);
    }
  };

  const handleTempoStepUp = () => {
    if (tempoUnit === 'percent') {
      const next = Math.min(150, currentSpeedPercent + percentStep);
      setCurrentSpeedPercent(next);
      setCleanRepCount(0);
    } else {
      const nextBpm = Math.min(300, effectiveBpm + bpmStep);
      const nextPct = Math.min(150, Math.round((nextBpm / safeCurrentBpm) * 100));
      setCurrentSpeedPercent(nextPct);
      setCleanRepCount(0);
    }
  };

  const handleNailedRepetition = () => {
    const nextReps = cleanRepCount + 1;
    setCleanRepCount(nextReps);

    confetti({
      particleCount: 20,
      spread: 45,
      origin: { y: 0.15 },
      colors: ['#f59e0b', '#10b981', '#3b82f6'],
    });

    if (nextReps >= 3) {
      if (currentSpeedPercent < 100) {
        const stepToAdd =
          tempoUnit === 'percent'
            ? percentStep
            : Math.max(1, Math.round((bpmStep / safeCurrentBpm) * 100));
        const nextSpeed = Math.min(100, currentSpeedPercent + stepToAdd);
        setCurrentSpeedPercent(nextSpeed);
        setCleanRepCount(0);
      } else {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.2 },
        });

        if (activeChunkIndex < chunks.length - 1) {
          setTimeout(() => {
            handleNextChunk();
          }, 900);
        }
      }
    }
  };

  const handleNextChunk = () => {
    if (activeChunkIndex < chunks.length - 1) {
      setActiveChunkIndex(activeChunkIndex + 1);
      setCurrentSpeedPercent(50);
      setCleanRepCount(0);
      onStop();
    }
  };

  const handlePrevChunk = () => {
    if (activeChunkIndex > 0) {
      setActiveChunkIndex(activeChunkIndex - 1);
      setCurrentSpeedPercent(50);
      setCleanRepCount(0);
      onStop();
    }
  };

  return (
    <div className="bg-slate-900 border-b border-slate-800 shadow-2xl px-4 py-2 shrink-0 select-none z-30 transition-all duration-300 animate-slide-down">
      {/* Single Sleek Consolidated Row */}
      <div className="flex items-center justify-between gap-3 text-xs">
        {/* Left: Chunk Carousel */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-bold shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevChunk}
              disabled={activeChunkIndex === 0}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:pointer-events-none"
              title="Previous Part"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <span className="font-bold text-white whitespace-nowrap">
              Part {activeChunkIndex + 1}/{chunks.length || 1}:{' '}
              <span className="text-amber-400">Bars {activeChunk.startBar}-{activeChunk.endBar}</span>
            </span>

            <button
              onClick={handleNextChunk}
              disabled={activeChunkIndex === chunks.length - 1}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:pointer-events-none"
              title="Next Part"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center: Tempo Ladder (% / BPM Swap, Step +/-, Settings Popover) & Clean Reps */}
        <div className="flex items-center gap-3">
          {/* Tempo Controls with % / BPM Swap, Step Buttons & Settings Bar */}
          <div className="relative flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 font-semibold mr-0.5">Tempo:</span>

            {/* Step down button */}
            <button
              onClick={handleTempoStepDown}
              className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center text-xs transition active:scale-95"
              title={tempoUnit === 'percent' ? `Decrease tempo by ${percentStep}%` : `Decrease tempo by ${bpmStep} BPM`}
            >
              -
            </button>

            {/* Main Value Pill */}
            <div className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold font-mono text-[11px] flex items-center gap-1 shadow-sm">
              {tempoUnit === 'percent' ? (
                <>
                  <span>{currentSpeedPercent}%</span>
                  <span className="text-[10px] text-slate-400 font-normal">({effectiveBpm} BPM)</span>
                </>
              ) : (
                <>
                  <span>{effectiveBpm} BPM</span>
                  <span className="text-[10px] text-slate-400 font-normal">({currentSpeedPercent}%)</span>
                </>
              )}
            </div>

            {/* Step up button */}
            <button
              onClick={handleTempoStepUp}
              className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center text-xs transition active:scale-95"
              title={tempoUnit === 'percent' ? `Increase tempo by ${percentStep}%` : `Increase tempo by ${bpmStep} BPM`}
            >
              +
            </button>

            {/* Quick ladder presets */}
            <div className="hidden lg:flex items-center gap-1 ml-1 border-l border-slate-800 pl-1.5">
              {tempoUnit === 'percent'
                ? [50, 65, 80, 95, 100].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => {
                        setCurrentSpeedPercent(spd);
                        setCleanRepCount(0);
                      }}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition ${
                        currentSpeedPercent === spd
                          ? 'bg-amber-500 text-slate-950 shadow scale-105'
                          : spd < currentSpeedPercent
                          ? 'bg-emerald-950 text-emerald-400'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {spd}%
                    </button>
                  ))
                : [50, 65, 80, 95, 100].map((pct) => {
                    const bpmVal = Math.round((safeCurrentBpm * pct) / 100);
                    return (
                      <button
                        key={pct}
                        onClick={() => {
                          setCurrentSpeedPercent(pct);
                          setCleanRepCount(0);
                        }}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition ${
                          currentSpeedPercent === pct
                            ? 'bg-amber-500 text-slate-950 shadow scale-105'
                            : pct < currentSpeedPercent
                            ? 'bg-emerald-950 text-emerald-400'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {bpmVal}
                      </button>
                    );
                  })}
            </div>

            {/* Tempo Settings Bar Button */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-1 rounded transition ml-0.5 ${
                showSettings ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title="Tempo Unit & Step Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>

            {/* Tempo Settings Popover */}
            {showSettings && (
              <div
                ref={settingsRef}
                className="absolute top-full left-0 mt-2 z-50 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 space-y-2.5 animate-slide-down"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Settings className="w-3 h-3 text-amber-500" />
                    Tempo Settings
                  </span>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-0.5 rounded text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Swap between Percentage and BPM */}
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-medium">Display &amp; Ramp Mode:</span>
                  <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setTempoUnit('percent')}
                      className={`py-1 rounded text-center text-[10px] font-bold transition ${
                        tempoUnit === 'percent'
                          ? 'bg-amber-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      % Percent
                    </button>
                    <button
                      onClick={() => setTempoUnit('bpm')}
                      className={`py-1 rounded text-center text-[10px] font-bold transition ${
                        tempoUnit === 'bpm'
                          ? 'bg-amber-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      BPM
                    </button>
                  </div>
                </div>

                {/* Step Increment */}
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {tempoUnit === 'percent' ? 'Percentage Step Size:' : 'BPM Step Size:'}
                  </span>
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                    {tempoUnit === 'percent'
                      ? [5, 10, 15].map((step) => (
                          <button
                            key={step}
                            onClick={() => setPercentStep(step)}
                            className={`flex-1 py-1 rounded text-center text-[10px] font-bold transition ${
                              percentStep === step
                                ? 'bg-amber-500 text-slate-950 shadow'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {step}%
                          </button>
                        ))
                      : [5, 10, 15, 20].map((step) => (
                          <button
                            key={step}
                            onClick={() => setBpmStep(step)}
                            className={`flex-1 py-1 rounded text-center text-[10px] font-bold transition ${
                              bpmStep === step
                                ? 'bg-amber-500 text-slate-950 shadow'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {step}
                          </button>
                        ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Clean Reps Streak */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <Flame
              className={`w-3.5 h-3.5 ${
                cleanRepCount > 0 ? 'text-amber-500 fill-amber-500 animate-pulse' : 'text-slate-600'
              }`}
            />
            <span className="text-[11px] text-slate-300">
              Reps: <strong className="text-amber-400 font-bold">{cleanRepCount}</strong>/3
            </span>
            <button
              onClick={handleNailedRepetition}
              className="p-0.5 rounded bg-emerald-950/80 hover:bg-emerald-800/80 text-emerald-400 text-[10px] font-bold px-1.5 transition ml-1"
              title="Manually log clean rep (+1)"
            >
              +1
            </button>
          </div>
        </div>

        {/* Right: Continuous Mode, Start Practice & Prominent Close Button */}
        <div className="flex items-center gap-2">
          {/* Continuous Mode Toggle */}
          <button
            onClick={() => setContinuousMode(!continuousMode)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] font-semibold transition ${
              continuousMode
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Auto-advance clean reps on seamless loop repetition"
          >
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>Continuous</span>
          </button>

          {/* Start Practice Button */}
          <button
            onClick={handleStartPracticing}
            disabled={isCountingIn}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs shadow transition active:scale-95 disabled:opacity-75 ${
              isPlaying
                ? 'bg-slate-800 border border-amber-500/50 text-amber-300'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-600 hover:to-orange-600'
            }`}
          >
            {isCountingIn ? (
              <span className="animate-bounce">Count-In: {countBeat || '...'}</span>
            ) : isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-slate-950" /> Start Practice
              </>
            )}
          </button>

          {/* Chromatic Tuner Quick-Launch */}
          {onOpenTuner && (
            <button
              onClick={onOpenTuner}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-emerald-400 transition"
              title="Open Chromatic Guitar Tuner"
              aria-label="Guitar Tuner"
            >
              <Mic className="w-4 h-4 text-emerald-400" />
            </button>
          )}

          {/* Prominent Clean Close Button on Far Right */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 border border-slate-700 hover:border-red-500/40 text-slate-400 hover:text-red-400 transition"
            title="Exit Learning Mode (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Gauge,
  Repeat,
  Music2,
  Columns,
  Rows,
  Guitar,
  Target,
  Timer,
  ZoomIn,
  ZoomOut,
  SlidersHorizontal,
  ChevronDown,
  Check,
} from 'lucide-react';
import { MetronomeBeatMode, CountInMode } from '../services/audio/metronome';
import { guitarTonePreview } from '../services/audio/guitarTonePreview';

export interface InstrumentPatch {
  id: number;
  name: string;
  category: string;
}

export const GUITAR_PATCHES: InstrumentPatch[] = [
  { id: 25, name: 'Acoustic Steel', category: 'Acoustic' },
  { id: 24, name: 'Classical Nylon', category: 'Classical' },
  { id: 27, name: 'Clean Strat', category: 'Electric Clean' },
  { id: 29, name: 'Overdriven Rock', category: 'Overdrive' },
  { id: 30, name: 'Distortion Metal', category: 'High Gain' },
];

interface PlayerToolbarProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onStop: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  baseBpm: number;
  isLooping: boolean;
  onToggleLoop: () => void;
  isFocused?: boolean;
  onToggleFocus?: () => void;
  focusedRangeText?: string | null;
  staveProfile: 'default' | 'tab' | 'score';
  onStaveProfileChange: (profile: 'default' | 'tab' | 'score') => void;
  layoutMode: 'page' | 'horizontal';
  onLayoutModeChange: (mode: 'page' | 'horizontal') => void;
  isFretboardOpen: boolean;
  onToggleFretboard: () => void;
  isPianoOpen: boolean;
  onTogglePiano: () => void;
  transpose: number;
  onTransposeChange: (semitones: number) => void;
  onOpenTuner: () => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
  currentBar: number;
  totalBars: number;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  currentPatch: number;
  onPatchChange: (patchId: number) => void;
  isMetronomeActive: boolean;
  onToggleMetronome: () => void;
  metronomeMode: MetronomeBeatMode;
  onMetronomeModeChange: (mode: MetronomeBeatMode) => void;
  countInMode: CountInMode;
  onCountInModeChange: (mode: CountInMode) => void;
  countInBars: 1 | 2;
  onCountInBarsChange: (bars: 1 | 2) => void;
  metronomeVolume: number;
  onMetronomeVolumeChange: (vol: number) => void;
  sheetTheme?: 'paper' | 'sepia' | 'dark';
  onSheetThemeChange?: (theme: 'paper' | 'sepia' | 'dark') => void;
}

let sharedPitchAudioCtx: AudioContext | null = null;

function playPitchPreview(semitones: number) {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!sharedPitchAudioCtx || sharedPitchAudioCtx.state === 'closed') {
      sharedPitchAudioCtx = new AudioCtx();
    }
    const ctx = sharedPitchAudioCtx;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const freq = 164.81 * Math.pow(2, semitones / 12);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {
    // ignore
  }
}

export const PlayerToolbar: React.FC<PlayerToolbarProps> = ({
  isPlaying,
  onPlayPause,
  onStop,
  speed,
  onSpeedChange,
  baseBpm,
  isLooping,
  onToggleLoop,
  isFocused = false,
  onToggleFocus,
  focusedRangeText,
  staveProfile,
  onStaveProfileChange,
  layoutMode,
  onLayoutModeChange,
  isFretboardOpen,
  onToggleFretboard,
  isPianoOpen,
  onTogglePiano,
  transpose,
  onTransposeChange,
  volume,
  onVolumeChange,
  currentBar,
  totalBars,
  zoom,
  onZoomChange,
  currentPatch,
  onPatchChange,
  isMetronomeActive,
  onToggleMetronome,
  metronomeMode,
  onMetronomeModeChange,
  countInMode,
  onCountInModeChange,
  countInBars,
  onCountInBarsChange,
  metronomeVolume,
  onMetronomeVolumeChange,
  sheetTheme = 'paper',
  onSheetThemeChange,
}) => {
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showMetronomeMenu, setShowMetronomeMenu] = useState(false);
  const [showViewSoundMenu, setShowViewSoundMenu] = useState(false);

  const speedMenuRef = useRef<HTMLDivElement>(null);
  const metronomeMenuRef = useRef<HTMLDivElement>(null);
  const viewSoundMenuRef = useRef<HTMLDivElement>(null);

  // Close popovers if clicked outside or Escape pressed
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (speedMenuRef.current && !speedMenuRef.current.contains(target)) {
        setShowSpeedMenu(false);
      }
      if (metronomeMenuRef.current && !metronomeMenuRef.current.contains(target)) {
        setShowMetronomeMenu(false);
      }
      if (viewSoundMenuRef.current && !viewSoundMenuRef.current.contains(target)) {
        setShowViewSoundMenu(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowSpeedMenu(false);
        setShowMetronomeMenu(false);
        setShowViewSoundMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const safeBaseBpm = baseBpm > 0 ? baseBpm : 120;
  const currentBpm = Math.round(safeBaseBpm * speed);

  const [customBpmText, setCustomBpmText] = useState(String(currentBpm));

  useEffect(() => {
    setCustomBpmText(String(currentBpm));
  }, [currentBpm]);

  // Speedometer Sunrise Geometry (0.0x at Left/180°, 1.00x DEAD CENTER at Peak/90°, 2.00x at Right/0°)
  // cx = 160, cy = 120, r = 105. Sweeping wide clockwise over top: (55, 120) -> (160, 15) -> (265, 120)
  const speedoProgress = Math.max(0, Math.min(1, speed / 2.0));
  const needleTheta = Math.PI * (1 - speedoProgress); // 180° (left) down to 0° (right)
  const needleLen = 84;
  const needleX = 160 + needleLen * Math.cos(needleTheta);
  const needleY = 120 - needleLen * Math.sin(needleTheta);
  const arcLength = 329.87; // Math.PI * 105
  const arcDashOffset = arcLength * (1 - speedoProgress);

  // 5 markings on the speedometer with 1.0 right in the center (3rd of 5)
  const speedoMarkings = [0.5, 0.75, 1.0, 1.25, 1.5];
  const speedPresets = [0.5, 0.75, 0.9, 1.0, 1.25, 1.5];

  const handlePitchAdjust = (nextTranspose: number) => {
    onTransposeChange(nextTranspose);
    playPitchPreview(nextTranspose);
  };

  const handleBpmInput = (newBpm: number) => {
    const clampedBpm = Math.max(30, Math.min(300, newBpm));
    if (safeBaseBpm > 0) {
      onSpeedChange(clampedBpm / safeBaseBpm);
    }
  };

  return (
    <div className="bg-slate-900/95 border-t border-white/10 shadow-2xl backdrop-blur-md px-3 md:px-5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs select-none relative z-[100]">
      {/* LEFT: Playback Controls & Bar Tracking */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onPlayPause}
          className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold flex items-center justify-center shadow-lg transition active:scale-95"
          title="Play / Pause (Spacebar)"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-slate-950" />
          ) : (
            <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
          )}
        </button>

        <button
          onClick={onStop}
          className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-white/10 transition"
          title="Rewind to Beginning"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Current Bar Tracker (Bold & Prominent) */}
        <div className="bg-slate-950/80 px-3 py-1.5 rounded-xl border border-white/10 font-mono text-xs text-slate-300 shadow-inner">
          Bar <strong className="text-amber-400 font-black text-sm tabular-nums">{currentBar}</strong> / <span className="font-extrabold text-slate-100 tabular-nums">{totalBars || '—'}</span>
        </div>

        {/* Looping Toggle */}
        <button
          onClick={onToggleLoop}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-medium transition ${
            isLooping
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-sm'
              : 'bg-slate-800/60 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
          title="Toggle Repeat Loop (L)"
        >
          <Repeat className="w-3.5 h-3.5" />
          <span>Loop</span>
        </button>

        {/* Soundslice-Style Focus / Section Isolate */}
        {onToggleFocus && (
          <button
            onClick={onToggleFocus}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-medium transition ${
              isFocused
                ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                : 'bg-slate-800/60 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title={isFocused ? 'Exit Focus Mode (Esc or O)' : 'Focus Mode: Isolate and loop highlighted bars (O)'}
          >
            <Target className="w-3.5 h-3.5" />
            <span>{isFocused ? (focusedRangeText ? `Focus (${focusedRangeText})` : 'Focus') : 'Focus'}</span>
          </button>
        )}
      </div>

      {/* RIGHT: Minimal, Uncluttered Controls (Speed/BPM, Metronome, Zoom, Unified View & Sound) */}
      <div className="flex flex-wrap items-center gap-2">
        {/* 1. SPEED & BPM (SUNRISE SPEEDOMETER POPOVER) */}
        <div
          ref={speedMenuRef}
          className="relative"
        >
          <button
            onClick={() => setShowSpeedMenu(!showSpeedMenu)}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border font-medium transition w-32 min-w-[128px] ${
              showSpeedMenu || Math.abs(speed - 1.0) > 0.02
                ? 'bg-slate-800 border-amber-500/50 text-amber-300 shadow-sm'
                : 'bg-slate-950/80 border-white/10 text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
            title="Adjust Playback Speed & BPM"
          >
            <Gauge className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-semibold font-mono tabular-nums">{speed.toFixed(2)}x</span>
            <span className="text-[10px] text-slate-400 font-mono tabular-nums">({currentBpm})</span>
          </button>

          {/* Wide Sunrise Speedometer Drop-Up with Smooth Popover Animation */}
          {showSpeedMenu && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 z-[110] animate-popover-center">
              <div className="w-96 bg-slate-900/95 border border-white/15 rounded-2xl shadow-2xl p-4 space-y-3 backdrop-blur-md">
                {/* Sunrise Gauge with Flanking Circular -5 BPM / +5 BPM Buttons */}
                <div className="relative flex flex-col items-center justify-center pt-1">
                  {/* Flanking Circular Stepper Buttons on Top-Left and Top-Right */}
                  <div className="w-full flex items-center justify-between px-2 mb-1">
                    <button
                      onClick={() => handleBpmInput(currentBpm - 5)}
                      className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center shadow-lg border border-slate-700/80 active:scale-95 transition"
                      title="Decrease 5 BPM"
                    >
                      -5
                    </button>
                    {/* Interactive Custom BPM Input */}
                    <div className="flex items-center justify-center gap-1 bg-slate-950/90 px-2.5 py-1 rounded-xl border border-slate-700/80 hover:border-amber-500/50 focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-400/40 shadow-inner transition">
                      <input
                        type="number"
                        min="30"
                        max="300"
                        value={customBpmText}
                        onChange={(e) => setCustomBpmText(e.target.value)}
                        onBlur={() => {
                          const parsed = parseInt(customBpmText, 10);
                          if (!isNaN(parsed) && parsed >= 30 && parsed <= 300) {
                            handleBpmInput(parsed);
                          } else {
                            setCustomBpmText(String(currentBpm));
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const parsed = parseInt(customBpmText, 10);
                            if (!isNaN(parsed) && parsed >= 30 && parsed <= 300) {
                              handleBpmInput(parsed);
                            } else {
                              setCustomBpmText(String(currentBpm));
                            }
                            (e.target as HTMLInputElement).blur();
                          }
                        }}
                        className="w-11 bg-transparent text-center text-xs font-mono font-bold text-amber-400 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        title="Type custom BPM (30–300) and press Enter"
                      />
                      <span className="text-[10px] text-slate-400 font-mono font-bold">BPM</span>
                    </div>
                    <button
                      onClick={() => handleBpmInput(currentBpm + 5)}
                      className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center shadow-lg border border-slate-700/80 active:scale-95 transition"
                      title="Increase 5 BPM"
                    >
                      +5
                    </button>
                  </div>

                  {/* Wide Sunrise SVG Arc (1.0x Dead Center at Peak) */}
                  <div className="relative w-80 h-36 flex items-center justify-center">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 320 135">
                      <defs>
                        <linearGradient id="sunriseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="50%" stopColor="#f59e0b" />
                          <stop offset="85%" stopColor="#ea580c" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                        <filter id="sunriseGlow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#f59e0b" floodOpacity="0.5" />
                        </filter>
                      </defs>

                      {/* Inactive Track Arc (Sweeping Left to Right over top) */}
                      <path
                        d="M 55 120 A 105 105 0 0 1 265 120"
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="11"
                        strokeLinecap="round"
                      />

                      {/* Active Sweeping Sunrise Arc */}
                      <path
                        d="M 55 120 A 105 105 0 0 1 265 120"
                        fill="none"
                        stroke="url(#sunriseGrad)"
                        strokeWidth="11"
                        strokeLinecap="round"
                        strokeDasharray={arcLength}
                        strokeDashoffset={arcDashOffset}
                        filter="url(#sunriseGlow)"
                      />

                      {/* 5 Radial Tick Marks with 1.0x Dead Center at 90° (Top Peak) */}
                      {speedoMarkings.map((t) => {
                        const tp = t / 2.0;
                        const tTheta = Math.PI * (1 - tp);
                        const x1 = 160 + 94 * Math.cos(tTheta);
                        const y1 = 120 - 94 * Math.sin(tTheta);
                        const x2 = 160 + 105 * Math.cos(tTheta);
                        const y2 = 120 - 105 * Math.sin(tTheta);
                        const isCenter = t === 1.0;
                        return (
                          <line
                            key={t}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke={speed >= t ? '#f59e0b' : '#334155'}
                            strokeWidth={isCenter ? '3.5' : '2.5'}
                          />
                        );
                      })}

                      {/* Sunrise Needle from Center (160, 120) */}
                      <line
                        x1="160"
                        y1="120"
                        x2={needleX}
                        y2={needleY}
                        stroke="#ffffff"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_5px_rgba(255,255,255,0.9)]"
                      />
                      {/* Pivot Hub */}
                      <circle cx="160" cy="120" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                    </svg>

                    {/* Digital Readout Peaking in the Center */}
                    <div className="absolute top-14 flex flex-col items-center pointer-events-none">
                      <span className="text-3xl font-black font-mono text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)] tracking-tight tabular-nums w-32 text-center">
                        {speed.toFixed(2)}x
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono tabular-nums">
                        Base: {safeBaseBpm} BPM
                      </span>
                    </div>
                  </div>
                </div>

                {/* Range Slider Peaking Under Sunrise (0.0 to 2.0, 1.00x Dead Center) */}
                <div className="space-y-1 px-2 pt-1">
                  <input
                    type="range"
                    min="0.0"
                    max="2.0"
                    step="0.01"
                    value={speed}
                    onChange={(e) => onSpeedChange(Math.max(0.1, parseFloat(e.target.value)))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 shadow-inner"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 px-0.5">
                    <span>0.00x</span>
                    <span className="text-amber-400 font-bold">1.00x</span>
                    <span>2.00x</span>
                  </div>
                </div>

                {/* Preset Chips (Discrete buttons) */}
                <div className="grid grid-cols-6 gap-1 pt-1">
                  {speedPresets.map((preset) => {
                    const isSelected = Math.abs(speed - preset) < 0.02;
                    return (
                      <button
                        key={preset}
                        onClick={() => onSpeedChange(preset)}
                        className={`py-1 rounded-md text-[10px] font-bold transition text-center ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        {preset}x
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. METRONOME (ICON ONLY BUTTON + DROP-UP POPOVER) */}
        <div
          ref={metronomeMenuRef}
          className="relative"
        >
          <button
            onClick={() => setShowMetronomeMenu(!showMetronomeMenu)}
            className={`p-2 rounded-xl border font-medium transition relative ${
              isMetronomeActive || showMetronomeMenu
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-sm'
                : 'bg-slate-950/80 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
            title="Metronome & Count-In Settings (M)"
          >
            <Timer className={`w-4 h-4 ${isMetronomeActive ? 'text-amber-400' : 'text-slate-400'}`} />
            {isMetronomeActive && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            )}
          </button>

          {/* Metronome Popover with Smooth Animation */}
          {showMetronomeMenu && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 z-[110] animate-popover-center">
              <div className="w-72 bg-slate-900/95 border border-white/15 rounded-2xl shadow-2xl p-3 space-y-3 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Timer className="w-3.5 h-3.5 text-amber-400" />
                    Metronome
                  </span>
                  <button
                    onClick={onToggleMetronome}
                    className={`p-1.5 rounded-lg transition-all ${
                      isMetronomeActive
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                    title={isMetronomeActive ? 'Mute Metronome' : 'Activate Metronome'}
                  >
                    {isMetronomeActive ? (
                      <Volume2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Beat Pattern: Every Beat vs Downbeats Only */}
                <div className="space-y-1">
                  <div className="text-[10px] font-semibold text-slate-400">Beat Emphasis:</div>
                  <div className="grid grid-cols-2 gap-1 p-0.5 bg-slate-950 rounded-lg">
                    <button
                      onClick={() => onMetronomeModeChange('every-beat')}
                      className={`py-1 rounded text-[10px] font-bold transition ${
                        metronomeMode === 'every-beat'
                          ? 'bg-slate-800 text-amber-400 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Every Beat
                    </button>
                    <button
                      onClick={() => onMetronomeModeChange('downbeat-only')}
                      className={`py-1 rounded text-[10px] font-bold transition ${
                        metronomeMode === 'downbeat-only'
                          ? 'bg-slate-800 text-amber-400 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Downbeats Only
                    </button>
                  </div>
                </div>

                {/* Count-In Settings */}
                <div className="space-y-1">
                  <div className="text-[10px] font-semibold text-slate-400">Count-In:</div>
                  <div className="relative flex p-0.5 bg-slate-950 rounded-lg border border-slate-800">
                    <div
                      className="absolute top-0.5 bottom-0.5 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 shadow-md transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none"
                      style={{
                        width: 'calc((100% - 4px) / 3)',
                        left: `calc(2px + (${countInMode === 'off' ? 0 : countInMode === 'always' ? 1 : 2} * ((100% - 4px) / 3)))`,
                      }}
                    />
                    {(['off', 'always', 'loops'] as CountInMode[]).map((mode) => {
                      const isActive = countInMode === mode;
                      return (
                        <button
                          key={mode}
                          onClick={() => onCountInModeChange(mode)}
                          className={`relative z-10 flex-1 py-1 rounded text-center text-[10px] font-bold transition-colors ${
                            isActive ? 'text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {mode === 'off' ? 'Off' : mode === 'always' ? 'Always' : 'On Loops'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Count-In Duration */}
                {countInMode !== 'off' && (
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Count-In Length:</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => onCountInBarsChange(1)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          countInBars === 1 ? 'bg-slate-800 text-amber-400' : 'text-slate-500'
                        }`}
                      >
                        1 Bar
                      </button>
                      <button
                        onClick={() => onCountInBarsChange(2)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          countInBars === 2 ? 'bg-slate-800 text-amber-400' : 'text-slate-500'
                        }`}
                      >
                        2 Bars
                      </button>
                    </div>
                  </div>
                )}

                {/* Metronome Volume */}
                <div className="space-y-1 pt-1 border-t border-slate-800">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Volume:</span>
                    <span className="font-mono text-slate-300">{Math.round(metronomeVolume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={metronomeVolume}
                    onChange={(e) => onMetronomeVolumeChange(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. ZOOM IN / OUT */}
        <div className="flex items-center gap-1 bg-slate-950/80 px-1.5 py-1 rounded-xl border border-white/10">
          <button
            onClick={() => onZoomChange(Math.max(0.65, zoom - 0.1))}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
            title="Zoom Out (Cmd -)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[10px] text-slate-300 w-8 text-center font-bold tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => onZoomChange(Math.min(1.8, zoom + 0.1))}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
            title="Zoom In (Cmd +)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4. UNIFIED VIEW & SOUND DROPDOWN (Pitch, Stave Profile, Visualizers, Tone, Layout) */}
        <div
          ref={viewSoundMenuRef}
          className="relative"
        >
          <button
            onClick={() => setShowViewSoundMenu(!showViewSoundMenu)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-medium transition ${
              isFretboardOpen || isPianoOpen || transpose !== 0 || showViewSoundMenu
                ? 'bg-slate-800 border-amber-500/50 text-amber-300 shadow-sm'
                : 'bg-slate-950/80 border-white/10 text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
            title="Display, Pitch, Visualizers & Guitar Sound"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span>View &amp; Sound</span>
            {(isFretboardOpen || isPianoOpen || transpose !== 0) && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            )}
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Consolidated Menu Popover with Smooth Right-Aligned Animation */}
          {showViewSoundMenu && (
            <div className="absolute right-0 bottom-full pb-2 z-[110] animate-popover-right">
              <div className="w-72 bg-slate-900/95 border border-white/15 rounded-2xl shadow-2xl p-3 space-y-3 backdrop-blur-md">
                {/* SECTION 1: NOTATION VIEW (STAVE PROFILE) */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Notation Display
                  </div>
                  <div className="grid grid-cols-3 gap-1 p-0.5 bg-slate-950 rounded-lg">
                    <button
                      onClick={() => onStaveProfileChange('tab')}
                      className={`py-1.5 px-1 rounded text-[10px] font-bold transition ${
                        staveProfile === 'tab'
                          ? 'bg-amber-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Tabs Only with Songsterr rhythm stems"
                    >
                      Tabs Only
                    </button>
                    <button
                      onClick={() => onStaveProfileChange('default')}
                      className={`py-1.5 px-1 rounded text-[10px] font-bold transition ${
                        staveProfile === 'default'
                          ? 'bg-amber-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Standard Notation + Tablature"
                    >
                      Tab + Notes
                    </button>
                    <button
                      onClick={() => onStaveProfileChange('score')}
                      className={`py-1.5 px-1 rounded text-[10px] font-bold transition ${
                        staveProfile === 'score'
                          ? 'bg-amber-500 text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Standard Sheet Notation Only"
                    >
                      Notes Only
                    </button>
                  </div>
                </div>

                {/* SECTION 2: PITCH TRANSPOSITION */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Pitch &amp; Transpose
                  </div>
                  <div className="flex items-center justify-between p-1.5 bg-slate-950 rounded-lg border border-slate-800">
                    <span className="text-[11px] text-slate-300 font-medium">Key Transpose:</span>
                    <div className="flex items-center gap-1.5 font-mono">
                      <button
                        onClick={() => handlePitchAdjust(Math.max(-6, transpose - 1))}
                        className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center transition active:scale-95 text-xs"
                        title="Transpose Down 1 Semitone"
                      >
                        -
                      </button>
                      <span className={`w-8 text-center font-bold text-xs ${transpose !== 0 ? 'text-amber-400' : 'text-slate-300'}`}>
                        {transpose > 0 ? `+${transpose}` : transpose}
                      </span>
                      <button
                        onClick={() => handlePitchAdjust(Math.min(6, transpose + 1))}
                        className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center transition active:scale-95 text-xs"
                        title="Transpose Up 1 Semitone"
                      >
                        +
                      </button>
                      {transpose !== 0 && (
                        <button
                          onClick={() => handlePitchAdjust(0)}
                          className="text-[9px] text-slate-500 hover:text-amber-400 underline ml-1"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* SECTION 3: VISUALIZERS (FRETBOARD & PIANO) */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Interactive Visualizers
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={onToggleFretboard}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition ${
                        isFretboardOpen
                          ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                          : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800/80 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Guitar className="w-3.5 h-3.5 text-amber-400" />
                        <span>Guitar Fretboard</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800">
                        {isFretboardOpen ? 'ON' : 'OFF'}
                      </span>
                    </button>

                    <button
                      onClick={onTogglePiano}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition ${
                        isPianoOpen
                          ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30'
                          : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800/80 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Music2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Piano Keyboard</span>
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800">
                        {isPianoOpen ? 'ON' : 'OFF'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* SECTION 4: GUITAR TONE PATCH */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Guitar Timbre &amp; Tone
                  </div>
                  <div className="space-y-0.5 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
                    {GUITAR_PATCHES.map((patch) => {
                      const isSelected = currentPatch === patch.id;
                      return (
                        <button
                          key={patch.id}
                          onClick={() => {
                            onPatchChange(patch.id);
                            guitarTonePreview.playPatchPreview(patch.id);
                          }}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded text-[11px] transition ${
                            isSelected
                              ? 'bg-amber-500/20 text-amber-300 font-bold'
                              : 'text-slate-300 hover:bg-slate-800/60'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            {isSelected && <Check className="w-3 h-3 text-amber-400" />}
                            {patch.name}
                          </span>
                          <span className="text-[9px] text-slate-500 font-mono">{patch.category}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SECTION 5: MASTER VOLUME */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Master Volume</span>
                    <span className="font-mono text-amber-400">{Math.round(volume * 100)}%</span>
                  </div>
                  <div className="flex items-center gap-2 p-1.5 bg-slate-950/80 rounded-lg border border-slate-800">
                    <button
                      onClick={() => onVolumeChange(volume === 0 ? 0.8 : 0)}
                      className="p-1 rounded text-slate-400 hover:text-amber-400 transition"
                      title={volume === 0 ? 'Unmute' : 'Mute'}
                    >
                      {volume === 0 ? (
                        <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                      title={`Master Volume: ${Math.round(volume * 100)}%`}
                    />
                  </div>
                </div>

                {/* SECTION 6: PAGE LAYOUT & SHEET THEME */}
                <div className="pt-1 border-t border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Layout:</span>
                    <div className="flex gap-1 p-0.5 bg-slate-950 rounded">
                      <button
                        onClick={() => onLayoutModeChange('page')}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${
                          layoutMode === 'page' ? 'bg-slate-800 text-amber-400' : 'text-slate-400'
                        }`}
                      >
                        <Rows className="w-3 h-3 inline mr-1" /> Page
                      </button>
                      <button
                        onClick={() => onLayoutModeChange('horizontal')}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${
                          layoutMode === 'horizontal' ? 'bg-slate-800 text-amber-400' : 'text-slate-400'
                        }`}
                      >
                        <Columns className="w-3 h-3 inline mr-1" /> Horizontal
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Theme:</span>
                    <div className="flex gap-1 p-0.5 bg-slate-950 rounded">
                      <button
                        onClick={() => onSheetThemeChange && onSheetThemeChange('paper')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          sheetTheme === 'paper' ? 'bg-white text-slate-950' : 'text-slate-400'
                        }`}
                      >
                        Paper
                      </button>
                      <button
                        onClick={() => onSheetThemeChange && onSheetThemeChange('sepia')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          sheetTheme === 'sepia' ? 'bg-[#fbf0d9] text-[#2c2013]' : 'text-slate-400'
                        }`}
                      >
                        Sepia
                      </button>
                      <button
                        onClick={() => onSheetThemeChange && onSheetThemeChange('dark')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          sheetTheme === 'dark' ? 'bg-slate-800 text-amber-400' : 'text-slate-400'
                        }`}
                      >
                        Dark
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

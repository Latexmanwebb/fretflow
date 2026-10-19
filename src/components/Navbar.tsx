import React, { useState, useEffect } from 'react';
import {
  Upload,
  SlidersHorizontal,
  Folder,
  Music,
  Edit2,
  Check,
  X,
  ChevronDown,
  GraduationCap,
  Mic,
  HelpCircle,
} from 'lucide-react';
import { TrackInfo, CuratedSong } from '../types';

interface NavbarProps {
  songTitle: string;
  artist?: string;
  bpm: number;
  tuning: string;
  tracks: TrackInfo[];
  selectedTrackIndex: number;
  onSelectTrack: (trackIndex: number) => void;
  onOpenImport: () => void;
  onOpenLearningMode: () => void;
  isLearningModeOpen?: boolean;
  onOpenTuner?: () => void;
  onOpenTour?: () => void;
  activeView: 'studio' | 'library';
  onToggleView: (view: 'studio' | 'library') => void;
  onUpdateTitleAndArtist?: (title: string, artist: string) => void;
  curatedSongs?: CuratedSong[];
  onSelectCuratedSong?: (song: CuratedSong) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  songTitle,
  artist = 'Classical Study',
  bpm,
  tuning,
  tracks,
  selectedTrackIndex,
  onSelectTrack,
  onOpenImport,
  onOpenLearningMode,
  isLearningModeOpen = false,
  onOpenTuner,
  onOpenTour,
  activeView,
  onToggleView,
  onUpdateTitleAndArtist,
  curatedSongs = [],
  onSelectCuratedSong,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSongPicker, setShowSongPicker] = useState(false);
  const [tempTitle, setTempTitle] = useState(songTitle);
  const [tempArtist, setTempArtist] = useState(artist);

  useEffect(() => {
    setTempTitle(songTitle);
    setTempArtist(artist);
  }, [songTitle, artist]);

  const handleSave = () => {
    if (tempTitle.trim() && onUpdateTitleAndArtist) {
      onUpdateTitleAndArtist(tempTitle.trim(), tempArtist.trim() || 'Custom');
    }
    setIsEditing(false);
  };

  return (
    <header className="bg-slate-900/95 border-b border-white/10 px-4 py-2 flex flex-wrap items-center justify-between gap-3 shadow-md backdrop-blur-md select-none sticky top-0 z-50">
      {/* Brand & Active Song Header */}
      <div className="flex items-center gap-3">
        <div
          onClick={() => onToggleView('library')}
          className="relative w-8 h-8 rounded-lg overflow-hidden shadow-sm border border-amber-500/40 bg-slate-950 flex items-center justify-center cursor-pointer hover:border-amber-400 transition"
          title="Return to Library"
        >
          <img
            src="/logo.jpg"
            alt="FretFlow Logo"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span
              onClick={() => onToggleView('library')}
              className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5 cursor-pointer hover:text-amber-300 transition"
            >
              FretFlow
            </span>
          </div>

          {/* View-aware header: Library subtitle in library mode, active song controls in studio mode */}
          {activeView === 'library' ? (
            <div className="text-[11px] text-slate-400 font-medium">
              Soundslice Library &amp; Mauro Giuliani 120 Suite
            </div>
          ) : isEditing ? (
            <div className="flex items-center gap-1.5 mt-0.5">
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                placeholder="Song Title"
                className="bg-slate-950 border border-amber-500/60 rounded px-1.5 py-0.5 text-xs text-white focus:outline-none w-36"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') setIsEditing(false);
                }}
              />
              <input
                type="text"
                value={tempArtist}
                onChange={(e) => setTempArtist(e.target.value)}
                placeholder="Composer"
                className="bg-slate-950 border border-amber-500/60 rounded px-1.5 py-0.5 text-xs text-white focus:outline-none w-28"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') setIsEditing(false);
                }}
              />
              <button
                onClick={handleSave}
                className="p-1 rounded bg-amber-500 text-slate-950 hover:bg-amber-400 transition"
                title="Save changes"
              >
                <Check className="w-3 h-3 stroke-[2.5]" />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white transition"
                title="Cancel"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 relative">
                <div
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 cursor-pointer group/title hover:text-amber-300 transition"
                  title="Click to rename song & composer"
                >
                  <span className="text-slate-200 font-bold truncate max-w-xs group-hover/title:text-amber-300 transition">
                    {songTitle}
                  </span>
                  {artist && (
                    <span className="text-slate-400 font-normal truncate max-w-[120px]">
                      — {artist}
                    </span>
                  )}
                  <Edit2 className="w-3 h-3 text-slate-500 opacity-0 group-hover/title:opacity-100 transition" />
                </div>

                {/* Quick Song Picker Chevron for Practice Studio */}
                {curatedSongs.length > 0 && onSelectCuratedSong && (
                  <button
                    onClick={() => setShowSongPicker(!showSongPicker)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-amber-300 transition"
                    title="Switch Masterpiece or Exercise"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Song Picker Popover Menu */}
                {showSongPicker && (
                  <div className="absolute left-0 top-full mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1 z-50 animate-popover-down max-h-80 overflow-y-auto">
                    <div className="px-2.5 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Switch Practice Piece
                    </div>
                    {curatedSongs.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          if (onSelectCuratedSong) onSelectCuratedSong(c);
                          setShowSongPicker(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition flex items-center justify-between ${
                          songTitle === c.title
                            ? 'bg-amber-500/20 text-amber-300 font-bold'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{c.title}</span>
                        <span className="text-[10px] font-mono text-slate-500">{c.defaultBpm} BPM</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <span>•</span>
              <span className="font-mono text-amber-400 font-medium tabular-nums min-w-[64px] inline-block text-center">
                {bpm} BPM
              </span>
              <span>•</span>
              <span className="text-[11px] text-slate-400">{tuning}</span>
            </div>
          )}
        </div>
      </div>

      {/* Center Navigation Switcher (Library vs Studio) */}
      <div className="flex items-center bg-slate-950/80 p-0.5 rounded-xl border border-white/10 text-xs">
        <button
          onClick={() => onToggleView('library')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition ${
            activeView === 'library'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Browse & Curate Your Library"
        >
          <Folder className="w-3.5 h-3.5" />
          <span>Library</span>
        </button>
        <button
          onClick={() => onToggleView('studio')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-semibold transition ${
            activeView === 'studio'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
          title="Open Interactive Notation Studio"
        >
          <Music className="w-3.5 h-3.5" />
          <span>Practice Studio</span>
        </button>
      </div>

      {/* Middle Track Selector if file has multiple tracks */}
      {tracks.length > 1 && (
        <div className="flex items-center gap-2 bg-slate-950/80 px-2.5 py-1.5 rounded-xl border border-white/10 text-xs">
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-400">Track:</span>
          <select
            value={selectedTrackIndex}
            onChange={(e) => onSelectTrack(parseInt(e.target.value, 10))}
            aria-label="Audio Track"
            className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
          >
            {tracks.map((t) => (
              <option key={t.index} value={t.index} className="bg-slate-900 text-slate-200">
                {t.name} {t.noteCount !== undefined ? (t.noteCount === 0 ? '(0 notes - rests)' : `(${t.noteCount} notes)`) : `(${t.instrument})`}
              </option>
            ))}
            <option value={-1} className="bg-slate-900 text-slate-200">
              All Tracks
            </option>
          </select>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-2 text-xs">
        {/* Import & Song Library */}
        <button
          onClick={onOpenImport}
          className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 font-medium border border-white/10 transition active:scale-95 shadow-sm"
          title="Import & Library (Guitar Pro, MusicXML, MIDI, Plain Tabs)"
        >
          <Upload className="w-4 h-4 text-amber-400" />
        </button>

        {/* Chromatic Guitar Tuner */}
        {onOpenTuner && (
          <button
            onClick={onOpenTuner}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 font-semibold border border-white/10 hover:border-emerald-500/40 transition active:scale-95 shadow-sm"
            title="Open Live Chromatic Guitar Tuner"
            aria-label="Guitar Tuner"
          >
            <Mic className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="hidden sm:inline">Tuner</span>
          </button>
        )}

        {/* Dedicated Deliberate Learning Mode Studio */}
        <button
          onClick={onOpenLearningMode}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition active:scale-95 shadow-md ${
            isLearningModeOpen
              ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950'
          }`}
          title="Practice Mode: Chunking & Speed Ladder"
          aria-label="Practice Mode"
        >
          <GraduationCap className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Practice</span>
        </button>

        {/* Feature Tour & Quick Guide */}
        {onOpenTour && (
          <button
            onClick={onOpenTour}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 hover:text-amber-400 font-medium border border-white/10 transition active:scale-95 shadow-sm"
            title="Interactive Feature Tour & Guide"
            aria-label="Quick Tour"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};

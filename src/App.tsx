import React, { useState, useRef, useEffect } from 'react';
import { Target, X } from 'lucide-react';
import { AlphaTabViewer, AlphaTabViewerRef } from './components/AlphaTabViewer';
import { FretboardVisualizer } from './components/FretboardVisualizer';
import { PianoVisualizer } from './components/PianoVisualizer';
import { Navbar } from './components/Navbar';
import { PlayerToolbar } from './components/PlayerToolbar';
import { PracticeStudio } from './components/PracticeStudio';
import { ImportModal } from './components/ImportModal';
import { TunerModal } from './components/TunerModal';
import { OnboardingTour } from './components/OnboardingTour';
import { RightHandPluckingHUD } from './components/RightHandPluckingHUD';
import { SoundsliceLibrary } from './components/SoundsliceLibrary';
import { CURATED_LIBRARY } from './services/parsers/alphaTexPresets';
import { GIULIANI_120_EXERCISES, giulianiToCuratedSong } from './services/parsers/giulianiExercises';
import { ActiveNote, TrackInfo, CuratedSong } from './types';
import { metronome, MetronomeBeatMode, CountInMode } from './services/audio/metronome';
import { percussiveSlap } from './services/audio/percussiveSlap';
import { guitarTonePreview } from './services/audio/guitarTonePreview';
import {
  getUserUploads,
  deleteUserUpload,
  updateUserUpload,
  saveUserUpload,
  base64ToArrayBuffer,
  setLastActiveSongId,
  getLastActiveSongId,
  UserUploadedSong,
} from './services/storage/userUploads';

const PREF_KEY = 'fretflow_user_preferences';

interface UserPreferences {
  sheetTheme?: 'paper' | 'sepia' | 'dark';
  currentPatch?: number;
  isFretboardOpen?: boolean;
  speed?: number;
  staveProfile?: 'default' | 'tab' | 'score';
  metronomeMode?: MetronomeBeatMode;
  countInMode?: CountInMode;
  countInBars?: 1 | 2;
  metronomeVolume?: number;
  lastCuratedSongId?: string;
  activeView?: 'studio' | 'library';
}

function loadPreferences(): UserPreferences {
  try {
    const raw = localStorage.getItem(PREF_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function savePreference<K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) {
  try {
    const existing = loadPreferences();
    existing[key] = value;
    localStorage.setItem(PREF_KEY, JSON.stringify(existing));
  } catch {}
}

export const App: React.FC = () => {
  const viewerRef = useRef<AlphaTabViewerRef>(null);
  const savedPrefs = useRef(loadPreferences()).current;

  // Curated list & user uploads state
  const [curatedList, setCuratedList] = useState<CuratedSong[]>(CURATED_LIBRARY);
  const [userUploads, setUserUploads] = useState<UserUploadedSong[]>(() => getUserUploads());

  // View state: 'studio' vs 'library'
  const [activeView, setActiveView] = useState<'studio' | 'library'>(() => {
    try {
      const saved = localStorage.getItem('fretflow_active_view');
      if (saved === 'studio' || saved === 'library') return saved;
      return savedPrefs.activeView || 'library';
    } catch {
      return 'library';
    }
  });

  const handleToggleView = (view: 'studio' | 'library') => {
    setActiveView(view);
    try {
      localStorage.setItem('fretflow_active_view', view);
      savePreference('activeView', view);
    } catch {}
    if (view === 'studio') {
      setTimeout(() => {
        viewerRef.current?.refresh?.();
      }, 50);
    }
  };

  // Determine initial song from saved preferences
  const getInitialSong = (): CuratedSong => {
    const lastSongId = getLastActiveSongId() || savedPrefs.lastCuratedSongId;
    if (lastSongId) {
      const match = CURATED_LIBRARY.find((s) => s.id === lastSongId);
      if (match) return match;
    }
    return CURATED_LIBRARY[0];
  };

  // Active song state
  const [currentSong, setCurrentSong] = useState<CuratedSong>(getInitialSong);
  const [activeNotes, setActiveNotes] = useState<ActiveNote[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBar, setCurrentBar] = useState(1);
  const [totalBars, setTotalBars] = useState(8);
  const [currentBpm, setCurrentBpm] = useState(currentSong.defaultBpm);
  const [speed, setSpeed] = useState(savedPrefs.speed ?? 1.0);
  const [transpose, setTranspose] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [staveProfile, setStaveProfile] = useState<'default' | 'tab' | 'score'>(savedPrefs.staveProfile ?? 'default');
  const [layoutMode, setLayoutMode] = useState<'page' | 'horizontal'>('page');
  const [volume, setVolume] = useState(1.0);
  const [tracks, setTracks] = useState<TrackInfo[]>([]);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);

  // Soundslice Zoom, Instrument Patch & Sheet Theme
  const [zoom, setZoom] = useState(1.0);
  const [currentPatch, setCurrentPatch] = useState(savedPrefs.currentPatch ?? 25);
  const [sheetTheme, setSheetTheme] = useState<'paper' | 'sepia' | 'dark'>(savedPrefs.sheetTheme ?? 'paper');

  // Metronome & Count-In State
  const [isMetronomeActive, setIsMetronomeActive] = useState(false);
  const [metronomeMode, setMetronomeMode] = useState<MetronomeBeatMode>(savedPrefs.metronomeMode ?? 'every-beat');
  const [countInMode, setCountInMode] = useState<CountInMode>(savedPrefs.countInMode ?? 'always');
  const [countInBars, setCountInBars] = useState<1 | 2>(savedPrefs.countInBars ?? 1);
  const [metronomeVolume, setMetronomeVolume] = useState(savedPrefs.metronomeVolume ?? 0.75);
  const [isCountingIn, setIsCountingIn] = useState(false);
  const [countBeatNumber, setCountBeatNumber] = useState<number | null>(null);

  const [timeSignatureNumerator, setTimeSignatureNumerator] = useState(4);

  // Ref tracking previous bar to detect loop wrap-arounds
  const prevBarRef = useRef(1);
  const isLoopCountInRunningRef = useRef(false);
  const isPlayingRef = useRef(false);
  const isCountingInRef = useRef(false);
  const isStartingPlaybackRef = useRef(false);
  const hasPlayedIntoSongRef = useRef(false);

  // Modals & Panels
  const [isFretboardOpen, setIsFretboardOpen] = useState(savedPrefs.isFretboardOpen ?? false);
  const [isPianoOpen, setIsPianoOpen] = useState(false);
  const [isLearningModeOpen, setIsLearningModeOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isTunerOpen, setIsTunerOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(() => {
    try {
      return !localStorage.getItem('fretflow_onboarding_completed');
    } catch {
      return false;
    }
  });

  const recordRecentSong = (id: string) => {
    try {
      const raw = localStorage.getItem('fretflow_recent_song_ids');
      const list: string[] = raw ? JSON.parse(raw) : [];
      const updated = [id, ...list.filter((x) => x !== id)].slice(0, 30);
      localStorage.setItem('fretflow_recent_song_ids', JSON.stringify(updated));
    } catch {}
  };

  // Soundslice-style Focus Mode state
  const [selectedRange, setSelectedRange] = useState<{ startBar: number; endBar: number } | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [focusedRange, setFocusedRange] = useState<{ startBar: number; endBar: number } | null>(null);

  const handleClearFocus = () => {
    viewerRef.current?.clearFocus();
    setIsFocused(false);
    setFocusedRange(null);
    setSelectedRange(null);
  };

  const handleToggleFocus = () => {
    if (isFocused) {
      handleClearFocus();
    } else {
      const range = selectedRange || {
        startBar: currentBar,
        endBar: currentBar,
      };
      viewerRef.current?.focusRange(range.startBar, range.endBar);
      setIsLooping(true);
      setIsFocused(true);
      setFocusedRange({ startBar: range.startBar, endBar: range.endBar });
      setSelectedRange(null); // Clear selectedRange so focused measures have zero blue overlay clutter
    }
  };

  // Synchronized refs to eliminate stale closures in event listeners and shortcuts
  const speedRef = useRef(speed);
  speedRef.current = speed;
  const currentBpmRef = useRef(currentBpm);
  currentBpmRef.current = currentBpm;
  const countInModeRef = useRef(countInMode);
  countInModeRef.current = countInMode;
  const countInBarsRef = useRef(countInBars);
  countInBarsRef.current = countInBars;
  const metronomeVolumeRef = useRef(metronomeVolume);
  metronomeVolumeRef.current = metronomeVolume;
  const metronomeModeRef = useRef(metronomeMode);
  metronomeModeRef.current = metronomeMode;
  const isMetronomeActiveRef = useRef(isMetronomeActive);
  isMetronomeActiveRef.current = isMetronomeActive;
  const isLoopingRef = useRef(isLooping);
  isLoopingRef.current = isLooping;
  const selectedRangeRef = useRef(selectedRange);
  selectedRangeRef.current = selectedRange;
  const currentBarRef = useRef(currentBar);
  currentBarRef.current = currentBar;
  const totalBarsRef = useRef(totalBars);
  totalBarsRef.current = totalBars;
  const timeSignatureNumeratorRef = useRef(timeSignatureNumerator);
  timeSignatureNumeratorRef.current = timeSignatureNumerator;
  const isPausedRef = useRef(false);
  const currentPatchRef = useRef(currentPatch);
  currentPatchRef.current = currentPatch;

  // Open string frequencies (strings 1 to 6) for realistic fretboard audio audition
  const STRING_OPEN_FREQS: Record<number, number> = {
    1: 329.63, // E4
    2: 246.94, // B3
    3: 196.0,  // G3
    4: 146.83, // D3
    5: 110.0,  // A2
    6: 82.41,  // E2
  };

  const handleFretClick = (stringNum: number, fret: number) => {
    const baseFreq = STRING_OPEN_FREQS[stringNum] || 220;
    const freq = baseFreq * Math.pow(2, fret / 12);
    guitarTonePreview.playPluck(currentPatchRef.current ?? 25, freq, 0, 0.65);
  };

  // Instant loop wrap callback triggered when AlphaTab playback wraps around (tick decrease)
  const handleLoopWrap = () => {
    if (!isLoopingRef.current || isLoopCountInRunningRef.current) return;
    if (countInModeRef.current === 'always' || countInModeRef.current === 'loops') {
      isLoopCountInRunningRef.current = true;
      viewerRef.current?.pause();
      metronome.stop();

      const effectiveBpm = Math.round(currentBpmRef.current * speedRef.current);
      isCountingInRef.current = true;
      setIsCountingIn(true);
      metronome.setTempo(effectiveBpm);
      metronome.setVolume(metronomeVolumeRef.current);
      metronome.setCountInBars(countInBarsRef.current);
      metronome.setBeatsPerMeasure(timeSignatureNumeratorRef.current);

      metronome
        .playCountIn(effectiveBpm, countInBarsRef.current * timeSignatureNumeratorRef.current, (beat) => {
          setCountBeatNumber(beat);
        })
        .then(() => {
          isCountingInRef.current = false;
          setIsCountingIn(false);
          setCountBeatNumber(null);
          isLoopCountInRunningRef.current = false;
          if (isPlayingRef.current) {
            viewerRef.current?.play();
            if (isMetronomeActiveRef.current) {
              metronome.start();
            }
          }
        })
        .catch(() => {
          isCountingInRef.current = false;
          setIsCountingIn(false);
          setCountBeatNumber(null);
          isLoopCountInRunningRef.current = false;
        });
    }
  };

  // Dedicated Restart Actions
  const handleRestartBar = () => {
    isPausedRef.current = false;
    viewerRef.current?.seekToBar(currentBar);
    if (!isPlayingRef.current) {
      handlePlayPause();
    }
  };

  const handleRestartRange = () => {
    isPausedRef.current = false;
    const target = selectedRange ? selectedRange.startBar : 1;
    setCurrentBar(target);
    viewerRef.current?.seekToBar(target);
    if (!isPlayingRef.current) {
      handlePlayPause();
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) ||
        target.isContentEditable ||
        target.closest('[role="dialog"]') ||
        target.closest('.modal-container')
      ) {
        if (e.key === 'Escape') {
          setIsLearningModeOpen(false);
          setIsImportOpen(false);
          setIsTunerOpen(false);
          if (isFocused) handleClearFocus();
        }
        return;
      }

      // If full-screen modals are active, ignore player transport shortcuts
      if (isImportOpen || isTunerOpen || isTourOpen) {
        if (e.key === 'Escape') {
          setIsImportOpen(false);
          setIsTunerOpen(false);
          setIsTourOpen(false);
        }
        return;
      }

      // Cmd/Ctrl + / - zoom
      if (e.metaKey || e.ctrlKey) {
        if (e.key === '=' || e.key === '+') {
          e.preventDefault();
          handleZoomChange(zoom + 0.1);
          return;
        } else if (e.key === '-' || e.key === '_') {
          e.preventDefault();
          handleZoomChange(zoom - 0.1);
          return;
        } else if (e.key === '0') {
          e.preventDefault();
          handleZoomChange(1.0);
          return;
        }
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handlePlayPause();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleRestartBar();
      } else if (e.key === 'Home') {
        e.preventDefault();
        handleRestartRange();
      } else if (e.key === 'l' || e.key === 'L') {
        handleToggleLoop();
      } else if (e.key === 'o' || e.key === 'O') {
        handleToggleFocus();
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFretboardOpen((prev) => !prev);
      } else if (e.key === 'm' || e.key === 'M') {
        handleToggleMetronome();
      } else if (e.key === 'Escape') {
        setIsLearningModeOpen(false);
        setIsImportOpen(false);
        setIsTunerOpen(false);
        if (isFocused) handleClearFocus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoom, isFocused, isImportOpen, isTunerOpen, isTourOpen]);

  // Playback Controls with Soundslice Count-In & Seamless Resume
  const handlePlayPause = async () => {
    // If already playing or currently in count-in, user clicking or pressing space toggles to PAUSE
    if (isPlayingRef.current || isCountingInRef.current) {
      metronome.cancelCountIn();
      metronome.stop();
      isCountingInRef.current = false;
      setIsCountingIn(false);
      setCountBeatNumber(null);
      isLoopCountInRunningRef.current = false;
      viewerRef.current?.pause();
      isPlayingRef.current = false;
      setIsPlaying(false);
      isPausedRef.current = true;
      return;
    }

    const effectiveBpm = Math.round(currentBpm * speed);

    // If resuming mid-measure from pause, resume from exact paused tick without rewinding!
    if (isPausedRef.current && currentBar < (totalBars || 1)) {
      isPausedRef.current = false;
      isPlayingRef.current = true;
      setIsPlaying(true);
      viewerRef.current?.play();
      if (isMetronomeActive) {
        metronome.setTempo(effectiveBpm);
        metronome.setMode(metronomeMode);
        metronome.setVolume(metronomeVolume);
        metronome.start();
      }
      return;
    }

    isPausedRef.current = false;
    const targetStartBar = selectedRange
      ? selectedRange.startBar
      : currentBar >= (totalBars || 9)
      ? 1
      : currentBar;

    viewerRef.current?.seekToBar(targetStartBar);
    setCurrentBar(targetStartBar);
    prevBarRef.current = targetStartBar;
    isStartingPlaybackRef.current = true;
    hasPlayedIntoSongRef.current = false;
    isPlayingRef.current = true;

    if (countInMode === 'always') {
      isCountingInRef.current = true;
      setIsCountingIn(true);
      metronome.setTempo(effectiveBpm);
      metronome.setVolume(metronomeVolume);
      metronome.setCountInBars(countInBars);
      metronome.setBeatsPerMeasure(timeSignatureNumerator);

      try {
        await metronome.playCountIn(effectiveBpm, countInBars * timeSignatureNumerator, (count) => {
          setCountBeatNumber(count);
        });
      } catch {
        // Count-in was cancelled by user pausing
        isCountingInRef.current = false;
        setIsCountingIn(false);
        setCountBeatNumber(null);
        return;
      }

      isCountingInRef.current = false;
      setIsCountingIn(false);
      setCountBeatNumber(null);
    }

    // Abort if user paused during the count-in await
    if (!isPlayingRef.current) {
      return;
    }

    viewerRef.current?.play();
    setIsPlaying(true);

    if (isMetronomeActive) {
      metronome.setTempo(effectiveBpm);
      metronome.setMode(metronomeMode);
      metronome.setVolume(metronomeVolume);
      metronome.start();
    }
  };

  const handleStop = () => {
    metronome.cancelCountIn();
    metronome.stop();
    isCountingInRef.current = false;
    setIsCountingIn(false);
    setCountBeatNumber(null);
    isLoopCountInRunningRef.current = false;
    isStartingPlaybackRef.current = false;
    hasPlayedIntoSongRef.current = false;
    setIsPlaying(false);
    isPlayingRef.current = false;
    isPausedRef.current = false;
    const targetStartBar = selectedRange ? selectedRange.startBar : 1;
    prevBarRef.current = targetStartBar;
    setCurrentBar(targetStartBar);
    viewerRef.current?.seekToBar(targetStartBar);
    viewerRef.current?.stop();
  };

  const handleToggleMetronome = () => {
    const next = !isMetronomeActive;
    setIsMetronomeActive(next);
    if (next && isPlaying) {
      metronome.setTempo(Math.round(currentBpm * speed));
      metronome.setMode(metronomeMode);
      metronome.setVolume(metronomeVolume);
      metronome.start();
    } else if (!next) {
      metronome.stop();
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    savePreference('speed', newSpeed);
    viewerRef.current?.setSpeed(newSpeed);
    const effectiveBpm = Math.round(currentBpm * newSpeed);
    metronome.setTempo(effectiveBpm);
  };

  const handleZoomChange = (newZoom: number) => {
    const clamped = Math.max(0.65, Math.min(1.8, Math.round(newZoom * 100) / 100));
    setZoom(clamped);
    viewerRef.current?.setZoom(clamped);
  };

  const handlePatchChange = (patchId: number) => {
    setCurrentPatch(patchId);
    savePreference('currentPatch', patchId);
    viewerRef.current?.setInstrumentPatch(patchId);
  };

  const handleTransposeChange = (newTranspose: number) => {
    setTranspose(newTranspose);
    viewerRef.current?.transpose(newTranspose);
  };

  const handleToggleLoop = () => {
    if (isLooping) {
      setIsLooping(false);
      setSelectedRange(null);
      viewerRef.current?.clearPlaybackRange();
      viewerRef.current?.setLooping(false);
    } else {
      setIsLooping(true);
      viewerRef.current?.setLooping(true);
      if (selectedRange) {
        viewerRef.current?.setPlaybackRange(selectedRange.startBar, selectedRange.endBar);
      }
    }
  };

  const handleStaveProfileChange = (profile: 'default' | 'tab' | 'score') => {
    setStaveProfile(profile);
    savePreference('staveProfile', profile);
    viewerRef.current?.setStaveProfile(profile);
  };

  const handleLayoutModeChange = (mode: 'page' | 'horizontal') => {
    setLayoutMode(mode);
    viewerRef.current?.setLayoutMode(mode);
  };

  const handleSelectCuratedSong = (song: CuratedSong) => {
    handleStop();
    setCurrentSong(song);
    setCurrentBpm(song.defaultBpm);
    setSpeed(1.0);
    handleClearFocus();
    setIsLearningModeOpen(false);
    savePreference('lastCuratedSongId', song.id);
    setLastActiveSongId(song.id);
    recordRecentSong(song.id);
    viewerRef.current?.loadTex(song.tex);
  };

  const handleSelectGiulianiNumber = (num: number) => {
    const ex = GIULIANI_120_EXERCISES.find((e) => e.number === num);
    if (ex) {
      const song = giulianiToCuratedSong(ex);
      handleSelectCuratedSong(song);
    }
  };

  const handleLoadTex = (tex: string, title = 'Imported Practice Piece', bpm = 120, songId?: string) => {
    handleStop();
    const id = songId || 'custom-' + Date.now();
    setCurrentSong({
      id,
      title,
      artist: 'Custom Tab',
      genre: 'Rock',
      difficulty: 'Intermediate',
      tuning: 'Standard (E A D G B E)',
      defaultBpm: bpm,
      tex,
      description: 'Imported tablature ready for deliberate chunk practice.',
      keyTechniques: ['Fingering transitions', 'Tempo ramping'],
    });
    setCurrentBpm(bpm);
    handleClearFocus();
    setIsLearningModeOpen(false);
    setLastActiveSongId(id);
    recordRecentSong(id);
    viewerRef.current?.loadTex(tex);
  };

  const handleLoadScoreBuffer = (buffer: ArrayBuffer, fileName: string, songId?: string) => {
    handleStop();
    const id = songId || 'file-' + Date.now();
    setCurrentSong({
      id,
      title: fileName.replace(/\.[^/.]+$/, ''),
      artist: 'Imported Score',
      genre: 'Rock',
      difficulty: 'Intermediate',
      tuning: 'Standard',
      defaultBpm: 120,
      tex: '',
      description: `Loaded from ${fileName}`,
      keyTechniques: ['Score playback', 'Part isolation'],
    });
    handleClearFocus();
    setIsLearningModeOpen(false);
    setLastActiveSongId(id);
    recordRecentSong(id);
    viewerRef.current?.loadScore(new Uint8Array(buffer));
  };

  const handleUpdateSongInfo = (id: string, newTitle: string, newArtist: string, isCurated: boolean) => {
    if (isCurated) {
      setCuratedList((prev) =>
        prev.map((s) => (s.id === id ? { ...s, title: newTitle, artist: newArtist } : s))
      );
      if (currentSong.id === id) {
        setCurrentSong((prev) => ({ ...prev, title: newTitle, artist: newArtist }));
      }
    } else {
      updateUserUpload(id, { title: newTitle, artist: newArtist });
      setUserUploads(getUserUploads());
      if (currentSong.id === id) {
        setCurrentSong((prev) => ({ ...prev, title: newTitle, artist: newArtist }));
      }
    }
  };

  const handleUpdateCurrentSongTitleAndArtist = (newTitle: string, newArtist: string) => {
    const isCurated = curatedList.some((c) => c.id === currentSong.id);
    handleUpdateSongInfo(currentSong.id, newTitle, newArtist, isCurated);
  };

  // Restore previous song on page load
  useEffect(() => {
    const lastActiveId = getLastActiveSongId();
    if (lastActiveId) {
      const allUploads = getUserUploads();
      const matchUpload = allUploads.find((u) => u.id === lastActiveId);
      if (matchUpload) {
        if (matchUpload.sourceType === 'buffer' && matchUpload.bufferBase64) {
          const buffer = base64ToArrayBuffer(matchUpload.bufferBase64);
          handleLoadScoreBuffer(buffer, matchUpload.fileName || matchUpload.title, matchUpload.id);
          return;
        } else if (matchUpload.tex) {
          handleLoadTex(matchUpload.tex, matchUpload.title, matchUpload.bpm, matchUpload.id);
          return;
        }
      }
      const matchCurated = CURATED_LIBRARY.find((c) => c.id === lastActiveId);
      if (matchCurated) {
        handleSelectCuratedSong(matchCurated);
        return;
      }
      if (lastActiveId.startsWith('giuliani-120-')) {
        const num = parseInt(lastActiveId.replace('giuliani-120-', ''), 10);
        const ex = GIULIANI_120_EXERCISES.find((e) => e.number === num);
        if (ex) {
          handleSelectCuratedSong(giulianiToCuratedSong(ex));
          return;
        }
      }
    }

    if (savedPrefs.lastCuratedSongId) {
      const matchCurated = CURATED_LIBRARY.find((c) => c.id === savedPrefs.lastCuratedSongId);
      if (matchCurated) {
        handleSelectCuratedSong(matchCurated);
        return;
      }
      if (savedPrefs.lastCuratedSongId.startsWith('giuliani-120-')) {
        const num = parseInt(savedPrefs.lastCuratedSongId.replace('giuliani-120-', ''), 10);
        const ex = GIULIANI_120_EXERCISES.find((e) => e.number === num);
        if (ex) {
          handleSelectCuratedSong(giulianiToCuratedSong(ex));
        }
      }
    }
  }, []);

  const handleSelectTrack = (trackIndex: number) => {
    setSelectedTrackIndex(trackIndex);
    viewerRef.current?.selectTrack(trackIndex);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Top Navbar */}
      <Navbar
        songTitle={currentSong.title}
        artist={currentSong.artist}
        bpm={Math.round(currentBpm * speed)}
        tuning={currentSong.tuning}
        tracks={tracks}
        selectedTrackIndex={selectedTrackIndex}
        onSelectTrack={handleSelectTrack}
        onOpenImport={() => setIsImportOpen(true)}
        onOpenLearningMode={() => {
          if (activeView !== 'studio') {
            handleToggleView('studio');
          }
          setIsLearningModeOpen((prev) => !prev);
        }}
        isLearningModeOpen={isLearningModeOpen}
        onOpenTuner={() => setIsTunerOpen(true)}
        onOpenTour={() => setIsTourOpen(true)}
        activeView={activeView}
        onToggleView={handleToggleView}
        onUpdateTitleAndArtist={handleUpdateCurrentSongTitleAndArtist}
        curatedSongs={curatedList}
        onSelectCuratedSong={handleSelectCuratedSong}
      />

      {/* Soundslice-Style "Your Library" Homepage View */}
      {activeView === 'library' && (
        <SoundsliceLibrary
          curatedSongs={curatedList}
          userUploads={userUploads}
          onSelectSong={(song, isCurated) => {
            handleToggleView('studio');
            setTimeout(() => {
              if (isCurated) {
                handleSelectCuratedSong(song as CuratedSong);
              } else {
                const u = song as UserUploadedSong;
                if (u.sourceType === 'buffer' && u.bufferBase64) {
                  const buffer = base64ToArrayBuffer(u.bufferBase64);
                  handleLoadScoreBuffer(buffer, u.fileName || u.title, u.id);
                } else if (u.tex) {
                  handleLoadTex(u.tex, u.title, u.bpm, u.id);
                }
              }
              viewerRef.current?.refresh?.();
            }, 40);
          }}
          onOpenCreateSlice={() => setIsImportOpen(true)}
          onOpenStudio={() => handleToggleView('studio')}
          onDeleteUpload={(id) => {
            deleteUserUpload(id);
            setUserUploads(getUserUploads());
          }}
          onUpdateSongInfo={handleUpdateSongInfo}
          alphaTabApi={viewerRef.current?.getApi?.()}
          currentSongTitle={currentSong.title}
        />
      )}

      {/* Interactive Practice Studio View (Preserved in DOM for playback continuity) */}
      <div
        className={
          activeView === 'studio'
            ? 'flex-1 flex flex-col min-h-0 overflow-hidden relative'
            : 'hidden'
        }
      >
        {/* Main Full-Bleed Notation & Workspace Canvas */}
        <main
          className={`flex-1 flex flex-col overflow-hidden min-h-0 relative transition-colors duration-200 ${
            sheetTheme === 'dark' ? 'bg-[#090d16]' : sheetTheme === 'sepia' ? 'bg-[#fbf0d9]' : 'bg-white'
          }`}
        >
        {/* Count-In HUD Overlay */}
        {isCountingIn && (
          <div className="absolute inset-0 z-40 bg-slate-950/60 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in pointer-events-none">
            <div className="text-8xl font-black text-amber-400 font-mono drop-shadow-[0_0_30px_rgba(245,158,11,0.8)] scale-110 transition-transform">
              {countBeatNumber || 1}
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-300 mt-4">
              Get Ready • Count-In
            </p>
          </div>
        )}

        {/* Dedicated Learning Mode Studio Dock */}
        {isLearningModeOpen && (
          <div className="shrink-0 z-20 bg-slate-900 border-b border-slate-800">
            <PracticeStudio
              songTitle={currentSong.title}
              songId={currentSong.id}
              totalBars={totalBars}
              currentBpm={currentBpm}
              currentBar={currentBar}
              onSetPlaybackRange={(start, end) => {
                viewerRef.current?.setPlaybackRange(start, end);
                viewerRef.current?.setLooping(true);
                setIsLooping(true);
              }}
              onFocusChunk={(start, end) => {
                viewerRef.current?.focusRange(start, end);
                setIsFocused(true);
                setIsLooping(true);
                setFocusedRange({ startBar: start, endBar: end });
              }}
              onSetSpeed={(s) => handleSpeedChange(s)}
              onPlayPause={handlePlayPause}
              onStop={handleStop}
              isPlaying={isPlaying}
              onOpenTuner={() => setIsTunerOpen(true)}
              onClose={() => {
                setIsLearningModeOpen(false);
                handleClearFocus();
              }}
            />
          </div>
        )}

        {/* Mauro Giuliani Right-Hand Plucking Guide & Live Beat Sync */}
        {currentSong.id?.startsWith('giuliani-') && (
          <RightHandPluckingHUD
            currentSong={currentSong}
            activeNotes={activeNotes}
            isPlaying={isPlaying}
            onSelectExercise={handleSelectGiulianiNumber}
          />
        )}

        {/* AlphaTab Notation & Tablature Viewer */}
        <div className="flex-1 min-h-0 relative">
          {/* Floating Exit Focus Mode Pill */}
          {isFocused && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 bg-slate-900/95 text-amber-300 font-semibold px-3.5 py-1.5 rounded-full shadow-2xl border border-amber-500/40 backdrop-blur-md animate-fade-in text-xs select-none">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <div className="flex items-center gap-1.5 text-slate-200">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  Focus Mode{' '}
                  {focusedRange && (
                    <span className="text-amber-400 font-mono">
                      ({focusedRange.startBar === focusedRange.endBar
                        ? `Bar ${focusedRange.startBar}`
                        : `Bars ${focusedRange.startBar}-${focusedRange.endBar}`})
                    </span>
                  )}
                </span>
              </div>
              <button
                onClick={handleClearFocus}
                className="ml-1 px-2.5 py-0.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] transition flex items-center gap-1 shadow-sm active:scale-95"
                title="Exit Focus Mode (Esc or O)"
              >
                <span>Exit Focus</span>
                <X className="w-3 h-3 stroke-[2.5]" />
              </button>
            </div>
          )}

          <AlphaTabViewer
            ref={viewerRef}
            initialTex={currentSong.tex}
            theme={sheetTheme}
            selectedTrackIndex={selectedTrackIndex}
            onActiveNotesChange={(notes) => setActiveNotes(notes)}
            onPlaybackStateChange={(playing) => {
              if (isLoopCountInRunningRef.current) return;
              setIsPlaying(playing);
              isPlayingRef.current = playing;
              if (!playing) {
                isPausedRef.current = true;
                if (!isCountingIn) {
                  metronome.stop();
                }
              }
            }}
            onCurrentBarChange={(bar) => setCurrentBar(bar)}
            onSelectionRangeChange={(range) => setSelectedRange(range)}
            onZoomChange={(z) => setZoom(z)}
            onLoopWrap={handleLoopWrap}
            onSongLoaded={(info) => {
              setTotalBars(info.barsCount);
              setCurrentBpm(info.bpm);
              setTracks(info.tracks);
              if (typeof info.selectedTrackIndex === 'number') {
                setSelectedTrackIndex(info.selectedTrackIndex);
              }
              if (info.title && info.title !== 'Untitled Practice Piece') {
                setCurrentSong((prev) => {
                  const isGiulianiOrNumbered =
                    prev.title.startsWith('No. ') ||
                    prev.id?.startsWith('giuliani-') ||
                    (info.title === 'Mauro Giuliani — Op. 1 Part 3' && prev.title !== 'Mauro Giuliani — Op. 1 Part 3');
                  return {
                    ...prev,
                    title: isGiulianiOrNumbered ? prev.title : info.title,
                    artist: info.artist || prev.artist,
                    defaultBpm: info.bpm || prev.defaultBpm,
                  };
                });
              }
              const tsNum = info.timeSignatureNumerator || 4;
              setTimeSignatureNumerator(tsNum);
              metronome.setBeatsPerMeasure(tsNum);
              if (savedPrefs.speed) viewerRef.current?.setSpeed(savedPrefs.speed);
              if (savedPrefs.currentPatch) viewerRef.current?.setInstrumentPatch(savedPrefs.currentPatch);
              if (savedPrefs.staveProfile) viewerRef.current?.setStaveProfile(savedPrefs.staveProfile);
            }}
          />
        </div>

        {/* Dynamic Fretboard (Collapsible) */}
        {isFretboardOpen && (
          <div className="shrink-0 bg-slate-950 border-t border-slate-800 p-2 z-20 transition-all duration-300">
            <FretboardVisualizer
              activeNotes={activeNotes}
              onFretClick={handleFretClick}
            />
          </div>
        )}

        {/* Soundslice-Style Piano Keyboard Visualizer */}
        {isPianoOpen && (
          <div className="shrink-0 bg-slate-950 border-t border-slate-800 p-2 z-20 transition-all duration-300">
            <PianoVisualizer activeNotes={activeNotes} />
          </div>
        )}
      </main>

      {/* Songsterr / Soundslice Player Bar with High Stacking Context */}
      <footer className="shrink-0 relative z-[100]">
        <PlayerToolbar
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onStop={handleStop}
          speed={speed}
          onSpeedChange={handleSpeedChange}
          baseBpm={currentBpm}
          isLooping={isLooping}
          onToggleLoop={handleToggleLoop}
          isFocused={isFocused}
          onToggleFocus={handleToggleFocus}
          focusedRangeText={
            isFocused && focusedRange
              ? focusedRange.startBar === focusedRange.endBar
                ? `Bar ${focusedRange.startBar}`
                : `Bars ${focusedRange.startBar}-${focusedRange.endBar}`
              : null
          }
          staveProfile={staveProfile}
          onStaveProfileChange={handleStaveProfileChange}
          layoutMode={layoutMode}
          onLayoutModeChange={handleLayoutModeChange}
          isFretboardOpen={isFretboardOpen}
          onToggleFretboard={() => {
            const next = !isFretboardOpen;
            setIsFretboardOpen(next);
            savePreference('isFretboardOpen', next);
          }}
          isPianoOpen={isPianoOpen}
          onTogglePiano={() => setIsPianoOpen(!isPianoOpen)}
          transpose={transpose}
          onTransposeChange={handleTransposeChange}
          onOpenTuner={() => setIsTunerOpen(true)}
          volume={volume}
          onVolumeChange={(v) => {
            setVolume(v);
            viewerRef.current?.setMasterVolume(v);
            percussiveSlap.setVolume(v);
          }}
          currentBar={currentBar}
          totalBars={totalBars}
          zoom={zoom}
          onZoomChange={handleZoomChange}
          currentPatch={currentPatch}
          onPatchChange={handlePatchChange}
          isMetronomeActive={isMetronomeActive}
          onToggleMetronome={handleToggleMetronome}
          metronomeMode={metronomeMode}
          onMetronomeModeChange={(m) => {
            setMetronomeMode(m);
            savePreference('metronomeMode', m);
            metronome.setMode(m);
          }}
          countInMode={countInMode}
          onCountInModeChange={(m) => {
            setCountInMode(m);
            savePreference('countInMode', m);
            metronome.setCountInMode(m);
          }}
          countInBars={countInBars}
          onCountInBarsChange={(b) => {
            setCountInBars(b);
            savePreference('countInBars', b);
            metronome.setCountInBars(b);
          }}
          metronomeVolume={metronomeVolume}
          onMetronomeVolumeChange={(v) => {
            setMetronomeVolume(v);
            savePreference('metronomeVolume', v);
            metronome.setVolume(v);
          }}
          sheetTheme={sheetTheme}
          onSheetThemeChange={(t) => {
            setSheetTheme(t);
            savePreference('sheetTheme', t);
          }}
        />
      </footer>
      </div>

      {/* Import & Song Library Modal */}
      <ImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onLoadTex={(tex, title = 'Imported Tab', bpm = 120, existingId) => {
          let id = existingId;
          if (!id) {
            const saved = saveUserUpload({
              title,
              artist: 'User Upload',
              category: 'upload',
              bpm,
              sourceType: 'tex',
              tex,
            });
            id = saved.id;
            setUserUploads(getUserUploads());
          }
          handleLoadTex(tex, title, bpm, id);
          setActiveView('studio');
        }}
        onLoadScoreBuffer={(buffer, name, existingId) => {
          let id = existingId;
          if (!id) {
            const saved = saveUserUpload({
              title: name.replace(/\.[^/.]+$/, ''),
              artist: 'User Upload',
              category: 'upload',
              fileName: name,
              bpm: 120,
              sourceType: 'buffer',
              buffer,
            });
            id = saved.id;
            setUserUploads(getUserUploads());
          }
          handleLoadScoreBuffer(buffer, name, id);
          setActiveView('studio');
        }}
        onSelectCuratedSong={(song) => {
          handleSelectCuratedSong(song);
          setActiveView('studio');
        }}
      />

      {/* Chromatic Tuner Modal */}
      <TunerModal isOpen={isTunerOpen} onClose={() => setIsTunerOpen(false)} />

      {/* Guided Onboarding Tour Modal */}
      <OnboardingTour isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />
    </div>
  );
};

export default App;

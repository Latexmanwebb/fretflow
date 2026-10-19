import React, { useState, useMemo } from 'react';
import {
  Folder,
  Music,
  Plus,
  Search,
  Download,
  Trash2,
  Edit2,
  Play,
  Check,
  X,
  BookOpen,
  History,
  Sparkles,
  ChevronRight,
  ExternalLink,
  FileText,
  Upload,
} from 'lucide-react';
import { CuratedSong } from '../types';
import { UserUploadedSong } from '../services/storage/userUploads';
import { exportScore, ExportFormat } from '../services/export/scoreExporter';
import {
  GIULIANI_120_EXERCISES,
  giulianiToCuratedSong,
  GiulianiExercise,
} from '../services/parsers/giulianiExercises';

interface SoundsliceLibraryProps {
  curatedSongs: CuratedSong[];
  userUploads: UserUploadedSong[];
  onSelectSong: (song: CuratedSong | UserUploadedSong, isCurated: boolean) => void;
  onOpenCreateSlice: () => void;
  onOpenStudio: () => void;
  onDeleteUpload: (id: string) => void;
  onUpdateSongInfo: (id: string, newTitle: string, newArtist: string, isCurated: boolean) => void;
  alphaTabApi: any;
  currentSongTitle: string;
}

export const SoundsliceLibrary: React.FC<SoundsliceLibraryProps> = ({
  curatedSongs,
  userUploads,
  onSelectSong,
  onOpenCreateSlice,
  onOpenStudio,
  onDeleteUpload,
  onUpdateSongInfo,
  alphaTabApi,
  currentSongTitle,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'masterpieces' | 'uploads' | 'exercises' | 'recent'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [editingSongId, setEditingSongId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editArtist, setEditArtist] = useState('');

  // Track recent song IDs from localStorage
  const recentSongIds: string[] = useMemo(() => {
    try {
      const raw = localStorage.getItem('fretflow_recent_song_ids');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }, [activeCategory]);

  const recordRecentSong = (id: string) => {
    try {
      const raw = localStorage.getItem('fretflow_recent_song_ids');
      const list: string[] = raw ? JSON.parse(raw) : [];
      const updated = [id, ...list.filter((x) => x !== id)].slice(0, 30);
      localStorage.setItem('fretflow_recent_song_ids', JSON.stringify(updated));
    } catch {}
  };

  // Selected exercise for custom tab editing / modal view
  const [customExerciseModal, setCustomExerciseModal] = useState<GiulianiExercise | null>(null);
  const [customTabInput, setCustomTabInput] = useState('');

  // Format timestamp into clean date e.g. "Oct 18, 2026"
  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'Oct 18, 2026';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Build unified items list
  const allItems = useMemo(() => {
    const curated = curatedSongs.map((c) => ({
      id: c.id,
      title: c.title,
      artist: c.artist,
      category: (c.genre === 'Exercises' ? 'exercises' : 'masterpiece') as 'masterpiece' | 'exercises',
      bpm: c.defaultBpm,
      tuning: c.tuning,
      difficulty: c.difficulty,
      genre: c.genre,
      date: 'Oct 18, 2026',
      raw: c,
      isCurated: true,
    }));

    const uploads = userUploads.map((u) => ({
      id: u.id,
      title: u.title,
      artist: u.artist || 'User Upload',
      category: 'upload' as const,
      bpm: u.bpm,
      tuning: 'Standard',
      difficulty: 'Intermediate',
      genre: 'Custom Tab',
      date: formatDate(u.uploadedAt),
      raw: u,
      isCurated: false,
    }));

    const giuliani = GIULIANI_120_EXERCISES.map((ex) => {
      const song = giulianiToCuratedSong(ex);
      return {
        id: song.id,
        title: song.title,
        artist: song.artist,
        category: 'exercises' as const,
        bpm: song.defaultBpm,
        tuning: song.tuning,
        difficulty: song.difficulty,
        genre: song.genre,
        date: 'Classical Library',
        raw: song,
        isCurated: true,
      };
    });

    return [...uploads, ...curated, ...giuliani];
  }, [curatedSongs, userUploads]);

  // Filter items by category & search query
  const filteredItems = useMemo(() => {
    let items = allItems;
    if (activeCategory === 'recent') {
      items = allItems
        .filter((item) => recentSongIds.includes(item.id))
        .sort((a, b) => recentSongIds.indexOf(a.id) - recentSongIds.indexOf(b.id));
    } else {
      items = allItems.filter((item) => {
        if (activeCategory === 'masterpieces' && item.category !== 'masterpiece') return false;
        if (activeCategory === 'uploads' && item.category !== 'upload') return false;
        if (activeCategory === 'exercises' && item.category !== 'exercises') return false;
        return true;
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.artist.toLowerCase().includes(query) ||
          item.genre.toLowerCase().includes(query)
      );
    }
    return items;
  }, [allItems, activeCategory, searchQuery, recentSongIds]);

  const startEditing = (id: string, title: string, artist: string) => {
    setEditingSongId(id);
    setEditTitle(title);
    setEditArtist(artist);
  };

  const saveEditing = (id: string, isCurated: boolean) => {
    if (editTitle.trim()) {
      onUpdateSongInfo(id, editTitle.trim(), editArtist.trim() || 'Custom', isCurated);
    }
    setEditingSongId(null);
  };

  const handleExport = (format: ExportFormat) => {
    setShowExportMenu(false);
    exportScore(alphaTabApi, format, currentSongTitle || 'FretFlow_Slice');
  };

  const handleSelectExercise = (ex: GiulianiExercise) => {
    const song = giulianiToCuratedSong(ex);
    recordRecentSong(song.id);
    onSelectSong(song, true);
  };

  const renderPatternPills = (pattern: string) => {
    const steps = pattern.split('-').map((s) => s.trim());
    return (
      <div className="flex items-center gap-1 flex-wrap">
        {steps.map((step, idx) => (
          <span
            key={idx}
            className="text-[10px] bg-slate-800/90 px-1.5 py-0.5 rounded font-mono font-bold text-slate-300 border border-white/10"
          >
            {step.split('+').map((char, cIdx) => {
              const low = char.trim().toLowerCase();
              const colorClass =
                low === 'p'
                  ? 'text-amber-400'
                  : low === 'i'
                  ? 'text-sky-400'
                  : low === 'm'
                  ? 'text-emerald-400'
                  : low === 'a'
                  ? 'text-purple-400'
                  : 'text-rose-400';
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
    );
  };

  const [exerciseGroup, setExerciseGroup] = useState<'all' | 'beginner' | 'triplets' | '16ths' | 'alternating' | 'virtuoso'>('all');

  // Filter 120 Giuliani studies
  const filteredExercises = useMemo(() => {
    return GIULIANI_120_EXERCISES.filter((ex) => {
      if (exerciseGroup === 'beginner' && (ex.number < 1 || ex.number > 10)) return false;
      if (exerciseGroup === 'triplets' && (ex.number < 11 || ex.number > 27)) return false;
      if (exerciseGroup === '16ths' && (ex.number < 28 || ex.number > 68)) return false;
      if (exerciseGroup === 'alternating' && (ex.number < 69 || ex.number > 90)) return false;
      if (exerciseGroup === 'virtuoso' && (ex.number < 91 || ex.number > 120)) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().replace('#', '').trim();
        return (
          String(ex.number).includes(q) ||
          ex.title.toLowerCase().includes(q) ||
          ex.pattern.toLowerCase().includes(q) ||
          ex.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [exerciseGroup, searchQuery]);

  return (
    <div className="flex h-full w-full flex-1 min-h-0 overflow-hidden bg-slate-950 text-slate-100 select-none">
      {/* LEFT SIDEBAR (Refined Soundslice Studio Style) */}
      <aside className="w-56 shrink-0 bg-slate-900/40 border-r border-white/10 flex flex-col justify-between p-3.5 backdrop-blur-sm">
        <div className="space-y-5">
          {/* HOME Navigation Group */}
          <div className="space-y-1">
            <div className="px-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Navigation
            </div>
            <button
              onClick={() => setActiveCategory('all')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                activeCategory !== 'exercises' && activeCategory !== 'recent'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Folder className="w-4 h-4 text-amber-400" />
              <span>Library</span>
            </button>
            <button
              onClick={onOpenStudio}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              <Music className="w-4 h-4 text-slate-400" />
              <span>Practice Studio</span>
            </button>
            <button
              onClick={() => setActiveCategory('recent')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                activeCategory === 'recent'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <History className="w-4 h-4 text-slate-400" />
              <span>Recent</span>
            </button>
          </div>

          {/* EXERCISES & PEDAGOGY Group */}
          <div className="space-y-1 pt-2 border-t border-white/5">
            <div className="px-2.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Exercises
            </div>
            <button
              onClick={() => setActiveCategory('exercises')}
              className={`w-full text-left p-2.5 rounded-xl border transition group ${
                activeCategory === 'exercises'
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-sm'
                  : 'border-white/5 bg-slate-900/40 hover:bg-slate-900/80 hover:border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition">
                  Mauro Giuliani
                </span>
                <span className="text-[9px] bg-amber-500/15 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-mono font-bold">
                  120 Studies
                </span>
              </div>
              <div className="text-[11px] text-slate-400 leading-tight">
                Right-Hand Coordination Suite
              </div>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-2.5 text-[10px] text-slate-500 font-mono tracking-tight">
          FretFlow • Giuliani Op. 1
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-950/60">
        {/* LIBRARY MAIN VIEW (Centered with max-w-6xl mx-auto) */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-6xl mx-auto w-full space-y-6">
            {/* Header & Action Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">
                  {activeCategory === 'exercises' ? 'Mauro Giuliani — 120 Studies' : 'Your Library'}
                </h1>
                <div className="text-xs text-slate-400 mt-1">
                  {activeCategory === 'exercises'
                    ? `120 right-hand arpeggio workouts over C & G7 (${filteredExercises.length} visible). Select any exercise to practice.`
                    : `${filteredItems.length} practice pieces ready for deliberate practice & looping`}
                </div>
              </div>

              {/* Action buttons & Search */}
              <div className="flex items-center gap-2.5">
                {/* Search Box */}
                <div className="relative w-72 max-w-full">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder={
                      activeCategory === 'exercises'
                        ? 'Search # (e.g. 24) or pattern (p-i-m)...'
                        : 'Search library...'
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900/90 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition"
                  />
                </div>

                {/* Export Dropdown Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition"
                    title="Export active piece to PDF, GP7, GPX, MIDI, MP3, MusicXML"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Export</span>
                  </button>

                  {/* Export Popover Menu */}
                  {showExportMenu && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-slate-900/95 border border-white/15 rounded-xl shadow-2xl p-1.5 z-50 animate-popover-down backdrop-blur-md">
                      <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        Export Formats
                      </div>
                      <button
                        onClick={() => handleExport('pdf')}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-200 hover:bg-white/10 transition"
                      >
                        📄 PDF Sheet &amp; Tab
                      </button>
                      <button
                        onClick={() => handleExport('gp')}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-200 hover:bg-white/10 transition"
                      >
                        🎸 Guitar Pro (.gp)
                      </button>
                      <button
                        onClick={() => handleExport('midi')}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-200 hover:bg-white/10 transition"
                      >
                        🎹 MIDI (.mid)
                      </button>
                      <button
                        onClick={() => handleExport('alphatex')}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-200 hover:bg-white/10 transition"
                      >
                        🎼 AlphaTex (.tex)
                      </button>
                    </div>
                  )}
                </div>

                {/* Create Slice (Import) Button */}
                <button
                  onClick={onOpenCreateSlice}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold text-xs shadow-md active:scale-95 transition"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Create slice</span>
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/10 text-xs font-semibold">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-3 py-1 rounded-lg transition ${
                    activeCategory === 'all'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveCategory('masterpieces')}
                  className={`px-3 py-1 rounded-lg transition ${
                    activeCategory === 'masterpieces'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Masterpieces
                </button>
                <button
                  onClick={() => setActiveCategory('uploads')}
                  className={`px-3 py-1 rounded-lg transition ${
                    activeCategory === 'uploads'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  My Uploads
                </button>
                <button
                  onClick={() => setActiveCategory('exercises')}
                  className={`px-3 py-1 rounded-lg transition ${
                    activeCategory === 'exercises'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Exercises (120)
                </button>
                <button
                  onClick={() => setActiveCategory('recent')}
                  className={`px-3 py-1 rounded-lg transition ${
                    activeCategory === 'recent'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Recent ({recentSongIds.length})
                </button>
              </div>

              {/* Sub-groups for exercises */}
              {activeCategory === 'exercises' && (
                <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/10 text-[11px] font-semibold">
                  <button
                    onClick={() => setExerciseGroup('all')}
                    className={`px-2.5 py-0.5 rounded-lg transition ${
                      exerciseGroup === 'all'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    All 120
                  </button>
                  <button
                    onClick={() => setExerciseGroup('beginner')}
                    className={`px-2.5 py-0.5 rounded-lg transition ${
                      exerciseGroup === 'beginner'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    1–10
                  </button>
                  <button
                    onClick={() => setExerciseGroup('triplets')}
                    className={`px-2.5 py-0.5 rounded-lg transition ${
                      exerciseGroup === 'triplets'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    11–27 (Triplets)
                  </button>
                  <button
                    onClick={() => setExerciseGroup('16ths')}
                    className={`px-2.5 py-0.5 rounded-lg transition ${
                      exerciseGroup === '16ths'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    28–68 (16ths)
                  </button>
                  <button
                    onClick={() => setExerciseGroup('alternating')}
                    className={`px-2.5 py-0.5 rounded-lg transition ${
                      exerciseGroup === 'alternating'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    69–90 (Bass)
                  </button>
                  <button
                    onClick={() => setExerciseGroup('virtuoso')}
                    className={`px-2.5 py-0.5 rounded-lg transition ${
                      exerciseGroup === 'virtuoso'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    91–120 (Virtuoso)
                  </button>
                </div>
              )}
            </div>

            {/* IF ACTIVE CATEGORY IS EXERCISES: SHOW GIULIANI SUITE GRID */}
            {activeCategory === 'exercises' ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-amber-400">
                      Mauro Giuliani Op. 1 Part 3 (120 Right Hand Arpeggio Studies)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      The premier right-hand coordination system for classical and fingerstyle guitar.
                      Click any exercise to load it with real-time p-i-m-a fingering guidance.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCustomExerciseModal(GIULIANI_120_EXERCISES[0]);
                      setCustomTabInput(GIULIANI_120_EXERCISES[0].tex);
                    }}
                    className="shrink-0 px-3 py-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold transition"
                  >
                    View / Edit Custom PDF Tab
                  </button>
                </div>

                {/* 120 Exercises Grid */}
                {filteredExercises.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs">
                    No Giuliani studies found matching &quot;{searchQuery}&quot;.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredExercises.map((ex) => (
                    <div
                      key={ex.number}
                      className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 hover:border-amber-500/40 hover:bg-slate-900/90 transition flex flex-col justify-between space-y-3 group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-mono font-bold text-amber-400">
                            Exercise #{ex.number}
                          </span>
                          {renderPatternPills(ex.pattern)}
                        </div>
                        <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition line-clamp-1">
                          {ex.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {ex.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                        <span className="font-mono text-[10px] text-slate-500">
                          {ex.timeSignature} • {ex.bpm} BPM
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              setCustomExerciseModal(ex);
                              setCustomTabInput(ex.tex);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
                            title="Inspect AlphaTex notation"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleSelectExercise(ex)}
                            className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px] hover:bg-amber-400 transition flex items-center gap-1"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Practice</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            ) : (
              /* SLICES TABLE (Refined Soundslice Table Design) */
              <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                {/* Table Header */}
                <div className="grid grid-cols-12 px-5 py-3 text-[10px] font-semibold text-slate-400 border-b border-white/10 uppercase tracking-wider bg-slate-950/40">
                  <div className="col-span-6">Slice name</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-2 text-right">Date created ↑</div>
                  <div className="col-span-2 text-right pr-2">Actions</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-white/5">
                  {filteredItems.length === 0 ? (
                    <div className="py-16 px-4 text-center flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800/60 border border-white/10 flex items-center justify-center mb-3 text-slate-400 shadow-inner">
                        {activeCategory === 'uploads' ? (
                          <Upload className="w-5 h-5 text-amber-400" />
                        ) : activeCategory === 'recent' ? (
                          <History className="w-5 h-5 text-amber-400" />
                        ) : (
                          <Music className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-200">
                        {searchQuery.trim()
                          ? `No pieces found matching "${searchQuery}"`
                          : activeCategory === 'uploads'
                          ? 'No uploads yet'
                          : activeCategory === 'recent'
                          ? 'No recently practiced pieces'
                          : 'No pieces found'}
                      </h4>
                      <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
                        {searchQuery.trim()
                          ? 'Try searching by title, composer, or musical genre.'
                          : activeCategory === 'uploads'
                          ? 'Import your own Guitar Pro (.gp3–.gp8), MusicXML, or AlphaTex files to practice them here.'
                          : activeCategory === 'recent'
                          ? 'Pieces and exercises you practice will automatically appear here for quick access.'
                          : 'Explore our curated masterpieces or dive into the 120 Mauro Giuliani studies.'}
                      </p>
                      {!searchQuery.trim() && activeCategory === 'uploads' && (
                        <button
                          onClick={onOpenCreateSlice}
                          className="mt-4 px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Create / Import Slice</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    filteredItems.map((item) => {
                      const isEditing = editingSongId === item.id;
                      return (
                        <div
                          key={item.id}
                          className="grid grid-cols-12 items-center px-5 py-3 hover:bg-white/5 transition group"
                        >
                          {/* Name & Subtitle */}
                          <div className="col-span-6 flex items-center gap-3 min-w-0 pr-4">
                            <div
                              onClick={() => {
                                recordRecentSong(item.id);
                                onSelectSong(item.raw as any, item.isCurated);
                              }}
                              className="w-8 h-8 rounded-lg bg-slate-800/80 border border-white/10 flex items-center justify-center shrink-0 cursor-pointer hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition"
                              title="Open in Studio"
                            >
                              <Music className="w-4 h-4" />
                            </div>

                            {isEditing ? (
                              <div className="flex-1 flex items-center gap-2">
                                <input
                                  type="text"
                                  value={editTitle}
                                  onChange={(e) => setEditTitle(e.target.value)}
                                  placeholder="Title"
                                  className="flex-1 bg-slate-950 border border-amber-500/50 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                                  autoFocus
                                />
                                <input
                                  type="text"
                                  value={editArtist}
                                  onChange={(e) => setEditArtist(e.target.value)}
                                  placeholder="Artist / Composer"
                                  className="w-32 bg-slate-950 border border-amber-500/50 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500/30"
                                />
                                <button
                                  onClick={() => saveEditing(item.id, item.isCurated)}
                                  className="p-1 rounded bg-amber-500 text-slate-950 hover:bg-amber-400 transition"
                                  title="Save"
                                >
                                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                </button>
                                <button
                                  onClick={() => setEditingSongId(null)}
                                  className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white transition"
                                  title="Cancel"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ) : (
                              <div
                                onClick={() => {
                                  recordRecentSong(item.id);
                                  onSelectSong(item.raw as any, item.isCurated);
                                }}
                                className="cursor-pointer min-w-0"
                              >
                                <div className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition truncate">
                                  <strong>{item.title}</strong> —{' '}
                                  <span className="text-slate-400 font-normal">{item.artist}</span>
                                </div>
                                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                                  {item.tuning} • {item.bpm} BPM • {item.genre}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Category Badge */}
                          <div className="col-span-2">
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                                item.category === 'masterpiece'
                                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                                  : item.category === 'exercises'
                                  ? 'bg-orange-500/10 text-orange-300 border-orange-500/30'
                                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                              }`}
                            >
                              {item.category === 'masterpiece'
                                ? 'Masterpiece'
                                : item.category === 'exercises'
                                ? 'Giuliani Study'
                                : 'Upload'}
                            </span>
                          </div>

                          {/* Date Created */}
                          <div className="col-span-2 text-right font-mono text-[11px] text-slate-400 tabular-nums">
                            {item.date}
                          </div>

                          {/* Action Buttons */}
                          <div className="col-span-2 flex items-center justify-end gap-1.5 pr-2">
                            <button
                              onClick={() => {
                                recordRecentSong(item.id);
                                onSelectSong(item.raw as any, item.isCurated);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500 hover:text-slate-950 text-amber-300 text-[11px] font-bold transition flex items-center gap-1"
                              title="Open in Practice Studio"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Practice</span>
                            </button>

                            <button
                              onClick={() => startEditing(item.id, item.title, item.artist)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition"
                              title="Edit Title & Composer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            {!item.isCurated && (
                              <button
                                onClick={() => {
                                  if (confirm(`Delete "${item.title}" from your library?`)) {
                                    onDeleteUpload(item.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition"
                                title="Delete slice"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* CUSTOM GIULIANI TAB INSPECTOR / PASTE MODAL */}
      {customExerciseModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm text-white">
                  {customExerciseModal.title}
                </h3>
              </div>
              <button
                onClick={() => setCustomExerciseModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Pattern: <strong className="text-amber-400 font-mono">{customExerciseModal.pattern}</strong>.
              Below is the AlphaTex tab for this exercise. You can practice it immediately or customize it from your PDF.
            </p>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400">AlphaTex Tab Notation</label>
              <textarea
                value={customTabInput}
                onChange={(e) => setCustomTabInput(e.target.value)}
                rows={6}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-200 focus:outline-none focus:border-amber-500/60"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setCustomExerciseModal(null)}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const updatedSong = giulianiToCuratedSong({
                    ...customExerciseModal,
                    tex: customTabInput,
                  });
                  setCustomExerciseModal(null);
                  onSelectSong(updatedSong, true);
                }}
                className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Practice in Studio</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

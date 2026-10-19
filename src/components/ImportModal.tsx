import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  FileMusic,
  FileText,
  FileCode,
  Music,
  CheckCircle,
  AlertCircle,
  X,
  BookOpen,
  ArrowRight,
  FolderHeart,
  Trash2,
  Clock,
} from 'lucide-react';
import { parseAsciiTabToAlphaTex } from '../services/parsers/asciiTabParser';
import { parseMuseScoreFile } from '../services/parsers/musescoreParser';
import { CURATED_LIBRARY } from '../services/parsers/alphaTexPresets';
import { CuratedSong } from '../types';
import {
  getUserUploads,
  saveUserUpload,
  deleteUserUpload,
  UserUploadedSong,
  base64ToArrayBuffer,
} from '../services/storage/userUploads';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadTex: (tex: string, title?: string, bpm?: number, songId?: string) => void;
  onLoadScoreBuffer: (buffer: ArrayBuffer, fileName: string, songId?: string) => void;
  onSelectCuratedSong: (song: CuratedSong) => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  onLoadTex,
  onLoadScoreBuffer,
  onSelectCuratedSong,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'user-library' | 'library'>('upload');
  const [pasteText, setPasteText] = useState('');
  const [pasteTitle, setPasteTitle] = useState('My Pasted Tab');
  const [pasteBpm, setPasteBpm] = useState(120);
  const [dragActive, setDragActive] = useState(false);
  const [userUploadsList, setUserUploadsList] = useState<UserUploadedSong[]>([]);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setUserUploadsList(getUserUploads());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const refreshUserUploads = () => {
    setUserUploadsList(getUserUploads());
  };

  const handleFileProcess = async (file: File) => {
    setStatusMsg(null);
    if (file.size > 20 * 1024 * 1024) {
      setStatusMsg({ type: 'error', text: 'File exceeds 20MB limit. Please choose a smaller score file.' });
      return;
    }

    const ext = file.name.split('.').pop()?.toLowerCase();

    try {
      if (['mscz', 'mscx'].includes(ext || '')) {
        // MuseScore file import
        const buffer = await file.arrayBuffer();
        const parsed = await parseMuseScoreFile(buffer, file.name);
        if (parsed.isXml && typeof parsed.data === 'string' && parsed.data.includes('<museScore')) {
          setStatusMsg({
            type: 'error',
            text: 'MuseScore native (.mscz/.mscx) uses proprietary layout. In MuseScore, click File → Export → MusicXML (.musicxml) to import directly with tabs.',
          });
          return;
        }

        let finalBuffer: ArrayBuffer;
        if (parsed.isXml && typeof parsed.data === 'string') {
          const enc = new TextEncoder();
          const uint8 = enc.encode(parsed.data);
          finalBuffer = uint8.buffer.slice(uint8.byteOffset, uint8.byteOffset + uint8.byteLength) as ArrayBuffer;
        } else if (parsed.data instanceof Uint8Array) {
          finalBuffer = parsed.data.buffer.slice(
            parsed.data.byteOffset,
            parsed.data.byteOffset + parsed.data.byteLength
          ) as ArrayBuffer;
        } else {
          finalBuffer = parsed.data as unknown as ArrayBuffer;
        }

        onLoadScoreBuffer(finalBuffer, file.name);
        setStatusMsg({ type: 'success', text: `Loaded score from ${file.name}!` });
        setTimeout(() => onClose(), 400);
      } else if (['mid', 'midi'].includes(ext || '')) {
        setStatusMsg({
          type: 'error',
          text: 'MIDI files do not contain guitar tablature. Please export as MusicXML (.xml) or Guitar Pro (.gp) from your DAW.',
        });
      } else if (['gp', 'gp3', 'gp4', 'gp5', 'gpx', 'xml', 'musicxml'].includes(ext || '')) {
        // Binary Guitar Pro or MusicXML format for AlphaTab
        const buffer = await file.arrayBuffer();
        onLoadScoreBuffer(buffer, file.name);
        setStatusMsg({ type: 'success', text: `Loaded ${file.name} successfully!` });
        setTimeout(() => onClose(), 400);
      } else if (['txt', 'tab'].includes(ext || '')) {
        // Text tab
        const text = await file.text();
        const cleanTitle = file.name.replace(/\.[^/.]+$/, '');
        const tex = parseAsciiTabToAlphaTex(text, cleanTitle, 120);

        onLoadTex(tex, cleanTitle, 120);
        setStatusMsg({ type: 'success', text: `Converted ASCII tab from ${file.name}!` });
        setTimeout(() => onClose(), 400);
      } else {
        setStatusMsg({
          type: 'error',
          text: `Unsupported format .${ext}. Please use Guitar Pro (.gp, .gpx), MusicXML (.musicxml, .xml), or text tabs.`,
        });
      }
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: 'error', text: 'Failed to process music file.' });
    }
  };

  const handleDesktopNativeOpen = async () => {
    if (!window.desktopBridge?.openTabFile) {
      fileInputRef.current?.click();
      return;
    }
    try {
      const fileData = await window.desktopBridge.openTabFile();
      if (!fileData) return;
      const uint8 = new Uint8Array(fileData.data);
      const ext = fileData.extension.replace('.', '').toLowerCase();

      if (['mscz', 'mscx'].includes(ext)) {
        const parsed = await parseMuseScoreFile(uint8.buffer, fileData.name);
        let finalBuffer: ArrayBuffer;
        if (parsed.isXml && typeof parsed.data === 'string') {
          const enc = new TextEncoder();
          finalBuffer = enc.encode(parsed.data).buffer as ArrayBuffer;
        } else if (parsed.data instanceof Uint8Array) {
          finalBuffer = parsed.data.buffer as ArrayBuffer;
        } else {
          finalBuffer = parsed.data as unknown as ArrayBuffer;
        }

        onLoadScoreBuffer(finalBuffer, fileData.name);
        setStatusMsg({ type: 'success', text: `Loaded ${fileData.name}!` });
        setTimeout(() => onClose(), 400);
      } else if (['gp', 'gp3', 'gp4', 'gp5', 'gpx', 'xml', 'musicxml', 'mid', 'midi'].includes(ext)) {
        const finalBuffer = uint8.buffer.slice(
          uint8.byteOffset,
          uint8.byteOffset + uint8.byteLength
        );
        onLoadScoreBuffer(finalBuffer, fileData.name);
        setStatusMsg({ type: 'success', text: `Loaded ${fileData.name}!` });
        setTimeout(() => onClose(), 400);
      } else if (['txt', 'tab'].includes(ext)) {
        const text = new TextDecoder().decode(uint8);
        const cleanTitle = fileData.name.replace(/\.[^/.]+$/, '');
        const tex = parseAsciiTabToAlphaTex(text, cleanTitle, 120);

        onLoadTex(tex, cleanTitle, 120);
        setStatusMsg({ type: 'success', text: `Converted ASCII tab from ${fileData.name}!` });
        setTimeout(() => onClose(), 400);
      }
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: 'error', text: 'Failed to load file via desktop dialog.' });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handlePastedTabSubmit = () => {
    if (!pasteText.trim()) return;
    let tex = pasteText.trim();
    // If not already AlphaTex notation, parse as ASCII tablature
    if (!tex.startsWith('\\') && !tex.includes('\\tempo') && !tex.includes('\n.') && !tex.includes('\\tuning')) {
      try {
        tex = parseAsciiTabToAlphaTex(pasteText, pasteTitle, pasteBpm);
      } catch (err: any) {
        setStatusMsg({
          type: 'error',
          text: err.message || 'No valid guitar tablature detected. Please paste tabs with standard string prefixes (e.g. e|---, B|---).',
        });
        return;
      }
    }

    onLoadTex(tex, pasteTitle, pasteBpm);
    onClose();
  };

  const handleLoadUserSong = (song: UserUploadedSong) => {
    if (song.sourceType === 'buffer' && song.bufferBase64) {
      const buffer = base64ToArrayBuffer(song.bufferBase64);
      onLoadScoreBuffer(buffer, song.fileName || song.title, song.id);
    } else if (song.tex) {
      onLoadTex(song.tex, song.title, song.bpm, song.id);
    }
    onClose();
  };

  const handleDeleteUserSong = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteUserUpload(id);
    refreshUserUploads();
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-[101]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Import &amp; Song Center</h3>
              <p className="text-xs text-slate-400">Guitar Pro (.gp3-7), MusicXML, MIDI, &amp; ASCII Tabs</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 text-xs px-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-3 px-3.5 font-semibold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'upload'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" /> Upload File
          </button>
          <button
            onClick={() => setActiveTab('paste')}
            className={`py-3 px-3.5 font-semibold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'paste'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Paste Tab
          </button>
          <button
            onClick={() => setActiveTab('user-library')}
            className={`py-3 px-3.5 font-semibold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'user-library'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderHeart className="w-3.5 h-3.5" />
            <span>My Uploads</span>
            {userUploadsList.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-mono font-bold">
                {userUploadsList.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`py-3 px-3.5 font-semibold border-b-2 transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'library'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Curated Masterpieces
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 flex-1 overflow-y-auto min-h-[300px]">
          {statusMsg && (
            <div
              className={`p-3 rounded-xl mb-4 text-xs font-semibold flex items-center gap-2 ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {statusMsg.type === 'success' ? (
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}

          {/* TAB 1: FILE UPLOAD */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={handleDesktopNativeOpen}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center gap-3 ${
                  dragActive
                    ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
                    : 'border-slate-700 bg-slate-950/40 hover:border-slate-500 hover:bg-slate-950/70'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Upload className="w-7 h-7 animate-bounce" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Drag &amp; drop your tab file here</p>
                  <p className="text-xs text-slate-400 mt-1">or click to browse your computer</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2">
                  {['.mscz (MuseScore)', '.mscx', '.gp', '.gp5', '.gpx', '.musicxml', '.mid', '.txt'].map((badge) => (
                    <span
                      key={badge}
                      className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".mscz,.mscx,.gp,.gp3,.gp4,.gp5,.gpx,.musicxml,.xml,.mid,.midi,.txt,.tab"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileProcess(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* TAB 2: PASTE ASCII TAB */}
          {activeTab === 'paste' && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Song / Exercise Name</label>
                  <input
                    type="text"
                    value={pasteTitle}
                    onChange={(e) => setPasteTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Estimated Tempo (BPM)</label>
                  <input
                    type="number"
                    value={pasteBpm}
                    onChange={(e) => setPasteBpm(parseInt(e.target.value, 10) || 120)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Paste Raw Guitar Tab text:</label>
                <textarea
                  rows={8}
                  placeholder={`e|--0--2--3--2--|--0-----------|\nB|--1--3--0--3--|--1--3--1--0--|\nG|--0--2--0--2--|--0-----------|\nD|--2--0--0--0--|--2-----------|\nA|--3-----2-----|--3-----------|\nE|--------3-----|--------------|`}
                  value={pasteText}
                  onChange={(e) => setPasteText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-amber-300/90 font-mono focus:outline-none focus:border-amber-500 whitespace-pre"
                />
              </div>

              <button
                onClick={handlePastedTabSubmit}
                disabled={!pasteText.trim()}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-lg transition disabled:opacity-50"
              >
                Save to Library &amp; Start Practice
              </button>
            </div>
          )}

          {/* TAB 3: USER UPLOADS LIBRARY */}
          {activeTab === 'user-library' && (
            <div className="space-y-2.5">
              {userUploadsList.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/30">
                  <FolderHeart className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-300">Your Upload Library is Empty</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Any tabs or songs you upload or paste will be automatically saved here so you can revisit them anytime!
                  </p>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="mt-4 px-4 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shadow hover:bg-amber-400 transition"
                  >
                    Upload a Song
                  </button>
                </div>
              ) : (
                userUploadsList.map((song) => (
                  <div
                    key={song.id}
                    onClick={() => handleLoadUserSong(song)}
                    className="group p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-amber-500/50 hover:bg-slate-950 cursor-pointer transition flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition">
                          {song.title}
                        </h4>
                        <span className="text-[10px] bg-slate-800 text-amber-400 font-mono uppercase px-2 py-0.5 rounded border border-slate-700">
                          {song.sourceType === 'buffer' ? song.fileName?.split('.').pop() || 'score' : 'Tab'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                        <span>BPM: {song.bpm}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(song.uploadedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleDeleteUserSong(e, song.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                        title="Delete from Library"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="p-1.5 rounded-lg bg-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 text-slate-400 transition">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: CURATED MASTERPIECES */}
          {activeTab === 'library' && (
            <div className="space-y-2.5">
              {CURATED_LIBRARY.map((song) => (
                <div
                  key={song.id}
                  onClick={() => {
                    onSelectCuratedSong(song);
                    onClose();
                  }}
                  className="group p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-500/50 hover:bg-slate-950 cursor-pointer transition flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition">{song.title}</h4>
                      <span className="text-[10px] bg-amber-500/10 text-amber-400 font-semibold px-2 py-0.5 rounded border border-amber-500/20">
                        {song.genre}
                      </span>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                        {song.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{song.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                      <span>BPM: {song.defaultBpm}</span>
                      <span>Tuning: {song.tuning}</span>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

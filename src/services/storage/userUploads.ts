/**
 * Persistent Storage for User Uploaded Songs & Tabs (separate from Curated Masterpieces)
 * Stores tabs, pasted ASCII scores, and imported files in localStorage.
 */

export interface UserUploadedSong {
  id: string;
  title: string;
  artist?: string;
  category?: 'upload';
  sourceType: 'tex' | 'buffer' | 'paste';
  tex?: string;
  bufferBase64?: string;
  fileName?: string;
  bpm: number;
  uploadedAt: number;
}

const USER_UPLOADS_STORAGE_KEY = 'fretflow_user_uploads';
const LAST_ACTIVE_SONG_KEY = 'fretflow_last_active_song_id';

export function getUserUploads(): UserUploadedSong[] {
  try {
    const raw = localStorage.getItem(USER_UPLOADS_STORAGE_KEY) || localStorage.getItem('virtuoso_user_uploads');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Failed to read user uploads from storage:', err);
    return [];
  }
}

export function saveUserUpload(songData: {
  title: string;
  artist?: string;
  category?: 'upload';
  sourceType: 'tex' | 'buffer' | 'paste';
  tex?: string;
  buffer?: ArrayBuffer;
  fileName?: string;
  bpm?: number;
}): UserUploadedSong {
  const current = getUserUploads();
  const id = 'user-upload-' + Date.now();

  let bufferBase64: string | undefined;
  if (songData.buffer) {
    try {
      const bytes = new Uint8Array(songData.buffer);
      let binary = '';
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      bufferBase64 = btoa(binary);
    } catch (e) {
      console.warn('Could not base64 encode buffer:', e);
    }
  }

  const newSong: UserUploadedSong = {
    id,
    title: songData.title || songData.fileName || 'My Uploaded Tab',
    artist: songData.artist || 'User Upload',
    category: songData.category || 'upload',
    sourceType: songData.sourceType,
    tex: songData.tex,
    bufferBase64,
    fileName: songData.fileName,
    bpm: songData.bpm || 120,
    uploadedAt: Date.now(),
  };

  // Prepend newest upload first
  const updated = [newSong, ...current.filter((s) => s.title !== newSong.title || s.fileName !== newSong.fileName)].slice(0, 30);
  try {
    localStorage.setItem(USER_UPLOADS_STORAGE_KEY, JSON.stringify(updated));
    localStorage.setItem(LAST_ACTIVE_SONG_KEY, id);
  } catch (err) {
    console.warn('Failed to save upload to localStorage:', err);
  }

  return newSong;
}

export function updateUserUpload(id: string, updates: Partial<UserUploadedSong>): void {
  const current = getUserUploads();
  const updated = current.map((s) => (s.id === id ? { ...s, ...updates } : s));
  try {
    localStorage.setItem(USER_UPLOADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to update upload in storage:', err);
  }
}

export function deleteUserUpload(id: string): void {
  const current = getUserUploads();
  const updated = current.filter((s) => s.id !== id);
  try {
    localStorage.setItem(USER_UPLOADS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to delete upload from storage:', err);
  }
}

export function getMostRecentUpload(): UserUploadedSong | null {
  const uploads = getUserUploads();
  if (uploads.length === 0) return null;
  return uploads[0];
}

export function setLastActiveSongId(id: string): void {
  try {
    localStorage.setItem(LAST_ACTIVE_SONG_KEY, id);
  } catch (err) {}
}

export function getLastActiveSongId(): string | null {
  try {
    return localStorage.getItem(LAST_ACTIVE_SONG_KEY);
  } catch (err) {
    return null;
  }
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

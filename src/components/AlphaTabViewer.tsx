import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import * as alphaTab from '@coderline/alphatab';
import { ActiveNote, TrackInfo, SongLoadedInfo } from '../types';
import { percussiveSlap } from '../services/audio/percussiveSlap';

// Patch TabBarRenderer so rhythm stems/beams stay strictly below the tab staff (Songsterr style)
try {
  const atAny = alphaTab as any;
  const tabFactory = atAny.Environment?.defaultRenderers?.find(
    (r: any) => r.constructor.name === 'TabBarRendererFactory'
  );
  if (tabFactory) {
    const dummy = tabFactory.create(null, null);
    const proto = Object.getPrototypeOf(dummy);

    if (proto && !proto._songsterrStemPatched) {
      proto._songsterrStemPatched = true;

      function getRhythmHeight(self: any): number {
        try {
          return self?.scoreRenderer?.settings?.notation?.rhythmHeight || 28;
        } catch {
          return 28;
        }
      }

      function getBottomStaffLineY(self: any): number {
        try {
          const lines = self?.bar?.staff?.tuning?.length || self?.drawnLineCount || 6;
          let spacing = 13;
          try {
            spacing = self?.smuflMetrics?.tabLineSpacing || self?.lineSpacing || 13;
          } catch {}
          const firstY = typeof self?.firstLineY === 'number' ? self.firstLineY : 0;
          return firstY + spacing * (lines - 1);
        } catch {
          return 65;
        }
      }

      // Top of stem: 8px below string 6 (below tab numbers and lowest staff line)
      proto.getFlagTopY = function (_beat: any, _direction: any) {
        return getBottomStaffLineY(this) + 8;
      };

      // Bottom of stem: top + rhythmHeight
      proto.getFlagBottomY = function (_beat: any, _direction: any) {
        return getBottomStaffLineY(this) + 8 + getRhythmHeight(this);
      };

      // Beam horizontal positioning: sits at the bottom of the rhythm stems
      proto.calculateBeamY = function (_h: any, _x: number) {
        return getBottomStaffLineY(this) + 8 + getRhythmHeight(this);
      };

      proto.calculateBeamYWithDirection = function (_h: any, _x: number, _direction: any) {
        return getBottomStaffLineY(this) + 8 + getRhythmHeight(this);
      };

      // Render stem strictly between bottom of staff (string 6 + 8px) and beam line
      proto.paintBeamingStem = function (beat: any, cy: number, x: number, _topY: number, _bottomY: number, canvas: any) {
        try {
          const stemTop = getBottomStaffLineY(this) + 8;
          const rHeight = getRhythmHeight(this);
          const stemBottom = stemTop + rHeight;

          // In AlphaTab paintBar/paintFlag, cy is already (canvas_cy + this.y)
          const actualTop = cy + stemTop;
          const actualBottom = cy + stemBottom;
          const height = actualBottom - actualTop;

          if (height > 0) {
            const thickness = this?.smuflMetrics?.stemThickness || 1.5;
            canvas.fillRect(x, actualTop, thickness, height);
          }
        } catch (e) {
          console.warn('paintBeamingStem error:', e);
        }
      };

      // Reserve overflow so rhythm stems & beams never clip at the bottom of tab staff
      const origCalculateOverflows = proto.calculateOverflows;
      proto.calculateOverflows = function (rendererTop: number, rendererBottom: number) {
        if (origCalculateOverflows) {
          origCalculateOverflows.call(this, rendererTop, rendererBottom);
        }
        if (this.rhythmMode !== 0) {
          const rHeight = getRhythmHeight(this);
          this.registerOverflowBottom(rHeight + 20);
        }
      };
    }
  }
} catch (err) {
  console.warn('Could not patch tab stem rendering:', err);
}

// Patch AlphaTab FingeringEffectInfo to support multiple simultaneous notes (chords / polyphonic plucks)
// Stacking the fingerings vertically: highest string on top, lowest bass string on bottom (matches Giuliani PDF)
try {
  const envRenderers = (alphaTab as any).Environment?.defaultRenderers || [];
  for (const r of envRenderers) {
    for (const b of r.effectBands || []) {
      if (b.effect?.constructor?.name === 'FingeringEffectInfo') {
        const fProto = Object.getPrototypeOf(b.effect);
        if (fProto && !fProto._stackedFingeringPatched) {
          fProto._stackedFingeringPatched = true;
          const origCreate = fProto.createNewGlyph;

          fProto.shouldCreateGlyph = function (settings: any, beat: any) {
            if (beat.voice.index !== 0 || beat.isRest) return false;
            // 2 = SingleNoteEffectBand, 3 = SingleNoteEffectBandForcePiano
            if (settings.notation.fingeringMode !== 2 && settings.notation.fingeringMode !== 3) {
              return false;
            }
            return beat.notes && beat.notes.some((n: any) => n.isFingering);
          };

          fProto.createNewGlyph = function (renderer: any, beat: any) {
            const fingeredNotes = (beat.notes || [])
              .filter((n: any) => n.isFingering)
              .sort((a: any, b: any) => a.string - b.string); // String 1 (high string) on top, String 6 on bottom

            if (fingeredNotes.length === 0) return null;
            if (fingeredNotes.length === 1) {
              return origCreate.call(this, renderer, { ...beat, notes: [fingeredNotes[0]] });
            }

            // Multiple simultaneous notes: stack vertically (highest string on top, lowest string on bottom)
            const subGlyphs: any[] = [];
            for (const n of fingeredNotes) {
              try {
                const g = origCreate.call(this, renderer, { ...beat, notes: [n] });
                if (g) subGlyphs.push(g);
              } catch {}
            }

            if (subGlyphs.length === 0) return null;
            if (subGlyphs.length === 1) return subGlyphs[0];

            const primary = subGlyphs[0];
            const stackSpacing = 13;
            const origPaint = primary.paint?.bind(primary);

            primary.paint = function (cx: number, cy: number, canvas: any) {
              const total = subGlyphs.length;
              for (let i = 0; i < total; i++) {
                const g = subGlyphs[i];
                if (!g) continue;
                // Align horizontal position with primary so letters never drift left
                g.x = primary.x;
                g.center = true;
                // Stack vertically upward: lowest string at baseline cy, higher strings above
                const yOffset = -(total - 1 - i) * stackSpacing;
                if (i === 0 && origPaint) {
                  origPaint(cx, cy + yOffset, canvas);
                } else if (g.paint) {
                  g.paint(cx, cy + yOffset, canvas);
                }
              }
            };
            primary.height = subGlyphs.length * stackSpacing;
            return primary;
          };
        }
      }
    }
  }
} catch (err) {
  console.warn('Could not patch FingeringEffectInfo for stacked chords:', err);
}

export interface AlphaTabViewerRef {
  play: () => boolean;
  pause: () => void;
  playPause: () => void;
  stop: () => void;
  setSpeed: (speed: number) => void;
  setPlaybackRange: (startBar: number, endBar: number) => void;
  clearPlaybackRange: () => void;
  seekToBar: (bar: number) => void;
  focusRange: (startBar: number, endBar: number) => void;
  clearFocus: () => void;
  setLooping: (isLooping: boolean) => void;
  setStaveProfile: (profile: 'default' | 'tab' | 'score') => void;
  setLayoutMode: (mode: 'page' | 'horizontal') => void;
  loadTex: (tex: string) => void;
  loadScore: (data: ArrayBuffer | Uint8Array, trackIndex?: number) => void;
  selectTrack: (trackIndex: number) => void;
  setTrackMute: (trackIndex: number, mute: boolean) => void;
  setTrackSolo: (trackIndex: number, solo: boolean) => void;
  setTrackVolume: (trackIndex: number, volume: number) => void;
  setMasterVolume: (volume: number) => void;
  transpose: (semitones: number) => void;
  getBarsCount: () => number;
  setZoom: (zoom: number) => void;
  getZoom: () => number;
  setInstrumentPatch: (patchNumber: number) => void;
  getApi: () => alphaTab.AlphaTabApi | null;
  refresh: () => void;
}

/**
 * Counts total musical notes across all bars and staves for a given track
 */
export function countTrackNotes(track: any): number {
  let count = 0;
  if (!track || !track.staves) return 0;
  for (const staff of track.staves) {
    if (!staff || !staff.bars) continue;
    for (const bar of staff.bars) {
      if (!bar || !bar.voices) continue;
      for (const voice of bar.voices) {
        if (!voice || !voice.beats) continue;
        for (const beat of voice.beats) {
          if (beat && beat.notes) {
            count += beat.notes.length;
          }
        }
      }
    }
  }
  return count;
}

function getAssetUrl(rel: string): string {
  const clean = rel.startsWith('/') ? rel.slice(1) : rel;
  try {
    return new URL(clean, document.baseURI || window.location.href).href;
  } catch {
    return (import.meta.env.BASE_URL || './') + clean;
  }
}

interface AlphaTabViewerProps {
  initialTex?: string;
  theme?: 'paper' | 'sepia' | 'dark';
  transpose?: number;
  selectedTrackIndex?: number;
  onActiveNotesChange: (notes: ActiveNote[]) => void;
  onPlaybackStateChange: (isPlaying: boolean) => void;
  onCurrentBarChange: (bar: number) => void;
  onSelectionRangeChange?: (range: { startBar: number; endBar: number } | null) => void;
  onSongLoaded?: (info: SongLoadedInfo) => void;
  onZoomChange?: (zoom: number) => void;
  onLoopWrap?: () => void;
  onReady?: () => void;
}

export const AlphaTabViewer = forwardRef<AlphaTabViewerRef, AlphaTabViewerProps>(
  (
    {
      initialTex,
      theme = 'paper',
      transpose = 0,
      selectedTrackIndex,
      onActiveNotesChange,
      onPlaybackStateChange,
      onCurrentBarChange,
      onSelectionRangeChange,
      onSongLoaded,
      onZoomChange,
      onLoopWrap,
      onReady,
    },
    ref
  ) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const apiRef = useRef<alphaTab.AlphaTabApi | null>(null);
    const currentFullTexRef = useRef<string>(initialTex || '');
    const currentScoreBufferRef = useRef<ArrayBuffer | Uint8Array | null>(null);
    const isFocusedRef = useRef<boolean>(false);
    const focusedStartBarRef = useRef<number>(1);
    const currentZoomRef = useRef<number>(1.0);
    const currentInstrumentRef = useRef<number>(25);
    const clearFocusTimeoutRef = useRef<any>(null);
    const clickStartPosRef = useRef<{ x: number; y: number } | null>(null);
    const prevBeatPlaybackStartRef = useRef<number>(-1);
    const currentSelectedTrackIndexRef = useRef<number>(selectedTrackIndex ?? 0);

    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartRef = useRef<{ x: number; y: number; scrollLeft: number; scrollTop: number } | null>(null);
    const currentTransposeRef = useRef<number>(transpose || 0);

    useEffect(() => {
      currentTransposeRef.current = transpose || 0;
    }, [transpose]);

    useEffect(() => {
      if (typeof selectedTrackIndex === 'number') {
        currentSelectedTrackIndexRef.current = selectedTrackIndex;
      }
    }, [selectedTrackIndex]);

    // Apply theme resources dynamically
    useEffect(() => {
      if (!apiRef.current) return;
      const res = apiRef.current.settings.display.resources;
      if (theme === 'dark') {
        res.mainGlyphColor = alphaTab.model.Color.fromJson('#f8fafc');
        res.scoreInfoColor = alphaTab.model.Color.fromJson('#f1f5f9');
        res.staffLineColor = alphaTab.model.Color.fromJson('#334155');
        res.barSeparatorColor = alphaTab.model.Color.fromJson('#64748b');
        res.barNumberColor = alphaTab.model.Color.fromJson('#f8fafc');
      } else if (theme === 'sepia') {
        res.mainGlyphColor = alphaTab.model.Color.fromJson('#2c2013');
        res.scoreInfoColor = alphaTab.model.Color.fromJson('#2c2013');
        res.staffLineColor = alphaTab.model.Color.fromJson('#a89276');
        res.barSeparatorColor = alphaTab.model.Color.fromJson('#4a3826');
        res.barNumberColor = alphaTab.model.Color.fromJson('#2c2013');
      } else {
        res.mainGlyphColor = alphaTab.model.Color.fromJson('#0f172a');
        res.scoreInfoColor = alphaTab.model.Color.fromJson('#0f172a');
        res.staffLineColor = alphaTab.model.Color.fromJson('#94a3b8');
        res.barSeparatorColor = alphaTab.model.Color.fromJson('#334155');
        res.barNumberColor = alphaTab.model.Color.fromJson('#0f172a');
      }
      apiRef.current.updateSettings();
      apiRef.current.render();
    }, [theme]);

    useEffect(() => {
      if (!containerRef.current || !scrollContainerRef.current) return;

      try {
        const settings = new alphaTab.Settings();
        settings.core.fontDirectory = getAssetUrl('font/');
        settings.core.useWorkers = false;
        settings.player.enablePlayer = true;
        settings.player.enableAnimatedBeatCursor = true;
        settings.player.soundFont = getAssetUrl('soundfont/sonivox.sf2');
        settings.player.scrollElement = scrollContainerRef.current;
        settings.display.layoutMode = alphaTab.LayoutMode.Page;
        settings.display.staveProfile = alphaTab.StaveProfile.ScoreTab;
        settings.notation.rhythmMode = alphaTab.TabRhythmMode.ShowWithBars;
        settings.notation.rhythmHeight = 28;
        settings.notation.fingeringMode = alphaTab.FingeringMode.SingleNoteEffectBand;
        settings.display.scale = 1.0;
        // Bold measure numbers
        settings.display.resources.barNumberColor = alphaTab.model.Color.fromJson(
          theme === 'dark' ? '#f8fafc' : theme === 'sepia' ? '#2c2013' : '#0f172a'
        );

        const api = new alphaTab.AlphaTabApi(containerRef.current, settings as any);
        apiRef.current = api;

        // Crash-guard AlphaTab internal _cursorSelectRange against undefined bounds
        const origCursorSelectRange = (api as any)._cursorSelectRange?.bind(api);
        if (origCursorSelectRange) {
          (api as any)._cursorSelectRange = (startBeat: any, endBeat: any) => {
            try {
              const cache = (api as any)._renderer?.boundsLookup;
              if (cache) {
                if (startBeat && !startBeat.bounds && startBeat.beat) {
                  startBeat.bounds = cache.findBeat(startBeat.beat);
                }
                if (endBeat && !endBeat.bounds && endBeat.beat) {
                  endBeat.bounds = cache.findBeat(endBeat.beat);
                }
              }
              if (!startBeat?.bounds || !endBeat?.bounds) {
                return;
              }
              origCursorSelectRange(startBeat, endBeat);
            } catch (err) {
              console.warn('Safeguarded AlphaTab _cursorSelectRange:', err);
            }
          };
        }

        // Global Error Handler to guarantee loading spinner never locks
        api.error.on((err: any) => {
          console.error('AlphaTab engine error:', err);
          setIsLoading(false);
          const msg = typeof err === 'string' ? err : err?.message || 'Error rendering notation';
          setErrorMsg(msg);
          setTimeout(() => setErrorMsg(null), 6000);
        });

        // Player state events
        api.playerStateChanged.on((e) => {
          onPlaybackStateChange(e.state === alphaTab.synth.PlayerState.Playing);
        });

        // Beat tracking -> Fretboard sync & dead-note percussive slap
        api.playedBeatChanged.on((beat) => {
          if (!beat) {
            onActiveNotesChange([]);
            return;
          }

          const playbackStart = beat.playbackStart ?? 0;
          if (prevBeatPlaybackStartRef.current >= 0 && playbackStart < prevBeatPlaybackStartRef.current) {
            if (onLoopWrap) {
              onLoopWrap();
            }
          }
          prevBeatPlaybackStartRef.current = playbackStart;

          const currentBarIndex = beat.voice.bar.index + 1;
          onCurrentBarChange(currentBarIndex);

          // Percussive slap synthesizer for dead notes ('x' on tab)
          if (beat.notes && beat.notes.some((n: any) => n.isDead)) {
            percussiveSlap.playSlap();
          }

          // Extract notes for fretboard & piano visualizers (with sounding transpose applied)
          const totalStrings = beat.voice?.bar?.staff?.tuning?.length || 6;
          const notes: ActiveNote[] = beat.notes.map((n: any) => ({
            string: Math.max(1, totalStrings - n.string + 1),
            fret: n.fret,
            finger: n.leftHandFinger ?? undefined,
            midi: n.realValue !== undefined ? n.realValue + currentTransposeRef.current : undefined,
          }));

          onActiveNotesChange(notes);
        });

        // Instant click-to-measure tracking while paused or playing
        api.beatMouseDown.on((beat) => {
          if (!beat) return;
          if (clearFocusTimeoutRef.current) {
            clearTimeout(clearFocusTimeoutRef.current);
            clearFocusTimeoutRef.current = null;
          }
          const currentBarIndex = beat.voice.bar.index + 1;
          onCurrentBarChange(currentBarIndex);
          if (onSelectionRangeChange) {
            onSelectionRangeChange({ startBar: currentBarIndex, endBar: currentBarIndex });
          }

          if (beat.notes && beat.notes.length > 0) {
            const beatStrings = beat.voice?.bar?.staff?.tuning?.length || 6;
            const notes: ActiveNote[] = beat.notes.map((n: any) => ({
              string: Math.max(1, beatStrings - n.string + 1),
              fret: n.fret,
              finger: n.leftHandFinger ?? undefined,
              midi: n.realValue !== undefined ? n.realValue + currentTransposeRef.current : undefined,
            }));
            onActiveNotesChange(notes);
          }
        });

        // Robust calculation mapping playback range ticks to exact bar numbers
        api.playbackRangeChanged.on((range) => {
          if (!range || !range.playbackRange || !api.score) {
            if (onSelectionRangeChange) onSelectionRangeChange(null);
            return;
          }
          const masterBars = api.score.masterBars;
          const minTick = Math.min(range.playbackRange.startTick, range.playbackRange.endTick);
          const maxTick = Math.max(range.playbackRange.startTick, range.playbackRange.endTick);

          let startBar = 1;
          let endBar = 1;

          for (let i = 0; i < masterBars.length; i++) {
            const mb = masterBars[i];
            const bStart = mb.start;
            const bEnd = mb.start + mb.calculateDuration();

            if (minTick >= bStart && minTick < bEnd) {
              startBar = i + 1;
            }
            if (maxTick > bStart && maxTick <= bEnd) {
              endBar = i + 1;
            }
          }

          if (onSelectionRangeChange) {
            onSelectionRangeChange({ startBar, endBar: Math.max(startBar, endBar) });
          }
        });

        (window as any).__alphaTabApi = api;

        // Proactive soundfont preload
        fetch(getAssetUrl('soundfont/sonivox.sf2'))
          .then((r) => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.arrayBuffer();
          })
          .then((buf) => {
            if (apiRef.current) {
              apiRef.current.loadSoundFont(new Uint8Array(buf), false);
            }
          })
          .catch((err) => {
            console.warn('Direct soundfont load fallback:', err);
          });

        api.scoreLoaded.on((score) => {
          setIsLoading(false);
          // If in Focus Mode, do not overwrite parent song metadata or totalBars with the single sliced measure
          if (isFocusedRef.current) {
            return;
          }

          let bestTrackIdx = 0;
          let maxNotes = -1;

          const tracks: TrackInfo[] = score.tracks.map((t, idx) => {
            const count = countTrackNotes(t);
            if (count > maxNotes) {
              maxNotes = count;
              bestTrackIdx = idx;
            }
            return {
              index: idx,
              name: t.name || `Track ${idx + 1}`,
              instrument: t.playbackInfo?.program?.toString() || 'Guitar',
              isMute: t.playbackInfo?.isMute || false,
              isSolo: t.playbackInfo?.isSolo || false,
              volume: (t.playbackInfo?.volume || 16) / 16,
              noteCount: count,
            };
          });

          // Identify which track is currently rendered
          let activeIndex = 0;
          if (apiRef.current && apiRef.current.tracks && apiRef.current.tracks.length > 0) {
            activeIndex = apiRef.current.tracks[0].index;
          }

          // Safety check: If current rendered track has 0 notes, but another track has notes, auto-switch immediately!
          const currentTrackNotes = tracks[activeIndex]?.noteCount ?? 0;
          if (currentTrackNotes === 0 && maxNotes > 0) {
            activeIndex = bestTrackIdx;
            const targetTrack = score.tracks[bestTrackIdx];
            if (targetTrack && apiRef.current) {
              setTimeout(() => {
                if (apiRef.current && apiRef.current.score) {
                  apiRef.current.renderTracks([targetTrack]);
                }
              }, 0);
            }
          }

          const barsCount = score.masterBars.length;
          const tempo = score.tempo || 120;
          const title = score.title || 'Untitled Practice Piece';
          const artist = score.artist || '';
          const tsNum = score.masterBars[0]?.timeSignatureNumerator || 4;
          const tsDen = score.masterBars[0]?.timeSignatureDenominator || 4;

          if (onSongLoaded) {
            onSongLoaded({
              title,
              artist,
              barsCount,
              tracks,
              bpm: tempo,
              timeSignatureNumerator: tsNum,
              timeSignatureDenominator: tsDen,
              selectedTrackIndex: activeIndex,
            });
          }
        });

        api.renderFinished.on(() => {
          setIsLoading(false);
          if (containerRef.current) {
            const svgs = containerRef.current.querySelectorAll('.at-surface');
            let maxY = 0;
            svgs.forEach((s) => {
              const parent = s.parentElement;
              if (parent) {
                const top = parseInt(parent.style.top || '0', 10);
                const h = parseInt(parent.style.height || `${(s as any).clientHeight || 0}`, 10);
                if (top + h > maxY) maxY = top + h;
              }
            });
            if (maxY > 0) {
              containerRef.current.style.minHeight = `${maxY + 80}px`;
            }
          }
          if (onReady) onReady();
        });

        if (initialTex) {
          currentFullTexRef.current = initialTex;
          api.tex(initialTex);
        }

        return () => {
          api.destroy();
          apiRef.current = null;
        };
      } catch (err) {
        console.error('Error initializing alphaTab:', err);
        setErrorMsg('Failed to initialize music notation engine.');
        setIsLoading(false);
      }
    }, []);

    // Expose control methods via imperative handle
    useImperativeHandle(ref, () => ({
      play: () => {
        if (!apiRef.current) return false;
        try {
          const playerAny = apiRef.current as any;
          const audioCtx =
            playerAny._player?._instance?.output?._audioContext ||
            playerAny._player?.output?._audioContext;
          if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
          }
        } catch (e) {
          // ignore
        }
        return apiRef.current.play();
      },
      pause: () => {
        if (!apiRef.current) return;
        apiRef.current.pause();
      },
      playPause: () => {
        if (!apiRef.current) return;
        try {
          const playerAny = apiRef.current as any;
          const audioCtx =
            playerAny._player?._instance?.output?._audioContext ||
            playerAny._player?.output?._audioContext;
          if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
          }
        } catch (e) {
          // ignore
        }
        apiRef.current.playPause();
      },
      stop: () => {
        if (!apiRef.current) return;
        apiRef.current.stop();
        onActiveNotesChange([]);
      },
      setSpeed: (speed: number) => {
        if (!apiRef.current) return;
        apiRef.current.playbackSpeed = speed;
      },
      setPlaybackRange: (startBar: number, endBar: number) => {
        if (!apiRef.current || !apiRef.current.score) return;
        const masterBars = apiRef.current.score.masterBars;
        const clampedStart = Math.max(0, startBar - 1);
        const clampedEnd = Math.min(masterBars.length - 1, endBar - 1);

        if (clampedStart <= clampedEnd && masterBars[clampedStart] && masterBars[clampedEnd]) {
          const startTick = masterBars[clampedStart].start;
          const endTick = masterBars[clampedEnd].start + masterBars[clampedEnd].calculateDuration();
          apiRef.current.playbackRange = { startTick, endTick };
          apiRef.current.tickPosition = startTick;
        }
      },
      seekToBar: (bar: number) => {
        if (!apiRef.current || !apiRef.current.score) return;
        const clampedBar = Math.max(0, Math.min(apiRef.current.score.masterBars.length - 1, bar - 1));
        const mb = apiRef.current.score.masterBars[clampedBar];
        if (mb) {
          apiRef.current.tickPosition = mb.start;
        }
      },
      clearPlaybackRange: () => {
        if (!apiRef.current) return;
        apiRef.current.playbackRange = null;
        try {
          (apiRef.current as any)._selectionWrapper?.clear?.();
          const selEls = containerRef.current?.querySelectorAll('.at-selection');
          selEls?.forEach((el) => {
            el.innerHTML = '';
          });
        } catch (e) {}
        if (onSelectionRangeChange) onSelectionRangeChange(null);
      },
      // Native Focus Mode: Windowed viewport display preserving original bar numbering and ticks
      focusRange: (startBar: number, endBar: number) => {
        if (!apiRef.current || !apiRef.current.score) return;
        apiRef.current.stop();
        try {
          (apiRef.current as any)._selectionWrapper?.clear?.();
          const selEls = containerRef.current?.querySelectorAll('.at-selection');
          selEls?.forEach((el) => {
            el.innerHTML = '';
          });
        } catch (e) {}

        const masterBars = apiRef.current.score.masterBars;
        const clampedStart = Math.max(1, Math.min(startBar, masterBars.length));
        const clampedEnd = Math.max(clampedStart, Math.min(endBar, masterBars.length));
        const barCount = clampedEnd - clampedStart + 1;

        focusedStartBarRef.current = clampedStart;
        isFocusedRef.current = true;

        // Native AlphaTab windowing: displays only clampedStart to clampedEnd without altering bar numbers
        apiRef.current.settings.display.startBar = clampedStart;
        apiRef.current.settings.display.barCount = barCount;
        apiRef.current.updateSettings();
        apiRef.current.render();

        const startMb = masterBars[clampedStart - 1];
        const endMb = masterBars[clampedEnd - 1];
        if (startMb && endMb) {
          const startTick = startMb.start;
          const endTick = endMb.start + endMb.calculateDuration();
          apiRef.current.playbackRange = { startTick, endTick };
          apiRef.current.tickPosition = startTick;
          apiRef.current.isLooping = true;
          onCurrentBarChange(clampedStart);
        }
      },
      clearFocus: () => {
        if (!apiRef.current) return;
        apiRef.current.stop();
        apiRef.current.playbackRange = null;
        try {
          (apiRef.current as any)._selectionWrapper?.clear?.();
          const selEls = containerRef.current?.querySelectorAll('.at-selection');
          selEls?.forEach((el) => {
            el.innerHTML = '';
          });
        } catch (e) {}
        if (onSelectionRangeChange) onSelectionRangeChange(null);
        focusedStartBarRef.current = 1;
        isFocusedRef.current = false;

        // Restore full score display
        apiRef.current.settings.display.startBar = 1;
        apiRef.current.settings.display.barCount = -1;
        apiRef.current.updateSettings();
        apiRef.current.render();
      },
      setLooping: (isLooping: boolean) => {
        if (!apiRef.current) return;
        apiRef.current.isLooping = isLooping;
      },
      setStaveProfile: (profile: 'default' | 'tab' | 'score') => {
        if (!apiRef.current) return;
        let p = alphaTab.StaveProfile.ScoreTab;
        if (profile === 'tab') {
          p = alphaTab.StaveProfile.Tab;
          apiRef.current.settings.notation.rhythmMode = alphaTab.TabRhythmMode.ShowWithBars;
          apiRef.current.settings.notation.rhythmHeight = 28;
          apiRef.current.settings.notation.fingeringMode = alphaTab.FingeringMode.SingleNoteEffectBand;
        } else if (profile === 'score') {
          p = alphaTab.StaveProfile.Score;
          apiRef.current.settings.notation.rhythmMode = alphaTab.TabRhythmMode.Automatic;
        } else {
          p = alphaTab.StaveProfile.ScoreTab;
          apiRef.current.settings.notation.rhythmMode = alphaTab.TabRhythmMode.Automatic;
        }
        apiRef.current.settings.display.staveProfile = p;
        apiRef.current.updateSettings();
        apiRef.current.render();
      },
      setLayoutMode: (mode: 'page' | 'horizontal') => {
        if (!apiRef.current) return;
        apiRef.current.settings.display.layoutMode =
          mode === 'horizontal' ? alphaTab.LayoutMode.Horizontal : alphaTab.LayoutMode.Page;
        apiRef.current.updateSettings();
        apiRef.current.render();
      },
      loadTex: (tex: string) => {
        if (!apiRef.current) return;
        apiRef.current.stop();
        apiRef.current.playbackRange = null;
        currentFullTexRef.current = tex;
        currentScoreBufferRef.current = null;
        focusedStartBarRef.current = 1;
        isFocusedRef.current = false;
        apiRef.current.settings.display.startBar = 1;
        apiRef.current.settings.display.barCount = -1;
        apiRef.current.updateSettings();
        setIsLoading(true);
        apiRef.current.tex(tex);
      },
      loadScore: (data: ArrayBuffer | Uint8Array, trackIndex?: number) => {
        if (!apiRef.current) return;
        apiRef.current.stop();
        apiRef.current.playbackRange = null;
        currentFullTexRef.current = '';
        currentScoreBufferRef.current = data;
        focusedStartBarRef.current = 1;
        isFocusedRef.current = false;
        apiRef.current.settings.display.startBar = 1;
        apiRef.current.settings.display.barCount = -1;
        apiRef.current.updateSettings();
        setIsLoading(true);

        const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
        let targetTrackIndexes: number[] | undefined = undefined;

        if (typeof trackIndex === 'number') {
          targetTrackIndexes = trackIndex === -1 ? undefined : [trackIndex];
        } else {
          try {
            const parsedScore = alphaTab.importer.ScoreLoader.loadScoreFromBytes(bytes, apiRef.current.settings);
            if (parsedScore && parsedScore.tracks && parsedScore.tracks.length > 1) {
              let maxNotes = -1;
              let bestIndex = 0;
              parsedScore.tracks.forEach((t: any, idx: number) => {
                const count = countTrackNotes(t);
                if (count > maxNotes) {
                  maxNotes = count;
                  bestIndex = idx;
                }
              });
              const track0Count = countTrackNotes(parsedScore.tracks[0]);
              if (track0Count === 0 && maxNotes > 0) {
                targetTrackIndexes = [bestIndex];
              }
            }
          } catch (e) {
            console.warn('Pre-parsing score for track auto-selection failed:', e);
          }
        }

        apiRef.current.load(bytes, targetTrackIndexes);
      },
      selectTrack: (trackIndex: number) => {
        currentSelectedTrackIndexRef.current = trackIndex;
        if (!apiRef.current || !apiRef.current.score) return;
        if (trackIndex === -1) {
          apiRef.current.renderTracks(apiRef.current.score.tracks);
        } else {
          const track = apiRef.current.score.tracks[trackIndex];
          if (track) {
            apiRef.current.renderTracks([track]);
          }
        }
      },
      setTrackMute: (trackIndex: number, mute: boolean) => {
        if (!apiRef.current || !apiRef.current.score) return;
        const track = apiRef.current.score.tracks[trackIndex];
        if (track) {
          apiRef.current.changeTrackMute([track], mute);
        }
      },
      setTrackSolo: (trackIndex: number, solo: boolean) => {
        if (!apiRef.current || !apiRef.current.score) return;
        const track = apiRef.current.score.tracks[trackIndex];
        if (track) {
          apiRef.current.changeTrackSolo([track], solo);
        }
      },
      setTrackVolume: (trackIndex: number, volume: number) => {
        if (!apiRef.current || !apiRef.current.score) return;
        const track = apiRef.current.score.tracks[trackIndex];
        if (track) {
          apiRef.current.changeTrackVolume([track], volume);
        }
      },
      setMasterVolume: (volume: number) => {
        if (!apiRef.current || !apiRef.current.score) return;
        apiRef.current.changeTrackVolume(apiRef.current.score.tracks, volume);
      },
      transpose: (semitones: number) => {
        currentTransposeRef.current = semitones;
        if (!apiRef.current || !apiRef.current.score) return;
        apiRef.current.changeTrackTranspositionPitch(apiRef.current.score.tracks, semitones);
      },
      getBarsCount: () => {
        return apiRef.current?.score?.masterBars?.length || 0;
      },
      // Native Layout Zoom: Scales notation geometry and scroll bounds accurately without left clipping
      setZoom: (zoom: number) => {
        const clampedZoom = Math.max(0.65, Math.min(1.8, zoom));
        currentZoomRef.current = clampedZoom;
        if (containerRef.current) {
          (containerRef.current.style as any).zoom = `${clampedZoom}`;
          containerRef.current.style.transform = '';
        }
      },
      getZoom: () => {
        return currentZoomRef.current;
      },
      setInstrumentPatch: (patchNumber: number) => {
        currentInstrumentRef.current = patchNumber;
        if (!apiRef.current) return;

        // 1. Keep full AlphaTex updated with \instrument program
        if (currentFullTexRef.current) {
          let tex = currentFullTexRef.current;
          if (/\\instrument\s+\d+/.test(tex)) {
            tex = tex.replace(/\\instrument\s+\d+/, `\\instrument ${patchNumber}`);
          } else {
            const dotIndex = tex.search(/\n\.\s*\n/);
            if (dotIndex !== -1) {
              tex = tex.slice(0, dotIndex) + `\n\\instrument ${patchNumber}` + tex.slice(dotIndex);
            } else {
              tex = `\\instrument ${patchNumber}\n` + tex;
            }
          }
          currentFullTexRef.current = tex;
        }

        // 2. Set program on selected track only (preserving bass, drums, keyboards, etc.)
        if (apiRef.current.score) {
          const trackIdx = currentSelectedTrackIndexRef.current;
          const targetTracks =
            trackIdx >= 0 && apiRef.current.score.tracks[trackIdx]
              ? [apiRef.current.score.tracks[trackIdx]]
              : [apiRef.current.score.tracks[0]];
          targetTracks.forEach((track) => {
            if (track) track.playbackInfo.program = patchNumber;
          });
          try {
            const isPlaying = apiRef.current.playerState === alphaTab.synth.PlayerState.Playing;
            const currentTick = apiRef.current.tickPosition;
            (apiRef.current as any).loadMidiForScore();
            if (isPlaying) {
              apiRef.current.tickPosition = currentTick;
              apiRef.current.play();
            }
          } catch (e) {
            console.warn('loadMidiForScore error:', e);
          }
        }
      },
      getApi: () => apiRef.current,
      refresh: () => {
        apiRef.current?.render();
      },
    }));

    // Mouse Wheel Zoom (Cmd/Ctrl + Wheel or Pinch)
    const handleWheel = (e: React.WheelEvent) => {
      if (e.metaKey || e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.05 : -0.05;
        const newZoom = Math.max(0.65, Math.min(1.8, Math.round((currentZoomRef.current + delta) * 100) / 100));
        currentZoomRef.current = newZoom;
        if (containerRef.current) {
          (containerRef.current.style as any).zoom = `${newZoom}`;
          containerRef.current.style.transform = '';
        }
        if (onZoomChange) {
          onZoomChange(newZoom);
        }
      }
    };

    // Click-and-Drag Pan across Zoomed Canvas & Single-Click Deselect
    const handleMouseDown = (e: React.MouseEvent) => {
      clickStartPosRef.current = { x: e.clientX, y: e.clientY };
      const target = e.target as HTMLElement;
      const isSurface = target.closest('.at-surface');
      const shouldPan = e.button === 1 || e.altKey || (!isSurface && e.button === 0);
      if (shouldPan && scrollContainerRef.current) {
        e.preventDefault();
        setIsDragging(true);
        dragStartRef.current = {
          x: e.clientX,
          y: e.clientY,
          scrollLeft: scrollContainerRef.current.scrollLeft,
          scrollTop: scrollContainerRef.current.scrollTop,
        };
      }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (isDragging && dragStartRef.current && scrollContainerRef.current) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        scrollContainerRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx;
        scrollContainerRef.current.scrollTop = dragStartRef.current.scrollTop - dy;
      }
    };

    const handleMouseUp = (e: React.MouseEvent) => {
      const clickStart = clickStartPosRef.current;
      clickStartPosRef.current = null;

      if (clickStart) {
        const dx = Math.abs(e.clientX - clickStart.x);
        const dy = Math.abs(e.clientY - clickStart.y);
        // Only clear if clicked on the blank background outside sheet canvas AND looping is not active
        if (dx < 6 && dy < 6 && !isFocusedRef.current && !apiRef.current?.isLooping) {
          const target = e.target as HTMLElement;
          const isBlankArea =
            !target.closest('.at-surface') &&
            !target.closest('.alphaTab') &&
            !target.closest('.at-viewport') &&
            !target.closest('.at-cursors');
          if (isBlankArea && (apiRef.current?.playbackRange || containerRef.current?.querySelector('.at-selection svg'))) {
            if (apiRef.current) apiRef.current.playbackRange = null;
            try {
              (apiRef.current as any)._selectionWrapper?.clear?.();
              const selEls = containerRef.current?.querySelectorAll('.at-selection');
              selEls?.forEach((el) => {
                el.innerHTML = '';
              });
            } catch (err) {}
            if (onSelectionRangeChange) onSelectionRangeChange(null);
          }
        }
      }
      setIsDragging(false);
      dragStartRef.current = null;
    };

    return (
      <div
        className={`relative w-full h-full select-none overflow-hidden flex flex-col transition-colors duration-200 ${
          theme === 'dark' ? 'bg-[#090d16]' : theme === 'sepia' ? 'bg-[#fbf0d9]' : 'bg-white'
        }`}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div
            className={`absolute inset-0 z-30 backdrop-blur-sm flex flex-col items-center justify-center gap-3 ${
              theme === 'dark'
                ? 'bg-slate-950/80 text-white'
                : theme === 'sepia'
                ? 'bg-[#fbf0d9]/85 text-[#2c2013]'
                : 'bg-white/85 text-slate-800'
            }`}
          >
            <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
            <p className="text-sm font-semibold tracking-wide">Rendering Notation &amp; Tablature...</p>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg m-4 shadow">
            {errorMsg}
          </div>
        )}

        {/* Full-Bleed Lossless High-Contrast Sheet Canvas Container with Pan & Zoom */}
        <div
          ref={scrollContainerRef}
          onWheel={handleWheel}
          onMouseDownCapture={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUpCapture={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex-1 w-full h-full overflow-auto px-4 md:px-8 py-6 flex transition-colors duration-200 ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-default'
          } ${
            theme === 'dark' ? 'bg-[#090d16]' : theme === 'sepia' ? 'bg-[#fbf0d9]' : 'bg-white'
          }`}
        >
          <div
            ref={containerRef}
            style={{ zoom: currentZoomRef.current }}
            className={`w-full max-w-5xl min-h-full m-auto transition-all duration-150 ease-out theme-${theme} ${
              theme === 'dark'
                ? 'bg-[#090d16] text-white'
                : theme === 'sepia'
                ? 'bg-[#fbf0d9] text-[#2c2013]'
                : 'bg-white text-slate-900'
            }`}
          />
        </div>
      </div>
    );
  }
);

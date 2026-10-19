import { CuratedSong } from '../../types';

export interface GiulianiExercise {
  number: number;
  title: string;
  pattern: string; // e.g. "p - i - m"
  timeSignature: string; // "3 4" or "4 4" or "6 8"
  bpm: number;
  description: string;
  tex: string;
}

export const GIULIANI_120_EXERCISES: GiulianiExercise[] = [
  {
    "number": 1,
    "title": "Giuliani 120 No. 1 — Op. 1 Part 3 (a+m+p - a+m+p - a+i+m - a+m+p)",
    "pattern": "a+m+p - a+m+p - a+i+m - a+m+p",
    "timeSignature": "4 4",
    "bpm": 90,
    "description": "[a+m+p - a+m+p - a+i+m - a+m+p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 1)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 1\"\n\\tempo 90\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :4 (0.1 3.2 3.5) (0.1 3.2 2.4) (0.1 3.2 0.3) (0.1 1.2 3.5) |\n:4 (1.1 3.2 2.5) (1.1 3.2 0.4) (3.1 3.2 0.3) (3.1 3.2 2.5) |"
  },
  {
    "number": 2,
    "title": "Giuliani 120 No. 2 — Op. 1 Part 3 (p - m - a - p - m - a)",
    "pattern": "p - m - a - p - m - a",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[p - m - a - p - m - a] — Wide-interval arpeggio; bridges thumb foundation directly to outer treble fingers. (Op. 1 Pt. 3 No. 2)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 2\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} 3.5 1.2 0.1 2.4 1.2 0.1 0.3 1.2 0.1 3.5 1.2 0.1 |\n:8{tu 3} 2.5 3.2 1.1 0.4 3.2 1.1 0.3 3.2 1.1 2.5 3.2 1.1 |"
  },
  {
    "number": 3,
    "title": "Giuliani 120 No. 3 — Op. 1 Part 3 (p - a - m - p - a - m)",
    "pattern": "p - a - m - p - a - m",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[p - a - m - p - a - m] — Inverted arpeggio flow; develops annular accent with medial balance on inner strings. (Op. 1 Pt. 3 No. 3)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 3\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} 3.5 0.1 1.2 2.4 0.1 1.2 0.3 0.1 1.2 3.5 0.1 1.2 |\n:8{tu 3} 2.5 1.1 3.2 0.4 1.1 3.2 0.3 1.1 3.2 2.5 1.1 3.2 |"
  },
  {
    "number": 4,
    "title": "Giuliani 120 No. 4 — Op. 1 Part 3 (p - p - i - p - i - m)",
    "pattern": "p - p - i - p - i - m",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[p - p - i - p - i - m] — Foundational arpeggio permutation; enforces right-hand stability and relaxed finger independence. (Op. 1 Pt. 3 No. 4)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 4\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} 3.5 2.4 0.3 2.4 0.3 1.2 0.3 1.2 0.1 3.5 1.2 0.1 |\n:8{tu 3} 2.5 0.4 0.3 0.4 0.3 3.2 0.3 3.2 1.1 2.5 3.2 1.1 |"
  },
  {
    "number": 5,
    "title": "Giuliani 120 No. 5 — Op. 1 Part 3 (i - p - p - m - i - p)",
    "pattern": "i - p - p - m - i - p",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[i - p - p - m - i - p] — Foundational arpeggio permutation; enforces right-hand stability and relaxed finger independence. (Op. 1 Pt. 3 No. 5)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 5\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} 0.3 2.4 3.5 1.2 0.3 2.4 0.1 1.2 0.3 0.1 1.2 3.5 |\n:8{tu 3} 0.3 0.4 2.5 3.2 0.3 0.4 1.1 3.2 0.3 1.1 3.2 2.5 |"
  },
  {
    "number": 6,
    "title": "Giuliani 120 No. 6 — Op. 1 Part 3 (p - i - p - p - m - i)",
    "pattern": "p - i - p - p - m - i",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[p - i - p - p - m - i] — Foundational arpeggio permutation; enforces right-hand stability and relaxed finger independence. (Op. 1 Pt. 3 No. 6)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 6\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} 3.5 0.3 2.4 2.4 1.2 0.3 0.3 0.1 1.2 3.5 0.3 2.4 |\n:8{tu 3} 2.5 0.3 0.4 0.4 3.2 0.3 0.3 1.1 3.2 2.5 0.3 0.4 |"
  },
  {
    "number": 7,
    "title": "Giuliani 120 No. 7 — Op. 1 Part 3 (p - i - a - p - i - m)",
    "pattern": "p - i - a - p - i - m",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[p - i - a - p - i - m] — Wide-interval arpeggio; bridges thumb foundation directly to outer treble fingers. (Op. 1 Pt. 3 No. 7)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 7\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} 3.5 0.3 0.1 2.4 0.3 1.2 3.5 0.3 0.1 2.4 0.3 1.2 |\n:8{tu 3} 2.5 0.3 1.1 0.4 0.3 3.2 3.6 0.3 1.1 2.5 0.3 3.2 |"
  },
  {
    "number": 8,
    "title": "Giuliani 120 No. 8 — Op. 1 Part 3 (p - a - i - p - m - i)",
    "pattern": "p - a - i - p - m - i",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[p - a - i - p - m - i] — Foundational arpeggio permutation; enforces right-hand stability and relaxed finger independence. (Op. 1 Pt. 3 No. 8)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 8\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} 3.5 0.1 0.3 2.4 1.2 0.3 3.5 0.1 0.3 2.4 1.2 0.3 |\n:8{tu 3} 2.5 1.1 0.3 0.4 3.2 0.3 3.6 1.1 0.3 2.5 3.2 0.3 |"
  },
  {
    "number": 9,
    "title": "Giuliani 120 No. 9 — Op. 1 Part 3 (p - i - m - a - m - i)",
    "pattern": "p - i - m - a - m - i",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[p - i - m - a - m - i] — Ascending 4-note sweep; cultivates fluid outward hand momentum and ringing annular melody. (Op. 1 Pt. 3 No. 9)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 9\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} 3.5 0.3 1.2 0.1 1.2 0.3 2.4 0.3 1.2 3.5 0.3 1.2 |\n:8{tu 3} 2.5 0.3 3.2 1.1 3.2 0.3 0.4 0.3 3.2 2.5 0.3 3.2 |"
  },
  {
    "number": 10,
    "title": "Giuliani 120 No. 10 — Op. 1 Part 3 (p - m - i - a - m - i)",
    "pattern": "p - m - i - a - m - i",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[p - m - i - a - m - i] — Foundational arpeggio permutation; enforces right-hand stability and relaxed finger independence. (Op. 1 Pt. 3 No. 10)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 10\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} 3.5 1.2 0.3 0.1 1.2 0.3 2.4 1.2 0.3 3.5 1.2 0.3 |\n:8{tu 3} 2.5 3.2 0.3 1.1 3.2 0.3 0.4 3.2 0.3 2.5 3.2 0.3 |"
  },
  {
    "number": 11,
    "title": "Giuliani 120 No. 11 — Op. 1 Part 3 (i+p - m - a - i+p - m - a)",
    "pattern": "i+p - m - a - i+p - m - a",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[i+p - m - a - i+p - m - a] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 11)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 11\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} (0.3 3.5) 1.2 0.1 (0.3 2.4) 1.2 0.1 (0.3 3.5) 1.2 0.1 (0.3 2.4) 1.2 0.1 |\n:8{tu 3} (2.5 0.3) 3.2 1.1 (0.3 0.4) 3.2 1.1 (0.3 3.6) 3.2 1.1 (0.3 2.5) 3.2 1.1 |"
  },
  {
    "number": 12,
    "title": "Giuliani 120 No. 12 — Op. 1 Part 3 (a+p - m - i - a+p - m - i)",
    "pattern": "a+p - m - i - a+p - m - i",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[a+p - m - i - a+p - m - i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 12)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 12\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} (0.1 3.5) 1.2 0.3 (2.4 0.1) 1.2 0.3 (0.1 3.5) 1.2 0.3 (2.4 0.1) 1.2 0.3 |\n:8{tu 3} (1.1 2.5) 3.2 0.3 (1.1 0.4) 3.2 0.3 (1.1 3.6) 3.2 0.3 (1.1 2.5) 3.2 0.3 |"
  },
  {
    "number": 13,
    "title": "Giuliani 120 No. 13 — Op. 1 Part 3 (i+p - m - a - a+p - m - i)",
    "pattern": "i+p - m - a - a+p - m - i",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[i+p - m - a - a+p - m - i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 13)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 13\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} (0.3 3.5) 1.2 0.1 (2.4 0.1) 1.2 0.3 (0.3 3.5) 1.2 0.1 (2.4 0.1) 1.2 0.3 |\n:8{tu 3} (0.3 2.5) 3.2 1.1 (1.1 0.4) 3.2 0.3 (0.3 3.6) 3.2 1.1 (1.1 2.5) 3.2 0.3 |"
  },
  {
    "number": 14,
    "title": "Giuliani 120 No. 14 — Op. 1 Part 3 (m+p - i - a - m+p - i - a)",
    "pattern": "m+p - i - a - m+p - i - a",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[m+p - i - a - m+p - i - a] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 14)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 14\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} (1.2 3.5) 0.3 0.1 (1.2 2.4) 0.3 0.1 (1.2 3.5) 0.3 0.1 (1.2 2.4) 0.3 0.1 |\n:8{tu 3} (3.2 2.5) 0.3 1.1 (3.2 0.4) 0.3 1.1 (3.2 3.6) 0.3 1.1 (2.5 3.2) 0.3 1.1 |"
  },
  {
    "number": 15,
    "title": "Giuliani 120 No. 15 — Op. 1 Part 3 (a+p - i - m - a+p - i - m)",
    "pattern": "a+p - i - m - a+p - i - m",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[a+p - i - m - a+p - i - m] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 15)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 15\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} (0.1 3.5) 0.3 1.2 (0.1 2.4) 0.3 1.2 (0.1 3.5) 0.3 1.2 (0.1 2.4) 0.3 1.2 |\n:8{tu 3} (1.1 2.5) 0.3 3.2 (1.1 0.4) 0.3 3.2 (1.1 3.6) 0.3 3.2 (1.1 2.5) 0.3 3.2 |"
  },
  {
    "number": 16,
    "title": "Giuliani 120 No. 16 — Op. 1 Part 3 (p - i - p - m - i - p)",
    "pattern": "p - i - p - m - i - p",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[p - i - p - m - i - p] — Foundational arpeggio permutation; enforces right-hand stability and relaxed finger independence. (Op. 1 Pt. 3 No. 16)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 16\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} 3.5 0.3 2.4 1.2 0.3 2.4 3.5 0.3 2.4 0.1 0.3 2.4 |\n:8{tu 3} 2.5 0.3 0.4 3.2 0.3 0.4 2.5 0.3 0.4 1.1 0.3 0.4 |"
  },
  {
    "number": 17,
    "title": "Giuliani 120 No. 17 — Op. 1 Part 3 (p - i - p - m - i - a)",
    "pattern": "p - i - p - m - i - a",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[p - i - p - m - i - a] — Foundational arpeggio permutation; enforces right-hand stability and relaxed finger independence. (Op. 1 Pt. 3 No. 17)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 17\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} 3.5 0.3 2.4 1.2 0.3 0.1 2.4 1.2 3.5 0.3 2.4 1.2 |\n:8{tu 3} 2.5 0.3 0.4 3.2 0.3 1.1 0.4 3.2 2.5 0.3 0.4 3.2 |"
  },
  {
    "number": 18,
    "title": "Giuliani 120 No. 18 — Op. 1 Part 3 (a+m+p - p - i - a+m+p - p - i)",
    "pattern": "a+m+p - p - i - a+m+p - p - i",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[a+m+p - p - i - a+m+p - p - i] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 18)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 18\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} (0.1 1.2 3.5) 2.4 0.3 (0.1 1.2 3.5) 2.4 0.3 (0.1 1.2 3.5) 2.4 0.3 (0.1 1.2 3.5) 2.4 0.3 |\n:8{tu 3} (3.1 3.2 2.5) 0.4 0.3 (3.1 3.2 2.5) 0.4 0.3 (1.1 3.2 2.5) 0.4 0.3 (1.1 3.2 2.5) 0.4 0.3 |"
  },
  {
    "number": 19,
    "title": "Giuliani 120 No. 19 — Op. 1 Part 3 (p - a+m+p - i - p - a+m+p - i)",
    "pattern": "p - a+m+p - i - p - a+m+p - i",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[p - a+m+p - i - p - a+m+p - i] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 19)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 19\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} 3.5 (0.1 3.2 2.4) 0.3 3.5 (0.1 3.2 2.4) 0.3 3.5 (0.1 3.2 2.4) 0.3 3.5 (0.1 3.2 2.4) 0.3 |\n:8{tu 3} 2.5 (3.1 3.2 0.4) 0.3 2.5 (1.1 3.2 0.4) 0.3 2.5 (3.1 3.2 0.4) 0.3 2.5 (1.1 3.2 0.4) 0.3 |"
  },
  {
    "number": 20,
    "title": "Giuliani 120 No. 20 — Op. 1 Part 3 (p - p - a+i+m - p - p - a+i+m)",
    "pattern": "p - p - a+i+m - p - p - a+i+m",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[p - p - a+i+m - p - p - a+i+m] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 20)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 20\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} 3.5 2.4 (0.1 3.2 0.3) 3.5 2.4 (0.1 3.2 0.3) 3.5 2.4 (0.1 3.2 0.3) 3.5 2.4 (0.1 3.2 0.3) |\n:8{tu 3} 2.5 0.4 (3.1 3.2 0.3) 2.5 0.4 (3.1 3.2 0.3) 2.5 0.4 (3.1 3.2 0.3) 2.5 0.4 (3.1 3.2 0.3) |"
  },
  {
    "number": 21,
    "title": "Giuliani 120 No. 21 — Op. 1 Part 3 (a+m+p - a+m+p - i - a+m+p - a+m+p - i)",
    "pattern": "a+m+p - a+m+p - i - a+m+p - a+m+p - i",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[a+m+p - a+m+p - i - a+m+p - a+m+p - i] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 21)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 21\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} (0.1 3.2 3.5) (1.1 1.2 2.4) 0.3 (0.1 3.2 3.5) (0.1 3.2 2.4) 0.3 (0.1 3.2 3.5) (0.1 1.2 2.4) 0.3 (0.1 1.2 3.5) (0.1 3.2 2.4) 0.3 |\n:8{tu 3} (1.1 3.2 2.5) (3.1 3.2 0.4) 0.3 (3.1 3.2 2.5) (1.1 3.2 0.4) 0.3 (3.1 3.2 2.5) (1.1 3.2 0.4) 0.3 (3.1 3.2 2.5) (1.1 3.2 0.4) 0.3 |"
  },
  {
    "number": 22,
    "title": "Giuliani 120 No. 22 — Op. 1 Part 3 (p - a+m+p - a+i+m - p - a+m+p - a+i+m)",
    "pattern": "p - a+m+p - a+i+m - p - a+m+p - a+i+m",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[p - a+m+p - a+i+m - p - a+m+p - a+i+m] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 22)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 22\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} 3.5 (0.1 1.2 2.4) (0.1 3.2 0.3) 3.5 (0.1 1.2 2.4) (0.1 3.2 0.3) 3.5 (0.1 1.2 2.4) (0.1 3.2 0.3) 3.5 (0.1 1.2 2.4) (0.1 3.2 0.3) |\n:8{tu 3} 2.5 (3.1 3.2 0.4) (1.1 3.2 0.3) 2.5 (3.1 3.2 0.4) (1.1 3.2 3.3) 2.5 (1.1 3.2 0.4) (3.1 3.2 0.3) 2.5 (3.1 3.2 0.4) (3.1 3.2 0.3) |"
  },
  {
    "number": 23,
    "title": "Giuliani 120 No. 23 — Op. 1 Part 3 (a+m+p - p - a+i+m - a+m+p - p - a+i+m)",
    "pattern": "a+m+p - p - a+i+m - a+m+p - p - a+i+m",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[a+m+p - p - a+i+m - a+m+p - p - a+i+m] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 23)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 23\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} (0.1 1.2 2.5) 2.4 (0.1 3.2 0.3) (0.1 3.2 3.5) 2.4 (0.1 3.2 0.3) (0.1 3.2 3.5) 2.4 (0.1 3.2 0.3) (0.1 3.2 3.5) 2.4 (0.1 3.2 0.3) |\n:8{tu 3} (3.1 3.2 2.5) 0.4 (3.1 3.2 0.3) (3.1 3.2 2.5) 0.4 (2.1 3.2 0.3) (3.1 3.2 2.5) 0.4 (3.1 3.2 0.3) (1.1 3.2 2.5) 0.4 (3.1 3.2 0.3) |"
  },
  {
    "number": 24,
    "title": "Giuliani 120 No. 24 — Op. 1 Part 3 (a+m+p - a+m+p - a+i+m - a+m+p - a+m+p - a+i+m)",
    "pattern": "a+m+p - a+m+p - a+i+m - a+m+p - a+m+p - a+i+m",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[a+m+p - a+m+p - a+i+m - a+m+p - a+m+p - a+i+m] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 24)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 24\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} (2.1 3.2 3.5) (2.1 3.2 2.4) (2.1 3.2 0.3) (2.1 3.2 3.5) (2.1 3.2 2.4) (2.1 3.2 0.3) (2.1 3.2 3.5) (2.1 3.2 2.4) (2.1 3.2 0.3) (2.1 3.2 3.5) (2.1 3.2 2.4) (2.1 3.2 0.3) |\n:8{tu 3} (3.1 3.2 2.5) (3.1 3.2 0.4) (2.1 2.2 0.3) (3.1 1.2 2.5) (3.1 3.2 0.4) (3.1 2.2 1.3) (3.1 3.2 2.5) (3.1 3.2 0.4) (3.1 2.2 0.3) (3.1 0.2 2.5) (3.1 3.2 0.4) (3.1 2.2 0.3) |"
  },
  {
    "number": 25,
    "title": "Giuliani 120 No. 25 — Op. 1 Part 3 (p - m - a - m - i - m)",
    "pattern": "p - m - a - m - i - m",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - m - a - m - i - m] — Wide-interval arpeggio; bridges thumb foundation directly to outer treble fingers. (Op. 1 Pt. 3 No. 25)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 25\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16{tu 3} 3.5 1.2 0.1 1.2 0.3 1.2 2.4 1.2 0.1 1.2 0.3 1.2 3.5 1.2 0.1 1.2 0.3 1.2 2.4 1.2 0.1 1.2 0.3 1.2 |\n:16{tu 3} 2.5 3.2 1.1 3.2 0.3 2.2 0.4 3.2 1.1 3.2 0.3 3.2 2.5 3.2 1.1 3.2 0.3 3.2 0.4 3.2 1.1 3.2 0.3 3.2 |"
  },
  {
    "number": 26,
    "title": "Giuliani 120 No. 26 — Op. 1 Part 3 (p - a - m - a - i - m)",
    "pattern": "p - a - m - a - i - m",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - a - m - a - i - m] — Inverted arpeggio flow; develops annular accent with medial balance on inner strings. (Op. 1 Pt. 3 No. 26)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 26\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16{tu 3} 3.5 0.1 1.2 0.1 0.3 1.2 2.4 0.1 1.2 0.1 0.3 1.2 3.5 0.1 1.2 0.1 0.3 1.2 2.4 0.1 1.2 0.1 0.3 1.2 |\n:16{tu 3} 2.5 1.1 3.2 1.1 0.3 3.2 0.4 1.1 3.2 1.1 0.3 3.2 2.5 3.2 1.1 3.2 0.3 3.2 0.4 1.1 3.2 1.1 0.3 3.2 |"
  },
  {
    "number": 27,
    "title": "Giuliani 120 No. 27 — Op. 1 Part 3 (p - i - p - i - m - i)",
    "pattern": "p - i - p - i - m - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - p - i - m - i] — Alternating finger oscillation; sharpens independent knuckle articulation and rhythmic precision. (Op. 1 Pt. 3 No. 27)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 27\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16{tu 3} 3.5 0.3 2.4 0.3 1.2 0.3 2.4 1.2 0.3 1.2 0.1 1.2 3.5 0.3 2.4 0.3 1.2 0.3 2.4 1.2 0.3 1.2 0.1 1.2 |\n:16{tu 3} 2.5 0.3 0.4 0.3 3.2 0.3 0.4 3.2 0.3 3.2 1.1 3.2 2.5 0.3 0.4 0.3 3.2 0.3 0.4 3.2 0.3 3.2 1.1 3.2 |"
  },
  {
    "number": 28,
    "title": "Giuliani 120 No. 28 — Op. 1 Part 3 (p - i - a - i - m - i)",
    "pattern": "p - i - a - i - m - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - a - i - m - i] — Wide-interval arpeggio; bridges thumb foundation directly to outer treble fingers. (Op. 1 Pt. 3 No. 28)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 28\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16{tu 3} 3.5 0.3 0.1 0.3 1.2 0.3 2.4 0.3 0.1 0.3 1.2 0.3 3.5 0.3 0.1 0.3 1.2 0.3 2.4 0.3 0.1 0.3 1.2 0.3 |\n:16{tu 3} 2.5 0.3 1.1 0.3 3.2 0.3 0.4 0.3 1.1 0.3 3.2 0.3 2.5 0.3 1.1 0.3 3.2 0.3 0.4 0.3 1.1 0.3 3.2 0.3 |"
  },
  {
    "number": 29,
    "title": "Giuliani 120 No. 29 — Op. 1 Part 3 (p - i - m - i - a - i)",
    "pattern": "p - i - m - i - a - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - m - i - a - i] — Alternating finger oscillation; sharpens independent knuckle articulation and rhythmic precision. (Op. 1 Pt. 3 No. 29)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 29\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16{tu 3} 3.5 0.3 1.2 0.3 0.1 0.3 2.4 0.3 1.2 0.3 0.1 0.3 3.5 0.3 1.2 0.3 0.1 0.3 2.4 0.3 1.2 0.3 0.1 0.3 |\n:16{tu 3} 2.5 0.3 2.2 0.3 1.1 0.3 0.4 0.3 3.2 0.3 1.1 0.3 2.5 0.3 2.2 0.3 1.1 0.3 0.4 0.3 3.2 0.3 1.1 0.3 |"
  },
  {
    "number": 30,
    "title": "Giuliani 120 No. 30 — Op. 1 Part 3 (p - i - p - m - i - a)",
    "pattern": "p - i - p - m - i - a",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - p - m - i - a] — Foundational arpeggio permutation; enforces right-hand stability and relaxed finger independence. (Op. 1 Pt. 3 No. 30)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 30\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16{tu 3} 3.5 0.3 2.4 1.2 0.3 0.1 3.5 0.1 0.3 1.2 2.4 0.3 3.5 0.3 2.4 1.2 0.3 0.1 3.5 0.1 0.3 1.2 2.4 0.3 |\n:16{tu 3} 2.5 0.3 0.4 3.2 0.3 1.1 2.5 1.1 0.3 3.2 0.4 0.3 2.5 0.3 0.4 3.2 0.3 1.1 2.5 1.1 0.3 3.2 0.4 |"
  },
  {
    "number": 31,
    "title": "Giuliani 120 No. 31 — Op. 1 Part 3 (p - i - m - a - m - i)",
    "pattern": "p - i - m - a - m - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - m - a - m - i] — Ascending 4-note sweep; cultivates fluid outward hand momentum and ringing annular melody. (Op. 1 Pt. 3 No. 31)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 31\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16{tu 3} 3.5 0.3 1.2 0.1 1.2 0.3 2.4 0.3 1.2 0.1 1.2 0.3 3.5 0.3 1.2 0.1 1.2 0.3 2.4 0.3 1.2 0.1 1.2 0.3 |\n:16{tu 3} 2.5 0.3 3.2 1.1 3.2 0.3 0.4 0.3 3.2 1.1 3.2 0.3 2.5 0.3 3.2 1.1 3.2 0.3 0.4 0.3 3.2 1.1 2.2 0.3 |"
  },
  {
    "number": 32,
    "title": "Giuliani 120 No. 32 — Op. 1 Part 3 (p - a - m - i - m - a)",
    "pattern": "p - a - m - i - m - a",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - a - m - i - m - a] — Descending 4-note cascade; trains quick ring-finger initiation and smooth inward finger roll. (Op. 1 Pt. 3 No. 32)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 32\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16{tu 3} 3.5 0.1 1.2 0.3 1.2 0.1 2.4 0.1 1.2 0.3 1.2 0.1 3.5 0.1 1.2 0.3 1.2 0.1 2.4 0.1 1.2 0.3 1.2 0.1 |\n:16{tu 3} 2.5 1.1 3.2 0.3 3.2 1.1 0.4 1.1 3.2 0.3 3.2 1.1 2.5 1.1 3.2 0.3 3.2 1.1 0.4 1.1 3.2 0.3 3.2 1.1 |"
  },
  {
    "number": 33,
    "title": "Giuliani 120 No. 33 — Op. 1 Part 3 (p - i - a - p - i - m)",
    "pattern": "p - i - a - p - i - m",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - a - p - i - m] — Wide-interval arpeggio; bridges thumb foundation directly to outer treble fingers. (Op. 1 Pt. 3 No. 33)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 33\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16{tu 3} 3.5 0.3 0.1 2.4 0.3 1.2 3.5 0.3 0.1 2.4 0.3 1.2 3.5 0.3 0.1 2.4 0.3 1.2 3.5 0.3 0.1 2.4 0.3 1.2 |\n:16{tu 3} 2.5 0.3 1.1 0.4 0.3 3.2 2.5 0.3 1.1 0.4 0.3 3.2 2.5 0.3 1.1 0.4 0.3 3.2 2.5 0.3 1.1 0.4 0.3 3.2 |"
  },
  {
    "number": 34,
    "title": "Giuliani 120 No. 34 — Op. 1 Part 3 (p - p - p - p - i - m)",
    "pattern": "p - p - p - p - i - m",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - p - p - p - i - m] — Foundational arpeggio permutation; enforces right-hand stability and relaxed finger independence. (Op. 1 Pt. 3 No. 34)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 34\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16{tu 3} 3.5 2.4 3.5 2.4 0.3 1.2 2.4 0.3 2.4 0.3 1.2 0.1 3.5 2.4 3.5 2.4 0.3 1.2 2.4 0.3 2.4 0.3 1.2 0.1 |\n:16{tu 3} 2.5 0.4 2.5 0.4 0.3 3.2 0.4 0.3 0.4 0.3 3.2 1.1 2.5 0.4 2.5 0.4 0.3 3.2 0.4 0.3 0.4 0.3 3.2 1.1 |"
  },
  {
    "number": 35,
    "title": "Giuliani 120 No. 35 — Op. 1 Part 3 (p - a - m - a - m - i)",
    "pattern": "p - a - m - a - m - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - a - m - a - m - i] — Inverted arpeggio flow; develops annular accent with medial balance on inner strings. (Op. 1 Pt. 3 No. 35)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 35\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16{tu 3} 3.5 0.1 1.2 0.1 1.2 0.3 2.4 0.1 1.2 0.1 1.2 0.3 3.5 0.1 1.2 0.1 1.2 0.3 2.4 0.1 1.2 0.1 1.2 0.3 |\n:16{tu 3} 2.5 1.1 3.2 1.1 3.2 0.3 0.4 1.1 3.2 1.1 3.2 0.3 2.5 1.1 3.2 1.1 3.2 0.3 0.4 1.1 3.2 1.1 3.2 0.3 |"
  },
  {
    "number": 36,
    "title": "Giuliani 120 No. 36 — Op. 1 Part 3 (a+p - i - p - i - a+p - i)",
    "pattern": "a+p - i - p - i - a+p - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+p - i - p - i - a+p - i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 36)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 36\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 3.5) 0.3 2.4 0.3 (0.1 3.5) 0.3 2.4 0.3 (0.1 3.5) 0.3 2.4 0.3 (0.1 3.5) 0.3 2.4 0.3 |\n:16 (1.1 2.5) 0.3 0.4 0.3 (1.1 2.5) 0.3 0.4 0.3 (1.1 2.5) 0.3 0.4 0.3 (1.1 2.5) 0.3 0.4 0.3 |"
  },
  {
    "number": 37,
    "title": "Giuliani 120 No. 37 — Op. 1 Part 3 (p - a+i - p - i - p - a+i)",
    "pattern": "p - a+i - p - i - p - a+i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - a+i - p - i - p - a+i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 37)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 37\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 (0.1 0.3) 2.4 0.3 3.5 (0.1 0.3) 2.4 0.3 3.5 (0.1 0.3) 2.4 0.3 3.5 (0.1 0.3) 2.4 0.3 |\n:16 2.5 (1.1 0.3) 0.4 0.3 2.5 (1.1 0.3) 0.4 0.3 2.5 (1.1 0.3) 0.4 0.3 2.5 (1.1 0.3) 0.4 0.3 |"
  },
  {
    "number": 38,
    "title": "Giuliani 120 No. 38 — Op. 1 Part 3 (p - i - a+p - i - p - i)",
    "pattern": "p - i - a+p - i - p - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - a+p - i - p - i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 38)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 38\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.3 (0.1 2.4) 0.3 3.5 0.3 (2.4 0.1) 0.3 3.5 0.3 (0.1 2.4) 0.3 3.5 0.3 (2.4 0.1) 0.3 |\n:16 2.5 0.3 (1.1 0.4) 0.3 2.5 0.3 (1.1 0.4) 0.3 2.5 0.3 (1.1 0.4) 0.3 2.5 0.3 (1.1 0.4) 0.3 |"
  },
  {
    "number": 39,
    "title": "Giuliani 120 No. 39 — Op. 1 Part 3 (p - i - p - a+i - p - i)",
    "pattern": "p - i - p - a+i - p - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - p - a+i - p - i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 39)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 39\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.3 2.4 (0.1 0.3) 3.5 0.3 2.4 (0.1 0.3) 3.5 0.3 2.4 (0.1 0.3) 3.5 0.3 2.4 (0.1 0.3) |\n:16 2.5 0.3 0.4 (1.1 0.3) 2.5 0.3 0.4 (1.1 0.3) 2.5 0.3 0.4 (1.1 0.3) 2.5 0.3 0.4 (1.1 0.3) |"
  },
  {
    "number": 40,
    "title": "Giuliani 120 No. 40 — Op. 1 Part 3 (a+p - a+i - p - i - a+p - a+i)",
    "pattern": "a+p - a+i - p - i - a+p - a+i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+p - a+i - p - i - a+p - a+i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 40)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 40\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 3.5) (0.1 0.3) 2.4 0.3 (0.1 3.5) (0.1 0.3) 2.4 0.3 (0.1 3.5) (0.1 0.3) 2.4 0.3 (0.1 3.5) (0.1 0.3) 2.4 0.3 |\n:16 (1.1 2.5) (1.1 0.3) 0.4 0.3 (1.1 2.5) (1.1 0.3) 0.4 0.3 (1.1 2.5) (1.1 0.3) 0.4 0.3 (1.1 2.5) (1.1 0.3) 0.4 0.3 |"
  },
  {
    "number": 41,
    "title": "Giuliani 120 No. 41 — Op. 1 Part 3 (p - a+i - a+p - i - p - a+i)",
    "pattern": "p - a+i - a+p - i - p - a+i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - a+i - a+p - i - p - a+i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 41)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 41\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 (0.1 0.3) (0.1 2.4) 0.3 3.5 (0.1 0.3) (2.4 0.1) 0.3 3.5 (0.1 0.3) (0.1 2.4) 0.3 3.5 (0.1 0.3) (0.1 2.4) 0.3 |\n:16 2.5 (1.1 0.3) (1.1 0.4) 0.3 2.5 (1.1 0.3) (1.1 0.4) 0.3 2.5 (1.1 0.3) (1.1 0.4) 0.3 2.5 (1.1 0.3) (1.1 0.4) 0.3 |"
  },
  {
    "number": 42,
    "title": "Giuliani 120 No. 42 — Op. 1 Part 3 (p - i - a+p - a+i - p - i)",
    "pattern": "p - i - a+p - a+i - p - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - a+p - a+i - p - i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 42)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 42\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.3 (0.1 2.4) (0.1 0.3) 3.5 0.3 (0.1 2.4) (0.1 0.3) 3.5 0.3 (0.1 2.4) (0.1 0.3) 3.5 0.3 (0.1 2.4) (0.1 0.3) |\n:16 2.5 0.3 (1.1 0.4) (1.1 0.3) 2.5 0.3 (1.1 0.4) (1.1 0.3) 2.5 0.3 (1.1 0.4) (1.1 0.3) 2.5 0.3 (1.1 0.4) (1.1 0.3) |"
  },
  {
    "number": 43,
    "title": "Giuliani 120 No. 43 — Op. 1 Part 3 (a+p - i - p - a+i - a+p - i)",
    "pattern": "a+p - i - p - a+i - a+p - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+p - i - p - a+i - a+p - i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 43)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 43\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 3.5) 0.3 2.4 (0.1 0.3) (0.1 3.5) 0.3 2.4 (0.1 0.3) (0.1 3.5) 0.3 2.4 (0.1 0.3) (0.1 3.5) 0.3 2.4 (0.1 0.3) |\n:16 (1.1 2.5) 0.3 0.4 (1.1 0.3) (1.1 2.5) 0.3 0.4 (1.1 0.3) (1.1 2.5) 0.3 0.4 (1.1 0.3) (1.1 2.5) 0.3 0.4 (1.1 0.3) |"
  },
  {
    "number": 44,
    "title": "Giuliani 120 No. 44 — Op. 1 Part 3 (a+p - i - a+p - i - a+p - i)",
    "pattern": "a+p - i - a+p - i - a+p - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+p - i - a+p - i - a+p - i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 44)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 44\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 3.5) 0.3 (0.1 2.4) 0.3 (0.1 3.5) 0.3 (0.1 2.4) 0.3 (0.1 3.5) 0.3 (0.1 2.4) 0.3 (0.1 3.5) 0.3 (0.1 2.4) 0.3 |\n:16 (1.1 2.5) 0.3 (1.1 0.4) 0.3 (1.1 2.5) 0.3 (1.1 0.4) 0.3 (1.1 2.5) 0.3 (1.1 0.4) 0.3 (1.1 2.5) 0.3 (1.1 0.4) 0.3 |"
  },
  {
    "number": 45,
    "title": "Giuliani 120 No. 45 — Op. 1 Part 3 (p - a+i - p - a+i - p - a+i)",
    "pattern": "p - a+i - p - a+i - p - a+i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - a+i - p - a+i - p - a+i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 45)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 45\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 (0.1 0.3) 2.4 (0.1 0.3) 3.5 (0.1 0.3) 2.4 (0.1 0.3) 3.5 (0.1 0.3) 2.4 (0.1 0.3) 3.5 (0.1 0.3) 2.4 (0.1 0.3) |\n:16 2.5 (1.1 0.3) 0.4 (1.1 0.3) 2.5 (1.1 0.3) 0.4 (1.1 0.3) 2.5 (1.1 0.3) 0.4 (1.1 0.3) 2.5 (1.1 0.3) 0.4 (1.1 0.3) |"
  },
  {
    "number": 46,
    "title": "Giuliani 120 No. 46 — Op. 1 Part 3 (a+p - a+i - a+p - i - a+p - a+i)",
    "pattern": "a+p - a+i - a+p - i - a+p - a+i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+p - a+i - a+p - i - a+p - a+i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 46)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 46\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 3.5) (0.1 0.3) (0.1 2.4) 0.3 (0.1 3.5) (0.1 0.3) (0.1 2.4) 0.3 (0.1 3.5) (0.1 0.3) (0.1 2.4) 0.3 (0.1 3.5) (0.1 0.3) (0.1 2.4) 0.3 |\n:16 (1.1 2.5) (1.1 0.3) (1.1 0.4) 0.3 (1.1 2.5) (1.1 0.3) (1.1 0.4) 0.3 (1.1 2.5) (1.1 0.3) (1.1 0.4) 0.3 (1.1 2.5) (1.1 0.3) (1.1 0.4) 0.3 |"
  },
  {
    "number": 47,
    "title": "Giuliani 120 No. 47 — Op. 1 Part 3 (p - a+i - a+p - a+i - p - a+i)",
    "pattern": "p - a+i - a+p - a+i - p - a+i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - a+i - a+p - a+i - p - a+i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 47)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 47\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 (0.1 0.3) (0.1 2.4) (0.1 0.3) 3.5 (0.1 0.3) (0.1 2.4) (0.1 0.3) 3.5 (0.1 0.3) (0.1 2.4) (0.1 0.3) 3.5 (0.1 0.3) (2.4 0.1) (0.1 0.3) |\n:16 2.5 (1.1 0.3) (1.1 0.4) (1.1 0.3) 2.5 (1.1 0.3) (1.1 0.4) (1.1 0.3) 2.5 (1.1 0.3) (1.1 0.4) (1.1 0.3) 2.5 (1.1 0.3) (1.1 0.4) (1.1 0.3) |"
  },
  {
    "number": 48,
    "title": "Giuliani 120 No. 48 — Op. 1 Part 3 (a+p - i - a+p - a+i - a+p - i)",
    "pattern": "a+p - i - a+p - a+i - a+p - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+p - i - a+p - a+i - a+p - i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 48)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 48\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 3.5) 0.3 (0.1 2.4) (0.1 0.3) (0.1 3.5) 0.3 (0.1 2.4) (0.1 0.3) (0.1 3.5) 0.3 (0.1 2.4) (0.1 0.3) (0.1 3.5) 0.3 (2.4 0.1) (0.1 0.3) |\n:16 (1.1 2.5) 0.3 (1.1 0.4) (1.1 0.3) (1.1 2.5) 0.3 (1.1 0.4) (1.1 0.3) (1.1 2.5) 0.3 (1.1 0.4) (1.1 0.3) (1.1 2.5) 0.3 (1.1 0.4) (1.1 0.3) |"
  },
  {
    "number": 49,
    "title": "Giuliani 120 No. 49 — Op. 1 Part 3 (a+p - a+i - p - a+i - a+p - a+i)",
    "pattern": "a+p - a+i - p - a+i - a+p - a+i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+p - a+i - p - a+i - a+p - a+i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 49)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 49\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 3.5) (0.1 0.3) 2.4 (0.1 0.3) (0.1 3.5) (0.1 0.3) 2.4 (0.1 0.3) (0.1 3.5) (0.1 0.3) 2.4 (0.1 0.3) (0.1 3.5) (0.1 0.3) 2.4 (0.1 0.3) |\n:16 (1.1 2.5) (1.1 0.3) 0.4 (1.1 0.3) (1.1 2.5) (1.1 0.3) 0.4 (1.1 0.3) (1.1 2.5) (1.1 0.3) 0.4 (1.1 0.3) (1.1 2.5) (1.1 0.3) 0.4 (1.1 0.3) |"
  },
  {
    "number": 50,
    "title": "Giuliani 120 No. 50 — Op. 1 Part 3 (a+p - a+i - a+p - a+i - a+p - a+i)",
    "pattern": "a+p - a+i - a+p - a+i - a+p - a+i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+p - a+i - a+p - a+i - a+p - a+i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 50)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 50\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 3.5) (0.1 0.3) (0.1 2.4) (0.1 0.3) (0.1 3.5) (0.1 0.3) (0.1 2.4) (0.1 0.3) (0.1 3.5) (0.1 0.3) (0.1 2.4) (0.1 0.3) (0.1 3.5) (0.1 0.3) (2.4 0.1) (0.1 0.3) |\n:16 (1.1 2.5) (1.1 0.3) (1.1 0.4) (1.1 0.3) (1.1 2.5) (1.1 0.3) (1.1 0.4) (1.1 0.3) (1.1 2.5) (1.1 0.3) (1.1 0.4) (1.1 0.3) (1.1 2.5) (1.1 0.3) (1.1 0.4) (1.1 0.3) |"
  },
  {
    "number": 51,
    "title": "Giuliani 120 No. 51 — Op. 1 Part 3 (a+m+p - a+m - a+m - a+m - a+m+p - a+m)",
    "pattern": "a+m+p - a+m - a+m - a+m - a+m+p - a+m",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+m+p - a+m - a+m - a+m - a+m+p - a+m] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 51)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 51\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 3.2 3.5) (0.1 1.2) (0.1 3.2) (0.1 3.2) (0.1 1.2 2.4) (0.1 3.2) (0.1 1.2) (0.1 3.2) (0.1 1.2 0.3) (0.1 3.2) (0.1 1.2) (0.1 3.2) (0.1 1.2 2.4) (0.1 1.2) (0.1 3.2) (0.1 3.2) |\n:16 (1.1 3.2 2.5) (3.1 3.2) (1.1 3.2) (1.1 3.2) (3.1 3.2 0.4) (3.1 3.2) (3.1 3.2) (1.1 3.2) (1.1 3.2 0.3) (1.1 3.2) (3.1 3.2) (1.1 3.2) (1.1 3.2 0.4) (1.1 3.2) (3.1 3.2) (3.1 3.2) |"
  },
  {
    "number": 52,
    "title": "Giuliani 120 No. 52 — Op. 1 Part 3 (a+m - a+m+p - a+m - a+m - a+m - a+m+p)",
    "pattern": "a+m - a+m+p - a+m - a+m - a+m - a+m+p",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+m - a+m+p - a+m - a+m - a+m - a+m+p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 52)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 52\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 1.2) (0.1 3.2 3.5) (0.1 1.2) (0.1 1.2) (0.1 1.2) (0.1 1.2 2.4) (0.1 1.2) (0.1 1.2) (0.1 1.2) (0.1 3.2 0.3) (0.1 1.2) (0.1 3.2) (0.1 1.2) (0.1 3.2 2.4) (0.1 1.2) (0.1 1.2) |\n:16 (3.1 3.2) (3.1 3.2 2.5) (1.1 1.2) (3.1 3.2) (3.1 3.2) (3.1 3.2 0.4) (3.1 3.2) (3.1 3.2) (1.1 3.2) (1.1 3.2 0.3) (3.1 3.2) (3.1 3.2) (1.1 3.2) (3.1 3.2 0.4) (3.1 3.2) (1.1 1.2) |"
  },
  {
    "number": 53,
    "title": "Giuliani 120 No. 53 — Op. 1 Part 3 (a+m - a+m - a+m+p - a+m - a+m - a+m)",
    "pattern": "a+m - a+m - a+m+p - a+m - a+m - a+m",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+m - a+m - a+m+p - a+m - a+m - a+m] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 53)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 53\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 1.2) (0.1 3.2) (0.1 1.2 3.5) (0.1 1.2) (0.1 1.2) (0.1 1.2) (0.1 1.2 2.4) (0.1 1.2) (0.1 3.2) (0.1 3.2) (0.1 3.2 0.3) (0.1 3.2) (0.1 1.2) (0.1 3.2) (0.1 1.2 2.4) (0.1 1.2) |\n:16 (3.1 3.2) (3.1 3.2) (1.1 3.2 2.5) (3.1 3.2) (3.1 3.2) (3.1 3.2) (3.1 3.2 0.4) (3.1 3.2) (3.1 3.2) (1.1 3.2) (3.1 3.2 0.3) (3.1 3.2) (3.1 3.2) (3.1 3.2) (3.1 3.2 0.4) (1.1 3.2) |"
  },
  {
    "number": 54,
    "title": "Giuliani 120 No. 54 — Op. 1 Part 3 (a+m - a+m - a+m - a+m+p - a+m - a+m)",
    "pattern": "a+m - a+m - a+m - a+m+p - a+m - a+m",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+m - a+m - a+m - a+m+p - a+m - a+m] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 54)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 54\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 1.2) (0.1 3.2) (0.1 1.2) (0.1 1.2 3.5) (0.1 1.2) (0.1 1.2) (0.1 1.2) (0.1 3.2 2.4) (0.1 3.2) (0.1 3.2) (0.1 3.2) (0.1 3.2 0.3) (0.1 1.2) (0.1 3.2) (0.1 3.2) (0.1 3.2 2.4) |\n:16 (3.1 3.2) (3.1 3.2) (3.1 3.2) (1.1 3.2 2.5) (1.1 1.2) (3.1 3.2) (3.1 3.2) (3.1 3.2 0.4) (1.1 3.2) (1.1 3.2) (3.1 3.2) (3.1 3.2 0.3) (3.1 3.2) (1.1 3.2) (1.1 3.2) (3.1 3.2 0.4) |"
  },
  {
    "number": 55,
    "title": "Giuliani 120 No. 55 — Op. 1 Part 3 (a+m+p - a+m+p - a+m - a+m - a+m+p - a+i+m)",
    "pattern": "a+m+p - a+m+p - a+m - a+m - a+m+p - a+i+m",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+m+p - a+m+p - a+m - a+m - a+m+p - a+i+m] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 55)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 55\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 1.2 3.5) (0.1 1.2 2.4) (0.1 1.2) (0.1 3.2) (0.1 3.2 2.4) (0.1 3.2 0.3) (0.1 3.2) (0.1 1.2) (0.1 3.2 0.3) (0.1 3.2 2.4) (0.1 3.2) (0.1 1.2) (0.1 3.2 2.4) (0.1 3.2 3.5) (0.1 1.2) (0.1 1.2) |\n:16 (1.1 3.2 2.5) (1.1 3.2 0.4) (3.1 3.2) (1.1 3.2) (3.1 3.2 0.4) (1.1 3.2 0.3) (1.1 3.2) (1.1 3.2) (1.1 3.2 0.3) (1.1 3.2 0.4) (1.1 3.2) (1.1 3.2) (3.1 3.2 0.4) (1.1 3.2 2.5) (3.1 3.2) (3.1 3.2) |"
  },
  {
    "number": 56,
    "title": "Giuliani 120 No. 56 — Op. 1 Part 3 (a+m - a+m+p - a+m+p - a+m - a+m - a+m+p)",
    "pattern": "a+m - a+m+p - a+m+p - a+m - a+m - a+m+p",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+m - a+m+p - a+m+p - a+m - a+m - a+m+p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 56)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 56\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 1.2) (0.1 1.2 3.5) (0.1 1.2 2.4) (0.1 3.2) (0.1 3.2) (0.1 1.2 2.4) (0.1 3.2 0.3) (0.1 1.2) (0.1 3.2) (0.1 3.2 0.3) (0.1 3.2 2.4) (0.1 1.2) (0.1 3.2) (0.1 3.2 2.4) (0.1 1.2 3.5) (0.1 1.2) |\n:16 (1.1 3.2) (3.1 3.2 2.5) (1.1 3.2 0.4) (3.1 3.2) (1.1 3.2) (3.1 3.2 0.4) (3.1 3.2 0.3) (1.1 3.2) (1.1 3.2) (1.1 3.2 0.3) (1.1 3.2 0.4) (1.1 3.2) (3.1 3.2) (3.1 3.2 0.4) (1.1 3.2 2.5) (3.1 3.2) |"
  },
  {
    "number": 57,
    "title": "Giuliani 120 No. 57 — Op. 1 Part 3 (a+m - a+m - a+m+p - a+m+p - a+m - a+m)",
    "pattern": "a+m - a+m - a+m+p - a+m+p - a+m - a+m",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+m - a+m - a+m+p - a+m+p - a+m - a+m] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 57)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 57\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 1.2) (0.1 1.2) (0.1 3.2 3.5) (0.1 3.2 2.4) (0.1 3.2) (0.1 1.2) (0.1 3.2 2.4) (0.1 1.2 0.3) (0.1 3.2) (0.1 3.2) (0.1 3.2 0.3) (0.1 3.2 2.4) (0.1 1.2) (0.1 3.2) (0.1 3.2 2.4) (0.1 3.2 3.5) |\n:16 (3.1 3.2) (1.1 3.2) (3.1 3.2 2.5) (1.1 3.2 0.4) (1.1 3.2) (3.1 3.2) (1.1 3.2 0.4) (1.1 3.2 0.3) (3.1 3.2) (3.1 3.2) (1.1 3.2 0.3) (1.1 3.2 0.4) (1.1 3.2) (1.1 3.2) (3.1 3.2 0.4) (1.1 3.2 2.5) |"
  },
  {
    "number": 58,
    "title": "Giuliani 120 No. 58 — Op. 1 Part 3 (a+m+p - a+m - a+m - a+m+p - a+m+p - a+m)",
    "pattern": "a+m+p - a+m - a+m - a+m+p - a+m+p - a+m",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+m+p - a+m - a+m - a+m+p - a+m+p - a+m] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 58)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 58\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 1.2 3.5) (0.1 1.2) (0.1 1.2) (0.1 3.2 3.5) (0.1 3.2 2.4) (0.1 1.2) (0.1 3.2) (0.1 1.2 2.4) (0.1 3.2 0.3) (0.1 1.2) (0.1 3.2) (0.1 3.2 0.3) (0.1 1.2 3.5) (0.1 3.2) (0.1 3.2) (0.1 3.2 3.5) |\n:16 (3.1 3.2 2.5) (3.1 3.2) (3.1 3.2) (3.1 3.2 2.5) (3.1 3.2 0.4) (2.1 3.2) (3.1 3.2) (3.1 3.2 0.4) (3.1 3.2 0.3) (1.1 3.2) (3.1 3.2) (3.1 3.2 0.3) (3.1 3.2 2.5) (3.1 3.2) (3.1 3.2) (1.1 3.2 2.5) |"
  },
  {
    "number": 59,
    "title": "Giuliani 120 No. 59 — Op. 1 Part 3 (a+m+p - a+m - a+m+p - a+m - a+m+p - a+m)",
    "pattern": "a+m+p - a+m - a+m+p - a+m - a+m+p - a+m",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+m+p - a+m - a+m+p - a+m - a+m+p - a+m] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 59)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 59\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 1.2 3.5) (0.1 1.2) (0.1 1.2 3.5) (0.1 3.2) (0.1 1.2 2.4) (0.1 1.2) (0.1 3.2 2.4) (0.1 1.2) (0.1 3.2 0.3) (0.1 3.2) (0.1 3.2 0.3) (0.1 3.2) (0.1 3.2 3.5) (0.1 1.2) (0.1 3.2 3.5) (0.1 3.2) |\n:16 (1.1 3.2 2.5) (3.1 3.2) (1.1 3.2 2.5) (3.1 3.2) (1.1 3.2 0.4) (1.1 3.2) (1.1 3.2 0.4) (3.1 3.2) (1.1 3.2 0.3) (3.1 3.2) (3.1 3.2 0.3) (3.1 3.2) (1.1 3.2 2.5) (3.1 3.2) (3.1 3.2 2.5) (1.1 3.2) |"
  },
  {
    "number": 60,
    "title": "Giuliani 120 No. 60 — Op. 1 Part 3 (a+m - a+m+p - a+m - a+m+p - a+m - a+m+p)",
    "pattern": "a+m - a+m+p - a+m - a+m+p - a+m - a+m+p",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+m - a+m+p - a+m - a+m+p - a+m - a+m+p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 60)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 60\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 3.2) (0.1 1.2 3.5) (0.1 3.2) (0.1 3.2 3.5) (0.1 3.2) (0.1 3.2 2.4) (0.1 1.2) (0.1 1.2 2.4) (0.1 3.2) (0.1 3.2 0.3) (0.1 1.2) (0.1 3.2 0.3) (0.1 1.2) (0.1 3.2 3.5) (0.1 3.2) (0.1 1.2 3.5) |\n:16 (3.1 3.2) (1.1 3.2 2.5) (3.1 3.2) (2.1 3.2 2.5) (3.1 3.2) (3.1 3.2 0.4) (3.1 3.2) (3.1 3.2 0.4) (3.1 3.2) (1.1 3.2 0.3) (1.1 3.2) (3.1 3.2 0.3) (1.1 3.2) (1.1 3.2 2.5) (3.1 3.2) (3.1 3.2 2.5) |"
  },
  {
    "number": 61,
    "title": "Giuliani 120 No. 61 — Op. 1 Part 3 (a+m+p - a+m+p - a+m+p - a+m - a+m+p - a+m+p)",
    "pattern": "a+m+p - a+m+p - a+m+p - a+m - a+m+p - a+m+p",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+m+p - a+m+p - a+m+p - a+m - a+m+p - a+m+p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 61)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 61\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (2.1 3.2 3.5) (2.1 3.2 3.5) (2.1 3.2 3.5) (2.1 3.2) (2.1 3.2 2.4) (2.1 3.2 2.4) (2.1 3.2 2.4) (2.1 3.2) (2.1 3.2 0.3) (2.1 3.2 0.3) (2.1 2.2 1.3) (2.1 3.2) (2.1 3.2 3.5) (2.1 3.2 3.5) (2.1 3.2 3.5) (2.1 3.2) |\n:16 (3.1 1.2 2.5) (3.1 1.2 2.5) (3.1 1.2 2.5) (3.1 1.2) (3.1 1.2 0.4) (3.1 1.2 0.4) (3.1 1.2 0.4) (3.1 1.2) (3.1 2.2 0.3) (3.1 2.2 0.3) (3.1 2.2 0.3) (3.1 1.2) (3.1 1.2 2.5) (3.1 1.2 2.5) (3.1 1.2 2.5) (3.1 1.2) |"
  },
  {
    "number": 62,
    "title": "Giuliani 120 No. 62 — Op. 1 Part 3 (a+m - a+m+p - a+m+p - a+m+p - a+m - a+m+p)",
    "pattern": "a+m - a+m+p - a+m+p - a+m+p - a+m - a+m+p",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+m - a+m+p - a+m+p - a+m+p - a+m - a+m+p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 62)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 62\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 1.2) (0.1 3.2 3.5) (0.1 1.2 3.5) (0.1 1.2 3.5) (0.1 1.2) (0.1 1.2 2.4) (0.1 1.2 2.4) (0.1 1.2 2.4) (0.1 1.2) (0.1 3.2 0.3) (0.1 3.2 0.3) (0.1 3.2 0.3) (0.1 1.2) (0.1 3.2 3.5) (0.1 1.2 3.5) (0.1 1.2 3.5) |\n:16 (3.1 3.2) (1.1 3.2 2.5) (1.1 3.2 2.5) (3.1 3.2 2.5) (3.1 3.2) (3.1 3.2 0.4) (3.1 3.2 0.4) (3.1 3.2 0.4) (1.1 3.2) (1.1 3.2 0.3) (3.1 3.2 0.3) (3.1 3.2 0.3) (3.1 3.2) (3.1 3.2 2.5) (3.1 3.2 2.5) (3.1 3.2 2.5) |"
  },
  {
    "number": 63,
    "title": "Giuliani 120 No. 63 — Op. 1 Part 3 (a+m+p - a+m - a+m+p - a+m+p - a+m+p - a+m)",
    "pattern": "a+m+p - a+m - a+m+p - a+m+p - a+m+p - a+m",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+m+p - a+m - a+m+p - a+m+p - a+m+p - a+m] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 63)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 63\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 1.2 3.5) (0.1 3.2) (0.1 1.2 3.5) (0.1 1.2 3.5) (0.1 1.2 2.4) (0.1 1.2) (0.1 1.2 2.4) (0.1 1.2 2.4) (0.1 3.2 0.3) (0.1 3.2) (0.1 3.2 0.3) (0.1 3.2 0.3) (0.1 1.2 3.5) (0.1 3.2) (0.1 1.2 3.5) (0.1 1.2 3.5) |\n:16 (3.1 3.2 2.5) (3.1 3.2) (3.1 3.2 2.5) (3.1 3.2 2.5) (3.1 3.2 0.4) (1.1 3.2) (3.1 3.2 0.4) (3.1 3.2 0.4) (3.1 3.2 0.3) (3.1 3.2) (1.1 3.2 0.3) (3.1 3.2 0.3) (3.1 3.2 2.5) (3.1 3.2) (1.1 3.2 2.5) (1.1 3.2 2.5) |"
  },
  {
    "number": 64,
    "title": "Giuliani 120 No. 64 — Op. 1 Part 3 (a+m+p - a+m+p - a+m - a+m+p - a+m+p - a+m+p)",
    "pattern": "a+m+p - a+m+p - a+m - a+m+p - a+m+p - a+m+p",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+m+p - a+m+p - a+m - a+m+p - a+m+p - a+m+p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 64)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 64\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 1.2 3.5) (0.1 3.2 3.5) (0.1 1.2) (0.1 1.2 3.5) (0.1 1.2 2.4) (0.1 1.2 2.4) (0.1 1.2) (0.1 3.2 2.4) (0.1 3.2 0.3) (0.1 3.2 0.3) (0.1 3.2) (0.1 3.2 0.3) (0.1 1.2 3.5) (0.1 3.2 3.5) (0.1 3.2) (0.1 3.2 3.5) |\n:16 (1.1 3.2 2.5) (1.1 3.2 2.5) (1.1 1.2) (3.1 3.2 2.5) (3.1 3.2 0.4) (1.1 3.2 0.4) (1.1 3.2) (3.1 3.2 0.4) (1.1 3.2 0.3) (1.1 3.2 0.3) (3.1 3.2) (1.1 3.2 0.3) (1.1 3.2 2.5) (1.1 3.2 2.5) (3.1 3.2) (1.1 3.2 2.5) |"
  },
  {
    "number": 65,
    "title": "Giuliani 120 No. 65 — Op. 1 Part 3 (a+m+p - a+m+p - a+m+p - a+m+p - a+m+p - a+m+p)",
    "pattern": "a+m+p - a+m+p - a+m+p - a+m+p - a+m+p - a+m+p",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+m+p - a+m+p - a+m+p - a+m+p - a+m+p - a+m+p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 65)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 65\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 1.2 3.5) (0.1 1.2 3.5) (0.1 1.2 3.5) (0.1 3.2 3.5) (0.1 3.2 3.5) (0.1 1.2 2.4) (0.1 3.2 0.3) (0.1 1.2 2.4) (0.1 3.2 3.5) (0.1 3.2 3.5) (0.1 1.2 3.5) (0.1 1.2 3.5) (0.1 3.2 3.5) (0.1 3.2 2.4) (0.1 1.2 0.3) (0.1 1.2 3.5) |\n:16 (3.1 3.2 2.5) (1.1 3.2 2.5) (3.1 3.2 2.5) (1.1 3.2 2.5) (3.1 3.2 2.5) (3.1 3.2 0.4) (1.1 3.2 0.3) (3.1 3.2 0.4) (1.1 3.2 2.5) (1.1 3.2 2.5) (1.1 3.2 2.5) (3.1 3.2 2.5) (3.1 3.2 2.5) (1.1 3.2 0.4) (3.1 3.2 0.3) (1.1 3.2 2.5) |"
  },
  {
    "number": 66,
    "title": "Giuliani 120 No. 66 — Op. 1 Part 3 (a+m+p - p - i - p - a+m+p - p)",
    "pattern": "a+m+p - p - i - p - a+m+p - p",
    "timeSignature": "4 4",
    "bpm": 90,
    "description": "[a+m+p - p - i - p - a+m+p - p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 66)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 66\"\n\\tempo 90\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8 (0.1 1.2 3.5) 2.4 0.3 2.4 (0.1 1.2 3.5) 2.4 0.3 3.5 |\n:8 (3.1 3.2 2.5) 0.4 0.3 0.4 (3.1 3.2 2.5) 0.4 0.3 2.5 |"
  },
  {
    "number": 67,
    "title": "Giuliani 120 No. 67 — Op. 1 Part 3 (p - a+m+p - i - p - p - a+m+p)",
    "pattern": "p - a+m+p - i - p - p - a+m+p",
    "timeSignature": "4 4",
    "bpm": 90,
    "description": "[p - a+m+p - i - p - p - a+m+p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 67)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 67\"\n\\tempo 90\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8 3.5 (0.1 1.2 2.4) 0.3 2.4 3.5 (0.1 3.2 2.4) 0.3 3.5 |\n:8 2.5 (1.1 3.2 0.4) 0.3 0.4 2.5 (1.1 3.2 0.4) 0.3 2.5 |"
  },
  {
    "number": 68,
    "title": "Giuliani 120 No. 68 — Op. 1 Part 3 (p - p - a+i+m - p - p - p)",
    "pattern": "p - p - a+i+m - p - p - p",
    "timeSignature": "4 4",
    "bpm": 90,
    "description": "[p - p - a+i+m - p - p - p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 68)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 68\"\n\\tempo 90\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8 3.5 2.4 (0.1 1.2 0.3) 2.4 3.5 2.4 (0.1 3.2 0.3) 3.5 |\n:8 2.5 0.4 (3.1 3.2 0.3) 0.4 2.5 0.4 (3.1 3.2 0.3) 2.5 |"
  },
  {
    "number": 69,
    "title": "Giuliani 120 No. 69 — Op. 1 Part 3 (p - p - i - a+m+p - p - p)",
    "pattern": "p - p - i - a+m+p - p - p",
    "timeSignature": "4 4",
    "bpm": 90,
    "description": "[p - p - i - a+m+p - p - p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 69)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 69\"\n\\tempo 90\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8 3.5 2.4 0.3 (0.1 3.2 2.4) 3.5 2.4 0.3 (0.1 3.2 3.5) |\n:8 2.5 0.4 0.3 (1.1 3.2 0.4) 2.5 0.4 0.3 (1.1 3.2 2.5) |"
  },
  {
    "number": 70,
    "title": "Giuliani 120 No. 70 — Op. 1 Part 3 (a+m+p - a+m+p - i - p - a+m+p - a+m+p)",
    "pattern": "a+m+p - a+m+p - i - p - a+m+p - a+m+p",
    "timeSignature": "4 4",
    "bpm": 90,
    "description": "[a+m+p - a+m+p - i - p - a+m+p - a+m+p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 70)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 70\"\n\\tempo 90\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8 (0.1 3.2 3.5) (0.1 3.2 2.4) 0.3 2.4 (0.1 1.2 3.5) (0.1 1.2 2.4) 0.3 3.5 |\n:8 (3.1 3.2 2.5) (1.1 3.2 0.4) 0.3 0.4 (3.1 3.2 2.5) (1.1 3.2 0.4) 0.3 2.5 |"
  },
  {
    "number": 71,
    "title": "Giuliani 120 No. 71 — Op. 1 Part 3 (p - a+m+p - a+i+m - p - p - a+m+p)",
    "pattern": "p - a+m+p - a+i+m - p - p - a+m+p",
    "timeSignature": "4 4",
    "bpm": 90,
    "description": "[p - a+m+p - a+i+m - p - p - a+m+p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 71)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 71\"\n\\tempo 90\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8 3.5 (0.1 1.2 2.4) (0.1 3.2 0.3) 2.4 3.5 (0.1 3.2 2.4) (0.1 3.2 0.3) 2.5 |\n:8 2.5 (3.1 3.2 0.4) (1.1 3.2 0.3) 0.4 2.5 (3.1 3.2 0.4) (3.1 3.2 0.3) 2.5 |"
  },
  {
    "number": 72,
    "title": "Giuliani 120 No. 72 — Op. 1 Part 3 (p - p - a+i+m - a+m+p - p - p)",
    "pattern": "p - p - a+i+m - a+m+p - p - p",
    "timeSignature": "4 4",
    "bpm": 90,
    "description": "[p - p - a+i+m - a+m+p - p - p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 72)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 72\"\n\\tempo 90\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8 3.5 2.4 (0.1 3.2 0.3) (0.1 1.2 2.4) 3.5 2.4 (0.1 3.2 0.3) (0.1 3.2 3.5) |\n:8 2.5 0.4 (3.1 3.2 0.3) (3.1 3.2 0.4) 2.5 0.4 (3.1 3.2 0.3) (1.1 3.2 2.5) |"
  },
  {
    "number": 73,
    "title": "Giuliani 120 No. 73 — Op. 1 Part 3 (a+m+p - p - i - a+m+p - a+m+p - p)",
    "pattern": "a+m+p - p - i - a+m+p - a+m+p - p",
    "timeSignature": "4 4",
    "bpm": 90,
    "description": "[a+m+p - p - i - a+m+p - a+m+p - p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 73)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 73\"\n\\tempo 90\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8 (0.1 1.2 3.5) 2.4 0.3 (0.1 1.2 2.4) (0.1 3.2 3.5) 2.4 0.3 (0.1 3.2 3.5) |\n:8 (3.1 3.2 2.5) 0.4 0.3 (3.1 3.2 0.4) (3.1 3.2 2.5) 0.4 0.3 (1.1 3.2 2.5) |"
  },
  {
    "number": 74,
    "title": "Giuliani 120 No. 74 — Op. 1 Part 3 (a+m+p - p - a+i+m - p - a+m+p - p)",
    "pattern": "a+m+p - p - a+i+m - p - a+m+p - p",
    "timeSignature": "4 4",
    "bpm": 90,
    "description": "[a+m+p - p - a+i+m - p - a+m+p - p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 74)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 74\"\n\\tempo 90\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8 (0.1 1.2 3.5) 2.4 (0.1 3.2 0.3) 2.4 (0.1 1.2 3.5) 2.4 (0.1 1.2 0.3) 3.5 |\n:8 (3.1 3.2 2.5) 0.4 (3.1 3.2 0.3) 0.4 (3.1 3.2 2.5) 0.4 (3.1 3.2 0.3) 2.5 |"
  },
  {
    "number": 75,
    "title": "Giuliani 120 No. 75 — Op. 1 Part 3 (p - a+m+p - i - a+m+p - p - a+m+p)",
    "pattern": "p - a+m+p - i - a+m+p - p - a+m+p",
    "timeSignature": "4 4",
    "bpm": 90,
    "description": "[p - a+m+p - i - a+m+p - p - a+m+p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 75)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 75\"\n\\tempo 90\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8 3.5 (0.1 3.2 2.4) 0.3 (0.1 3.2 2.4) 3.5 (0.1 3.2 2.4) 0.3 (0.1 1.2 3.5) |\n:8 2.5 (1.1 3.2 0.4) 0.3 (3.1 3.2 0.4) 2.5 (3.1 3.2 0.4) 0.3 (1.1 3.2 2.5) |"
  },
  {
    "number": 76,
    "title": "Giuliani 120 No. 76 — Op. 1 Part 3 (a+m+p - a+m+p - a+i+m - p - a+m+p - a+m+p)",
    "pattern": "a+m+p - a+m+p - a+i+m - p - a+m+p - a+m+p",
    "timeSignature": "4 4",
    "bpm": 90,
    "description": "[a+m+p - a+m+p - a+i+m - p - a+m+p - a+m+p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 76)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 76\"\n\\tempo 90\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8 (0.1 3.2 3.5) (0.1 3.2 2.4) (0.1 1.2 0.3) 2.4 (0.1 3.2 3.5) (0.1 3.2 2.4) (0.1 3.2 0.3) 3.5 |\n:8 (3.1 3.2 2.5) (1.1 3.2 0.4) (1.1 3.2 1.3) 0.4 (3.1 3.2 2.5) (3.1 3.2 0.4) (3.1 3.2 0.3) 2.5 |"
  },
  {
    "number": 77,
    "title": "Giuliani 120 No. 77 — Op. 1 Part 3 (p - a+m+p - a+i+m - a+m+p - p - a+m+p)",
    "pattern": "p - a+m+p - a+i+m - a+m+p - p - a+m+p",
    "timeSignature": "4 4",
    "bpm": 90,
    "description": "[p - a+m+p - a+i+m - a+m+p - p - a+m+p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 77)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 77\"\n\\tempo 90\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8 3.5 (0.1 3.2 2.4) (0.1 3.2 0.3) (0.1 3.2 2.4) 3.5 (0.1 3.2 2.4) (0.1 3.2 0.3) (0.1 3.2 3.5) |\n:8 2.5 (1.1 3.2 0.4) (3.1 3.2 0.3) (3.1 3.2 0.4) 2.5 (1.1 3.2 0.4) (3.1 3.2 0.3) (3.1 3.2 2.5) |"
  },
  {
    "number": 78,
    "title": "Giuliani 120 No. 78 — Op. 1 Part 3 (a+m+p - p - a+i+m - a+m+p - a+m+p - p)",
    "pattern": "a+m+p - p - a+i+m - a+m+p - a+m+p - p",
    "timeSignature": "4 4",
    "bpm": 90,
    "description": "[a+m+p - p - a+i+m - a+m+p - a+m+p - p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 78)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 78\"\n\\tempo 90\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8 (0.1 1.2 3.5) 2.4 (0.1 1.2 0.3) (0.1 1.2 2.4) (0.1 1.2 3.5) 2.4 (0.1 3.2 0.3) (0.1 3.2 3.5) |\n:8 (3.1 3.2 2.5) 0.4 (3.1 3.2 0.3) (3.1 3.2 0.4) (1.1 3.2 2.5) 0.4 (3.1 3.2 0.3) (1.1 3.2 2.5) |"
  },
  {
    "number": 79,
    "title": "Giuliani 120 No. 79 — Op. 1 Part 3 (a+m+p - a+m+p - i - a+m+p - a+m+p - a+m+p)",
    "pattern": "a+m+p - a+m+p - i - a+m+p - a+m+p - a+m+p",
    "timeSignature": "4 4",
    "bpm": 90,
    "description": "[a+m+p - a+m+p - i - a+m+p - a+m+p - a+m+p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 79)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 79\"\n\\tempo 90\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8 (0.1 3.2 3.5) (0.1 3.2 2.4) 0.3 (0.1 3.2 2.4) (0.1 3.2 3.5) (0.1 1.2 2.4) 0.3 (0.1 3.2 3.5) |\n:8 (1.1 3.2 2.5) (3.1 3.2 0.4) 0.3 (1.1 3.2 0.4) (3.1 3.2 2.5) (3.1 3.2 0.4) 0.3 (1.1 3.2 2.5) |"
  },
  {
    "number": 80,
    "title": "Giuliani 120 No. 80 — Op. 1 Part 3 (a+m+p - a+m+p - a+i+m - a+m+p - a+m+p - a+m+p)",
    "pattern": "a+m+p - a+m+p - a+i+m - a+m+p - a+m+p - a+m+p",
    "timeSignature": "4 4",
    "bpm": 90,
    "description": "[a+m+p - a+m+p - a+i+m - a+m+p - a+m+p - a+m+p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 80)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 80\"\n\\tempo 90\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8 (0.1 3.2 3.5) (0.1 3.2 2.4) (0.1 3.2 0.3) (0.1 3.2 2.4) (0.1 1.2 3.5) (0.1 1.2 2.4) (0.1 3.2 0.3) (0.1 1.2 3.5) |\n:8 (3.1 3.2 2.5) (1.1 3.2 0.4) (3.1 3.2 0.3) (1.1 3.2 0.4) (3.1 3.2 2.5) (1.1 3.2 0.4) (3.1 3.2 0.3) (1.1 3.2 2.5) |"
  },
  {
    "number": 81,
    "title": "Giuliani 120 No. 81 — Op. 1 Part 3 (p - m - a - m - p - m)",
    "pattern": "p - m - a - m - p - m",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - m - a - m - p - m] — Wide-interval arpeggio; bridges thumb foundation directly to outer treble fingers. (Op. 1 Pt. 3 No. 81)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 81\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 1.2 0.1 1.2 2.4 1.2 0.1 1.2 0.3 1.2 0.1 1.2 3.5 1.2 0.1 1.2 |\n:16 2.5 3.2 1.1 3.2 0.4 3.2 1.1 3.2 0.3 3.2 1.1 3.2 2.5 3.2 1.1 3.2 |"
  },
  {
    "number": 82,
    "title": "Giuliani 120 No. 82 — Op. 1 Part 3 (p - a - m - a - p - a)",
    "pattern": "p - a - m - a - p - a",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - a - m - a - p - a] — Inverted arpeggio flow; develops annular accent with medial balance on inner strings. (Op. 1 Pt. 3 No. 82)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 82\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.1 1.2 0.1 2.4 0.1 1.2 0.1 0.3 0.1 1.2 0.1 3.5 0.1 1.2 0.1 |\n:16 2.5 1.1 3.2 1.1 0.4 1.1 3.2 1.1 0.3 1.1 3.2 1.1 2.5 1.1 3.2 1.1 |"
  },
  {
    "number": 83,
    "title": "Giuliani 120 No. 83 — Op. 1 Part 3 (p - i - m - i - a+p - i)",
    "pattern": "p - i - m - i - a+p - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - m - i - a+p - i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 83)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 83\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.3 1.2 0.3 (2.4 0.1) 0.3 1.2 0.3 3.5 0.3 1.2 0.3 (0.1 2.4) 0.3 1.2 0.3 |\n:16 2.5 0.3 3.2 0.3 (1.1 0.4) 0.3 3.2 0.3 3.6 0.3 3.2 0.3 (1.1 2.5) 0.3 3.2 0.3 |"
  },
  {
    "number": 84,
    "title": "Giuliani 120 No. 84 — Op. 1 Part 3 (p - m - i - m - a+p - m)",
    "pattern": "p - m - i - m - a+p - m",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - m - i - m - a+p - m] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 84)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 84\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 1.2 0.3 1.2 (2.4 0.1) 1.2 0.3 1.2 3.5 1.2 0.3 1.2 (0.1 2.4) 1.2 0.3 1.2 |\n:16 2.5 3.2 0.3 3.2 (1.1 0.4) 3.2 0.3 3.2 3.6 3.2 0.3 3.2 (1.1 2.5) 3.2 0.3 3.2 |"
  },
  {
    "number": 85,
    "title": "Giuliani 120 No. 85 — Op. 1 Part 3 (p - i - a - i - p - i)",
    "pattern": "p - i - a - i - p - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - a - i - p - i] — Wide-interval arpeggio; bridges thumb foundation directly to outer treble fingers. (Op. 1 Pt. 3 No. 85)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 85\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.3 0.1 0.3 2.4 0.3 1.2 0.3 3.5 0.3 0.1 0.3 2.4 0.3 1.2 0.3 |\n:16 2.5 0.3 1.1 0.3 0.4 0.3 3.2 0.3 3.6 0.3 1.1 0.3 2.5 0.3 3.2 0.3 |"
  },
  {
    "number": 86,
    "title": "Giuliani 120 No. 86 — Op. 1 Part 3 (p - a - i - m - p - a)",
    "pattern": "p - a - i - m - p - a",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - a - i - m - p - a] — Alternating bass counterpoint; tests thumb agility traversing bass strings against treble figures. (Op. 1 Pt. 3 No. 86)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 86\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.1 0.3 1.2 2.4 0.1 0.3 1.2 3.5 0.1 0.3 1.2 2.4 0.1 0.3 1.2 |\n:16 2.5 1.1 0.3 3.2 0.4 1.1 0.3 3.2 3.6 1.1 0.3 3.2 0.4 1.1 0.3 3.2 |"
  },
  {
    "number": 87,
    "title": "Giuliani 120 No. 87 — Op. 1 Part 3 (p - i - m - a - p - i)",
    "pattern": "p - i - m - a - p - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - m - a - p - i] — Ascending 4-note sweep; cultivates fluid outward hand momentum and ringing annular melody. (Op. 1 Pt. 3 No. 87)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 87\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.3 1.2 0.1 2.4 0.3 1.2 0.1 3.5 0.3 1.2 0.1 2.4 0.3 1.2 0.1 |\n:16 2.5 0.3 3.2 1.1 0.4 0.3 3.2 1.1 3.6 0.3 3.2 1.1 2.5 0.3 3.2 1.1 |"
  },
  {
    "number": 88,
    "title": "Giuliani 120 No. 88 — Op. 1 Part 3 (p - a - m - i - p - a)",
    "pattern": "p - a - m - i - p - a",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - a - m - i - p - a] — Descending 4-note cascade; trains quick ring-finger initiation and smooth inward finger roll. (Op. 1 Pt. 3 No. 88)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 88\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.1 1.2 0.3 2.4 0.1 1.2 0.3 3.5 0.1 1.2 0.3 2.4 0.1 1.2 0.3 |\n:16 2.5 1.1 3.2 0.3 0.4 1.1 3.2 0.3 3.6 1.1 3.2 0.3 2.5 1.1 3.2 0.3 |"
  },
  {
    "number": 89,
    "title": "Giuliani 120 No. 89 — Op. 1 Part 3 (p - p - i - m - a - m)",
    "pattern": "p - p - i - m - a - m",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - p - i - m - a - m] — Alternating finger oscillation; sharpens independent knuckle articulation and rhythmic precision. (Op. 1 Pt. 3 No. 89)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 89\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 2.4 0.3 1.2 0.1 1.2 0.3 2.4 3.5 2.4 0.3 1.2 0.1 1.2 0.3 2.4 |\n:16 2.5 0.4 0.3 3.2 1.1 3.2 0.3 0.4 2.5 0.4 0.3 3.2 1.1 3.2 0.3 0.4 |"
  },
  {
    "number": 90,
    "title": "Giuliani 120 No. 90 — Op. 1 Part 3 (p - a - m - i - p - i)",
    "pattern": "p - a - m - i - p - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - a - m - i - p - i] — Descending 4-note cascade; trains quick ring-finger initiation and smooth inward finger roll. (Op. 1 Pt. 3 No. 90)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 90\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.1 1.2 0.3 2.4 0.3 1.2 0.1 3.5 0.1 1.2 0.3 2.4 0.3 1.2 0.1 |\n:16 2.5 1.1 3.2 0.3 0.4 0.3 3.2 1.1 3.6 1.1 3.2 0.3 2.5 0.3 3.2 1.1 |"
  },
  {
    "number": 91,
    "title": "Giuliani 120 No. 91 — Op. 1 Part 3 (p - m - a - m - i - m)",
    "pattern": "p - m - a - m - i - m",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - m - a - m - i - m] — Wide-interval arpeggio; bridges thumb foundation directly to outer treble fingers. (Op. 1 Pt. 3 No. 91)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 91\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 1.2 0.1 1.2 0.3 1.2 2.4 0.3 3.5 2.4 0.3 1.2 0.1 1.2 0.3 2.4 |\n:16 2.5 3.2 1.1 3.2 0.3 3.2 0.4 0.3 2.5 0.4 0.3 3.2 1.1 3.2 0.3 0.4 |"
  },
  {
    "number": 92,
    "title": "Giuliani 120 No. 92 — Op. 1 Part 3 (p - p - p - i - p - p)",
    "pattern": "p - p - p - i - p - p",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - p - p - i - p - p] — Virtuosic mixed pattern; combines complex multi-finger crossings, syncopated accents, and agility. (Op. 1 Pt. 3 No. 92)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 92\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.6 3.5 2.4 0.3 3.5 2.4 0.3 1.2 2.4 0.3 1.2 0.1 3.5 2.4 0.3 1.2 |\n:16 3.6 2.5 0.4 0.3 2.5 0.4 0.3 3.2 0.4 0.3 3.2 1.1 2.5 0.4 0.3 3.2 |"
  },
  {
    "number": 93,
    "title": "Giuliani 120 No. 93 — Op. 1 Part 3 (i - p - p - p - m - i)",
    "pattern": "i - p - p - p - m - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[i - p - p - p - m - i] — Virtuosic mixed pattern; combines complex multi-finger crossings, syncopated accents, and agility. (Op. 1 Pt. 3 No. 93)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 93\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 0.3 2.4 3.5 3.6 1.2 0.3 2.4 3.5 0.1 1.2 0.3 2.4 1.2 0.3 2.4 3.5 |\n:16 0.3 0.4 2.5 3.6 3.2 0.3 0.4 2.5 1.1 3.2 0.3 0.4 3.2 0.3 0.4 2.5 |"
  },
  {
    "number": 94,
    "title": "Giuliani 120 No. 94 — Op. 1 Part 3 (p - i - p - p - p - m)",
    "pattern": "p - i - p - p - p - m",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - p - p - p - m] — Virtuosic mixed pattern; combines complex multi-finger crossings, syncopated accents, and agility. (Op. 1 Pt. 3 No. 94)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 94\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.3 2.4 3.5 2.4 1.2 0.3 2.4 0.3 0.1 1.2 0.3 2.4 1.2 0.3 2.4 |\n:16 2.5 0.3 0.4 2.5 0.4 3.2 0.3 0.4 0.3 1.1 3.2 0.3 0.4 3.2 0.3 0.4 |"
  },
  {
    "number": 95,
    "title": "Giuliani 120 No. 95 — Op. 1 Part 3 (p - a - m - m - i - i)",
    "pattern": "p - a - m - m - i - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - a - m - m - i - i] — Finger repetition & stamina; develops rapid nail recovery and even tonal color on repeated strokes. (Op. 1 Pt. 3 No. 95)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 95\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.1 1.2 1.2 0.3 0.3 2.4 3.5 2.4 2.4 0.3 0.3 1.2 1.2 0.1 2.5 |\n:16 1.1 3.2 3.2 0.3 0.3 0.4 2.5 0.4 0.4 0.3 0.3 3.2 3.2 1.1 |"
  },
  {
    "number": 96,
    "title": "Giuliani 120 No. 96 — Op. 1 Part 3 (p - i - p - m - i - a)",
    "pattern": "p - i - p - m - i - a",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - p - m - i - a] — Virtuosic mixed pattern; combines complex multi-finger crossings, syncopated accents, and agility. (Op. 1 Pt. 3 No. 96)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 96\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.3 2.4 1.2 0.3 0.1 0.1 0.1 3.5 0.3 2.4 1.2 0.3 0.1 0.1 0.1 |\n:16 2.5 0.3 0.4 3.2 0.3 1.1 1.1 1.1 2.5 0.3 0.4 3.2 0.3 1.1 1.1 1.1 |"
  },
  {
    "number": 97,
    "title": "Giuliani 120 No. 97 — Op. 1 Part 3 (i - a - p - m - p - p)",
    "pattern": "i - a - p - m - p - p",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[i - a - p - m - p - p] — Virtuosic mixed pattern; combines complex multi-finger crossings, syncopated accents, and agility. (Op. 1 Pt. 3 No. 97)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 97\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 0.3 0.1 2.4 1.2 3.5 3.5 3.5 3.5 0.3 0.1 2.4 1.2 3.5 3.5 3.5 3.5 |\n:16 0.3 1.1 0.4 3.2 2.5 2.5 2.5 2.5 0.3 1.1 0.4 3.2 2.5 2.5 2.5 2.5 |"
  },
  {
    "number": 98,
    "title": "Giuliani 120 No. 98 — Op. 1 Part 3 (p - p - p - p - p - p)",
    "pattern": "p - p - p - p - p - p",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - p - p - p - p - p] — Virtuosic mixed pattern; combines complex multi-finger crossings, syncopated accents, and agility. (Op. 1 Pt. 3 No. 98)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 98\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 3.5 2.4 3.5 2.4 2.4 0.3 2.4 0.3 0.3 1.2 0.3 1.2 1.2 0.1 1.2 |\n:16 2.5 2.5 0.4 2.5 0.4 0.4 0.3 0.4 0.3 0.3 3.2 0.3 3.2 3.2 1.1 3.2 |"
  },
  {
    "number": 99,
    "title": "Giuliani 120 No. 99 — Op. 1 Part 3 (p - p - p - p - i - p)",
    "pattern": "p - p - p - p - i - p",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - p - p - p - i - p] — Virtuosic mixed pattern; combines complex multi-finger crossings, syncopated accents, and agility. (Op. 1 Pt. 3 No. 99)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 99\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 2.4 3.5 3.5 3.5 0.3 2.4 2.4 2.4 1.2 0.3 0.3 0.3 0.1 1.2 1.2 1.2 |\n:16 0.4 2.5 2.5 2.5 0.3 0.4 0.4 0.4 3.2 0.3 0.3 0.3 1.1 3.2 3.2 3.2 |"
  },
  {
    "number": 100,
    "title": "Giuliani 120 No. 100 — Op. 1 Part 3 (p - a - a - a - p - a)",
    "pattern": "p - a - a - a - p - a",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - a - a - a - p - a] — Finger repetition & stamina; develops rapid nail recovery and even tonal color on repeated strokes. (Op. 1 Pt. 3 No. 100)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 100\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.1 0.1 0.1 2.4 0.1 0.1 0.1 0.3 0.1 0.1 0.1 1.2 0.1 0.1 0.1 |\n:16 2.5 1.1 1.1 1.1 0.4 1.1 1.1 1.1 0.3 1.1 1.1 1.1 3.2 1.1 1.1 1.1 |"
  },
  {
    "number": 101,
    "title": "Giuliani 120 No. 101 — Op. 1 Part 3 (p - i - a - i - a - i)",
    "pattern": "p - i - a - i - a - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - a - i - a - i] — Wide-interval arpeggio; bridges thumb foundation directly to outer treble fingers. (Op. 1 Pt. 3 No. 101)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 101\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.3 0.1 0.3 3.1 0.3 0.1 0.3 1.2 0.3 2.4 0.3 0.4 0.3 3.5 0.3 |\n:16 2.5 0.3 1.1 0.3 3.1 0.3 1.1 0.3 3.2 0.3 3.6 0.3 0.5 0.3 2.5 0.3 |"
  },
  {
    "number": 102,
    "title": "Giuliani 120 No. 102 — Op. 1 Part 3 (p - i - m - i - a - i)",
    "pattern": "p - i - m - i - a - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - m - i - a - i] — Alternating finger oscillation; sharpens independent knuckle articulation and rhythmic precision. (Op. 1 Pt. 3 No. 102)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 102\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.3 1.2 0.3 0.1 0.3 1.2 0.3 3.5 0.3 0.4 0.3 2.4 0.3 3.5 0.3 |\n:16 3.6 0.3 0.2 0.3 1.1 0.3 0.2 0.3 3.6 0.3 0.5 0.3 2.5 0.3 3.6 0.3 |"
  },
  {
    "number": 103,
    "title": "Giuliani 120 No. 103 — Op. 1 Part 3 (p - i - m - i - a - i)",
    "pattern": "p - i - m - i - a - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - m - i - a - i] — Alternating finger oscillation; sharpens independent knuckle articulation and rhythmic precision. (Op. 1 Pt. 3 No. 103)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 103\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.3 1.2 0.3 0.1 0.3 3.2 0.3 1.2 0.3 2.5 0.3 2.4 0.3 3.5 0.3 |\n:16 3.6 0.3 0.2 0.3 1.1 0.3 0.1 0.3 3.2 0.3 3.6 0.3 2.5 0.3 3.6 0.3 |"
  },
  {
    "number": 104,
    "title": "Giuliani 120 No. 104 — Op. 1 Part 3 (p - i - p - i - p - i)",
    "pattern": "p - i - p - i - p - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - p - i - p - i] — Virtuosic mixed pattern; combines complex multi-finger crossings, syncopated accents, and agility. (Op. 1 Pt. 3 No. 104)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 104\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 2.5 0.3 0.4 0.3 2.4 0.3 3.1 0.3 0.1 0.3 (3.2 3.4) 0.3 (1.2 2.4) 0.3 (0.1 3.5) 0.3 |\n:16 2.5 0.3 2.5 0.3 0.4 0.3 1.1 0.3 3.2 0.3 (0.2 3.4) 0.3 (1.2 2.4) 0.3 (3.2 0.4) 0.3 |"
  },
  {
    "number": 105,
    "title": "Giuliani 120 No. 105 — Op. 1 Part 3 (p - i - a - i - m+p - i)",
    "pattern": "p - i - a - i - m+p - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - a - i - m+p - i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 105)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 105\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.3 0.1 0.3 (2.2 0.4) 0.3 (1.2 2.4) 0.3 3.5 0.3 0.1 0.3 (3.2 0.4) 0.3 (1.2 2.4) 0.3 |\n:16 2.5 0.3 1.1 0.3 (0.1 3.5) 0.3 (3.2 0.4) 0.3 2.5 0.3 1.1 0.3 (0.1 3.5) 0.3 (3.2 0.4) 0.3 |"
  },
  {
    "number": 106,
    "title": "Giuliani 120 No. 106 — Op. 1 Part 3 (a+p - i - p - i - m+p - i)",
    "pattern": "a+p - i - p - i - m+p - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+p - i - p - i - m+p - i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 106)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 106\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 3.5) 0.3 2.4 0.3 (1.2 3.5) 0.3 2.4 0.3 (0.1 3.5) 0.3 2.4 0.3 (1.2 3.5) 0.3 2.4 0.3 |\n:16 (1.1 2.5) 0.3 0.4 0.3 (2.5 3.2) 0.3 0.4 0.3 (1.1 2.5) 0.3 0.4 0.3 (2.5 3.2) 0.3 0.4 0.3 |"
  },
  {
    "number": 107,
    "title": "Giuliani 120 No. 107 — Op. 1 Part 3 (p - i - a+p - i - m+p - i)",
    "pattern": "p - i - a+p - i - m+p - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - a+p - i - m+p - i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 107)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 107\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.3 (0.1 2.4) 0.3 (0.2 3.5) 0.3 (1.2 2.4) 0.3 3.5 0.3 (0.1 2.4) 0.3 (0.2 3.5) 0.3 (1.2 2.4) 0.3 |\n:16 2.5 0.3 (1.1 0.4) 0.3 (2.2 2.5) 0.3 (0.4 3.2) 0.3 2.5 0.3 (1.1 0.4) 0.3 (2.2 2.5) 0.3 (3.2 0.4) 0.3 |"
  },
  {
    "number": 108,
    "title": "Giuliani 120 No. 108 — Op. 1 Part 3 (p - i - a+p - i - m+p - i)",
    "pattern": "p - i - a+p - i - m+p - i",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - a+p - i - m+p - i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 108)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 108\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 0.3 (0.1 2.4) 0.3 (3.2 3.5) 0.3 (1.2 2.4) 0.3 (0.2 3.5) 0.3 (1.2 2.4) 0.3 (3.2 3.5) 0.3 (0.1 2.4) 0.3 |\n:16 2.5 0.3 (1.1 0.4) 0.3 (0.1 2.5) 0.3 (3.2 0.4) 0.3 (2.2 2.5) 0.3 (3.2 0.4) 0.3 (0.1 2.5) 0.3 (1.1 0.4) 0.3 |"
  },
  {
    "number": 109,
    "title": "Giuliani 120 No. 109 — Op. 1 Part 3 (a+p - a - a+p - a - a+p - a)",
    "pattern": "a+p - a - a+p - a - a+p - a",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+p - a - a+p - a - a+p - a] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 109)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 109\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (3.1 3.5) 3.1 (2.4 3.1) 3.1 (3.1 0.4) 3.1 (3.1 3.5) 3.1 (3.1 2.5) 3.1 (3.1 3.5) 3.1 (3.1 0.4) 3.1 (3.1 2.4) 3.1 |\n:16 (3.1 2.4) 3.1 (3.1 0.4) 3.1 (2.5 3.1) 3.1 (3.1 3.6) 3.1 (3.1 0.5) 3.1 (3.1 3.5) 3.1 (2.5 3.1) 3.1 (3.1 0.4) 3.1 |"
  },
  {
    "number": 110,
    "title": "Giuliani 120 No. 110 — Op. 1 Part 3 (p - a - a - a - p - a)",
    "pattern": "p - a - a - a - p - a",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - a - a - a - p - a] — Finger repetition & stamina; develops rapid nail recovery and even tonal color on repeated strokes. (Op. 1 Pt. 3 No. 110)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 110\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 3.5 3.1 3.1 3.1 2.4 2.1 3.1 3.1 0.3 3.1 3.1 3.1 3.4 3.1 3.1 3.1 |\n:16 2.4 3.1 3.1 3.1 3.5 3.1 3.1 3.1 2.5 3.1 3.1 3.1 3.6 3.1 3.1 2.1 |"
  },
  {
    "number": 111,
    "title": "Giuliani 120 No. 111 — Op. 1 Part 3 (m+p - p - i - m+p - p - i)",
    "pattern": "m+p - p - i - m+p - p - i",
    "timeSignature": "4 4",
    "bpm": 84,
    "description": "[m+p - p - i - m+p - p - i] — Pinch coordination; balances simultaneous bass and treble attack followed by arpeggiated resolution. (Op. 1 Pt. 3 No. 111)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 111\"\n\\tempo 84\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} (1.2 3.5) 2.4 0.3 (2.5 2.2) 0.4 0.3 (0.1 3.5) 2.4 0.3 (1.2 3.5) (2.2 2.4) (0.1 0.3) |\n:8{tu 3} (1.1 2.5) 0.4 0.3 (0.1 3.5) 2.4 0.3 (2.2 2.5) 0.4 0.3 (2.5 3.1) (1.1 0.4) (3.2 0.3) |"
  },
  {
    "number": 112,
    "title": "Giuliani 120 No. 112 — Op. 1 Part 3 (a+m+p - i - p - a+m+p - i - p)",
    "pattern": "a+m+p - i - p - a+m+p - i - p",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+m+p - i - p - a+m+p - i - p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 112)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 112\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8{tu 3} (0.1 1.2 3.5) 0.3 3.4 (0.1 3.2 2.4) 0.3 3.5 (3.1 3.2 2.5) 0.4 3.5 (3.1 3.2 2.5) 0.4 3.6 |\n:16 (0.1 3.2 3.5) 0.3 3.4 (0.1 1.2) (1.1 1.2 2.4) 0.3 3.5 (0.1 1.2) (3.1 3.2 2.5) 0.4 3.5 (3.1 3.2) (1.1 3.2 2.5) 0.4 3.6 |"
  },
  {
    "number": 113,
    "title": "Giuliani 120 No. 113 — Op. 1 Part 3 (a+m+p - p - a+m+p - p - a+m+p - p)",
    "pattern": "a+m+p - p - a+m+p - p - a+m+p - p",
    "timeSignature": "4 4",
    "bpm": 90,
    "description": "[a+m+p - p - a+m+p - p - a+m+p - p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 113)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 113\"\n\\tempo 90\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8 (0.1 3.2 3.5) 2.4 (0.1 3.2 3.5) 2.5 (0.1 3.2 0.5) 3.5 (0.1 3.2 0.5) 3.6 |\n:8 (1.6 3.1 3.2) 0.4 (3.1 3.2 2.4) 3.4 (1.1 3.2 0.3) 3.6 (3.1 3.2 0.5) 2.5 |"
  },
  {
    "number": 114,
    "title": "Giuliani 120 No. 114 — Op. 1 Part 3 (a+m+p - p - p - a+m+p - a+m+p - p)",
    "pattern": "a+m+p - p - p - a+m+p - a+m+p - p",
    "timeSignature": "4 4",
    "bpm": 90,
    "description": "[a+m+p - p - p - a+m+p - a+m+p - p] — 3-finger chord block; trains thumb anchor stability with uniform attack from middle and ring fingers. (Op. 1 Pt. 3 No. 114)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 114\"\n\\tempo 90\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :8 (0.1 1.2 3.5) 0.4 2.4 (0.1 1.2 3.5) (0.1 1.2 0.5) 2.5 3.5 (0.1 3.2 0.5) |\n:8 (1.6 3.1 3.2) 3.6 0.5 (1.6 3.1 3.2) (3.1 3.2 3.6) 0.5 2.5 (3.1 3.2 3.6) |"
  },
  {
    "number": 115,
    "title": "Giuliani 120 No. 115 — Op. 1 Part 3 (a+i+m+p - a - m - i - p - p)",
    "pattern": "a+i+m+p - a - m - i - p - p",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+i+m+p - a - m - i - p - p] — Full 4-finger grasp; exercises simultaneous contact and balanced acoustic projection across all voices. (Op. 1 Pt. 3 No. 115)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 115\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 3.2 0.3 3.5) 0.1 1.2 0.3 2.4 3.5 (0.1 3.2 0.3 3.6) (0.1 1.2 0.3 3.5) 0.1 1.2 0.3 2.4 3.5 (0.1 3.2 0.3 3.6) (3.1 3.2 0.3 2.5) 1.1 |\n:8{tu 3} 3.2 0.3 0.4 2.5 (1.1 3.2 0.3 3.6) (3.1 3.2 0.3 2.5) 1.1 3.2 0.3 0.4 2.5 (1.1 3.2 0.3 3.6) |"
  },
  {
    "number": 116,
    "title": "Giuliani 120 No. 116 — Op. 1 Part 3 (a+i+m+p - p - i - m - a - p)",
    "pattern": "a+i+m+p - p - i - m - a - p",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+i+m+p - p - i - m - a - p] — Full 4-finger grasp; exercises simultaneous contact and balanced acoustic projection across all voices. (Op. 1 Pt. 3 No. 116)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 116\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16 (0.1 1.2 0.3 3.5) 3.5 0.3 1.2 0.1 2.4 (0.1 3.2 0.3 3.6) (0.1 1.2 0.3 3.5) 3.5 0.3 1.2 0.1 2.4 (0.1 3.2 0.3 3.6) (3.1 3.2 0.3 2.5) 2.5 |\n:8{tu 3} 0.3 3.2 1.1 0.4 (3.1 3.2 0.3 3.6) (3.1 3.2 0.3 2.5) 2.5 0.3 3.2 1.1 0.4 (1.1 3.2 0.3 3.6) |"
  },
  {
    "number": 117,
    "title": "Giuliani 120 No. 117 — Op. 1 Part 3 (p - i - m - a - p - p)",
    "pattern": "p - i - m - a - p - p",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[p - i - m - a - p - p] — Ascending 4-note sweep; cultivates fluid outward hand momentum and ringing annular melody. (Op. 1 Pt. 3 No. 117)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 117\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16{tu 3} 3.5 0.3 1.2 0.1 3.6 0.6 3.6 0.3 1.2 0.1 3.5 2.4 3.5 0.3 1.2 0.1 3.6 0.6 3.6 0.3 1.2 0.1 2.4 3.5 |\n:16{tu 3} 2.5 0.3 3.2 1.1 3.6 2.6 3.6 0.3 3.2 1.1 2.5 0.4 2.5 0.3 3.2 1.1 3.6 2.6 3.6 0.3 3.2 1.1 2.5 3.6 |"
  },
  {
    "number": 118,
    "title": "Giuliani 120 No. 118 — Op. 1 Part 3 (a - m - i - p - p - p)",
    "pattern": "a - m - i - p - p - p",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a - m - i - p - p - p] — Virtuosic mixed pattern; combines complex multi-finger crossings, syncopated accents, and agility. (Op. 1 Pt. 3 No. 118)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 118\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16{tu 3} 0.1 1.2 0.3 3.5 3.6 0.6 3.6 0.1 1.2 0.3 3.5 2.4 0.1 1.2 0.3 3.5 3.6 0.6 3.6 0.1 1.2 0.3 2.4 3.5 |\n:16{tu 3} 1.1 2.2 0.3 2.5 3.6 2.6 3.6 1.1 3.2 0.3 2.5 0.4 1.1 3.2 0.3 2.5 3.6 2.6 3.6 1.1 3.2 0.3 2.5 3.6 |"
  },
  {
    "number": 119,
    "title": "Giuliani 120 No. 119 — Op. 1 Part 3 (a+i+m+p - p - i - m - a - p)",
    "pattern": "a+i+m+p - p - i - m - a - p",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+i+m+p - p - i - m - a - p] — Full 4-finger grasp; exercises simultaneous contact and balanced acoustic projection across all voices. (Op. 1 Pt. 3 No. 119)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 119\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16{tu 3} (0.1 3.2 0.3 3.5) 2.4 0.3 1.2 0.1 3.5 2.4 0.3 1.2 3.6 3.5 2.4 0.3 (0.1 3.2 0.3 3.5) 2.4 0.3 1.2 0.1 3.5 2.4 0.3 1.2 3.6 3.5 2.4 0.3 (1.1 3.2 0.3 2.5) |\n:16{tu 3} 0.4 0.3 3.2 1.1 2.5 0.4 0.3 3.2 3.6 2.5 0.4 0.3 (3.1 3.2 0.3 2.5) 0.4 0.3 3.2 1.1 2.5 0.4 0.3 3.2 3.6 2.5 0.4 |"
  },
  {
    "number": 120,
    "title": "Giuliani 120 No. 120 — Op. 1 Part 3 (a+i+m+p - a - m - i - p - m)",
    "pattern": "a+i+m+p - a - m - i - p - m",
    "timeSignature": "4 4",
    "bpm": 76,
    "description": "[a+i+m+p - a - m - i - p - m] — Full 4-finger grasp; exercises simultaneous contact and balanced acoustic projection across all voices. (Op. 1 Pt. 3 No. 120)",
    "tex": "\\title \"Mauro Giuliani — Op. 1 Part 3\"\n\\subtitle \"Right Hand Exercise No. 120\"\n\\tempo 76\n\\tuning e4 b3 g3 d3 a2 e2\n.\n\\ts 4 4 :16{tu 3} (0.1 3.2 0.3 3.5) 0.1 1.2 0.3 2.4 1.2 0.3 2.4 3.5 0.3 2.4 2.5 3.6 (0.1 3.2 0.3 3.5) 0.1 1.2 0.3 2.4 1.2 0.3 2.4 3.5 0.3 2.4 3.5 3.6 (1.1 3.2 0.3 2.5) |\n:16{tu 3} 1.1 3.2 0.3 0.4 3.2 0.3 0.4 2.5 0.3 0.4 2.5 3.6 (3.1 3.2 0.3 2.5) 1.1 3.2 0.3 0.4 3.2 0.3 0.4 2.5 0.3 0.4 2.5 |"
  }
];

/**
 * Automatically enriches AlphaTex with classical right-hand fingering annotations:
 * String 1 -> {rf 4} (a - anular)
 * String 2 -> {rf 3} (m - medio)
 * String 3 -> {rf 2} (i - indice)
 * Strings 4, 5, 6 -> {rf 1} (p - pulgar)
 */
export function enrichTexWithRightHand(tex: string): string {
  return tex.replace(/(\b\d+\.([1-6]))(?![{a-zA-Z0-9])/g, (match, note, str) => {
    const s = parseInt(str, 10);
    let fingerNum = 1; // p
    if (s === 1) fingerNum = 4; // a
    else if (s === 2) fingerNum = 3; // m
    else if (s === 3) fingerNum = 2; // i
    else fingerNum = 1; // p (strings 4, 5, 6)
    return `${note}{rf ${fingerNum}}`;
  });
}

// Helper to convert GiulianiExercise to CuratedSong
export function giulianiToCuratedSong(ex: GiulianiExercise): CuratedSong {
  return {
    id: `giuliani-120-${ex.number}`,
    title: ex.title,
    artist: 'Mauro Giuliani (Op. 1 Pt. 3)',
    genre: 'Exercises',
    difficulty: ex.number <= 10 ? 'Beginner' : ex.number <= 60 ? 'Intermediate' : 'Advanced',
    tuning: 'Standard (E A D G B E)',
    defaultBpm: ex.bpm,
    description: ex.description,
    keyTechniques: [
      `Pattern: ${ex.pattern}`,
      'P-I-M-A Independence',
      'Right-Hand Balance',
      'Cadential Stability',
    ],
    tex: enrichTexWithRightHand(ex.tex),
  };
}

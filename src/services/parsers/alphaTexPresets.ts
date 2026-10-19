import { CuratedSong } from '../../types';

export const CURATED_LIBRARY: CuratedSong[] = [
  {
    id: 'bach-bourree',
    title: 'Bourrée in E Minor (BWV 996)',
    artist: 'Johann Sebastian Bach',
    genre: 'Classical',
    difficulty: 'Intermediate',
    tuning: 'Standard (E A D G B E)',
    defaultBpm: 92,
    description: 'Iconic classical lute suite movement transcribed for guitar. Builds polyphonic finger independence, bass thumb consistency, and elegant voice leading.',
    keyTechniques: ['Fingerstyle polyphony', 'P-I-M-A thumb/finger independence', 'Position shifts'],
    tex: `\\title "Bourrée in E Minor"
\\subtitle "BWV 996 - Deliberate Practice"
\\tempo 92
\\tuning e4 b3 g3 d3 a2 e2
.
\\ac :8 0.6 2.6 | 
(2.4 2.5).4 0.6.8 2.6.8 (0.3 2.4).4 0.3.8 2.3.8 | 
(0.2 2.4).4 (3.2 0.5).4 (2.2 0.4).4 (0.2 2.5).4 | 
(3.2 0.6).4 2.2.8 0.2.8 (2.2 2.5).4 0.2.8 2.2.8 | 
(0.2 2.4).2 (2.4 2.5).4 0.6.8 2.6.8 | 
(2.4 2.5).4 0.6.8 2.6.8 (0.3 2.4).4 0.3.8 2.3.8 | 
(0.2 2.4).4 (3.2 0.5).4 (2.2 0.4).4 (0.2 2.5).4 | 
(0.1 3.6).4 2.1.8 0.1.8 (2.1 0.4).4 (3.1 2.5).4 | 
(0.1 0.6).2 (2.4 2.5).4 |`,
  },
  {
    id: 'spanish-malaguena',
    title: 'Spanish Malagueña (Flamenco Classical)',
    artist: 'Traditional Flamenco Study',
    genre: 'Classical & Flamenco',
    difficulty: 'Intermediate',
    tuning: 'Standard (E A D G B E)',
    defaultBpm: 108,
    description: 'The definitive Spanish Flamenco study in E Phrygian. Features driving triplets, rasgueado accents, and the iconic Am - G - F - E harmonic cadence.',
    keyTechniques: ['Flamenco triplets', 'Thumb rest stroke (apoyando)', 'Free stroke (tirando)', 'Phrygian cadence'],
    tex: `\\title "Spanish Malagueña"
\\subtitle "Traditional Flamenco & Classical Study"
\\tempo 108
\\tuning e4 b3 g3 d3 a2 e2
.
\\ts 3 4 :8 0.1 0.1 0.1 0.1 0.1 0.1 | 
:8 3.1 1.1 0.1 3.2 1.2 0.2 | 
:8 2.3 0.3 3.4 2.4 0.4 3.5 | 
(0.6 2.5 2.4 1.3 0.2 0.1).2. :8 0.1 0.1 | 
:8 0.1 0.1 0.1 0.1 0.1 0.1 | 
:8 3.1 1.1 0.1 3.2 1.2 0.2 | 
:8 2.3 0.3 2.4 0.4 3.5 2.5 | 
(0.6 2.5 2.4 1.3 0.2 0.1).2. |`,
  },
  {
    id: 'rock-anthem-riff',
    title: 'Stadium Rock Riff & Groove',
    artist: 'Virtuoso Rock Workshop',
    genre: 'Rock',
    difficulty: 'Beginner',
    tuning: 'Standard (E A D G B E)',
    defaultBpm: 116,
    description: 'High-voltage classic hard rock power chords, tight syncopated rhythm accents, and blues pentatonic turnaround.',
    keyTechniques: ['Power chords (root-5th)', 'Palm muting (P.M.)', 'String muting', 'Accented upstrokes'],
    tex: `\\title "Stadium Rock Riff"
\\subtitle "Power Chord & Groove Workout"
\\tempo 116
.
:8 (0.6 2.5 2.4).4 (0.6 2.5 2.4).8 3.6.8 0.6.8 (0.6 2.5 2.4).8 3.6.8 0.6.8 | 
(3.6 5.5 5.4).4 (3.6 5.5 5.4).8 0.6.8 (5.6 7.5 7.4).4 (3.6 5.5 5.4).4 | 
(0.6 2.5 2.4).4 (0.6 2.5 2.4).8 3.6.8 0.6.8 (0.6 2.5 2.4).8 3.6.8 0.6.8 | 
5.3.8 7.3.8 5.3.8 7.4.8 5.4.8 7.5.8 (0.6 2.5 2.4).4 | 
(0.6 2.5 2.4).4 (0.6 2.5 2.4).8 3.6.8 0.6.8 (0.6 2.5 2.4).8 3.6.8 0.6.8 | 
(3.6 5.5 5.4).4 (3.6 5.5 5.4).8 0.6.8 (5.6 7.5 7.4).4 (3.6 5.5 5.4).4 | 
3.1.8 0.1.8 3.2.8 0.2.8 2.3.8 0.3.8 2.4.8 0.4.8 | 
(0.6 2.5 2.4).1 |`,
  },
  {
    id: 'metal-gallop-lead',
    title: 'Drop D Melodic Gallop & Maiden Lead',
    artist: 'Heavy Metal Masterclass',
    genre: 'Metal',
    difficulty: 'Advanced',
    tuning: 'Drop D (D A D G B E)',
    defaultBpm: 138,
    description: 'Relentless galloping palm-muted rhythm in Drop D paired with harmonized twin-guitar style sixteenth-note melodic hooks.',
    keyTechniques: ['Drop D tuning', 'Gallop rhythm (16th-16th-8th)', 'Alternate picking speed', 'Hammer-on / Pull-off'],
    tex: `\\title "Drop D Melodic Gallop"
\\subtitle "Thrash & Power Metal Speed Drill"
\\tempo 138
\\tuning e4 b3 g3 d3 a2 d2
.
:16 0.6 0.6 :8 0.6 :16 0.6 0.6 :8 0.6 :16 0.6 0.6 :8 0.6 :4 (3.6 3.5 3.4) | 
:16 0.6 0.6 :8 0.6 :16 0.6 0.6 :8 0.6 :16 0.6 0.6 :8 0.6 :4 (5.6 5.5 5.4) | 
:16 0.6 0.6 :8 0.6 :16 0.6 0.6 :8 0.6 :16 0.6 0.6 :8 0.6 :8 (3.6 3.5 3.4) (5.6 5.5 5.4) | 
:16 8.3 7.3 5.3 7.3 8.3 7.3 5.3 7.3 :2 (0.6 0.5 0.4) | 
:16 0.6 0.6 :8 0.6 :16 0.6 0.6 :8 0.6 :16 0.6 0.6 :8 0.6 :4 (3.6 3.5 3.4) | 
:16 0.6 0.6 :8 0.6 :16 0.6 0.6 :8 0.6 :16 0.6 0.6 :8 0.6 :4 (5.6 5.5 5.4) | 
:16 10.2 12.2 13.2 12.2 10.2 12.2 10.2 8.2 10.3 8.3 7.3 8.3 10.3 8.3 7.3 5.3 | 
:1 (0.6 0.5 0.4) |`,
  },
  {
    id: 'blues-texas-shuffle',
    title: 'Texas Blues Shuffle & Turnaround',
    artist: 'Stevie Ray Blues Workshop',
    genre: 'Blues',
    difficulty: 'Intermediate',
    tuning: 'Standard (E A D G B E)',
    defaultBpm: 104,
    description: 'Swung eighth-note blues shuffle groove with 5th to 6th interval stretch, quarter-tone bends, and classic E7 turnaround lick.',
    keyTechniques: ['Swung feel', 'Left-hand pinky stretch', 'Full step bends with vibrato', 'Blues turnaround'],
    tex: `\\title "Texas Blues Shuffle"
\\subtitle "Authentic 12-Bar Rhythm & Lick"
\\tempo 104
.
:8 (0.6 2.5).4 (0.6 4.5).4 (0.6 2.5).4 (0.6 4.5).4 | 
(0.6 2.5).4 (0.6 4.5).4 (0.6 5.5).4 (0.6 4.5).4 | 
(0.5 2.4).4 (0.5 4.4).4 (0.5 2.4).4 (0.5 4.4).4 | 
(0.6 2.5).4 (0.6 4.5).4 (0.6 2.5).4 (0.6 4.5).4 | 
(2.5 4.4).4 (2.5 6.4).4 (0.5 2.4).4 (0.5 4.4).4 | 
3.1.8 0.1.8 3.2.8 0.2.8 2.3.8 0.3.8 2.4.8 1.4.8 | 
0.4.8 2.5.8 1.5.8 0.5.8 (0.6 2.5 0.4 1.3 0.2 0.1).2 |`,
  },
  {
    id: 'neo-soul-groove',
    title: 'Neo-Soul Chord Melody & Embellishments',
    artist: 'Modern Soul Guitar Lab',
    genre: 'Jazz & Neo-Soul',
    difficulty: 'Intermediate',
    tuning: 'Standard (E A D G B E)',
    defaultBpm: 84,
    description: 'Lush 9th and 11th chord voicings decorated with subtle double-stop hammer-ons, slides, and thumb-over bass notes.',
    keyTechniques: ['Extended chords (Maj9, m9, 13)', 'Double-stop hammer-ons', 'Thumb-over fretting', 'Groove micro-timing'],
    tex: `\\title "Neo-Soul Chord Melody"
\\subtitle "Smooth Embellishments & Double Stops"
\\tempo 84
.
:8 (5.6 5.4 5.3 5.2).4 (5.4 5.3).8 7.4.8 (7.5 7.4 7.3 8.2).4 (7.4 7.3).4 | 
(3.6 3.4 3.3 3.2).4 5.3.8 3.3.8 (5.5 5.4 5.3 5.2).2 | 
(8.6 8.4 8.3 8.2).4 (8.4 8.3).8 10.4.8 (10.5 10.4 10.3 10.2).4 (10.4 10.3).4 | 
(5.6 5.4 5.3 5.2).4 7.2.8 5.2.8 (5.5 4.4 5.3 3.2).2 |`,
  },
  {
    id: 'spider-technique-drill',
    title: 'The Ultimate Spider & Finger Independence Drill',
    artist: 'Paganini / Petrucci Method',
    genre: 'Technique & Warmup',
    difficulty: 'Beginner',
    tuning: 'Standard (E A D G B E)',
    defaultBpm: 80,
    description: 'The foundational 1-2-3-4 chromatic coordination drill across all 6 strings. Synchronizes pick attack with fretting hand fingertip placement.',
    keyTechniques: ['Strict alternate picking', 'One finger per fret', 'Finger independence', 'Minimal hand motion'],
    tex: `\\title "The Ultimate Spider Drill"
\\subtitle "Finger Independence & Synchronicity"
\\tempo 80
.
:16 1.6 2.6 3.6 4.6 1.5 2.5 3.5 4.5 1.4 2.4 3.4 4.4 1.3 2.3 3.3 4.3 | 
1.2 2.2 3.2 4.2 1.1 2.1 3.1 4.1 4.1 3.1 2.1 1.1 4.2 3.2 2.2 1.2 | 
4.3 3.3 2.3 1.3 4.4 3.4 2.4 1.4 4.5 3.5 2.5 1.5 4.6 3.6 2.6 1.6 | 
2.6 3.6 4.6 5.6 2.5 3.5 4.5 5.5 2.4 3.4 4.4 5.4 2.3 3.3 4.3 5.3 | 
(1.6 3.5 3.4 2.3 1.2 1.1).1 |`,
  },
];

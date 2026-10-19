# Roadmap

These are proposed priorities, not delivery promises. See [known issues](KNOWN_ISSUES.md) for current limitations.

## First: dependable practice

- Make save failures visible and support library export/backup; consider IndexedDB for imported scores.
- Align browser and desktop import formats, size limits, and error reporting.
- Verify playback, pause/resume, loops, tempo changes, and exports against representative scores.
- Clearly distinguish self-reported repetitions, playback loops, and any future measured performance assessment.
- Complete desktop permission review, dependency review, asset provenance, and release documentation.

## Next: a stronger practice workflow

- Add a usable track mixer with mute, solo, and individual volume controls.
- Support named practice loops, persistent session history, and reliable progress recovery.
- Add overlapping transition drills and user-adjustable chunk boundaries.
- Improve keyboard navigation, screen-reader labels, responsive layouts, and loading/error states.
- Add targeted automated regression checks and documented manual audio/microphone checks.

## Later: optional assistance

- Consider whether optional local assistance improves the practice workflow before introducing an AI interface. Any future requests should be cancellable and respect explicit endpoint settings.
- Check generated scores for valid rhythms and preserve notes during fingering edits.
- Provide fingering suggestions that account for chords, stretches, tunings, and position changes.
- Explore performance feedback with clear accuracy limits and explicit microphone controls.

The core practice workflow should remain useful without running a local language model. Contributions should favor clear, dependable behavior over expanding advertised feature counts.

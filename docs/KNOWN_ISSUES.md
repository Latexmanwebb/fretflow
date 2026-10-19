# Known issues and verification limits

FretFlow is an early alpha. This list records findings from the supplied source snapshot; it is not a complete runtime test report. Publication cleanup removed four unused legacy AI files that referenced deleted types; active application behavior was not changed.

## Import and export

- MIDI import is inconsistent: browser import explicitly rejects MIDI, while the native desktop dialog forwards it to the notation loader. Treat MIDI import as unsupported until it has an end-to-end test.
- Native MuseScore files are not reliably supported. The browser path detects native MuseScore XML and asks for a MusicXML export; the desktop path does not apply that same check. Export MusicXML from MuseScore first.
- The desktop file dialog lists audio formats that have no corresponding import implementation.
- Import success messages can appear before the notation renderer confirms the score loaded successfully.
- Browser import limits files to 20 MB; the native desktop dialog allows 25 MB.
- Available exports are print/PDF, Guitar Pro, MIDI, and AlphaTex. Audio and MusicXML export are not implemented in the current exporter.

## Saving and practice

- Imported scores use localStorage. Storage failures are logged without a visible save failure, and saving a new entry limits the library to the newest 30 entries. Keep your original score files; the app is not a backup.
- Automatic repetition counting follows playback loops. It does not assess whether your playing was accurate or clean.
- Practice chunks are sequential blocks of approximately two bars, with a short final remainder absorbed. Phrase recognition and overlapping chunk chains are not implemented.
- Internal track mute, solo, and volume functions are not connected to a complete user-facing mixer.

## AI and desktop

- The latest interface does not include an AI tutor. Legacy AI modules were removed to restore the source build.
- The Electron media permission handler automatically permits media requests without checking the requested audio/video type or originating URL.
- The explicit desktop packaging command targets Apple Silicon. Intel Mac support and distribution signing/notarization require separate verification.

## Before calling a release verified

The CI workflow compiles TypeScript and builds the web bundle only. Verify score rendering, playback, looping, tempo changes, import/export round trips, save/reopen behavior, microphone permission denial and approval, offline operation, and the actual packaged macOS app separately. Record the tested app version, macOS version, and hardware.

SoundFont files and their license notice match the pinned alphaTab package byte-for-byte; see [asset provenance](ASSET_PROVENANCE.md). Logo origins and score-edition provenance remain unverified by this technical review. The supplied macOS ZIP fails strict signature verification; do not call it a verified desktop release.

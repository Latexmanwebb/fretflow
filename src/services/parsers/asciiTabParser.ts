/**
 * Converts Plain Text / ASCII Guitar Tabs into AlphaTex notation
 */
export function parseAsciiTabToAlphaTex(rawText: string, songTitle = 'Imported Practice Tab', bpm = 120): string {
  const lines = rawText.split(/\r?\n/).map((l) => l.trimEnd());
  
  // Find lines that represent guitar strings (e|---, B|---, G|---, D|---, A|---, E|--- or 1|--- etc)
  const stringRegex = /^([eEbBgGdDaA1-6])\s*[|:]\s*([0-9\-|/\\hpbsr~xX\s]+)/;

  const systems: { stringName: string; content: string }[][] = [];
  let currentSystem: { stringName: string; content: string }[] = [];

  for (const line of lines) {
    const match = line.match(stringRegex);
    if (match) {
      currentSystem.push({
        stringName: match[1],
        content: match[2],
      });
      if (currentSystem.length === 6) {
        systems.push([...currentSystem]);
        currentSystem = [];
      }
    } else if (currentSystem.length > 0 && currentSystem.length < 6 && line.trim() === '') {
      // blank line might interrupt an incomplete system
      currentSystem = [];
    }
  }

  if (currentSystem.length >= 4) {
    // If there were only 4 strings (e.g. Bass or 4-string tab) or incomplete 6-string
    systems.push([...currentSystem]);
  }

  if (systems.length === 0) {
    throw new Error('No valid guitar tablature lines (e.g. e|---, B|---) found in input.');
  }

  // Standard string mapping from top to bottom (index 0 = string 1 (high E), index 5 = string 6 (low E))
  let alphaTexBody = '';

  for (const system of systems) {
    const numStrings = system.length;
    // Length of the tab segment (minimum of string content lengths)
    const minLength = Math.min(...system.map((s) => s.content.length));

    // Column by column parsing
    let col = 0;
    while (col < minLength) {
      const charAtCol0 = system[0].content[col];

      // Check if this column is a bar separator '|'
      if (charAtCol0 === '|') {
        if (alphaTexBody.trim().length > 0 && !alphaTexBody.trim().endsWith('|')) {
          alphaTexBody += ' | ';
        }
        col++;
        continue;
      }

      // Check if any string has a note at this column
      const notesAtCol: { fret: number; stringNum: number }[] = [];

      for (let sIdx = 0; sIdx < numStrings; sIdx++) {
        const rawContent = system[sIdx].content;
        const char = rawContent[col];
        
        // Check if character is a digit
        if (char >= '0' && char <= '9') {
          let fretStr = char;
          // Check for 2-digit fret (e.g. 12, 14, 15)
          if (col + 1 < rawContent.length && rawContent[col + 1] >= '0' && rawContent[col + 1] <= '9') {
            fretStr += rawContent[col + 1];
          }
          const fret = parseInt(fretStr, 10);
          const stringNum = sIdx + 1; // 1 = highest string, 6 = lowest
          notesAtCol.push({ fret, stringNum });
        }
      }

      if (notesAtCol.length > 0) {
        // We found notes on this beat
        if (notesAtCol.length === 1) {
          const n = notesAtCol[0];
          alphaTexBody += `${n.fret}.${n.stringNum}.8 `;
        } else {
          // Chord
          const chordNotes = notesAtCol.map((n) => `${n.fret}.${n.stringNum}`).join(' ');
          alphaTexBody += `(${chordNotes}).8 `;
        }
        // If we read a 2-digit fret, skip next col
        const hasDoubleDigit = notesAtCol.some((n) => n.fret >= 10);
        col += hasDoubleDigit ? 2 : 1;
      } else {
        col++;
      }
    }
  }

  if (!alphaTexBody.trim()) {
    alphaTexBody = '0.6 2.6 3.6 5.6 | 0.5 2.5 3.5 5.5';
  }

  return `\\title "${songTitle}"
\\subtitle "Deliberate Practice Session"
\\tempo ${bpm}
.
${alphaTexBody} |`;
}

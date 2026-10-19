import JSZip from 'jszip';

/**
 * Extracts and parses MuseScore (.mscz and .mscx) score files
 */
export async function parseMuseScoreFile(buffer: ArrayBuffer, fileName: string): Promise<{ data: Uint8Array | string; isXml: boolean }> {
  const ext = fileName.split('.').pop()?.toLowerCase();

  if (ext === 'mscz') {
    const zip = await JSZip.loadAsync(buffer);
    
    // Look for MusicXML or .mscx inside the zip archive
    let xmlContent: string | null = null;
    let fallbackUint8: Uint8Array | null = null;

    // Search for MusicXML files first
    for (const [relativePath, zipEntry] of Object.entries(zip.files)) {
      if (zipEntry.dir) continue;
      const lower = relativePath.toLowerCase();

      if (lower.endsWith('.musicxml') || lower.endsWith('.xml')) {
        xmlContent = await zipEntry.async('string');
        break;
      } else if (lower.endsWith('.mscx')) {
        xmlContent = await zipEntry.async('string');
      }
    }

    if (xmlContent) {
      return { data: xmlContent, isXml: true };
    }

    // Fallback: return raw bytes
    return { data: new Uint8Array(buffer), isXml: false };
  } else if (ext === 'mscx') {
    // Plain text XML file
    const decoder = new TextDecoder('utf-8');
    const xml = decoder.decode(buffer);
    return { data: xml, isXml: true };
  }

  return { data: new Uint8Array(buffer), isXml: false };
}

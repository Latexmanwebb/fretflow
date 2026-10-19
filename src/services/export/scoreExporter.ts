import * as alphaTab from '@coderline/alphatab';

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export type ExportFormat = 'pdf' | 'gp' | 'midi' | 'alphatex';

export function exportScore(
  api: alphaTab.AlphaTabApi | null,
  format: ExportFormat,
  title = 'FretFlow_Score'
) {
  const cleanTitle = title.replace(/[^a-zA-Z0-9_-]/g, '_');

  if (!api) {
    alert('Please wait for notation to finish loading before exporting.');
    return;
  }

  switch (format) {
    case 'pdf': {
      // Native AlphaTab SVG print to vector PDF
      try {
        api.print();
      } catch (err) {
        window.print();
      }
      break;
    }

    case 'gp': {
      // Binary Guitar Pro 7 Export
      try {
        if (!api.score) throw new Error('Score not loaded');
        const exporter = new alphaTab.exporter.Gp7Exporter();
        const bytes = exporter.export(api.score, api.settings);
        const blob = new Blob([bytes as any], { type: 'application/octet-stream' });
        downloadBlob(blob, `${cleanTitle}.gp`);
      } catch (err) {
        console.error('GP export failed:', err);
        alert('Could not export Guitar Pro binary for this piece.');
      }
      break;
    }

    case 'midi': {
      try {
        api.downloadMidi();
      } catch (err) {
        console.error('MIDI export failed:', err);
        alert('Could not generate MIDI download.');
      }
      break;
    }

    case 'alphatex': {
      try {
        if (!api.score) throw new Error('Score not loaded');
        const texExporter = new alphaTab.exporter.AlphaTexExporter();
        const tex = texExporter.export(api.score, api.settings);
        const blob = new Blob([tex as any], { type: 'text/plain;charset=utf-8' });
        downloadBlob(blob, `${cleanTitle}.tex`);
      } catch (err) {
        console.error('AlphaTex export failed:', err);
        alert('Could not export AlphaTex markup.');
      }
      break;
    }
  }
}

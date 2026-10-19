// Sign outside cloud-synced folders: Finder metadata can invalidate app signatures.
const { mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { createHash } = require('node:crypto');

if (process.platform !== 'darwin') throw new Error('Build the Mac app on macOS.');
const root = path.resolve(__dirname, '..');
const { version } = require('../package.json');
const staging = mkdtempSync(path.join(tmpdir(), 'fretflow-build-'));
const release = path.join(root, 'release');
const filename = `FretFlow-${version}-mac-arm64.zip`;
const archive = path.join(release, filename);
const run = (command, args) => execFileSync(command, args, { cwd: root, stdio: 'inherit' });

try {
  run(process.execPath, [require.resolve('electron-builder/cli.js'), '--mac', 'dir', '--arm64',
    `--config.directories.output=${staging}`]);
  const app = path.join(staging, 'mac-arm64', 'FretFlow.app');
  run('/usr/bin/codesign', ['--verify', '--deep', '--strict', '--verbose=2', app]);
  mkdirSync(release, { recursive: true });
  run('/usr/bin/ditto', ['-c', '-k', '--sequesterRsrc', '--keepParent', app, archive]);
  // Verify the delivered ZIP, not just the build directory.
  const readback = path.join(staging, 'readback');
  run('/usr/bin/ditto', ['-x', '-k', archive, readback]);
  run('/usr/bin/codesign', ['--verify', '--deep', '--strict', '--verbose=2', path.join(readback, 'FretFlow.app')]);
  const hash = createHash('sha256').update(readFileSync(archive)).digest('hex');
  writeFileSync(`${archive}.sha256`, `${hash}  ${filename}\n`);
  console.log(`\nCreated ${archive}\nAd hoc signed for local testing; not Apple notarized.`);
} finally {
  rmSync(staging, { recursive: true, force: true });
}

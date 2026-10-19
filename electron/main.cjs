const { app, BrowserWindow, ipcMain, dialog, shell, session, systemPreferences } = require('electron');
const path = require('path');
const { pathToFileURL } = require('url');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1080,
    minHeight: 720,
    title: 'FretFlow',
    backgroundColor: '#0f172a',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true
    }
  });

  const devUrl = 'http://localhost:5173';
  const prodPath = path.join(__dirname, '../dist/index.html');
  const isDev = !app.isPackaged && (process.env.VITE_DEV_SERVER_URL || process.argv.includes('--dev'));
  const trustedUrl = isDev ? `${devUrl}/` : pathToFileURL(prodPath).href;
  const isTrustedFrame = (contents, details) => contents === mainWindow?.webContents &&
    details.isMainFrame && details.requestingUrl === trustedUrl;

  // Only the app's own tuner can request audio; camera and remote frames are denied.
  session.defaultSession.setPermissionCheckHandler((contents, permission, origin, details) =>
    permission === 'media' && details.mediaType === 'audio' && isTrustedFrame(contents, details));
  session.defaultSession.setPermissionRequestHandler(async (contents, permission, callback, details) => {
    if (permission !== 'media' || !isTrustedFrame(contents, details) ||
        !details.mediaTypes?.length || details.mediaTypes.some(type => type !== 'audio')) {
      callback(false);
      return;
    }
    try {
      callback(process.platform !== 'darwin' || await systemPreferences.askForMediaAccess('microphone'));
    } catch {
      callback(false);
    }
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (url !== trustedUrl) event.preventDefault();
  });

  if (isDev) {
    mainWindow.loadURL(devUrl);
  } else {
    // Check if dist/index.html exists
    const fs = require('fs');
    if (fs.existsSync(prodPath)) {
      mainWindow.loadFile(prodPath);
    } else {
      dialog.showErrorBox('FretFlow could not start', 'The bundled web app is missing. Rebuild with npm run desktop:dist.');
      app.quit();
    }
  }

  // Open validated external links in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    try {
      const parsed = new URL(url);
      if (['http:', 'https:'].includes(parsed.protocol)) {
        shell.openExternal(url);
      }
    } catch {
      // ignore
    }
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC: Native File Dialog for MuseScore / Guitar Pro / MusicXML
ipcMain.handle('dialog:openTabFile', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'All Supported Formats', extensions: ['mscz', 'mscx', 'gp', 'gp3', 'gp4', 'gp5', 'gpx', 'xml', 'musicxml', 'mid', 'midi', 'txt'] },
      { name: 'MuseScore Files', extensions: ['mscz', 'mscx'] },
      { name: 'Guitar Pro Files', extensions: ['gp', 'gp3', 'gp4', 'gp5', 'gpx'] },
      { name: 'MusicXML', extensions: ['xml', 'musicxml'] },
      { name: 'MIDI / Audio', extensions: ['mid', 'midi', 'mp3', 'wav', 'ogg'] },
      { name: 'Text / ASCII Tabs', extensions: ['txt'] }
    ]
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  const filePath = result.filePaths[0];
  const fs = require('fs');
  const stat = fs.statSync(filePath);
  if (stat.size > 25 * 1024 * 1024) {
    throw new Error('Selected score file exceeds 25MB limit.');
  }
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();

  return {
    name: path.basename(filePath),
    path: filePath,
    extension: ext,
    data: new Uint8Array(buffer)
  };
});


app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

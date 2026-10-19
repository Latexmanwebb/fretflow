const { app, BrowserWindow } = require('electron');

app.whenReady().then(async () => {
  const win = new BrowserWindow({ show: false, width: 1400, height: 900 });
  
  win.webContents.on('console-message', (e, level, message) => {
    console.log('[BROWSER CONSOLE]', message);
  });

  await win.loadURL('http://localhost:5173/');
  await new Promise((r) => setTimeout(r, 2500));

  const diag = await win.webContents.executeJavaScript(`
    (async () => {
      const api = window.__alphaTabApi;
      if (!api) return { error: 'No __alphaTabApi on window' };
      
      const player = api._player;
      const instance = player ? player._instance : null;
      
      const infoBefore = {
        isReadyForPlayback: api.isReadyForPlayback,
        playerState: api.playerState,
        hasPlayer: !!player,
        hasInstance: !!instance,
        instanceIsReady: instance ? instance.isReady : null,
        instanceIsSoundFontLoaded: instance ? instance.isSoundFontLoaded : null,
        instanceIsMidiLoaded: instance ? instance._isMidiLoaded : null,
        hasMidiEvents: api.score ? api.score.masterBars.length : 0,
      };

      // Try calling play() directly
      let playResult = 'called';
      try {
        api.playPause();
      } catch (err) {
        playResult = 'ERROR: ' + err.message;
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const infoAfter = {
        isReadyForPlayback: api.isReadyForPlayback,
        playerState: api.playerState,
        tickPosition: api.tickPosition,
        timePosition: api.timePosition,
        playResult
      };

      return { infoBefore, infoAfter };
    })()
  `);

  console.log('[DIAGNOSTIC REPORT]:', JSON.stringify(diag, null, 2));
  app.quit();
  process.exit(0);
});

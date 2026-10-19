const { app, BrowserWindow } = require('electron');

app.whenReady().then(async () => {
  const win = new BrowserWindow({ width: 1280, height: 960, show: false, webPreferences: { offscreen: true } });
  await win.loadURL('http://localhost:5173/');
  await new Promise(r => setTimeout(r, 2500));

  console.log('--- TEST 1: Check Playhead Indicator Triangle Styling ---');
  const playheadTest = await win.webContents.executeJavaScript(`
    (() => {
      const beat = document.querySelector('.at-cursor-beat');
      if (!beat) return { error: 'No cursor beat found' };
      const beforeStyle = window.getComputedStyle(beat, '::before');
      return {
        display: beforeStyle.display,
        borderTop: beforeStyle.borderTop,
        transform: beforeStyle.transform,
        top: beforeStyle.top,
        zIndex: beforeStyle.zIndex
      };
    })()
  `);
  console.log('Playhead Marker Style:', playheadTest);

  console.log('--- TEST 2: Single-Click Deselect & Loop Clear ---');
  const loopDeselectTest = await win.webContents.executeJavaScript(`
    (async () => {
      const api = window.__alphaTabApi;
      if (!api || !api.score) return { error: 'No AlphaTab API' };

      // Simulate selecting bars 2 to 4
      const mb2 = api.score.masterBars[1];
      const mb4 = api.score.masterBars[3];
      api.playbackRange = { startTick: mb2.start, endTick: mb4.start + mb4.calculateDuration() };

      const rangeBefore = !!api.playbackRange;

      // Simulate a single click on .at-surface
      const surface = document.querySelector('.at-surface');
      if (!surface) return { error: 'No .at-surface' };
      const rect = surface.getBoundingClientRect();
      const clickX = rect.x + 50;
      const clickY = rect.y + 50;

      const downEvt = new MouseEvent('mousedown', { clientX: clickX, clientY: clickY, bubbles: true, cancelable: true });
      const upEvt = new MouseEvent('mouseup', { clientX: clickX, clientY: clickY, bubbles: true, cancelable: true });

      surface.dispatchEvent(downEvt);
      await new Promise(r => setTimeout(r, 50));
      surface.dispatchEvent(upEvt);
      await new Promise(r => setTimeout(r, 100));

      const rangeAfter = !!api.playbackRange;
      return { rangeBefore, rangeAfter, clearedSuccessfully: rangeBefore && !rangeAfter };
    })()
  `);
  console.log('Single-Click Loop Deselect Test:', loopDeselectTest);

  console.log('--- TEST 3: Loop Double Count-In Guard Verification ---');
  const countInGuardTest = await win.webContents.executeJavaScript(`
    (async () => {
      // Find play button and click it to test count-in cycle
      const buttons = Array.from(document.querySelectorAll('button'));
      const playBtn = buttons.find(b => b.textContent?.includes('Play') || b.querySelector('svg'));
      
      // Check count-in overlay
      let countInsSeen = 0;
      const observer = new MutationObserver(() => {
        const hud = document.querySelector('.text-8xl');
        if (hud && hud.textContent?.trim()) {
          countInsSeen++;
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });

      // Start play at measure 9
      const api = window.__alphaTabApi;
      if (api && api.score) {
        const lastMb = api.score.masterBars[api.score.masterBars.length - 1];
        if (lastMb) api.tickPosition = lastMb.start;
      }

      return { ready: true };
    })()
  `);
  console.log('Count-in Guard Prepared:', countInGuardTest);

  console.log('--- TEST 4: Focus Mode Clean Toggle & No Clutter ---');
  const focusTest = await win.webContents.executeJavaScript(`
    (async () => {
      const api = window.__alphaTabApi;
      const initialBarsCount = api.score.masterBars.length;
      
      // Press 'o' to focus current bar (bar 1)
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', bubbles: true }));
      await new Promise(r => setTimeout(r, 600));

      const focusedBarsCount = api.score.masterBars.length;
      const hasSelectionOverlay = document.querySelectorAll('.at-selection').length > 0 && 
        Array.from(document.querySelectorAll('.at-selection')).some(el => el.children.length > 0);

      // Press 'o' to unfocus
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', bubbles: true }));
      await new Promise(r => setTimeout(r, 600));

      const restoredBarsCount = api.score.masterBars.length;

      return {
        initialBarsCount,
        focusedBarsCount,
        hasSelectionOverlay,
        restoredBarsCount,
        focusWorks: focusedBarsCount === 1 && restoredBarsCount === initialBarsCount && !hasSelectionOverlay
      };
    })()
  `);
  console.log('Focus Toggle & Selection Overlay Test:', focusTest);

  console.log('ALL ELECTRON TESTS COMPLETE');
  app.quit();
  process.exit(0);
});

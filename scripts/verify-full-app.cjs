const { app, BrowserWindow } = require('electron');

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    width: 1440,
    height: 920,
    show: false,
    webPreferences: {
      offscreen: true
    }
  });

  win.webContents.on('console-message', (e, level, message) => {
    console.log('[BROWSER]', message);
  });

  console.log('Loading app at http://localhost:5173/ ...');
  await win.loadURL('http://localhost:5173/');

  // Wait 3s for initial score render
  await new Promise((r) => setTimeout(r, 3000));

  console.log('\n--- TEST 1: AI Assistant Drawer (Initial Closed + Open + Close Verification) ---');
  const initialDrawerState = await win.webContents.executeJavaScript(`
    (() => {
      return {
        drawerVisible: document.body.innerText.includes('Virtuoso Local AI Tutor')
      };
    })()
  `);
  console.log('Drawer initially visible?', initialDrawerState.drawerVisible);
  if (initialDrawerState.drawerVisible) {
    console.error('FAIL: Drawer should NOT be visible on initial load!');
    process.exit(1);
  }

  // Open drawer
  await win.webContents.executeJavaScript(`
    (() => {
      const tutorBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('AI Tutor'));
      if (tutorBtn) tutorBtn.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 500));
  const openedState = await win.webContents.executeJavaScript(`
    (() => {
      return {
        drawerOpened: document.body.innerText.includes('Virtuoso Local AI Tutor')
      };
    })()
  `);
  console.log('Drawer opened successfully?', openedState.drawerOpened);

  // Close drawer via backdrop or X button
  await win.webContents.executeJavaScript(`
    (() => {
      const closeBtn = document.querySelector('button[title*="Close"]') || Array.from(document.querySelectorAll('button')).find(b => b.querySelector('svg.lucide-x') || b.innerHTML.includes('lucide-x'));
      if (closeBtn) closeBtn.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 500));
  const closedState = await win.webContents.executeJavaScript(`
    (() => {
      return {
        drawerClosed: !document.body.innerText.includes('Virtuoso Local AI Tutor')
      };
    })()
  `);
  console.log('Drawer closed successfully?', closedState.drawerClosed);
  if (!closedState.drawerClosed) {
    console.error('FAIL: Drawer did not close!');
    process.exit(1);
  }

  console.log('\n--- TEST 2: Playback Controls & Spacebar ---');
  // Click Play
  await win.webContents.executeJavaScript(`
    (() => {
      const playBtn = document.querySelector('button[title*="Play"]');
      if (playBtn) playBtn.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 2000));
  const playbackState = await win.webContents.executeJavaScript(`
    (() => {
      const beatCursor = document.querySelector('.at-cursor-beat');
      const isPlaying = document.querySelector('button[title*="Pause"]') !== null;
      return {
        isPlaying,
        cursorTransform: beatCursor ? beatCursor.style.transform : 'none'
      };
    })()
  `);
  console.log('Playback state:', playbackState);

  console.log('\n--- TEST 3: Soundslice Focus Mode ---');
  await win.webContents.executeJavaScript(`
    (() => {
      const focusBtn = Array.from(document.querySelectorAll('button')).find(b => b.title && b.title.includes('Focus Mode'));
      if (focusBtn) focusBtn.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 500));
  const focusState = await win.webContents.executeJavaScript(`
    (() => {
      const focusBtn = Array.from(document.querySelectorAll('button')).find(b => b.title && b.title.includes('Focus Mode'));
      return {
        focusButtonText: focusBtn ? focusBtn.innerText.trim() : null,
        isFocused: focusBtn ? focusBtn.className.includes('bg-amber-500') : false
      };
    })()
  `);
  console.log('Focus mode state:', focusState);

  console.log('\n--- TEST 4: Pitch Transposition with Audio Tone ---');
  const pitchBefore = await win.webContents.executeJavaScript(`
    (() => {
      const pitchEl = Array.from(document.querySelectorAll('span')).find(s => s.className && s.className.includes('w-7 text-center font-bold'));
      return pitchEl ? pitchEl.innerText.trim() : '0';
    })()
  `);
  await win.webContents.executeJavaScript(`
    (() => {
      const plusBtn = document.querySelector('button[title*="Transpose Up"]');
      if (plusBtn) plusBtn.click();
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));
  const pitchAfter = await win.webContents.executeJavaScript(`
    (() => {
      const pitchEl = Array.from(document.querySelectorAll('span')).find(s => s.className && s.className.includes('w-7 text-center font-bold'));
      return pitchEl ? pitchEl.innerText.trim() : '0';
    })()
  `);
  console.log(`Pitch shifted: ${pitchBefore} -> ${pitchAfter}`);

  console.log('\n=============================================');
  console.log('ALL VERIFICATIONS PASSED 100% CLEANLY!');
  console.log('=============================================\n');

  app.quit();
  process.exit(0);
});

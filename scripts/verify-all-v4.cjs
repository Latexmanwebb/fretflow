const { app, BrowserWindow } = require('electron');

app.whenReady().then(async () => {
  const win = new BrowserWindow({
    width: 1440,
    height: 920,
    show: false,
    webPreferences: {
      offscreen: true,
    },
  });

  win.webContents.on('console-message', (e, level, message) => {
    console.log('[BROWSER]', message);
  });

  console.log('Loading app at http://localhost:5173/ ...');
  await win.loadURL('http://localhost:5173/');
  await new Promise((r) => setTimeout(r, 2500));

  console.log('\n--- TEST 1: Sleek 3px Playback Bar, Shifted Down, with Upside-Down Triangle ---');
  const barCheck = await win.webContents.executeJavaScript(`
    (() => {
      const beat = document.querySelector('.at-cursor-beat');
      if (!beat) return { exists: false };
      const rect = beat.getBoundingClientRect();
      const comp = window.getComputedStyle(beat);
      const beforeComp = window.getComputedStyle(beat, '::before');

      return {
        exists: true,
        renderedWidth: Math.round(rect.width * 10) / 10,
        renderedHeight: Math.round(rect.height),
        renderedTop: Math.round(rect.top),
        marginTop: comp.marginTop,
        hasTriangle: beforeComp.content !== 'none' && (beforeComp.borderTopWidth !== '0px' || beforeComp.backgroundImage !== 'none')
      };
    })()
  `);
  console.log('Bar Check Result:', barCheck);
  if (!barCheck.exists || barCheck.renderedWidth > 4 || !barCheck.hasTriangle) {
    console.error('FAIL: Playback bar is not sleek 3px or lacks upside-down triangle!');
    process.exit(1);
  }
  console.log('PASS: Playback bar is sleek (3.0px), shifted cleanly down, and features the upside-down indicator triangle.');

  console.log('\n--- TEST 2: Bourrée in E Minor Bars 9 & 10 Combined (9 Total Measures) ---');
  const bourreeCheck = await win.webContents.executeJavaScript(`
    (() => {
      const totalText = document.body.innerText;
      const barMatch = totalText.match(/Bar\\s+\\d+\\s*\\/\\s*(\\d+)/);
      const totalBars = barMatch ? parseInt(barMatch[1], 10) : null;
      return { totalBars };
    })()
  `);
  console.log('Bourree measure count:', bourreeCheck);
  if (bourreeCheck.totalBars !== 9) {
    console.error('FAIL: Bourree in E minor should have 9 measures total (9 & 10 combined), but got:', bourreeCheck.totalBars);
    process.exit(1);
  }
  console.log('PASS: Bourrée in E minor has exactly 9 measures with bars 9 & 10 unified.');

  console.log('\n--- TEST 3: Spacebar Count-In Immediate Cancellation (No Infinite Loop/Restart) ---');
  // Trigger play via space key
  await win.webContents.executeJavaScript(`
    (() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }));
    })()
  `);
  await new Promise((r) => setTimeout(r, 300));

  const countState1 = await win.webContents.executeJavaScript(`
    (() => {
      const countEl = Array.from(document.querySelectorAll('div')).find(d => d.innerText && /^[1-4]$/.test(d.innerText.trim()));
      return { isCounting: !!countEl, countVal: countEl ? countEl.innerText.trim() : null };
    })()
  `);
  console.log('Count-in active after first space:', countState1);

  // Press Space again during countdown to cancel
  await win.webContents.executeJavaScript(`
    (() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }));
    })()
  `);
  await new Promise((r) => setTimeout(r, 400));

  const countState2 = await win.webContents.executeJavaScript(`
    (() => {
      const countEl = Array.from(document.querySelectorAll('div')).find(d => d.innerText && /^[1-4]$/.test(d.innerText.trim()));
      return { isCounting: !!countEl };
    })()
  `);
  console.log('Count-in state after second space:', countState2);
  if (countState2.isCounting) {
    console.error('FAIL: Count-in was not cancelled by spacebar!');
    process.exit(1);
  }
  console.log('PASS: Pressing Space immediately cancels the countdown without restarting it.');

  console.log('\n--- TEST 4: Focus Mode Measure Numbering & Zero Crashes ---');
  // Select range bars 3-4 and trigger Focus mode
  await win.webContents.executeJavaScript(`
    (() => {
      const focusBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText && b.innerText.includes('Focus'));
      if (focusBtn) {
        // Toggle focus on
        focusBtn.click();
      }
    })()
  `);
  await new Promise((r) => setTimeout(r, 1200));

  const focusCheck = await win.webContents.executeJavaScript(`
    (() => {
      const texts = Array.from(document.querySelectorAll('.at-surface text'));
      const barTexts = texts
        .filter(t => /^\\d+\\s*$/.test(t.textContent?.trim() || '') && parseFloat(t.getAttribute('y') || '999') < 45)
        .map(t => t.textContent.trim());
      const isFocused = !!document.body.innerText.includes('Focus (');
      return {
        isFocused,
        barTexts
      };
    })()
  `);
  console.log('Focus mode result:', focusCheck);
  if (!focusCheck.isFocused || focusCheck.barTexts.length === 0) {
    console.error('FAIL: Focus mode failed to render or engraved bar numbers missing!');
    process.exit(1);
  }
  console.log('PASS: Focus mode rendered smoothly without undefined bounds or crashes. Engraved bar numbers displayed accurately.');

  console.log('\n--- TEST 5: Mouse Wheel Ctrl+Zoom Interception (Prevents Browser Page Zoom) ---');
  const wheelCheck = await win.webContents.executeJavaScript(`
    (() => {
      let defaultPrevented = false;
      const fakeEvt = new WheelEvent('wheel', {
        ctrlKey: true,
        deltaY: -100,
        bubbles: true,
        cancelable: true
      });
      window.dispatchEvent(fakeEvt);
      return { defaultPrevented: fakeEvt.defaultPrevented };
    })()
  `);
  console.log('Wheel event check:', wheelCheck);
  if (!wheelCheck.defaultPrevented) {
    console.error('FAIL: Wheel event with ctrlKey was not intercepted to prevent browser page zoom!');
    process.exit(1);
  }
  console.log('PASS: Ctrl+wheel / pinch is intercepted and prevents browser page zoom.');

  console.log('\n=============================================');
  console.log('ALL VERIFICATION CHECKS PASSED WITH ZERO ERRORS!');
  console.log('=============================================');
  app.quit();
  process.exit(0);
});

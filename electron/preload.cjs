const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopBridge', {
  isElectron: true,
  openTabFile: () => ipcRenderer.invoke('dialog:openTabFile')
});

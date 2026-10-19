/// <reference types="vite/client" />

interface Window {
  desktopBridge?: {
    isElectron: boolean;
    openTabFile: () => Promise<{
      name: string;
      path: string;
      extension: string;
      data: number[];
    } | null>;
  };
}

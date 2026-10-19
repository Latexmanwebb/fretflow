import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function alphaTabWorkerPlugin() {
  return {
    name: 'alphatab-worker-plugin',
    configureServer(server: any) {
      const publicDir = path.resolve(__dirname, 'public');
      const depsDir = path.resolve(__dirname, 'node_modules/.vite/deps');

      // Ensure deps dir has files
      try {
        if (!fs.existsSync(depsDir)) fs.mkdirSync(depsDir, { recursive: true });
        for (const file of ['alphaTab.worker.mjs', 'alphaTab.worklet.mjs', 'alphaTab.core.mjs']) {
          const src = path.join(publicDir, file);
          const dest = path.join(depsDir, file);
          if (fs.existsSync(src)) fs.copyFileSync(src, dest);
        }
      } catch (e) {
        // ignore
      }

      // Intercept any direct requests
      server.middlewares.use((req: any, res: any, next: any) => {
        const url = req.url || '';
        if (url.includes('alphaTab.worker.mjs') || url.includes('alphaTab.worklet.mjs') || url.includes('alphaTab.core.mjs')) {
          const filename = url.split('?')[0].split('/').pop();
          const filePath = path.join(publicDir, filename);
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'text/javascript');
            res.setHeader('Access-Control-Allow-Origin', '*');
            return fs.createReadStream(filePath).pipe(res);
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), alphaTabWorkerPlugin()],
  server: {
    port: 5173,
    host: '127.0.0.1',
  },
  optimizeDeps: {
    include: ['@coderline/alphatab', 'lucide-react', 'canvas-confetti'],
  },
});

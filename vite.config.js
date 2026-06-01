import { defineConfig } from 'vite';

export default defineConfig({
  base: '/stretch-tts-guide/',
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })),
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});

import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  base: '/stretch-tts-guide/',
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })),
  },
  plugins: [injectHTML()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});

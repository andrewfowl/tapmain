import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/token-compensation/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

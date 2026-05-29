import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true,
    allowedHosts: [
      'plunging-backing-margarita.ngrok-free.dev',
      '.ngrok-free.dev',
    ],
    cors: {
      origin: [
        'http://localhost:5173',
        'https://plunging-backing-margarita.ngrok-free.dev',
        /\.ngrok-free\.dev$/,
      ],
      credentials: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});

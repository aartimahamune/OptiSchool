import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your backend server
        changeOrigin: true, // Ensures the origin of the host header is updated to the target URL
        secure: false, // Disables SSL verification for localhost (optional for development)
      },
    },
  },
  plugins: [react()],
});

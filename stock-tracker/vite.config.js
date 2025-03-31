import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure this is set correctly for your deployment
  build: {
    assetsDir: 'assets', // Explicit assets directory
    manifest: true, // Generate asset manifest
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]' // Proper asset naming
      }
    }
  }
});
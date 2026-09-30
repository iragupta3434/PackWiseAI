import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Code splitting for vendor chunks to reduce initial bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor: React core
          react: ['react', 'react-dom'],
          // Vendor: Router
          router: ['react-router-dom'],
          // Vendor: Charts (largest chunk)
          recharts: ['recharts'],
          // Vendor: Icons
          icons: ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})

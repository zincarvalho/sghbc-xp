import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow access from external network
    port: 5173, // Specify the port
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // Changed port to 8081
        changeOrigin: true,
        // Remove rewrite to keep /api prefix, as backend expects it
        // rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
})


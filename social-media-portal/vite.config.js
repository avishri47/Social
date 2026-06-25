import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: true,

    allowedHosts: [
      'galling-penelope-unsacramental.ngrok-free.dev'
    ],

    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        secure: false
      },
       '/uploads': {
        target: 'http://localhost:9090',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
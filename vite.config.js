import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: true, // allows external access (ngrok, LAN, etc.)

    allowedHosts: [
      'galling-penelope-unsacramental.ngrok-free.dev'
    ],

    cors: {
      origin: 'https://galling-penelope-unsacramental.ngrok-free.dev',
      credentials: true
    }
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  define: {
    // Prevent "process is not defined" errors from some deps
    'process.env': {},
  },
})

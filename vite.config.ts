import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        wahl: resolve(__dirname, 'wahl/index.html'),
        forderungen: resolve(__dirname, 'forderungen/index.html'),
        kandidierende: resolve(__dirname, 'kandidierende/index.html'),
        mitgliedWerden: resolve(__dirname, 'mitglied-werden/index.html'),
        kontakt: resolve(__dirname, 'kontakt/index.html'),
        impressum: resolve(__dirname, 'impressum/index.html'),
        datenschutz: resolve(__dirname, 'datenschutz/index.html'),
      },
    },
  },
})

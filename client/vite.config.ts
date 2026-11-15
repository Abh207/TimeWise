import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

function spaFallbackPlugin(): Plugin {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const distDir = path.resolve(import.meta.dirname, 'dist')
      const indexHtml = path.join(distDir, 'index.html')
      const notFoundHtml = path.join(distDir, '404.html')
      if (fs.existsSync(indexHtml)) {
        fs.copyFileSync(indexHtml, notFoundHtml)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/TimeWise/',
  plugins: [react(), spaFallbackPlugin()],
})

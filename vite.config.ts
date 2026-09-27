import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves a project site beneath the repository name.
  base: process.env.GITHUB_ACTIONS ? '/Team-NerV-SIH26079/' : '/',
  plugins: [react(), tailwindcss()],
})

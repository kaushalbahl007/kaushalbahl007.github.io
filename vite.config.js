import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/* GitHub Pages serves this repo's ROOT from a branch source, so the built
   site has to land at the root — a root index.html pointing at /src/main.jsx
   is raw JSX, which browsers reject ("text/jsx") and render as a blank page.
   The dev template therefore lives at src/index.html (out of the way of the
   build output), and `vite build` writes the real index.html plus assets/
   to the repo root. */
export default defineConfig({
  plugins: [react()],
  /* Dev server resolves index.html from src/ */
  root: 'src',
  publicDir: resolve(__dirname, 'public'),
  /* Relative asset URLs, so the page works at the root or any subpath. */
  base: './',
  build: {
    outDir: resolve(__dirname, '.'),
    /* The output directory is the repo itself — never wipe it. */
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, 'src/index.html'),
    },
  },
})

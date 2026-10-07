import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* Build into docs/ rather than dist/ so GitHub Pages can serve the output
   directly from a branch source (Settings -> Pages -> /docs). The repo root
   index.html stays pointed at /src/main.jsx so `npm run dev` keeps working;
   only the built copy in docs/ references the hashed bundle. */
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})

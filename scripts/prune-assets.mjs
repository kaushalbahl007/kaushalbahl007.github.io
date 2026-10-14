/* Delete hashed bundles in assets/ that the current index.html no longer
   references. The build writes into the repo root with emptyOutDir off (the
   output directory is the repo itself, so it must never be wiped), which
   means each rebuild leaves the previous hashed files behind. */
import { readFileSync, readdirSync, unlinkSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const html = readFileSync(join(root, 'index.html'), 'utf8')

const assetsDir = join(root, 'assets')
const kept = new Set([...html.matchAll(/assets\/([^"')\s]+)/g)].map(m => m[1]))

for (const file of readdirSync(assetsDir)) {
  if (kept.has(file)) continue
  unlinkSync(join(assetsDir, file))
  console.log(`pruned assets/${file}`)
}

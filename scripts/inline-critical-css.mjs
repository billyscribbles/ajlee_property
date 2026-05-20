// Post-build step: inline the main entry CSS bundle into dist/index.html and
// drop the render-blocking <link rel="stylesheet"> for it. Per-route CSS chunks
// stay external so first-load HTML doesn't balloon. Saves ~300ms FCP on slow
// mobile per Lighthouse's render-blocking-resources audit.
//
// Wired into the `build` script in package.json.

import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const indexPath = join(dist, 'index.html')

if (!existsSync(indexPath)) {
  console.warn('[inline-critical-css] dist/index.html not found — skipped.')
  process.exit(0)
}

let html = await readFile(indexPath, 'utf8')

// Match the entry CSS link (Vite emits one per entry chunk in the head).
const linkRegex = /<link rel="stylesheet"[^>]*href="(\/assets\/index-[^"]+\.css)"[^>]*>/
const match = html.match(linkRegex)
if (!match) {
  console.warn('[inline-critical-css] no entry stylesheet link found — skipped.')
  process.exit(0)
}

const cssHref = match[1]
const cssPath = join(dist, cssHref.replace(/^\//, ''))
if (!existsSync(cssPath)) {
  console.warn(`[inline-critical-css] ${cssHref} not found on disk — skipped.`)
  process.exit(0)
}

const css = await readFile(cssPath, 'utf8')
const inlined = `<style>${css}</style>`
html = html.replace(linkRegex, inlined)
await writeFile(indexPath, html)

console.log(`[inline-critical-css] inlined ${cssHref} (${css.length} chars)`)

/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { resolveRedirect } from './scripts/redirects.js'

// `yarn build:analyze` sets ANALYZE=true to emit dist/bundle-stats.html.
const analyze = process.env.ANALYZE === 'true'

// Serves the legacy WordPress URLs as real 301s and canonicalises www → apex.
// Runs on both the dev and preview (Railway `yarn start`) servers.
function legacyRedirects() {
  const handler = (req, res, next) => {
    const host = (req.headers.host || '').toLowerCase()
    const url = req.url || '/'

    // Collapse the www host onto the apex so the two don't index separately.
    if (host === 'www.ajlee.com.au') {
      res.statusCode = 301
      res.setHeader('Location', `https://ajlee.com.au${url}`)
      res.end()
      return
    }

    const dest = resolveRedirect(url)
    if (dest) {
      res.statusCode = 301
      res.setHeader('Location', dest)
      res.end()
      return
    }
    next()
  }
  return {
    name: 'legacy-301-redirects',
    // Block bodies (not implicit returns): a returned value would be treated
    // by Vite as a post-hook to invoke, breaking server startup.
    configureServer(server) {
      server.middlewares.use(handler)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler)
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    legacyRedirects(),
    analyze && visualizer({ filename: 'dist/bundle-stats.html', gzipSize: true }),
  ].filter(Boolean),
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: ['.up.railway.app', '.ajlee.com.au', 'ajlee.com.au'],
  },
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
  // Vitest runs the site's content/config "contract" suite — see src/test/.
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
    css: false,
    include: ['src/**/*.{test,spec}.{js,jsx}'],
  },
})

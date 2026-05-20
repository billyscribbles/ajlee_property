import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let cached = null

export function getSupabase() {
  if (!url || !anonKey) return null
  if (!cached) {
    cached = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return cached
}

export const SUPABASE_URL = url ?? ''
export const LISTING_IMAGES_BUCKET = 'listing-images'

export function publicImageUrl(path) {
  if (!path) return ''
  // Pass-through for absolute URLs (http, https) and root-relative static
  // assets like `/images/property-mt-eliza.jpg` — used by the seed listings.
  if (/^(https?:)?\/\//.test(path) || path.startsWith('/')) return path
  if (!url) return ''
  return `${url}/storage/v1/object/public/${LISTING_IMAGES_BUCKET}/${path}`
}

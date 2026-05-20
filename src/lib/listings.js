import { getSupabase, publicImageUrl } from './supabase.js'
import { reportError } from './errorReporter.js'

const LISTING_COLUMNS =
  'id, slug, status, address, suburb, beds, baths, parking, price, rea_url, images, created_at'

function toCard(row) {
  const images = Array.isArray(row.images) ? row.images : []
  const hero = images[0] ?? null
  return {
    id: row.id,
    slug: row.slug,
    status: row.status,
    address: row.address,
    suburb: row.suburb,
    beds: row.beds ?? 0,
    baths: row.baths ?? 0,
    parking: row.parking ?? 0,
    price: row.price ?? '',
    reaUrl: row.rea_url ?? '',
    image: hero ? publicImageUrl(hero.path) : '',
    imageAlt: hero?.alt ?? `${row.address}, ${row.suburb}`,
    images,
  }
}

export async function fetchFeaturedListings(limit = 3) {
  const supabase = getSupabase()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('listings')
    .select(LISTING_COLUMNS)
    .eq('published', true)
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) {
    reportError(error, { source: 'fetchFeaturedListings' })
    return []
  }
  return (data ?? []).map(toCard)
}

export async function fetchPublishedListings() {
  const supabase = getSupabase()
  if (!supabase) return []
  const { data, error } = await supabase
    .from('listings')
    .select(LISTING_COLUMNS)
    .eq('published', true)
    .order('created_at', { ascending: false })
  if (error) {
    reportError(error, { source: 'fetchPublishedListings' })
    return []
  }
  return (data ?? []).map(toCard)
}

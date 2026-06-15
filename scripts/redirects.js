// Legacy URL map for the WordPress → React migration.
//
// The previous ajlee.com.au site (WordPress) used different slugs than this
// app. Every old URL that Google has indexed must 301 to its closest new
// page, otherwise inbound links and accumulated ranking signals 404 on launch.
//
// Wired into vite.config.js as preview/dev middleware, so `yarn start`
// (Railway's serve command) issues real HTTP 301s — not client-side hops.
//
// Keys are lowercase, no trailing slash. resolveRedirect() normalises both.
export const redirectMap = {
  // Renamed core pages
  '/about-us': '/about',
  '/selling-with-us': '/selling',
  '/privacy-policy': '/privacy',

  // Sub-pages with no direct equivalent → nearest relevant page
  '/about-us/testimonials': '/about',
  '/selling-with-us/what-is-my-property-worth': '/contact',
  '/property-management/rental-appraisal-rentals': '/contact',
  '/buying-with-us': '/contact',
  '/contact/partner-program': '/contact',
  '/landing-page': '/',

  // WordPress archive routes
  '/author/ajlee': '/about',
  '/category/uncategorized': '/',

  // Legacy blog posts — no blog in the new app yet. Redirect home so the
  // inbound links survive; rebuild these as articles later if desired.
  '/10-simple-tactics-when-making-an-offer': '/',
  '/rentaldemandupdate': '/',
  '/sunset-clauses-what-you-need-to-know': '/',
}

// Returns the destination path for a legacy URL, or null if none applies.
// Strips query/hash and a trailing slash, and matches case-insensitively.
export function resolveRedirect(pathname) {
  if (!pathname) return null
  let p = pathname.split('?')[0].split('#')[0].toLowerCase()
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)
  return redirectMap[p] || null
}

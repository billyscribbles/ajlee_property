import { Helmet } from 'react-helmet-async'
import { site } from '../config/site.config.js'

// Organization structured data — built once from site.config so search engines
// get a machine-readable brand record. Becomes a RealEstateAgent (a
// LocalBusiness subtype) automatically when a contact address/phone is present.
const organizationLd = (() => {
  const sameAs = Object.values(site.social || {}).filter(Boolean)
  const hasLocation = Boolean(site.contact?.location || site.contact?.phone)
  const schema = {
    '@context': 'https://schema.org',
    '@type': hasLocation ? 'RealEstateAgent' : 'Organization',
    name: site.brand.name,
    url: site.seo.siteUrl,
    description: site.seo.description,
  }
  if (site.brand.logoSrc) {
    const logo = `${site.seo.siteUrl}${site.brand.logoSrc}`
    schema.logo = logo
    schema.image = `${site.seo.siteUrl}${site.seo.ogImage}`
  }
  if (sameAs.length) schema.sameAs = sameAs
  if (site.contact?.phone) schema.telephone = site.contact.phone
  if (site.contact?.email) schema.email = site.contact.email
  const addr = site.contact?.address
  if (addr) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: addr.street,
      addressLocality: addr.suburb,
      addressRegion: addr.region,
      postalCode: addr.postcode,
      addressCountry: addr.country,
    }
    schema.areaServed = 'Melbourne, Victoria, Australia'
  }
  return JSON.stringify(schema)
})()

// Per-page SEO wrapper. Pass `title` and `description` to override defaults.
// All other tags fall back to site.config.seo.
export default function SEO({ title, description, image, path = '' }) {
  const seo = site.seo
  const resolvedTitle = title ? seo.titleTemplate.replace('%s', title) : seo.defaultTitle
  const resolvedDescription = description || seo.description
  const resolvedImage = image || seo.ogImage
  const url = `${seo.siteUrl}${path}`

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:locale" content={seo.locale} />
      <meta property="og:site_name" content={site.brand.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
      <script type="application/ld+json">{organizationLd}</script>
    </Helmet>
  )
}

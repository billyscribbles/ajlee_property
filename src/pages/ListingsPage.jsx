import { useEffect, useState } from 'react'
import { NavLink, useParams, Navigate } from 'react-router-dom'
import { ArrowRight, Bed, Bath, Car } from 'lucide-react'
import SEO from '../lib/seo.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { fetchPublishedListings } from '../lib/listings.js'
import ListingMedia from '../components/ListingMedia.jsx'
import './ServicePage.css'

const LISTING_SKELETONS = [0, 1, 2, 3]

const STATUS_GROUPS = [
  { slug: 'for-sale', label: 'For Sale', match: ['for sale'] },
  { slug: 'for-rent', label: 'For Rent', match: ['for rent', 'for lease'] },
  { slug: 'under-offer', label: 'Under Offer', match: ['under offer'] },
  { slug: 'sold', label: 'Sold', match: ['sold'] },
  { slug: 'leased', label: 'Leased', match: ['leased'] },
]

const FILTER_TABS = STATUS_GROUPS.filter((g) => g.slug !== 'under-offer')

function groupByStatus(items) {
  const buckets = STATUS_GROUPS.map((g) => ({ ...g, items: [] }))
  const other = []
  for (const item of items) {
    const key = String(item.status ?? '')
      .trim()
      .toLowerCase()
    const bucket = buckets.find((b) => b.match.includes(key))
    if (bucket) bucket.items.push(item)
    else if (key) other.push(item)
  }
  if (other.length) buckets.push({ slug: 'other', label: 'Other', items: other })
  return buckets.filter((b) => b.items.length)
}

const EMPTY_MESSAGE = 'New listings will appear here as they launch.'

export default function ListingsPage() {
  const [items, setItems] = useState(null)
  const { status: statusSlug } = useParams()
  const activeFilter = statusSlug ? STATUS_GROUPS.find((g) => g.slug === statusSlug) : null

  useEffect(() => {
    let cancelled = false
    fetchPublishedListings().then((data) => {
      if (!cancelled) setItems(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (statusSlug && !activeFilter) {
    return <Navigate to="/listings" replace />
  }

  const groupedAll = items ? groupByStatus(items) : null
  const grouped =
    groupedAll && activeFilter ? groupedAll.filter((g) => g.slug === activeFilter.slug) : groupedAll
  const filterEmpty = activeFilter && grouped && grouped.length === 0
  const seoTitle = activeFilter ? `${activeFilter.label} Listings` : 'Listings'
  const seoPath = activeFilter ? `/listings/${activeFilter.slug}` : '/listings'

  return (
    <main className="service-page">
      <SEO title={seoTitle} path={seoPath} />

      <section
        className="service-listings service-listings--top section"
        aria-labelledby="listings-heading"
      >
        <div className="container">
          <h2 id="listings-heading" className="sr-only">
            {activeFilter ? `${activeFilter.label} listings` : 'Listings'}
          </h2>
          <nav className="service-listings__filters" aria-label="Filter listings by status">
            <NavLink
              to="/listings"
              end
              className={({ isActive }) =>
                `service-listings__filter${isActive ? ' service-listings__filter--active' : ''}`
              }
            >
              All
            </NavLink>
            {FILTER_TABS.map((tab) => (
              <NavLink
                key={tab.slug}
                to={`/listings/${tab.slug}`}
                className={({ isActive }) =>
                  `service-listings__filter${isActive ? ' service-listings__filter--active' : ''}`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>
          {items === null ? (
            <div className="service-listings__grid">
              {LISTING_SKELETONS.map((i) => (
                <article
                  key={`skeleton-${i}`}
                  className="service-listings__card"
                  aria-hidden="true"
                >
                  <div className="service-listings__media admin-skeleton" />
                  <div className="service-listings__body-block">
                    <div
                      className="admin-skeleton"
                      style={{ height: 26, width: '70%', marginBottom: 10 }}
                    />
                    <div
                      className="admin-skeleton"
                      style={{ height: 14, width: '40%', marginBottom: 22 }}
                    />
                    <div className="admin-skeleton" style={{ height: 36 }} />
                  </div>
                </article>
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className="service-listings__empty">{EMPTY_MESSAGE}</p>
          ) : filterEmpty ? (
            <p className="service-listings__empty">
              No {activeFilter.label.toLowerCase()} listings right now. Check back soon.
            </p>
          ) : (
            grouped.map((group) => {
              const slug = group.slug
              return (
                <div
                  key={group.slug}
                  className="service-listings__group"
                  aria-labelledby={`group-${slug}`}
                >
                  <h3 id={`group-${slug}`} className="service-listings__group-heading">
                    <span className="service-listings__group-label">{group.label}</span>
                    <span className="service-listings__group-count">
                      {group.items.length} {group.items.length === 1 ? 'property' : 'properties'}
                    </span>
                  </h3>
                  <div className="service-listings__grid">
                    {group.items.map((p) => {
                      const hasReaUrl = Boolean(p.reaUrl)
                      return (
                        <article key={p.id ?? p.slug} className="service-listings__card">
                          <ListingMedia
                            gallery={
                              p.gallery && p.gallery.length > 0
                                ? p.gallery
                                : p.image
                                  ? [{ src: p.image, alt: p.imageAlt }]
                                  : []
                            }
                            imageAlt={p.imageAlt}
                            status={p.status}
                            wrapperClassName="service-listings__media"
                            imageClassName="service-listings__image"
                            statusClassName="service-listings__status"
                          />

                          <div className="service-listings__body-block">
                            <h4 className="service-listings__address">{p.address}</h4>
                            <p className="service-listings__suburb">{p.suburb}</p>

                            <div className="service-listings__meta">
                              <span
                                className="service-listings__feature"
                                aria-label={`${p.beds} bedrooms`}
                              >
                                <Bed size={16} strokeWidth={1.6} aria-hidden="true" />
                                <span>{p.beds}</span>
                              </span>
                              <span
                                className="service-listings__feature"
                                aria-label={`${p.baths} bathrooms`}
                              >
                                <Bath size={16} strokeWidth={1.6} aria-hidden="true" />
                                <span>{p.baths}</span>
                              </span>
                              <span
                                className="service-listings__feature"
                                aria-label={`${p.parking} parking`}
                              >
                                <Car size={16} strokeWidth={1.6} aria-hidden="true" />
                                <span>{p.parking}</span>
                              </span>
                              <span className="service-listings__price">{p.price}</span>
                            </div>

                            {hasReaUrl && (
                              <div className="service-listings__ctas">
                                <a
                                  href={p.reaUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="service-listings__cta service-listings__cta--secondary"
                                  aria-label={`View ${p.address}, ${p.suburb} on realestate.com.au (opens in a new tab)`}
                                >
                                  <span>View on realestate.com.au</span>
                                  <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
                                </a>
                              </div>
                            )}
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </section>

      <CtaBanner
        image={{
          src: '/images/home-modern-facade.webp',
          alt: 'Contemporary architectural home with stone facade and landscaped frontage.',
        }}
      />
    </main>
  )
}

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Bed, Bath, Car } from 'lucide-react'
import SEO from '../lib/seo.jsx'
import Services from '../components/Services.jsx'
import WhyChoose from '../components/WhyChoose.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { fetchPublishedListings } from '../lib/listings.js'
import { useScrollIn } from '../lib/motion.js'
import { selling } from '../content/selling.js'
import ListingMedia from '../components/ListingMedia.jsx'
import './ServicePage.css'

const LISTING_SKELETONS = [0, 1, 2, 3]

const STATUS_GROUPS = [
  { label: 'For Sale', match: ['for sale'] },
  { label: 'For Rent', match: ['for rent', 'for lease'] },
  { label: 'Under Offer', match: ['under offer'] },
  { label: 'Sold', match: ['sold'] },
  { label: 'Leased', match: ['leased'] },
]

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
  if (other.length) buckets.push({ label: 'Other', items: other })
  return buckets.filter((b) => b.items.length)
}

export default function SellingPage() {
  const scrollIn = useScrollIn()
  const { listings } = selling
  const [items, setItems] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchPublishedListings().then((data) => {
      if (!cancelled) setItems(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const grouped = items ? groupByStatus(items) : null

  return (
    <main className="service-page">
      <SEO title="Selling" path="/selling" />

      <section className="service-hero">
        <div className="container service-hero__inner">
          <span className="section-eyebrow service-hero__eyebrow">{selling.eyebrow}</span>
          <h1 className="service-hero__title">
            {selling.title.split('\n').map((line) => (
              <span key={line} className="service-hero__title-line">
                {line}
              </span>
            ))}
          </h1>
          <p className="service-hero__intro">{selling.intro}</p>
        </div>
      </section>

      <section className="service-intro section">
        <div className="container service-intro__inner">
          <p className="service-intro__body">{selling.intro2}</p>
          <p className="service-intro__body">{selling.intro3}</p>
          <p className="service-intro__promise">{selling.promise}</p>
        </div>
      </section>

      <section className="service-listings section" aria-labelledby="service-listings-heading">
        <div className="container">
          <div className="service-listings__head">
            <div>
              <span className="section-eyebrow service-listings__eyebrow">{listings.eyebrow}</span>
              <h2 id="service-listings-heading" className="service-listings__heading">
                {listings.heading.split('\n').map((line) => (
                  <span key={line} className="service-listings__heading-line">
                    {line}
                  </span>
                ))}
              </h2>
              <p className="service-listings__body">{listings.body}</p>
            </div>
            {listings.viewAllTo && (
              <Link to={listings.viewAllTo} className="service-listings__view-all">
                <span>{listings.viewAllLabel}</span>
                <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            )}
          </div>

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
            <p className="service-listings__empty">{listings.emptyMessage}</p>
          ) : (
            grouped.map((group) => (
              <div
                key={group.label}
                className="service-listings__group"
                aria-labelledby={`group-${group.label.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <h3
                  id={`group-${group.label.replace(/\s+/g, '-').toLowerCase()}`}
                  className="service-listings__group-heading"
                >
                  <span className="service-listings__group-label">{group.label}</span>
                  <span className="service-listings__group-count">
                    {group.items.length} {group.items.length === 1 ? 'property' : 'properties'}
                  </span>
                </h3>
                <div className="service-listings__grid">
                  {group.items.map((p, i) => {
                    const hasReaUrl = Boolean(p.reaUrl)
                    const ctaLabel = hasReaUrl ? 'View on realestate.com.au' : 'Enquire'
                    const linkAriaLabel = hasReaUrl
                      ? `View ${p.address}, ${p.suburb} on realestate.com.au (opens in a new tab)`
                      : `Enquire about ${p.address}, ${p.suburb}`
                    return (
                      <motion.article
                        key={p.id ?? p.slug}
                        className="service-listings__card"
                        {...scrollIn(i)}
                      >
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

                          {hasReaUrl ? (
                            <a
                              href={p.reaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="service-listings__cta service-listings__cta--stretched"
                              aria-label={linkAriaLabel}
                            >
                              <span>{ctaLabel}</span>
                              <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
                            </a>
                          ) : (
                            <Link
                              to="/contact"
                              className="service-listings__cta service-listings__cta--stretched"
                              aria-label={linkAriaLabel}
                            >
                              <span>{ctaLabel}</span>
                              <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
                            </Link>
                          )}
                        </div>
                      </motion.article>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="service-grid section">
        <div className="container">
          <span className="section-eyebrow service-grid__eyebrow">{selling.whySellEyebrow}</span>
          <h2 className="service-grid__heading">
            {selling.whySellHeading.split('\n').map((line) => (
              <span key={line} className="service-grid__heading-line">
                {line}
              </span>
            ))}
          </h2>
          <div className="service-grid__list">
            {selling.reasons.map((r, i) => (
              <motion.article key={r.title} className="service-grid__card" {...scrollIn(i)}>
                <span className="service-grid__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="service-grid__title">{r.title}</h3>
                <p className="service-grid__body">{r.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Services />
      <WhyChoose />
      <Testimonials />
      <CtaBanner />
    </main>
  )
}

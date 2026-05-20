import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Bed, Bath, Car } from 'lucide-react'
import { properties } from '../content/properties.js'
import { fetchFeaturedListings } from '../lib/listings.js'
import { useScrollIn } from '../lib/motion.js'
import ListingMedia from './ListingMedia.jsx'
import './FeaturedProperties.css'

const PLACEHOLDERS = [0, 1, 2]

export default function FeaturedProperties() {
  const scrollIn = useScrollIn()
  const [items, setItems] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetchFeaturedListings(3).then((data) => {
      if (!cancelled) setItems(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (items !== null && items.length === 0) return null

  return (
    <section className="properties section" aria-labelledby="properties-heading">
      <div className="container">
        <div className="properties__head">
          <h2 id="properties-heading" className="properties__eyebrow section-eyebrow">
            {properties.eyebrow}
          </h2>
          {properties.viewAllTo && (
            <Link to={properties.viewAllTo} className="properties__view-all">
              <span>{properties.viewAllLabel}</span>
              <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          )}
        </div>

        <div className="properties__grid">
          {items === null
            ? PLACEHOLDERS.map((i) => (
                <article key={`skeleton-${i}`} className="properties__card" aria-hidden="true">
                  <div className="properties__media admin-skeleton" />
                  <div className="properties__body">
                    <div
                      className="admin-skeleton"
                      style={{ height: 22, width: '70%', marginBottom: 8 }}
                    />
                    <div
                      className="admin-skeleton"
                      style={{ height: 14, width: '40%', marginBottom: 18 }}
                    />
                    <div className="admin-skeleton" style={{ height: 32 }} />
                  </div>
                </article>
              ))
            : items.map((p, i) => {
                const hasReaUrl = Boolean(p.reaUrl)
                const ctaLabel = hasReaUrl ? 'View on realestate.com.au' : 'View Property'
                const linkAriaLabel = hasReaUrl
                  ? `View ${p.address}, ${p.suburb} on realestate.com.au (opens in a new tab)`
                  : `Enquire about ${p.address}, ${p.suburb}`
                return (
                  <motion.article
                    key={p.id ?? p.slug}
                    className="properties__card"
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
                      wrapperClassName="properties__media"
                      imageClassName="properties__image"
                      statusClassName="properties__status"
                    />

                    <div className="properties__body">
                      <h3 className="properties__address">{p.address}</h3>
                      <p className="properties__suburb">{p.suburb}</p>

                      <div className="properties__meta">
                        <span className="properties__feature" aria-label={`${p.beds} bedrooms`}>
                          <Bed size={16} strokeWidth={1.6} aria-hidden="true" />
                          <span>{p.beds}</span>
                        </span>
                        <span className="properties__feature" aria-label={`${p.baths} bathrooms`}>
                          <Bath size={16} strokeWidth={1.6} aria-hidden="true" />
                          <span>{p.baths}</span>
                        </span>
                        <span className="properties__feature" aria-label={`${p.parking} parking`}>
                          <Car size={16} strokeWidth={1.6} aria-hidden="true" />
                          <span>{p.parking}</span>
                        </span>
                        <span className="properties__price">{p.price}</span>
                      </div>

                      {hasReaUrl ? (
                        <a
                          href={p.reaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="properties__cta properties__cta--stretched"
                          aria-label={linkAriaLabel}
                        >
                          <span>{ctaLabel}</span>
                          <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
                        </a>
                      ) : (
                        <Link
                          to="/contact"
                          className="properties__cta properties__cta--stretched"
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
    </section>
  )
}

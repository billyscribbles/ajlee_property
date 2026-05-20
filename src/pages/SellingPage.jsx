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
import './ServicePage.css'

const LISTING_SKELETONS = [0, 1, 2, 3]

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

          {items !== null && items.length === 0 ? (
            <p className="service-listings__empty">{listings.emptyMessage}</p>
          ) : (
            <div className="service-listings__grid">
              {items === null
                ? LISTING_SKELETONS.map((i) => (
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
                  ))
                : items.map((p, i) => (
                    <motion.article
                      key={p.id ?? p.slug}
                      className="service-listings__card"
                      {...scrollIn(i)}
                    >
                      <div className="service-listings__media">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.imageAlt}
                            loading="lazy"
                            className="service-listings__image"
                          />
                        ) : (
                          <div
                            className="service-listings__image"
                            style={{ background: 'var(--color-bg-alt)' }}
                          />
                        )}
                        <span className="service-listings__status">{p.status}</span>
                      </div>

                      <div className="service-listings__body-block">
                        <h3 className="service-listings__address">{p.address}</h3>
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

                        <Link to="/contact" className="service-listings__cta">
                          <span>Enquire</span>
                          <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
            </div>
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

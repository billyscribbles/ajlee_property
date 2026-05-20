import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Bed, Bath, Car } from 'lucide-react'
import { properties } from '../content/properties.js'
import { useScrollIn } from '../lib/motion.js'
import './FeaturedProperties.css'

export default function FeaturedProperties() {
  const scrollIn = useScrollIn()

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
          {properties.items.map((p, i) => (
            <motion.article key={p.slug} className="properties__card" {...scrollIn(i)}>
              <div className="properties__media">
                <img src={p.image} alt={p.imageAlt} loading="lazy" className="properties__image" />
                <span className="properties__status">{p.status}</span>
              </div>

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

                <Link to="/contact" className="properties__cta">
                  <span>View Property</span>
                  <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ctaBanner } from '../content/ctaBanner.js'
import './CtaBanner.css'

export default function CtaBanner({ imageless = false, image }) {
  const resolvedImage = image || ctaBanner.image
  return (
    <section
      className={`cta-banner${imageless ? ' cta-banner--imageless' : ''}`}
      aria-labelledby="cta-banner-heading"
    >
      {!imageless && (
        <div className="cta-banner__media" aria-hidden="true">
          <img src={resolvedImage.src} alt="" className="cta-banner__image" loading="lazy" />
          <div className="cta-banner__veil" />
        </div>
      )}

      <motion.div
        className="cta-banner__inner"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 id="cta-banner-heading" className="cta-banner__heading">
          {ctaBanner.heading}
        </h2>
        <p className="cta-banner__body">{ctaBanner.body}</p>
        <Link to={ctaBanner.cta.to} className="cta-banner__cta">
          {ctaBanner.cta.label}
        </Link>
      </motion.div>
    </section>
  )
}

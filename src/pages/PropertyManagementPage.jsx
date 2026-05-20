import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import SEO from '../lib/seo.jsx'
import Services from '../components/Services.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { useScrollIn } from '../lib/motion.js'
import { propertyManagement } from '../content/propertyManagement.js'
import './ServicePage.css'

export default function PropertyManagementPage() {
  const scrollIn = useScrollIn()
  const { portal, guarantee } = propertyManagement

  return (
    <main className="service-page">
      <SEO title="Property Management" path="/property-management" />

      <section className="service-hero">
        <div className="container service-hero__inner">
          <span className="section-eyebrow service-hero__eyebrow">
            {propertyManagement.eyebrow}
          </span>
          <h1 className="service-hero__title">
            {propertyManagement.title.split('\n').map((line) => (
              <span key={line} className="service-hero__title-line">
                {line}
              </span>
            ))}
          </h1>
          <p className="service-hero__intro">{propertyManagement.intro}</p>
        </div>
      </section>

      <section className="service-intro section">
        <div className="container service-intro__inner">
          <p className="service-intro__body">{propertyManagement.intro2}</p>
          <p className="service-intro__body">{propertyManagement.intro3}</p>
          <p className="service-intro__promise">{propertyManagement.promise}</p>
        </div>
      </section>

      <section className="service-grid section">
        <div className="container">
          <span className="section-eyebrow service-grid__eyebrow">
            {propertyManagement.whyLeaseEyebrow}
          </span>
          <h2 className="service-grid__heading">
            {propertyManagement.whyLeaseHeading.split('\n').map((line) => (
              <span key={line} className="service-grid__heading-line">
                {line}
              </span>
            ))}
          </h2>
          <div className="service-grid__list">
            {propertyManagement.services.map((s, i) => (
              <motion.article
                key={s.title}
                className="service-grid__card"
                {...scrollIn(i)}
              >
                <span className="service-grid__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="service-grid__title">{s.title}</h3>
                <p className="service-grid__body">{s.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="owner-portal section" aria-labelledby="owner-portal-heading">
        <div className="container owner-portal__inner">
          <div className="owner-portal__content">
            <span className="section-eyebrow">{portal.eyebrow}</span>
            <h2 id="owner-portal-heading" className="owner-portal__heading">
              {portal.heading.split('\n').map((line) => (
                <span key={line} className="owner-portal__heading-line">
                  {line}
                </span>
              ))}
            </h2>
            <p className="owner-portal__body">{portal.body}</p>
            <ul className="owner-portal__features">
              {portal.features.map((feature) => (
                <li key={feature} className="owner-portal__feature">
                  <span className="owner-portal__feature-icon" aria-hidden="true">
                    <Check size={14} strokeWidth={2} />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              className="owner-portal__source"
              href={portal.sourceHref}
              target="_blank"
              rel="noreferrer"
            >
              {portal.sourceLabel} ↗
            </a>
          </div>

          <motion.div
            className="owner-portal__media"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={portal.image.src}
              alt={portal.image.alt}
              loading="lazy"
              className="owner-portal__image"
            />
          </motion.div>
        </div>
      </section>

      <section className="owner-guarantee section" aria-labelledby="owner-guarantee-heading">
        <div className="container">
          <span className="section-eyebrow">{guarantee.eyebrow}</span>
          <h2 id="owner-guarantee-heading" className="owner-guarantee__heading">
            {guarantee.heading.split('\n').map((line) => (
              <span key={line} className="owner-guarantee__heading-line">
                {line}
              </span>
            ))}
          </h2>
          <ul className="owner-guarantee__list">
            {guarantee.items.map((item, i) => (
              <motion.li
                key={item.title}
                className="owner-guarantee__item"
                {...scrollIn(i)}
              >
                <span className="owner-guarantee__number" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="owner-guarantee__title">{item.title}</h3>
                  <p className="owner-guarantee__body">{item.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <Services />
      <Testimonials />
      <CtaBanner />
    </main>
  )
}

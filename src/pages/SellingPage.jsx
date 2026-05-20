import { motion } from 'framer-motion'
import SEO from '../lib/seo.jsx'
import Services from '../components/Services.jsx'
import WhyChoose from '../components/WhyChoose.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { useScrollIn } from '../lib/motion.js'
import { selling } from '../content/selling.js'
import './ServicePage.css'

export default function SellingPage() {
  const scrollIn = useScrollIn()

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

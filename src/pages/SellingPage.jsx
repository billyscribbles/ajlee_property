import { motion } from 'framer-motion'
import SEO from '../lib/seo.jsx'
import Services from '../components/Services.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { useScrollIn } from '../lib/motion.js'
import { selling } from '../content/selling.js'
import './ServicePage.css'

export default function SellingPage() {
  const scrollIn = useScrollIn()

  return (
    <main className="service-page">
      <SEO title="Selling" path="/selling" />

      <section className="service-hero service-hero--with-media">
        <div className="service-hero__media" aria-hidden="true">
          <img
            src="/images/home-exterior-twilight.png"
            alt=""
            className="service-hero__image"
            loading="eager"
            fetchpriority="high"
          />
          <div className="service-hero__veil" />
        </div>

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

      <section className="service-showcase" aria-label="The homes we sell">
        <div className="container">
          <div className="service-showcase__grid">
            <figure className="service-showcase__figure">
              <img
                src="/images/home-open-plan-living.png"
                alt="Open-plan kitchen and living space with floor-to-ceiling glazing."
                loading="lazy"
                className="service-showcase__image"
              />
            </figure>
            <figure className="service-showcase__figure">
              <img
                src="/images/home-kitchen-island.png"
                alt="Walnut and marble kitchen island with brass pendants overhead."
                loading="lazy"
                className="service-showcase__image"
              />
            </figure>
          </div>
          <div className="service-showcase__copy">
            <span className="section-eyebrow">Presentation matters</span>
            <p className="service-showcase__lede">
              Editorial-grade campaigns built around the rooms buyers fall for
              &mdash; staged, photographed and launched to land hardest from day one.
            </p>
          </div>
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

      <Services exclude="Selling" />
      <CtaBanner
        image={{
          src: '/images/home-walnut-kitchen.png',
          alt: 'Designer walnut kitchen with marble waterfall island and brass pendants.',
        }}
      />
    </main>
  )
}

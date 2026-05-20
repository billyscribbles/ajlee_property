import SEO from '../lib/seo.jsx'
import MeetTheTeam from '../components/MeetTheTeam.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { about } from '../content/about.js'
import './AboutPage.css'

export default function AboutPage() {
  return (
    <main className="about">
      <SEO title="About Us" path="/about" />

      <section className="about-hero">
        <div className="about-hero__media" aria-hidden="true">
          <img
            src="/images/home-living-fireplace.png"
            alt=""
            className="about-hero__image"
            loading="eager"
            fetchpriority="high"
          />
          <div className="about-hero__veil" />
        </div>

        <div className="container about-hero__inner">
          <span className="section-eyebrow about-hero__eyebrow">{about.eyebrow}</span>
          <h1 className="about-hero__title">{about.title}</h1>
          <p className="about-hero__intro">{about.intro}</p>
        </div>
      </section>

      <section className="about-pillars">
        <div className="container">
          <div className="about-pillars__grid">
            {about.pillars.map((p) => (
              <article key={p.title} className="about-pillars__pillar">
                <h2 className="about-pillars__pillar-title">{p.title}</h2>
                <p className="about-pillars__pillar-body">{p.body}</p>
              </article>
            ))}
          </div>

          <div className="about-pillars__stats">
            {about.stats.map((s) => (
              <div key={s.label} className="about-pillars__stat">
                <div className="about-pillars__stat-value">{s.value}</div>
                <div className="about-pillars__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-showcase" aria-label="A glimpse of what we represent">
        <div className="container about-showcase__inner">
          <figure className="about-showcase__figure">
            <img
              src="/images/home-dining.png"
              alt="Open-plan dining space with brass pendant lighting and warm timber floors."
              loading="lazy"
              className="about-showcase__image"
            />
          </figure>
          <div className="about-showcase__copy">
            <span className="section-eyebrow">Homes we represent</span>
            <p className="about-showcase__lede">
              Considered architecture, thoughtful interiors and the kind of details that turn
              houses into homes &mdash; the standard we apply to every appraisal, listing and
              campaign.
            </p>
          </div>
        </div>
      </section>

      <MeetTheTeam variant="long" />
      <Testimonials />
      <CtaBanner
        image={{
          src: '/images/home-resort-lounge.png',
          alt: 'Outdoor lounge with pool, palms and open-plan living interior.',
        }}
      />
    </main>
  )
}

import SEO from '../lib/seo.jsx'
import WhyChoose from '../components/WhyChoose.jsx'
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
        <div className="container about-hero__inner">
          <span className="section-eyebrow about-hero__eyebrow">{about.eyebrow}</span>
          <h1 className="about-hero__title">{about.title}</h1>
          <p className="about-hero__intro">{about.intro}</p>

          <div className="about-hero__pillars">
            {about.pillars.map((p) => (
              <article key={p.title} className="about-hero__pillar">
                <h2 className="about-hero__pillar-title">{p.title}</h2>
                <p className="about-hero__pillar-body">{p.body}</p>
              </article>
            ))}
          </div>

          <div className="about-hero__stats">
            {about.stats.map((s) => (
              <div key={s.label} className="about-hero__stat">
                <div className="about-hero__stat-value">{s.value}</div>
                <div className="about-hero__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyChoose />
      <MeetTheTeam variant="long" />
      <Testimonials />
      <CtaBanner />
    </main>
  )
}

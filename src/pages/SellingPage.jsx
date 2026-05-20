import SEO from '../lib/seo.jsx'
import Services from '../components/Services.jsx'
import WhyChoose from '../components/WhyChoose.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { selling } from '../content/selling.js'
import './ServicePage.css'

export default function SellingPage() {
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

      <section className="service-process section">
        <div className="container">
          <h2 className="section-eyebrow service-process__eyebrow">Our process</h2>
          <ol className="service-process__list">
            {selling.process.map((step) => (
              <li key={step.number} className="service-process__step">
                <span className="service-process__number">{step.number}</span>
                <div className="service-process__content">
                  <h3 className="service-process__title">{step.title}</h3>
                  <p className="service-process__body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Services />
      <WhyChoose />
      <Testimonials />
      <CtaBanner />
    </main>
  )
}

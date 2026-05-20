import SEO from '../lib/seo.jsx'
import Services from '../components/Services.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import { propertyManagement } from '../content/propertyManagement.js'
import './ServicePage.css'

export default function PropertyManagementPage() {
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

      <section className="service-grid section">
        <div className="container">
          <h2 className="section-eyebrow service-grid__eyebrow">What we cover</h2>
          <div className="service-grid__list">
            {propertyManagement.services.map((s) => (
              <article key={s.title} className="service-grid__card">
                <h3 className="service-grid__title">{s.title}</h3>
                <p className="service-grid__body">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Services />
      <Testimonials />
      <CtaBanner />
    </main>
  )
}

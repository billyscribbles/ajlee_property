import SEO from '../lib/seo.jsx'
import Contact from '../components/Contact.jsx'
import './ContactPage.css'

export default function ContactPage() {
  return (
    <main className="contact-page">
      <SEO title="Contact" path="/contact" />

      <section className="contact-hero">
        <div className="contact-hero__media" aria-hidden="true">
          <img
            src="/images/home-poolside-lounge.webp"
            alt=""
            className="contact-hero__image"
            loading="eager"
            fetchpriority="high"
          />
          <div className="contact-hero__veil" />
        </div>

        <div className="container contact-hero__inner">
          <span className="section-eyebrow contact-hero__eyebrow">Get in touch</span>
          <h1 className="contact-hero__title">A conversation, first.</h1>
          <p className="contact-hero__intro">
            Whether you&rsquo;re ready to list, leasing your investment, or simply curious about
            what your property is worth — we&rsquo;d love to hear from you.
          </p>
        </div>
      </section>

      <Contact />
    </main>
  )
}

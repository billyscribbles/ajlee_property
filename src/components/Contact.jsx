import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { site } from '../config/site.config.js'
import './Contact.css'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const formspreeId = site.integrations.formspreeId

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    if (form.elements._gotcha?.value) return
    if (!formspreeId) {
      setStatus('error')
      return
    }
    setStatus('submitting')
    const data = new FormData(form)
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="contact section" id="contact">
      <div className="container contact__inner">
        <div className="contact__layout">
          <div className="contact__intro">
            <span className="section-eyebrow contact__eyebrow">Get in touch</span>
            <h2 className="contact__heading">Let&rsquo;s talk about your property.</h2>
            <p className="contact__lede">
              Whether you&rsquo;re selling, leasing or considering your next move, our team is here
              to listen first &mdash; and deliver beyond expectations.
            </p>

            <ul className="contact__details">
              {site.contact.phone && (
                <li className="contact__detail">
                  <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
                  <a href={`tel:${site.contact.phone.replace(/\s+/g, '')}`}>{site.contact.phone}</a>
                </li>
              )}
              {site.contact.email && (
                <li className="contact__detail">
                  <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
                  <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                </li>
              )}
              {site.contact.location && (
                <li className="contact__detail">
                  <MapPin size={18} strokeWidth={1.5} aria-hidden="true" />
                  <address>{site.contact.location}</address>
                </li>
              )}
            </ul>
          </div>

          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="contact__row">
              <label className="contact__field">
                <span>Name</span>
                <input type="text" name="name" autoComplete="name" required />
              </label>
              <label className="contact__field">
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" required />
              </label>
            </div>
            <label className="contact__field">
              <span>Phone (optional)</span>
              <input type="tel" name="phone" autoComplete="tel" />
            </label>
            <label className="contact__field">
              <span>How can we help?</span>
              <textarea name="message" rows="5" required />
            </label>

            <label className="contact__honeypot">
              Leave this field empty
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
            </label>

            <button type="submit" className="contact__submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
            </button>

            <p className="contact__status" role="status" aria-live="polite">
              {status === 'success' && (
                <span className="contact__status--success">
                  Thanks &mdash; we&rsquo;ll be in touch shortly.
                </span>
              )}
              {status === 'error' && (
                <span className="contact__status--error">
                  Something went wrong. Email us directly at {site.contact.email}.
                </span>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

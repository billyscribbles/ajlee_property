import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { site } from '../config/site.config.js'
import './Footer.css'

const SOCIAL_ICONS = {
  facebook: { Icon: Facebook, label: 'Facebook' },
  instagram: { Icon: Instagram, label: 'Instagram' },
  linkedin: { Icon: Linkedin, label: 'LinkedIn' },
  twitter: { Icon: Twitter, label: 'Twitter' },
}

export default function Footer() {
  const { brand, footer, social, contact } = site

  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__brand">
          <div className="footer__logo">
            {brand.logoSrc ? (
              <img src={brand.logoSrc} alt={brand.name} className="footer__logo-img" />
            ) : (
              <span className="footer__logo-text">{brand.logoText}</span>
            )}
          </div>
          <div className="footer__socials">
            {Object.entries(social).map(([key, href]) => {
              const meta = SOCIAL_ICONS[key]
              if (!href || !meta) return null
              const { Icon, label } = meta
              return (
                <a
                  key={key}
                  href={href}
                  className="footer__social"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon size={16} strokeWidth={1.7} />
                </a>
              )
            })}
          </div>
        </div>

        {footer.columns.map((col) => (
          <div key={col.title} className="footer__col">
            <div className="footer__col-title">{col.title}</div>
            <ul className="footer__links">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="footer__link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer__col footer__col--contact">
          <div className="footer__col-title">Get in touch</div>
          <ul className="footer__contact-info">
            {contact.phone && (
              <li>
                <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="footer__link">
                  {contact.phone}
                </a>
              </li>
            )}
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="footer__link">
                  {contact.email}
                </a>
              </li>
            )}
            {contact.location && (
              <li>
                <address className="footer__address">{contact.location}</address>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="footer__copyright">{footer.copyright}</span>
        <div className="footer__legal">
          <Link to="/privacy" className="footer__legal-btn">
            Privacy Policy
          </Link>
          <Link to="/terms" className="footer__legal-btn">
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  )
}

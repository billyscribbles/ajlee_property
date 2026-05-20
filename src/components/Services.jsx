import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, Building2, FileText, ArrowRight } from 'lucide-react'
import { services } from '../content/services.js'
import { useScrollIn } from '../lib/motion.js'
import './Services.css'

const ICONS = { Home, Building2, FileText }

export default function Services() {
  const scrollIn = useScrollIn()
  return (
    <section className="services section" aria-labelledby="services-heading">
      <div className="container">
        <div className="services__head">
          {services.eyebrow && (
            <h2 id="services-heading" className="section-eyebrow services__eyebrow">
              {services.eyebrow}
            </h2>
          )}
          {services.heading && <p className="section-label">{services.heading}</p>}
          {services.sub && <p className="section-sub">{services.sub}</p>}
        </div>

        <div className="services__grid">
          {services.items.map((item, i) => {
            const Icon = ICONS[item.icon] || Home
            return (
              <motion.article key={item.title} className="services__card" {...scrollIn(i)}>
                <span className="services__icon" aria-hidden="true">
                  <Icon size={24} strokeWidth={1.4} />
                </span>
                <h3 className="services__title">{item.title}</h3>
                <p className="services__body">{item.body}</p>
                {item.to && (
                  <Link to={item.to} className="services__cta">
                    <span>
                      Learn more<span className="sr-only"> about {item.title}</span>
                    </span>
                    <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
                  </Link>
                )}
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

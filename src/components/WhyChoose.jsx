import { motion } from 'framer-motion'
import { User, Award, MapPin } from 'lucide-react'
import { whyChoose } from '../content/whyChoose.js'
import { useScrollIn } from '../lib/motion.js'
import './WhyChoose.css'

const ICONS = { User, Award, MapPin }

export default function WhyChoose() {
  const scrollIn = useScrollIn()
  return (
    <section className="why-choose section" aria-labelledby="why-choose-heading">
      <div className="why-choose__inner">
        <div className="why-choose__content">
          {whyChoose.eyebrow && (
            <motion.span className="section-eyebrow" {...scrollIn(0)}>
              {whyChoose.eyebrow}
            </motion.span>
          )}
          <motion.h2 id="why-choose-heading" className="why-choose__heading" {...scrollIn(1)}>
            {whyChoose.heading.split('\n').map((line) => (
              <span key={line} className="why-choose__heading-line">
                {line}
              </span>
            ))}
          </motion.h2>
          <motion.p className="why-choose__body" {...scrollIn(2)}>
            {whyChoose.body}
          </motion.p>

          <ul className="why-choose__features">
            {whyChoose.features.map((feature, i) => {
              const Icon = ICONS[feature.icon] || User
              return (
                <motion.li key={feature.title} className="why-choose__feature" {...scrollIn(3 + i)}>
                  <span className="why-choose__feature-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.4} />
                  </span>
                  <h3 className="why-choose__feature-title">{feature.title}</h3>
                  <p className="why-choose__feature-body">{feature.body}</p>
                </motion.li>
              )
            })}
          </ul>
        </div>

        <motion.div
          className="why-choose__media"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={whyChoose.image.src}
            alt={whyChoose.image.alt}
            loading="lazy"
            className="why-choose__image"
          />
        </motion.div>
      </div>
    </section>
  )
}

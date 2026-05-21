import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { awards } from '../content/awards.js'
import { useScrollIn } from '../lib/motion.js'
import './Awards.css'

// One component, two placements. variant="compact" is the slim home band;
// variant="full" is the in-depth section on the About page (#recognition).
export default function Awards({ variant = 'compact' }) {
  const scrollIn = useScrollIn()
  const isFull = variant === 'full'
  const copy = isFull ? awards.about : awards.home
  const headingId = isFull ? 'awards-recognition-heading' : 'awards-home-heading'

  return (
    <section
      id={isFull ? 'recognition' : undefined}
      className={`awards section awards--${variant}`}
      aria-labelledby={headingId}
    >
      <div className="container awards__inner">
        <div className="awards__intro">
          <motion.span className="section-eyebrow" {...scrollIn(0)}>
            {awards.eyebrow}
          </motion.span>
          <motion.h2 id={headingId} className="awards__title" {...scrollIn(1)}>
            {copy.title}
          </motion.h2>
          <motion.p className="awards__body" {...scrollIn(2)}>
            {isFull ? copy.intro : copy.body}
          </motion.p>
          {!isFull && copy.link && (
            <motion.p className="awards__link-wrap" {...scrollIn(3)}>
              <Link className="awards__link" to={copy.link.to}>
                {copy.link.label}
                <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </motion.p>
          )}
        </div>

        <motion.ul
          className="awards__seals"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {awards.seals.map((seal) => (
            <li className="awards__seal" key={seal.label}>
              <img
                src={seal.src}
                alt={seal.alt}
                width="600"
                height="550"
                loading="lazy"
                className="awards__seal-img"
              />
              <span className="awards__seal-label">{seal.label}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

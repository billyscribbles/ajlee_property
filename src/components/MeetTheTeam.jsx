import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { team } from '../content/team.js'
import { useScrollIn } from '../lib/motion.js'
import './MeetTheTeam.css'

export default function MeetTheTeam() {
  const scrollIn = useScrollIn()

  return (
    <section className="team section" aria-labelledby="team-heading">
      <div className="team__inner">
        <motion.div
          className="team__media"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={team.portrait.src}
            alt={team.portrait.alt}
            loading="lazy"
            className="team__image"
          />
        </motion.div>

        <div className="team__content">
          {team.eyebrow && (
            <motion.span className="section-eyebrow team__eyebrow" {...scrollIn(0)}>
              {team.eyebrow}
            </motion.span>
          )}
          <motion.h2 id="team-heading" className="team__heading" {...scrollIn(1)}>
            {team.heading.split('\n').map((line) => (
              <span key={line} className="team__heading-line">
                {line}
              </span>
            ))}
          </motion.h2>
          <motion.p className="team__body" {...scrollIn(2)}>
            {team.body}
          </motion.p>

          <motion.div className="team__signature" {...scrollIn(3)}>
            <img
              src={team.signature.mark}
              alt=""
              className="team__signature-mark"
              aria-hidden="true"
            />
            <div className="team__signature-caption">
              <span className="team__signature-name">{team.signature.name}</span>
              <span className="team__signature-role">{team.signature.role}</span>
            </div>
          </motion.div>

          {team.cta && (
            <motion.div {...scrollIn(4)}>
              <Link to={team.cta.to} className="team__cta">
                <span>{team.cta.label}</span>
                <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

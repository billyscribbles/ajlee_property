import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { team } from '../content/team.js'
import { useScrollIn } from '../lib/motion.js'
import './MeetTheTeam.css'

export default function MeetTheTeam({ variant = 'short' }) {
  const scrollIn = useScrollIn()
  const useLongBio = variant === 'long'

  return (
    <section className="team section" aria-labelledby="team-heading">
      <div className="team__inner">
        <div className="team__intro">
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
        </div>

        <ul className="team__grid">
          {team.members.map((member, i) => (
            <motion.li key={member.name} className="team__card" {...scrollIn(3 + i)}>
              <div className="team__media">
                <img
                  src={member.photo}
                  alt={`${member.name}, ${member.role} at AJ Lee Property Group`}
                  loading="lazy"
                  className="team__image"
                  style={
                    member.photoPosition ? { objectPosition: member.photoPosition } : undefined
                  }
                />
              </div>
              <div className="team__card-body">
                <h3 className="team__name">{member.name}</h3>
                <p className="team__role">{member.role}</p>
                <p className="team__bio">{(useLongBio && member.bioLong) || member.bio}</p>
              </div>
            </motion.li>
          ))}
        </ul>

        {team.cta && (
          <motion.div className="team__cta-wrap" {...scrollIn(3 + team.members.length)}>
            <Link to={team.cta.to} className="team__cta">
              <span>{team.cta.label}</span>
              <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

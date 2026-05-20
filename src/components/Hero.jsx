import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { hero } from '../content/hero.js'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__media" aria-hidden="true">
        <img
          src={hero.image.src}
          alt=""
          className="hero__image"
          loading="eager"
          fetchpriority="high"
        />
        <div className="hero__media-veil" />
      </div>

      <div className="hero__inner">
        <div className="hero__content">
          <h1 className="hero__headline">
            {hero.headlineLines.map((line, i) => (
              <span
                key={line}
                className="hero__headline-line hero__fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {line}
              </span>
            ))}
          </h1>

          <div
            className="hero__rule hero__fade-up"
            style={{ animationDelay: '0.36s' }}
            aria-hidden="true"
          />

          <p className="hero__subheadline hero__fade-up" style={{ animationDelay: '0.42s' }}>
            {hero.subheadline}
          </p>

          <div className="hero__ctas hero__fade-up" style={{ animationDelay: '0.5s' }}>
            {hero.primaryCta && (
              <Link to={hero.primaryCta.to} className="hero__cta-primary">
                {hero.primaryCta.label}
              </Link>
            )}
            {hero.secondaryCta && (
              <Link to={hero.secondaryCta.to} className="hero__cta-secondary">
                <span>{hero.secondaryCta.label}</span>
                <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

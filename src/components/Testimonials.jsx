import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Star, ExternalLink } from 'lucide-react'
import { testimonials } from '../content/testimonials.js'
import './Testimonials.css'

const AUTO_ADVANCE_MS = 3000

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const total = testimonials.items.length
  const reduceMotion = useReducedMotion()

  const go = useCallback(
    (delta) => {
      setIndex((i) => (i + delta + total) % total)
    },
    [total],
  )

  const goTo = useCallback(
    (next) => {
      setIndex(((next % total) + total) % total)
    },
    [total],
  )

  // Collapse the quote whenever we switch reviews.
  useEffect(() => {
    setExpanded(false)
  }, [index])

  useEffect(() => {
    if (reduceMotion || paused || expanded || total <= 1) return undefined
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total)
    }, AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion, paused, expanded, total, index])

  const item = testimonials.items[index]
  const stars = item.stars ?? 5
  const paragraphs = item.quote.split('\n\n')
  const source = testimonials.source

  return (
    <section
      className="testimonials section"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container">
        <div className="testimonials__top">
          <h2 id="testimonials-heading" className="section-eyebrow testimonials__eyebrow">
            {testimonials.eyebrow}
          </h2>
          <div className="testimonials__rule" aria-hidden="true" />
        </div>

        <div className="testimonials__row">
          <div className="testimonials__mark" aria-hidden="true">
            <Quote size={56} strokeWidth={1} />
          </div>

          <div className="testimonials__quote-wrap">
            <AnimatePresence initial={false}>
              <motion.blockquote
                key={index}
                className="testimonials__quote"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.7, ease: 'easeInOut' }}
              >
                <div className="testimonials__meta">
                  <div
                    className="testimonials__stars"
                    role="img"
                    aria-label={`${stars} out of 5 stars`}
                  >
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill="currentColor"
                        strokeWidth={0}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  {source?.label && (
                    <span className="testimonials__source">{source.label} review</span>
                  )}
                </div>

                <div
                  className={`testimonials__text${expanded ? ' is-expanded' : ' is-clamped'}`}
                >
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <button
                  type="button"
                  className="testimonials__expand"
                  onClick={() => setExpanded((e) => !e)}
                  aria-expanded={expanded}
                >
                  {expanded ? 'See less' : 'See more'}
                </button>

                <footer className="testimonials__footer">
                  <cite className="testimonials__author">— {item.author}</cite>
                  {item.date && <span className="testimonials__date">{item.date}</span>}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="testimonials__nav" aria-label="Testimonial navigation">
            <button
              type="button"
              className="testimonials__nav-btn"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="testimonials__nav-btn"
              onClick={() => go(1)}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="testimonials__bottom">
          <div className="testimonials__dots" role="tablist" aria-label="Choose a review">
            {testimonials.items.map((t, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show review ${i + 1} of ${total}`}
                className={`testimonials__dot${i === index ? ' is-active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          {source?.url && (
            <a
              className="testimonials__readall"
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {source.readAllLabel ?? `Read all reviews on ${source.label}`}
              <ExternalLink size={14} strokeWidth={1.8} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

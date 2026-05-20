import { useState, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { testimonials } from '../content/testimonials.js'
import './Testimonials.css'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const total = testimonials.items.length
  const reduceMotion = useReducedMotion()

  const go = useCallback(
    (delta) => {
      setIndex((i) => (i + delta + total) % total)
    },
    [total],
  )

  const item = testimonials.items[index]
  const stars = item.stars ?? 5

  return (
    <section className="testimonials section" aria-labelledby="testimonials-heading">
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
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={index}
                className="testimonials__quote"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="testimonials__text">{item.quote}</p>
                <footer className="testimonials__footer">
                  <cite className="testimonials__author">— {item.author}</cite>
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
                  {item.role && <span className="testimonials__role">{item.role}</span>}
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
      </div>
    </section>
  )
}

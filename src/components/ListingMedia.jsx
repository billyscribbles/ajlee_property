import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './ListingMedia.css'

export default function ListingMedia({
  gallery,
  imageAlt,
  status,
  wrapperClassName,
  imageClassName,
  statusClassName,
}) {
  const [index, setIndex] = useState(0)
  const list = Array.isArray(gallery) ? gallery : []
  const hasMultiple = list.length > 1
  const safeIndex = list.length === 0 ? 0 : index % list.length
  const current = list[safeIndex] ?? null

  const step = (event, delta) => {
    event.preventDefault()
    event.stopPropagation()
    setIndex((i) => (i + delta + list.length) % list.length)
  }

  const jump = (event, target) => {
    event.preventDefault()
    event.stopPropagation()
    setIndex(target)
  }

  return (
    <div className={wrapperClassName}>
      {current ? (
        <img
          src={current.src}
          alt={current.alt ?? imageAlt}
          loading="lazy"
          className={imageClassName}
        />
      ) : (
        <div className={imageClassName} style={{ background: 'var(--color-bg-alt)' }} />
      )}
      {status && <span className={statusClassName}>{status}</span>}
      {hasMultiple && (
        <>
          <button
            type="button"
            className="listing-media__nav listing-media__nav--prev"
            onClick={(e) => step(e, -1)}
            aria-label="Previous photo"
          >
            <ChevronLeft size={20} strokeWidth={1.6} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="listing-media__nav listing-media__nav--next"
            onClick={(e) => step(e, 1)}
            aria-label="Next photo"
          >
            <ChevronRight size={20} strokeWidth={1.6} aria-hidden="true" />
          </button>
          <div className="listing-media__dots" role="tablist" aria-label="Photo navigation">
            {list.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === safeIndex}
                aria-label={`Show photo ${i + 1} of ${list.length}`}
                className={
                  i === safeIndex
                    ? 'listing-media__dot listing-media__dot--active'
                    : 'listing-media__dot'
                }
                onClick={(e) => jump(e, i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

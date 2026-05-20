import { useRef, useState } from 'react'
import { Upload, ArrowUp, ArrowDown, X } from 'lucide-react'
import { adminApi } from '../../lib/adminApi.js'
import { publicImageUrl } from '../../lib/supabase.js'

const ACCEPT = ['image/jpeg', 'image/png', 'image/webp']
const MAX_BYTES = 5 * 1024 * 1024

export default function ImageUploader({ listingId, images, onChange, disabled = false }) {
  const fileInput = useRef(null)
  const [over, setOver] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleFiles(fileList) {
    if (!listingId) {
      setError('Save the listing first, then add images.')
      return
    }
    const files = Array.from(fileList)
    const valid = []
    for (const f of files) {
      if (!ACCEPT.includes(f.type)) {
        setError(`Skipped ${f.name}: only JPG, PNG, or WEBP.`)
        continue
      }
      if (f.size > MAX_BYTES) {
        setError(`Skipped ${f.name}: over 5MB.`)
        continue
      }
      valid.push(f)
    }
    if (!valid.length) return
    setBusy(true)
    setError('')
    let next = images
    try {
      for (const file of valid) {
        const result = await adminApi.uploadImage(listingId, file, '')
        next = [...next, { path: result.path, alt: result.alt ?? '' }]
        onChange(next)
      }
    } catch (e) {
      setError(e.message || 'Upload failed.')
    } finally {
      setBusy(false)
    }
  }

  function onDrop(e) {
    e.preventDefault()
    setOver(false)
    if (disabled || busy) return
    handleFiles(e.dataTransfer.files)
  }

  async function removeAt(i) {
    if (!listingId) return
    setBusy(true)
    setError('')
    try {
      const res = await adminApi.removeImage(listingId, i)
      onChange(res.images ?? images.filter((_, idx) => idx !== i))
    } catch (e) {
      setError(e.message || 'Remove failed.')
    } finally {
      setBusy(false)
    }
  }

  async function move(i, delta) {
    const j = i + delta
    if (j < 0 || j >= images.length) return
    const next = [...images]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
    if (!listingId) return
    setBusy(true)
    setError('')
    try {
      await adminApi.setImages(listingId, next)
    } catch (e) {
      setError(e.message || 'Reorder failed.')
    } finally {
      setBusy(false)
    }
  }

  function updateAlt(i, alt) {
    const next = images.map((img, idx) => (idx === i ? { ...img, alt } : img))
    onChange(next)
  }

  async function commitAlt() {
    if (!listingId) return
    try {
      await adminApi.setImages(listingId, images)
    } catch (e) {
      setError(e.message || 'Saving alt text failed.')
    }
  }

  return (
    <div>
      <label
        className={`admin-uploader__dropzone ${over ? 'admin-uploader__dropzone--over' : ''}`}
        onDragOver={(e) => {
          e.preventDefault()
          setOver(true)
        }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
      >
        <Upload size={18} strokeWidth={1.6} aria-hidden="true" />
        <span>
          {listingId
            ? 'Drag photos here, or click to upload'
            : 'Save the listing first to enable uploads'}
        </span>
        <span style={{ fontSize: 11, opacity: 0.7 }}>JPG, PNG, or WEBP — up to 5MB each</span>
        <input
          ref={fileInput}
          type="file"
          accept={ACCEPT.join(',')}
          multiple
          disabled={disabled || busy || !listingId}
          onChange={(e) => {
            handleFiles(e.target.files)
            e.target.value = ''
          }}
        />
      </label>

      {error && (
        <div className="admin-error" role="alert" style={{ marginTop: 12 }}>
          {error}
        </div>
      )}

      {images.length > 0 && (
        <div className="admin-uploader__grid">
          {images.map((img, i) => (
            <div key={`${img.path}-${i}`} className="admin-uploader__item">
              <div className="admin-uploader__thumb-wrap">
                <img
                  className="admin-uploader__thumb"
                  src={publicImageUrl(img.path)}
                  alt={img.alt || 'Listing image'}
                />
                <button
                  type="button"
                  className="admin-uploader__remove"
                  onClick={() => removeAt(i)}
                  disabled={busy}
                  aria-label="Remove image"
                  title="Remove image"
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
              </div>
              <div className="admin-uploader__row">
                <input
                  className="admin-uploader__alt"
                  placeholder="Alt text"
                  value={img.alt ?? ''}
                  onChange={(e) => updateAlt(i, e.target.value)}
                  onBlur={commitAlt}
                  disabled={busy}
                />
                <button
                  type="button"
                  className="admin-uploader__icon-btn"
                  onClick={() => move(i, -1)}
                  disabled={busy || i === 0}
                  aria-label="Move up"
                  title="Move up"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  className="admin-uploader__icon-btn"
                  onClick={() => move(i, 1)}
                  disabled={busy || i === images.length - 1}
                  aria-label="Move down"
                  title="Move down"
                >
                  <ArrowDown size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="admin-uploader__hint">
        First image is used as the card hero. Drag the arrows to reorder.
      </p>
    </div>
  )
}

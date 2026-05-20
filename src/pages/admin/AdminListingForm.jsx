import { useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ChevronLeft, Trash2 } from 'lucide-react'
import { adminApi, UnauthorizedError } from '../../lib/adminApi.js'
import SEO from '../../lib/seo.jsx'
import Toggle from '../../components/admin/Toggle.jsx'
import ImageUploader from '../../components/admin/ImageUploader.jsx'
import ThemeToggle from '../../components/admin/ThemeToggle.jsx'
import { useAdminTheme } from '../../lib/adminTheme.js'
import './admin.css'

const STATUS_OPTIONS = ['For Sale', 'For Lease', 'Under Offer', 'Sold', 'Leased']

const EMPTY = {
  slug: '',
  status: 'For Sale',
  address: '',
  suburb: '',
  beds: 0,
  baths: 0,
  parking: 0,
  price: '',
  rea_url: '',
  published: false,
  featured: false,
  images: [],
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

export default function AdminListingForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const { theme, setTheme } = useAdminTheme()
  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(isEdit)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit) return
    let cancelled = false
    ;(async () => {
      try {
        const row = await adminApi.getOne(id)
        if (cancelled) return
        setForm({
          slug: row.slug ?? '',
          status: row.status ?? 'For Sale',
          address: row.address ?? '',
          suburb: row.suburb ?? '',
          beds: row.beds ?? 0,
          baths: row.baths ?? 0,
          parking: row.parking ?? 0,
          price: row.price ?? '',
          rea_url: row.rea_url ?? '',
          published: Boolean(row.published),
          featured: Boolean(row.featured),
          images: Array.isArray(row.images) ? row.images : [],
        })
      } catch (err) {
        if (err instanceof UnauthorizedError) {
          navigate('/admin/login', { replace: true })
          return
        }
        setError(err.message || 'Failed to load listing.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id, isEdit, navigate])

  const computedSlug = useMemo(() => {
    if (isEdit && form.slug) return form.slug
    return slugify(`${form.address} ${form.suburb}`)
  }, [isEdit, form.address, form.suburb, form.slug])

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const payload = {
      ...form,
      slug: computedSlug,
      rea_url: form.rea_url.trim(),
      beds: Number(form.beds) || 0,
      baths: Number(form.baths) || 0,
      parking: Number(form.parking) || 0,
    }
    try {
      if (isEdit) {
        await adminApi.update(id, payload)
        navigate('/admin')
      } else {
        const created = await adminApi.create(payload)
        navigate(`/admin/listings/${created.id}`, { replace: true })
      }
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        navigate('/admin/login', { replace: true })
        return
      }
      setError(err.message || 'Save failed.')
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete() {
    if (!isEdit) return
    if (!window.confirm(`Delete listing at ${form.address}? This cannot be undone.`)) return
    setBusy(true)
    try {
      await adminApi.remove(id)
      navigate('/admin')
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        navigate('/admin/login', { replace: true })
        return
      }
      setError(err.message || 'Delete failed.')
      setBusy(false)
    }
  }

  if (loading) {
    return (
      <div className="admin" data-admin-theme={theme}>
        <div className="admin__container">
          <p style={{ color: 'var(--color-muted)' }}>Loading listing…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin" data-admin-theme={theme}>
      <SEO title={isEdit ? 'Edit listing' : 'New listing'} />
      <div className="admin__container">
        <div className="admin__topbar">
          <div>
            <Link to="/admin" className="admin-btn admin-btn--ghost" style={{ marginBottom: 8 }}>
              <ChevronLeft size={14} aria-hidden="true" /> Back to listings
            </Link>
            <h1 className="admin__title">{isEdit ? 'Edit listing' : 'New listing'}</h1>
          </div>
          <div className="admin__actions">
            <ThemeToggle theme={theme} onChange={setTheme} />
          </div>
        </div>

        {error && (
          <div className="admin-error" role="alert" style={{ marginBottom: 16 }}>
            {error}
          </div>
        )}

        <form className="admin-card" onSubmit={handleSubmit}>
          <div className="admin-form">
            <div className="admin-field admin-form__full">
              <label className="admin-field__label" htmlFor="address">
                Address
              </label>
              <input
                id="address"
                className="admin-input"
                value={form.address}
                onChange={(e) => set('address', e.target.value)}
                placeholder="12 The Boulevard"
                required
              />
            </div>

            <div className="admin-field">
              <label className="admin-field__label" htmlFor="suburb">
                Suburb
              </label>
              <input
                id="suburb"
                className="admin-input"
                value={form.suburb}
                onChange={(e) => set('suburb', e.target.value)}
                placeholder="Mount Eliza"
                required
              />
            </div>

            <div className="admin-field">
              <label className="admin-field__label" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                className="admin-select"
                value={form.status}
                onChange={(e) => set('status', e.target.value)}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-field">
              <label className="admin-field__label" htmlFor="price">
                Price (display string)
              </label>
              <input
                id="price"
                className="admin-input"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
                placeholder="$2,850,000 or $1,200 per week"
              />
            </div>

            <div className="admin-field admin-form__full">
              <label className="admin-field__label" htmlFor="rea_url">
                realestate.com.au URL
              </label>
              <input
                id="rea_url"
                className="admin-input"
                type="url"
                value={form.rea_url}
                onChange={(e) => set('rea_url', e.target.value)}
                placeholder="https://www.realestate.com.au/property-…"
              />
              <p className="admin-field__hint">
                Where the card opens when a visitor clicks it. Leave blank to fall back to the
                contact page.
              </p>
            </div>

            <div className="admin-field">
              <label className="admin-field__label" htmlFor="beds">
                Beds
              </label>
              <input
                id="beds"
                className="admin-input"
                type="number"
                min={0}
                value={form.beds}
                onChange={(e) => set('beds', e.target.value)}
              />
            </div>

            <div className="admin-field">
              <label className="admin-field__label" htmlFor="baths">
                Baths
              </label>
              <input
                id="baths"
                className="admin-input"
                type="number"
                min={0}
                value={form.baths}
                onChange={(e) => set('baths', e.target.value)}
              />
            </div>

            <div className="admin-field">
              <label className="admin-field__label" htmlFor="parking">
                Parking
              </label>
              <input
                id="parking"
                className="admin-input"
                type="number"
                min={0}
                value={form.parking}
                onChange={(e) => set('parking', e.target.value)}
              />
            </div>

            <div
              className="admin-field admin-form__full"
              style={{ flexDirection: 'row', gap: 32, alignItems: 'center' }}
            >
              <Toggle
                checked={form.published}
                onChange={(v) => set('published', v)}
                label="Published"
              />
              <Toggle
                checked={form.featured}
                onChange={(v) => set('featured', v)}
                label="Featured on home"
              />
            </div>

            <div className="admin-field admin-form__full">
              <span className="admin-field__label">Images</span>
              <ImageUploader
                listingId={isEdit ? id : null}
                images={form.images}
                onChange={(imgs) => set('images', imgs)}
                disabled={busy}
              />
            </div>

            <div className="admin-form__actions">
              <div>
                {isEdit && (
                  <button
                    type="button"
                    className="admin-btn admin-btn--danger"
                    onClick={handleDelete}
                    disabled={busy}
                  >
                    <Trash2 size={14} aria-hidden="true" /> Delete listing
                  </button>
                )}
              </div>
              <div className="admin-form__actions-right">
                <Link to="/admin" className="admin-btn admin-btn--ghost">
                  Cancel
                </Link>
                <button type="submit" className="admin-btn admin-btn--primary" disabled={busy}>
                  {busy ? 'Saving…' : isEdit ? 'Save changes' : 'Create listing'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

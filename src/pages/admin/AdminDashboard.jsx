import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Pencil, LogOut } from 'lucide-react'
import { adminApi, UnauthorizedError } from '../../lib/adminApi.js'
import { clearStoredPassword } from '../../lib/adminAuth.js'
import { publicImageUrl } from '../../lib/supabase.js'
import SEO from '../../lib/seo.jsx'
import Toggle from '../../components/admin/Toggle.jsx'
import ThemeToggle from '../../components/admin/ThemeToggle.jsx'
import { useAdminTheme } from '../../lib/adminTheme.js'
import './admin.css'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { theme, setTheme } = useAdminTheme()
  const [listings, setListings] = useState(null)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState(null)

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function load() {
    try {
      const data = await adminApi.listAll()
      setListings(data ?? [])
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        navigate('/admin/login', { replace: true })
        return
      }
      setError(err.message || 'Failed to load listings.')
      setListings([])
    }
  }

  async function toggleField(row, field, value) {
    setBusyId(row.id)
    try {
      const updated = await adminApi.update(row.id, { [field]: value })
      setListings((prev) => prev.map((l) => (l.id === row.id ? updated : l)))
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        navigate('/admin/login', { replace: true })
        return
      }
      setError(err.message || 'Update failed.')
    } finally {
      setBusyId(null)
    }
  }

  function signOut() {
    clearStoredPassword()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="admin" data-admin-theme={theme}>
      <SEO title="Admin dashboard" />
      <div className="admin__container">
        <div className="admin__topbar">
          <div>
            <p className="admin__subtitle">Admin</p>
            <h1 className="admin__title">Listings</h1>
          </div>
          <div className="admin__actions">
            <ThemeToggle theme={theme} onChange={setTheme} />
            <Link to="/admin/listings/new" className="admin-btn admin-btn--primary">
              <Plus size={14} aria-hidden="true" /> New listing
            </Link>
            <button type="button" className="admin-btn admin-btn--ghost" onClick={signOut}>
              <LogOut size={14} aria-hidden="true" /> Sign out
            </button>
          </div>
        </div>

        {error && (
          <div className="admin-error" role="alert" style={{ marginBottom: 16 }}>
            {error}
          </div>
        )}

        <div className="admin-table-wrapper">
          {listings === null ? (
            <div className="admin-empty">Loading…</div>
          ) : listings.length === 0 ? (
            <div className="admin-empty">
              No listings yet. Click <strong>New listing</strong> to add the first one.
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: 80 }}>Image</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Published</th>
                  <th>Featured</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((row) => {
                  const hero = Array.isArray(row.images) ? row.images[0] : null
                  return (
                    <tr key={row.id}>
                      <td>
                        {hero?.path ? (
                          <img
                            className="admin-table__thumb"
                            src={publicImageUrl(hero.path)}
                            alt={hero.alt || ''}
                          />
                        ) : (
                          <div className="admin-table__thumb-empty" aria-hidden="true" />
                        )}
                      </td>
                      <td>
                        <div className="admin-table__address">{row.address}</div>
                        <div className="admin-table__suburb">{row.suburb}</div>
                      </td>
                      <td>
                        <span className="admin-table__status">{row.status}</span>
                      </td>
                      <td>
                        <Toggle
                          checked={row.published}
                          onChange={(v) => toggleField(row, 'published', v)}
                          disabled={busyId === row.id}
                        />
                      </td>
                      <td>
                        <Toggle
                          checked={row.featured}
                          onChange={(v) => toggleField(row, 'featured', v)}
                          disabled={busyId === row.id}
                        />
                      </td>
                      <td>
                        <div className="admin-table__row-actions">
                          <Link
                            to={`/admin/listings/${row.id}`}
                            className="admin-btn admin-btn--ghost"
                            aria-label={`Edit ${row.address}`}
                          >
                            <Pencil size={14} aria-hidden="true" /> Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { adminApi, UnauthorizedError } from '../../lib/adminApi.js'
import { setStoredPassword } from '../../lib/adminAuth.js'
import SEO from '../../lib/seo.jsx'
import ThemeToggle from '../../components/admin/ThemeToggle.jsx'
import { useAdminTheme } from '../../lib/adminTheme.js'
import './admin.css'

export default function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, setTheme } = useAdminTheme()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!password) return
    setBusy(true)
    setError('')
    try {
      await adminApi.ping(password)
      setStoredPassword(password)
      const to = location.state?.from?.pathname || '/admin'
      navigate(to, { replace: true })
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        setError('Incorrect password.')
      } else {
        setError(err.message || 'Login failed.')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin-login" data-admin-theme={theme}>
      <SEO title="Admin login" />
      <ThemeToggle theme={theme} onChange={setTheme} />
      <div className="admin-login__card">
        <h1 className="admin-login__heading">Admin sign in</h1>
        <p className="admin-login__sub">AJ Lee Property — listing management.</p>
        <form className="admin-login__form" onSubmit={handleSubmit}>
          {error && (
            <div className="admin-error" role="alert">
              {error}
            </div>
          )}
          <div className="admin-field">
            <label className="admin-field__label" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              className="admin-input"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="admin-btn admin-btn--primary"
            disabled={busy || !password}
          >
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

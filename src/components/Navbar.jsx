import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { site } from '../config/site.config.js'
import './Navbar.css'

function DesktopNavItem({ item }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const closeTimer = useRef(null)
  const { pathname } = useLocation()
  const hasChildren = Array.isArray(item.children) && item.children.length > 0

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  if (!hasChildren) {
    return (
      <NavLink
        to={item.to}
        end={item.to === '/'}
        className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
      >
        {item.label}
      </NavLink>
    )
  }

  const parentActive = pathname === item.to || pathname.startsWith(`${item.to}/`) || open

  return (
    <div
      className="navbar__dropdown"
      ref={wrapRef}
      onMouseEnter={() => {
        cancelClose()
        setOpen(true)
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => {
        cancelClose()
        setOpen(true)
      }}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget)) setOpen(false)
      }}
    >
      <NavLink
        to={item.to}
        end={item.to === '/'}
        className={`navbar__link navbar__dropdown-trigger${parentActive ? ' navbar__link--active' : ''}`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown
          size={14}
          strokeWidth={2}
          aria-hidden="true"
          className="navbar__dropdown-caret"
        />
      </NavLink>
      <div className={`navbar__dropdown-panel${open ? ' open' : ''}`} role="menu">
        {item.children.map((child) => (
          <NavLink
            key={child.to}
            to={child.to}
            className={({ isActive }) =>
              `navbar__dropdown-link${isActive ? ' navbar__dropdown-link--active' : ''}`
            }
            role="menuitem"
          >
            {child.label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const { brand, nav } = site

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo" aria-label={brand.name}>
          {brand.logoSrc ? (
            <img src={brand.logoSrc} alt={brand.name} className="navbar__logo-img" />
          ) : (
            brand.logoText
          )}
        </Link>

        <nav className="navbar__links" aria-label="Main navigation">
          {nav.map((l) => (
            <DesktopNavItem key={l.to} item={l} />
          ))}
        </nav>

        <button
          className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className={`navbar__mobile${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">
        {nav.map((l) => (
          <div key={l.to} className="navbar__mobile-group">
            <NavLink
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
            {Array.isArray(l.children) && l.children.length > 0 && (
              <div className="navbar__mobile-children">
                {l.children.map((child) => (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    className={({ isActive }) =>
                      `navbar__mobile-sublink${isActive ? ' navbar__mobile-sublink--active' : ''}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </header>
  )
}

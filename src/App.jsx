import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useLayoutEffect, lazy, Suspense } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import RouteFallback from './components/RouteFallback.jsx'
import { trackPageview } from './lib/analytics.js'

// Retry lazy imports once, then force a reload if the chunk is gone.
// Prevents white-pages on stale tabs after a redeploy.
const RELOAD_KEY = 'ajlee:chunk-reloaded'
function lazyWithRetry(factory) {
  return lazy(() =>
    factory().catch((err) => {
      const already = sessionStorage.getItem(RELOAD_KEY) === '1'
      if (!already) {
        sessionStorage.setItem(RELOAD_KEY, '1')
        window.location.reload()
        return new Promise(() => {})
      }
      sessionStorage.removeItem(RELOAD_KEY)
      throw err
    }),
  )
}

if (typeof window !== 'undefined') {
  window.addEventListener('load', () => sessionStorage.removeItem(RELOAD_KEY))
}

const AboutPage = lazyWithRetry(() => import('./pages/AboutPage.jsx'))
const SellingPage = lazyWithRetry(() => import('./pages/SellingPage.jsx'))
const ListingsPage = lazyWithRetry(() => import('./pages/ListingsPage.jsx'))
const PropertyManagementPage = lazyWithRetry(() => import('./pages/PropertyManagementPage.jsx'))
const ContactPage = lazyWithRetry(() => import('./pages/ContactPage.jsx'))
const LegalPage = lazyWithRetry(() => import('./pages/LegalPage.jsx'))
const NotFoundPage = lazyWithRetry(() => import('./pages/NotFoundPage.jsx'))
const AdminLogin = lazyWithRetry(() => import('./pages/admin/AdminLogin.jsx'))
const AdminDashboard = lazyWithRetry(() => import('./pages/admin/AdminDashboard.jsx'))
const AdminListingForm = lazyWithRetry(() => import('./pages/admin/AdminListingForm.jsx'))
const RequireAuth = lazyWithRetry(() => import('./components/admin/RequireAuth.jsx'))

// Resets scroll on navigation and reports the page view to analytics.
function RouteChange() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])
  useLayoutEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])
  useEffect(() => {
    trackPageview(`${pathname}${hash}`)
  }, [pathname, hash])
  return null
}

function AppShell() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')
  return (
    <>
      {!isAdmin && (
        <a href="#main" className="skip-link">
          Skip to content
        </a>
      )}
      {!isAdmin && <Navbar />}
      <div id="main" tabIndex={-1}>
        <ErrorBoundary>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/selling" element={<SellingPage />} />
              <Route path="/listings" element={<ListingsPage />} />
              <Route path="/listings/:status" element={<ListingsPage />} />
              <Route path="/property-management" element={<PropertyManagementPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<LegalPage type="privacy" />} />
              <Route path="/terms" element={<LegalPage type="terms" />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <RequireAuth>
                    <AdminDashboard />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/listings/new"
                element={
                  <RequireAuth>
                    <AdminListingForm />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/listings/:id"
                element={
                  <RequireAuth>
                    <AdminListingForm />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
      {!isAdmin && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteChange />
      <AppShell />
    </BrowserRouter>
  )
}

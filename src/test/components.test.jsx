// Contract: chrome components render brand strings and links straight from
// site.config, never hardcoded. This proves the wire is live, so a config
// swap is enough to reskin the chrome.
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Awards from '../components/Awards.jsx'
import { site } from '../config/site.config.js'
import { awards } from '../content/awards.js'

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  )

const renderFooter = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  )

describe('Navbar — renders brand + nav from site.config', () => {
  it('labels the logo with the brand name', () => {
    renderNavbar()
    expect(screen.getByLabelText(site.brand.name)).toBeInTheDocument()
  })

  it('renders every nav item from config', () => {
    renderNavbar()
    for (const item of site.nav) {
      // Each label appears in both the desktop and mobile nav.
      expect(screen.getAllByText(item.label).length).toBeGreaterThan(0)
    }
  })
})

describe('Footer — renders contact and copyright from site.config', () => {
  it('renders the copyright line', () => {
    renderFooter()
    expect(screen.getByText(site.footer.copyright)).toBeInTheDocument()
  })

  it('renders the contact email and phone', () => {
    renderFooter()
    expect(screen.getByText(site.contact.email)).toBeInTheDocument()
    expect(screen.getByText(site.contact.phone)).toBeInTheDocument()
  })
})

describe('Awards — renders both finalist seals from content', () => {
  const renderAwards = (variant) =>
    render(
      <MemoryRouter>
        <Awards variant={variant} />
      </MemoryRouter>,
    )

  it('renders every seal image and caption in the compact variant', () => {
    renderAwards('compact')
    for (const seal of awards.seals) {
      expect(screen.getByAltText(seal.alt)).toBeInTheDocument()
      expect(screen.getByText(seal.label)).toBeInTheDocument()
    }
  })

  it('exposes the recognition anchor in the full variant', () => {
    const { container } = renderAwards('full')
    expect(container.querySelector('#recognition')).toBeInTheDocument()
    for (const seal of awards.seals) {
      expect(screen.getByAltText(seal.alt)).toBeInTheDocument()
    }
  })
})

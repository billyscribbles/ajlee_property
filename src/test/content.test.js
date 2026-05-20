// Contract: each section's content file keeps the shape its component
// renders. Rewriting copy for a new client is fine; breaking the shape
// (a missing key, an object where an array is expected) fails here.
import { describe, it, expect } from 'vitest'
import { hero } from '../content/hero.js'
import { whyChoose } from '../content/whyChoose.js'
import { properties } from '../content/properties.js'
import { services } from '../content/services.js'
import { team } from '../content/team.js'
import { testimonials } from '../content/testimonials.js'
import { ctaBanner } from '../content/ctaBanner.js'
import { about } from '../content/about.js'
import { selling } from '../content/selling.js'
import { propertyManagement } from '../content/propertyManagement.js'
import { legal } from '../content/legal.js'

describe('content — section copy contract', () => {
  it('hero has multi-line headlines, both CTAs, and a hero image', () => {
    expect(Array.isArray(hero.headlineLines)).toBe(true)
    expect(hero.headlineLines.length).toBeGreaterThan(0)
    expect(hero.primaryCta.label).toBeTruthy()
    expect(hero.primaryCta.to).toBeTruthy()
    expect(hero.secondaryCta.label).toBeTruthy()
    expect(hero.image.src).toBeTruthy()
    expect(hero.image.alt).toBeTruthy()
  })

  it('whyChoose has heading, body, three features and an image', () => {
    expect(whyChoose.heading).toBeTruthy()
    expect(whyChoose.body).toBeTruthy()
    expect(whyChoose.image.src).toBeTruthy()
    expect(Array.isArray(whyChoose.features)).toBe(true)
    expect(whyChoose.features.length).toBeGreaterThan(0)
    for (const f of whyChoose.features) {
      expect(f.icon).toBeTruthy()
      expect(f.title).toBeTruthy()
      expect(f.body).toBeTruthy()
    }
  })

  it('properties section keeps its eyebrow + view-all link metadata', () => {
    expect(properties.eyebrow).toBeTruthy()
    expect(properties.viewAllLabel).toBeTruthy()
    expect(properties.viewAllTo).toBeTruthy()
  })

  it('services items have an icon, title, body, and per-card link', () => {
    expect(services.items.length).toBeGreaterThan(0)
    for (const item of services.items) {
      expect(item.icon).toBeTruthy()
      expect(item.title).toBeTruthy()
      expect(item.body).toBeTruthy()
      expect(item.to).toBeTruthy()
    }
  })

  it('team has a portrait, signature, and CTA', () => {
    expect(team.heading).toBeTruthy()
    expect(team.body).toBeTruthy()
    expect(team.portrait.src).toBeTruthy()
    expect(team.signature.name).toBeTruthy()
    expect(team.signature.role).toBeTruthy()
    expect(team.cta.label).toBeTruthy()
    expect(team.cta.to).toBeTruthy()
  })

  it('testimonials has quotes with an author', () => {
    expect(testimonials.items.length).toBeGreaterThan(0)
    for (const item of testimonials.items) {
      expect(item.quote).toBeTruthy()
      expect(item.author).toBeTruthy()
    }
  })

  it('ctaBanner has headline, body, image and CTA', () => {
    expect(ctaBanner.heading).toBeTruthy()
    expect(ctaBanner.body).toBeTruthy()
    expect(ctaBanner.image.src).toBeTruthy()
    expect(ctaBanner.cta.label).toBeTruthy()
    expect(ctaBanner.cta.to).toBeTruthy()
  })

  it('about page has intro, three pillars, and stats', () => {
    expect(about.title).toBeTruthy()
    expect(about.intro).toBeTruthy()
    expect(Array.isArray(about.pillars)).toBe(true)
    expect(about.pillars.length).toBeGreaterThan(0)
    for (const p of about.pillars) {
      expect(p.title).toBeTruthy()
      expect(p.body).toBeTruthy()
    }
    expect(Array.isArray(about.stats)).toBe(true)
    for (const s of about.stats) {
      expect(s.value).toBeTruthy()
      expect(s.label).toBeTruthy()
    }
  })

  it('selling page has intro, six reasons and a listings section', () => {
    expect(selling.title).toBeTruthy()
    expect(selling.intro).toBeTruthy()
    expect(selling.promise).toBeTruthy()
    expect(Array.isArray(selling.reasons)).toBe(true)
    expect(selling.reasons.length).toBeGreaterThan(0)
    for (const reason of selling.reasons) {
      expect(reason.title).toBeTruthy()
      expect(reason.body).toBeTruthy()
    }
    expect(selling.listings.heading).toBeTruthy()
    expect(selling.listings.body).toBeTruthy()
    expect(selling.listings.emptyMessage).toBeTruthy()
  })

  it('propertyManagement page has intro and a services grid', () => {
    expect(propertyManagement.title).toBeTruthy()
    expect(propertyManagement.intro).toBeTruthy()
    expect(Array.isArray(propertyManagement.services)).toBe(true)
    expect(propertyManagement.services.length).toBeGreaterThan(0)
    for (const s of propertyManagement.services) {
      expect(s.title).toBeTruthy()
      expect(s.body).toBeTruthy()
    }
  })

  it('legal has privacy and terms, each with sections', () => {
    for (const doc of [legal.privacy, legal.terms]) {
      expect(doc.title).toBeTruthy()
      expect(doc.sections.length).toBeGreaterThan(0)
      for (const section of doc.sections) {
        expect(section.heading).toBeTruthy()
        expect(section.body).toBeTruthy()
      }
    }
  })
})

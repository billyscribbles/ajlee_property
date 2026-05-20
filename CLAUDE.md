# CLAUDE.md — AJ Lee Property Group

This repo is the **marketing site for AJ Lee Property Group**, a boutique
Melbourne real estate agency serving the South East with personalised selling,
property management and appraisal services.

It is built on Billy's React + Vite landing-site architecture. The architecture
itself is config-driven: brand, theme, and per-section copy live in
configuration and content files, not in components. When you edit this site,
**reach for the config/content layer first** — only touch components when
behavior or markup must change.

## Tech stack

- React 18 + Vite 5
- React Router v7 (SPA, BrowserRouter, lazy-loaded pages)
- Plain CSS + CSS variables — **no Tailwind**
- Framer Motion 11 (scroll-in `whileInView` pattern, reduced-motion aware)
- Lucide React icons
- Yarn 4.12 with `.pnp` caching
- `react-helmet-async` for per-page SEO
- Formspree for the contact form (env-driven; no ID set yet)
- Railway deployment (`railway.json`) — driven by the `railway-deploy` skill
- ESLint (flat config) + Prettier; Vitest for the contract suite
- GitHub Actions CI (`.github/workflows/ci.yml`) — lint + format + tests + axe a11y + build + Lighthouse gate
- Opt-in analytics (`src/lib/analytics.js`) + error reporting (`src/lib/errorReporter.js`) — both no-op until env keys land
- JSX, **no TypeScript**

## The three-file edit pattern

Every client-specific value lives in one of three layers:

1. **`src/config/theme.config.js`** — colors, fonts, radii, shadows, transitions. A boot helper (`src/lib/applyTheme.js`) flattens these to CSS custom properties on `:root` at app start, so all CSS reads from `var(--color-bg)`, `var(--font-display)`, etc.

2. **`src/config/site.config.js`** — brand identity and integrations:

   ```
   brand:        { name, logoSrc, logoText, tagline }
   nav:          [{ label, to }]
   cta:          { label, to }
   footer:       { columns, copyright }
   social:       { facebook, instagram, linkedin }
   seo:          { defaultTitle, titleTemplate, description, ogImage, siteUrl, locale }
   integrations: { formspreeId, gaId }
   contact:      { email, phone, location }
   ```

3. **`src/content/*.js`** — per-section copy:
   `hero.js`, `whyChoose.js`, `properties.js`, `services.js`, `team.js`,
   `testimonials.js`, `ctaBanner.js`, `about.js`, `selling.js`,
   `propertyManagement.js`, `legal.js`.

Plus **`public/brand/`** for `logo-white.png` (used in dark navbar/footer),
`logo-black.png`, `favicon.svg`, `og-image.png` (1200×630), and `signature.svg`
for the Meet the Team section. **`public/images/`** holds the hero skyline,
property cards, kitchen CTA, the AJ portrait, and the "Why choose" interior.
**`public/fonts/`** is empty — typography is currently sourced from Google
Fonts in `index.html` (Cormorant Garamond + Inter). Self-host later by
dropping woff2 files in and uncommenting a preload block.

## Directory structure

```
ajlee_property/
├── public/
│   ├── brand/           logos, favicon, og-image, signature
│   ├── fonts/           (empty placeholder)
│   └── images/          hero skyline, properties, portrait, CTA kitchen, interior
├── src/
│   ├── config/          site.config.js, theme.config.js
│   ├── content/         one .js file per section
│   ├── lib/             applyTheme, seo, motion, analytics, errorReporter
│   ├── components/      Navbar, Footer, Hero, WhyChoose, FeaturedProperties,
│   │                    Services, MeetTheTeam, Testimonials, CtaBanner,
│   │                    Contact, ErrorBoundary, RouteFallback
│   ├── pages/           Home, AboutPage, SellingPage, PropertyManagementPage,
│   │                    ContactPage, LegalPage, NotFoundPage
│   ├── test/            contract + a11y suite
│   ├── App.jsx          routes
│   ├── main.jsx         applyTheme + mount
│   └── index.css        resets + utility classes
├── .env.example         VITE_FORMSPREE_ID, VITE_SITE_URL, VITE_GA_ID, VITE_SENTRY_DSN
├── index.html
├── package.json
├── vite.config.js
├── lighthouserc.json
├── scripts/
│   └── gen-seo-files.mjs  post-build: templates sitemap/robots domain
└── railway.json
```

### Routes

```
/                       Home
/about                  AboutPage
/selling                SellingPage
/property-management    PropertyManagementPage
/contact                ContactPage
/privacy                LegalPage (section="privacy")
/terms                  LegalPage (section="terms")
*                       NotFoundPage
```

## Home page composition

`src/pages/Home.jsx` composes:

```
<Hero />                 — Melbourne skyline, headline, two CTAs
<WhyChoose />            — Three feature pillars + luxury interior image
<FeaturedProperties />   — 3 property cards (For Sale / For Lease)
<Services />             — Selling, Property Management, Appraisal
<MeetTheTeam />          — AJ portrait + signature + CTA
<Testimonials />         — Quote carousel with arrows
<CtaBanner />            — Book an Appraisal banner with kitchen backdrop
```

Footer is rendered globally in `App.jsx`.

## Working rules

- **Never hardcode strings, colors, or links in components.** If you're tempted to, the correct answer is to add a field to `site.config.js` or a content file and read it from there.
- **Never introduce Tailwind, styled-components, or any other CSS system.** Plain CSS + CSS variables is the house style.
- **Never add TypeScript.** JSX only.
- **Never invent new design tokens.** Add them to `theme.config.js` and expose via `applyTheme.js`. Never write raw hex/rem in component CSS.
- **Lifting from existing components is fine.** Composition over inheritance.
- **Keep commits atomic** — one commit per logical change (theme, content, layout) makes rollback trivial.
- **Don't over-engineer.** Small, focused, easy to scan > clever abstractions.
- **Run the CI gates before every commit.** CI (`.github/workflows/ci.yml`)
  runs `yarn lint && yarn format:check && yarn test && yarn build` and then a
  Lighthouse pass. Before _each_ commit (atomic or otherwise), run those four
  locally — `yarn format` first if `format:check` flags anything, then re-run
  the check. Never push commits that you haven't proven green locally; a
  formatter-only fixup commit on top is acceptable but wasteful and should be
  the exception, not the routine.

## Local development

```bash
yarn install
yarn dev                  # local dev server
yarn lint                 # eslint + jsx-a11y
yarn format:check         # prettier
yarn test                 # contract + axe suite
yarn build && yarn preview # production build
```

A successful build templates `dist/sitemap.xml` and `dist/robots.txt` with
`VITE_SITE_URL` via `scripts/gen-seo-files.mjs`. The committed `public/`
copies stay as `https://example.com` placeholders.

## Outstanding follow-ups

- **Formspree ID** — `VITE_FORMSPREE_ID` left blank in `.env`. Contact form
  renders but submissions error until the ID is added.
- **Real AJ Lee portrait** — current image is a stock placeholder.
- **Real property listings** — three properties are hard-coded in
  `src/content/properties.js` from the design mockup. Swap when AJ's CMS or
  REA feed is ready.
- **Self-hosted fonts** — currently Google Fonts (`index.html`). Drop woff2
  files into `public/fonts/` and switch to a `<link rel="preload">` block to
  drop the third-party dependency.

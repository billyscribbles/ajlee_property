# AJ Lee Property Group

Marketing site for **AJ Lee Property Group** — a boutique Melbourne real estate
agency serving the South East with personalised selling, property management
and appraisal services.

React 18 + Vite 5 single-page app. Plain CSS + CSS variables (no Tailwind),
JSX (no TypeScript), Framer Motion for scroll-in, react-router v7, opt-in
analytics + error monitoring.

## Quick start

```bash
yarn install
cp .env.example .env      # fill VITE_SITE_URL, optionally VITE_FORMSPREE_ID + VITE_GA_ID
yarn dev
```

Open http://localhost:5173.

## Where the content lives

Edit these — **not** components:

1. **`src/config/site.config.js`** — brand name, logo, nav, footer, SEO, social, contact, integration IDs.
2. **`src/config/theme.config.js`** — colors, fonts, radii, shadows, transitions. Auto-flattened to CSS variables at boot.
3. **`src/content/*.js`** — one file per section (`hero.js`, `whyChoose.js`, `properties.js`, `services.js`, `team.js`, `testimonials.js`, `ctaBanner.js`, `about.js`, `selling.js`, `propertyManagement.js`, `legal.js`).

Plus **`public/brand/`** for `logo-white.png`, `logo-black.png`, `favicon.svg`
and `og-image.png` (1200×630).

## What's on the site

**Routes:**
`/`, `/about`, `/selling`, `/property-management`, `/contact`, `/privacy`, `/terms`, `*` (404).

**Sections** (composed in `src/pages/Home.jsx`):
Hero · Why Choose · Featured Properties · Services · Meet the Team · Testimonials · CTA Banner.

**Utilities:** `SEO` wrapper + JSON-LD (`src/lib/seo.jsx`), `applyTheme()`
bootstrap (`src/lib/applyTheme.js`), reduced-motion scroll-in helper
(`src/lib/motion.js`), opt-in analytics/error reporting
(`src/lib/analytics.js`, `src/lib/errorReporter.js`).

**Resilience:** route-level `ErrorBoundary`, `Suspense` `RouteFallback`,
skip-to-content link, and a chunk-retry guard for stale tabs after redeploys.

## Code quality

- `yarn lint` — ESLint (flat config, `eslint.config.js`) incl. `jsx-a11y`.
- `yarn format` / `yarn format:check` — Prettier (`.prettierrc`).
- `yarn test` — Vitest contract suite (`src/test/`) incl. an axe accessibility check.
- `yarn build:analyze` — emits `dist/bundle-stats.html`.
- CI (`.github/workflows/ci.yml`) runs lint + format check + test + build + a Lighthouse gate (perf ≥ 90, a11y ≥ 90, SEO ≥ 95) on every push and PR.

## House rules

- No Tailwind. Plain CSS + CSS variables only.
- No TypeScript. JSX only.
- No hardcoded strings, colors, or links in components — read from `site.config`/`content` files.
- New design tokens go in `theme.config.js`, not as raw hex/rem in CSS.
- Section components keep the Framer Motion `whileInView` pattern for scroll-in animations.

## Adding a new section

1. Create `src/content/mySection.js` exporting the data.
2. Create `src/components/MySection.jsx` (+ `.css`) that imports it.
3. Compose it into the relevant page in `src/pages/`.

## Adding a new page

1. Create `src/pages/MyPage.jsx`.
2. Add a lazy route in `src/App.jsx` following the `lazyWithRetry` pattern.
3. Add the nav link in `site.config.js` under `nav`.

## Analytics & error monitoring

Both are opt-in and cost nothing when unused — leave env vars blank to ship neither.

**Analytics (GA4).** Set `VITE_GA_ID` (e.g. `G-XXXXXXXXXX`) in `.env`.
`src/lib/analytics.js` injects the gtag script at boot and sends `page_view`
on every route change. Blank → no script, no calls.

**Error monitoring (Sentry).** `ErrorBoundary` forwards caught render errors to
`src/lib/errorReporter.js`, which calls `window.Sentry.captureException` **if**
a Sentry SDK is loaded. Add the [Sentry Loader Script](https://docs.sentry.io/platforms/javascript/install/loader/)
or `yarn add @sentry/react` and initialise it in `src/main.jsx` using
`VITE_SENTRY_DSN`.

## Deployment

Railway-ready (`railway.json`). `yarn start` serves the production build on
port 4173. Ask Claude to "deploy to Railway" — the `railway-deploy` skill
drives project creation, env vars, deploy, and domain generation.

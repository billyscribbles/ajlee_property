# TODO — AJ Lee Property Group

Outstanding follow-ups from the initial site build. Tick as you go.

## Launch blockers

- [ ] **Wire up Formspree.** Create a form on [formspree.io](https://formspree.io),
      then set `VITE_FORMSPREE_ID` in `.env`. Until set, the contact form renders
      and validates but submissions hit the error state with the fallback email.
- [ ] **Production domain DNS.** Point `ajleepropertygroup.com.au` (and any
      `www.` redirect) at the host. `VITE_SITE_URL` is already set to that
      domain — `yarn build` will template `dist/sitemap.xml` + `dist/robots.txt`
      to match automatically.
- [ ] **Deploy.** Hand off to the `railway-deploy` skill (or your preferred host).
      `yarn start` already serves the production build on port 4173.

## Content / assets to swap

- [ ] **Real AJ Lee headshot.** Replace `public/images/aj-lee-portrait.jpg`
      with the actual portrait (4:5 portrait orientation works best — see
      `src/components/MeetTheTeam.css` `.team__media`).
- [ ] **Real property listings.** Three properties are hardcoded in
      `src/content/properties.js` from the design mockup. Swap when AJ's CMS or
      REA / Domain feed is ready. Card images live in `public/images/property-*.jpg`.
- [ ] **Testimonials with permission.** `src/content/testimonials.js` lists the
      five reviewers shown on `ajlee.com.au` (Sarah T., Austin H., Kate H.,
      Jack C., John W.). Confirm permission to reuse and adjust suburbs /
      verbiage if needed.
- [ ] **Real social URLs.** `src/config/site.config.js` → `social` currently
      uses guessed handles (`/ajleepropertygroup`). Replace with actual links.
- [ ] **Contact phone + address.** `site.config.js` uses the numbers shown in
      the mockup (`03 9020 0300`, Level 2 65–67 Main St Brighton). Confirm.
- [ ] **Replace Unsplash placeholders.** All non-supplied imagery is sourced
      from Unsplash for now:
      `public/images/why-choose-interior.jpg`, `property-mt-eliza.jpg`,
      `property-highett.jpg`, `property-black-rock.jpg`, `cta-kitchen.jpg`,
      `aj-lee-portrait.jpg`. Replace with licensed agency / vendor photos
      before launch.

## Optional polish (before launch)

- [ ] **Real signature graphic.** `public/brand/signature.svg` is a basic
      text-based stand-in. Swap for an actual hand-signed SVG/PNG of AJ Lee's
      signature when available.
- [ ] **OG image polish.** `public/brand/og-image.png` is a hand-composed
      1200×630 from `og-image.svg`. Consider replacing with a photo-based
      OG image (skyline + tagline overlay) for richer Slack/LinkedIn previews.
- [ ] **GA4.** Set `VITE_GA_ID=G-XXXXXXXXXX` in `.env` when ready. Boot logic
      in `src/lib/analytics.js` is already wired.
- [ ] **Sentry.** Set `VITE_SENTRY_DSN` and add the [Sentry loader](https://docs.sentry.io/platforms/javascript/install/loader/)
      to `index.html` (or `yarn add @sentry/react` and init in `main.jsx`).
      `src/lib/errorReporter.js` will then receive caught render errors.

## Nice-to-have / phase 2

- [ ] **Live property feed.** Wire `src/content/properties.js` to REA Group /
      Domain XML feeds or a CMS so listings update automatically.
- [ ] **Listing detail pages.** Right now property cards link to `/contact`.
      Consider per-property pages at `/properties/:slug`.
- [ ] **Blog / market insights.** Not in the design but a common ask for
      agencies. Would slot under a new `/insights` route.
- [ ] **Booking calendar.** Replace the contact form CTA with a Cal.com /
      Calendly embed for appraisal bookings.
- [ ] **Accessibility audit beyond axe.** Run a manual keyboard-only pass and
      screen-reader pass on `/`, `/selling`, `/contact` before launch.
- [ ] **Lighthouse on production.** CI runs Lighthouse on the build artefact;
      once deployed, re-run against the live URL to verify field metrics.

## Reference (where things live)

| Thing                                     | File                                                           |
| ----------------------------------------- | -------------------------------------------------------------- |
| Brand strings, nav, contact, SEO defaults | `src/config/site.config.js`                                    |
| Colors, fonts, radii, shadows             | `src/config/theme.config.js`                                   |
| Section copy                              | `src/content/*.js` (one per section)                           |
| Privacy + Terms text                      | `src/content/legal.js`                                         |
| Per-page SEO                              | each page imports `SEO` from `src/lib/seo.jsx`                 |
| Routes                                    | `src/App.jsx`                                                  |
| Home composition                          | `src/pages/Home.jsx`                                           |
| Env vars                                  | `.env` (gitignored), `.env.example`                            |
| Sitemap + robots                          | `public/*` (templated at build by `scripts/gen-seo-files.mjs`) |

// Single source of truth for brand identity, nav, SEO, integrations.

export const site = {
  brand: {
    name: 'AJ Lee Property Group',
    logoText: 'AJ LEE',
    tagline: 'Real estate made personal. Every client, every time.',
    // Image logo (white wordmark) used in the dark navbar + footer.
    logoSrc: '/brand/logo-white.png',
  },

  nav: [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Selling', to: '/selling' },
    { label: 'Property Management', to: '/property-management' },
    { label: 'Contact Us', to: '/contact' },
  ],

  cta: {
    label: 'Book an Appraisal',
    to: '/contact',
  },

  footer: {
    columns: [
      {
        title: 'Navigation',
        links: [
          { label: 'Home', to: '/' },
          { label: 'About Us', to: '/about' },
          { label: 'Selling', to: '/selling' },
          { label: 'Property Management', to: '/property-management' },
          { label: 'Contact Us', to: '/contact' },
        ],
      },
      {
        title: 'Services',
        links: [
          { label: 'Selling', to: '/selling' },
          { label: 'Property Management', to: '/property-management' },
          { label: 'Appraisal', to: '/contact' },
        ],
      },
    ],
    copyright: '© 2026 AJ Lee Property Group. All rights reserved.',
  },

  social: {
    facebook: 'https://facebook.com/ajleepropertygroup',
    instagram: 'https://instagram.com/ajleepropertygroup',
    linkedin: 'https://linkedin.com/company/ajleepropertygroup',
  },

  contact: {
    email: 'hello@ajleepropertygroup.com.au',
    phone: '03 9020 0300',
    location: 'Level 2, 65–67 Main Street, Brighton VIC 3186',
  },

  seo: {
    defaultTitle: 'AJ Lee Property Group — Real Estate Made Personal',
    titleTemplate: '%s · AJ Lee Property Group',
    description:
      'Boutique Melbourne real estate agency serving the South East with personalised selling, property management and appraisals.',
    siteUrl: import.meta.env.VITE_SITE_URL || 'https://ajleepropertygroup.com.au',
    ogImage: '/brand/og-image.png',
    locale: 'en_AU',
  },

  integrations: {
    formspreeId: import.meta.env.VITE_FORMSPREE_ID || '',
    gaId: import.meta.env.VITE_GA_ID || '',
  },
}

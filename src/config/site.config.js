// Single source of truth for brand identity, nav, SEO, integrations.

export const site = {
  brand: {
    name: 'AJ Lee Property Group',
    logoText: 'AJ LEE',
    tagline: 'Real estate made personal. Every client, every time.',
    // Image logo (white wordmark) used in the dark navbar + footer.
    logoSrc: '/brand/logo-white.webp',
  },

  nav: [
    { label: 'Home', to: '/' },
    {
      label: 'Listings',
      to: '/listings',
      children: [
        { label: 'For Sale', to: '/listings/for-sale' },
        { label: 'For Rent', to: '/listings/for-rent' },
        { label: 'Sold', to: '/listings/sold' },
        { label: 'Leased', to: '/listings/leased' },
      ],
    },
    { label: 'Selling', to: '/selling' },
    { label: 'Property Management', to: '/property-management' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
  ],

  cta: {
    label: 'Book an Appraisal',
    to: '/contact',
  },

  footer: {
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Home', to: '/' },
          { label: 'Listings', to: '/listings' },
          { label: 'About Us', to: '/about' },
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
    credit: {
      label: 'site by',
      name: 'Onrai Studio',
      href: 'https://www.onraistudio.com',
    },
  },

  social: {
    facebook: 'https://www.facebook.com/ajleePG/',
    instagram: 'https://www.instagram.com/ajlee_au/',
    whatsapp: 'https://wa.me/61414676420',
  },

  contact: {
    email: 'enquiries@ajlee.com.au',
    phone: '03 7042 9555',
    location: 'Level 4, 830 Whitehorse Road, Box Hill VIC 3128',
    // Structured form of `location`, used to build PostalAddress JSON-LD.
    address: {
      street: 'Level 4, 830 Whitehorse Road',
      suburb: 'Box Hill',
      region: 'VIC',
      postcode: '3128',
      country: 'AU',
    },
    mapEmbedSrc:
      'https://www.google.com/maps?q=Level%204%2C%20830%20Whitehorse%20Road%2C%20Box%20Hill%20VIC%203128&output=embed',
  },

  seo: {
    defaultTitle: 'AJ Lee Property Group — Real Estate Made Personal',
    titleTemplate: '%s · AJ Lee Property Group',
    description:
      'Boutique Melbourne real estate agency serving the South East with personalised selling, property management and appraisals.',
    siteUrl: import.meta.env.VITE_SITE_URL || 'https://ajlee.com.au',
    ogImage: '/brand/og-image.png',
    locale: 'en_AU',
  },

  integrations: {
    formspreeId: import.meta.env.VITE_FORMSPREE_ID || '',
    gaId: import.meta.env.VITE_GA_ID || '',
  },
}

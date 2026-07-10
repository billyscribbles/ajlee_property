// Privacy + terms text. Replace with formal legal copy before launch.
// Each entry renders as a section with heading + paragraphs.

import { site } from '../config/site.config'

const { email } = site.contact

export const legal = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated: May 2026',
    sections: [
      {
        heading: 'What we collect',
        body: 'When you submit an enquiry, request an appraisal, or use our property management services we collect contact details — name, email, phone — together with any information you share about your property or rental.',
      },
      {
        heading: 'How we use it',
        body: 'Only to respond to your enquiry, deliver our services, and meet our legal obligations under Australian property and real estate legislation. We never sell or rent your data.',
      },
      {
        heading: 'Who we share it with',
        body: 'Approved third parties strictly when required to deliver a service — for example trades for maintenance, REA Group / Domain for listings, or solicitors and conveyancers handling a settlement.',
      },
      {
        heading: 'Your choices',
        body: `You can request access to, correction of, or deletion of your personal data at any time by emailing us at ${email}.`,
      },
      {
        heading: 'Contact',
        body: `Questions about this policy? Email us at ${email} — we respond within one business day.`,
      },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    updated: 'Last updated: May 2026',
    sections: [
      {
        heading: 'Scope',
        body: 'These terms govern your use of the AJ Lee Property Group website. By browsing the site you agree to them.',
      },
      {
        heading: 'Engagements',
        body: 'Any selling, leasing or property management engagement is governed by a separate written agency agreement compliant with Victorian law. Browsing this site does not create a client relationship.',
      },
      {
        heading: 'Listings',
        body: 'Property prices, descriptions and availability are provided in good faith and may change without notice. Buyers and tenants must satisfy themselves through inspection and independent advice.',
      },
      {
        heading: 'Intellectual property',
        body: 'All content on this site — copy, photography, branding — belongs to AJ Lee Property Group unless otherwise credited.',
      },
      {
        heading: 'Liability',
        body: 'This site is provided as-is. We make no warranty that it will be error-free or uninterrupted and exclude liability to the extent permitted by law.',
      },
    ],
  },
}

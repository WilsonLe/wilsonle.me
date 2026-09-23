import type { SiteSettings } from '@/content/types'

export const siteSettings: SiteSettings = {
  name: 'Anh Minh',
  alternateName: 'Wilson',
  title: 'Software Engineer',
  tagline: 'I build software systems',
  location: 'Brisbane, Queensland',
  email: 'minhle02.work@gmail.com',
  phone: '+61 452-685-096',
  social: {
    github: 'https://github.com/WilsonLe',
    linkedin: 'https://linkedin.com/in/wilsonle02',
  },
  socialLabels: {
    github: 'GitHub',
    linkedin: 'LinkedIn',
    twitter: 'X',
  },
  seo: {
    metaTitle: 'Anh Minh | Software Engineer',
    metaDescription:
      'Software engineer building end-to-end products from user experience to infrastructure across startups, freelance projects, and production-scale systems.',
  },
  navigation: {
    work: 'Work',
    approach: 'Approach',
    now: 'Now',
    about: 'About',
    resume: 'Résumé',
    templates: 'Website templates',
    contact: 'Contact',
    menuLabel: 'Toggle navigation',
  },
  contact: {
    eyebrow: 'Contact',
    heading: 'Get In Touch',
    emailLabel: 'Email',
  },
}

import type { VulcanShowcaseContent } from '@/content/vulcan-types'

export const vulcanContent: VulcanShowcaseContent = {
  seo: {
    title: 'Vulcan Augmetics — Work | Wilson Le',
    description:
      'A look inside Wilson Le’s work on Vulcan’s internal platform: content workflows, role-based access and production monitoring.',
  },
  name: 'Vulcan Augmetics',
  category: 'Selected work / 03',
  heading: 'The platform behind\nthe prosthetics.',
  introduction:
    'Vulcan Augmetics builds upper-limb prosthetic solutions. Behind the product, I built content and access workflows, then added monitoring for production.',
  backLabel: 'All work',
  visitLabel: 'About Vulcan',
  visitUrl: 'https://www.wearevulcan.com/about-us/',
  facts: [
    { label: 'The product', value: 'Private internal platform' },
    { label: 'My work', value: 'Content · Access · Monitoring' },
  ],
  heroImage: {
    src: '/images/work/vulcan-augmetics/content-detail.webp',
    alt: 'The real Vulcan admin interface, with content collections grouped under Users and Orgs.',
    width: 556,
    height: 470,
  },
  imageNote: 'Inside Vulcan · Actual platform screens',
  workLabel: 'My contribution',
  workHeading: 'Three pieces of\na working platform.',
  chapters: [
    {
      icon: 'content',
      id: 'vulcan-content',
      label: 'Content workflows',
      heading: 'Give the work\na clear home.',
      description:
        'I built content workflows that bring users, organisations and programme content into one organised workspace.',
      image: {
        src: '/images/work/vulcan-augmetics/content-detail.webp',
        alt: 'Vulcan navigation showing user, organisation, member, session and exercise collections.',
        width: 556,
        height: 470,
      },
      caption: 'Users and organisations, organised by collection.',
    },
    {
      icon: 'access',
      id: 'vulcan-access',
      label: 'Access workflows',
      heading: 'Make access\nexplicit.',
      description:
        'I built access workflows around defined roles and permissions for organisation, clinic and hospital responsibilities.',
      image: {
        src: '/images/work/vulcan-augmetics/roles.webp',
        alt: 'Vulcan’s Role column listing organisation, moderator, clinic and hospital roles.',
        width: 365,
        height: 480,
      },
      caption: 'The real role model: organisation, clinic and hospital responsibilities.',
    },
    {
      icon: 'monitoring',
      id: 'vulcan-monitoring',
      label: 'Production monitoring',
      heading: 'See what the\nAPI is doing.',
      description:
        'I added production monitoring to inspect API request volume, latency and HTTP errors by period, method and route.',
      image: {
        src: '/images/work/vulcan-augmetics/monitoring-portrait.webp',
        alt: 'Vulcan’s API monitoring panel with request volume, latency, error counts and period, method and route filters.',
        width: 611,
        height: 745,
      },
      caption: 'API monitoring · Snapshot captured 12 November 2026.',
    },
  ],
  signIn: {
    label: 'The entry point',
    heading: 'One place\nto sign in.',
    description:
      'Email and password plus Google, Apple and Facebook options lead into the same role-based workspace.',
    image: {
      src: '/images/work/vulcan-augmetics/sign-in.webp',
      alt: 'Vulcan’s empty sign-in form with email, password, Google, Apple and Facebook options.',
      width: 560,
      height: 735,
    },
    caption: 'Email, Google, Apple and Facebook sign-in options.',
  },
  impact: {
    label: 'What this enables',
    heading: 'What the platform\nmakes possible.',
    items: [
      {
        icon: 'content',
        image: {
          src: '/images/work/vulcan-augmetics/content-detail.webp',
          alt: 'Grouped user and organisation collections in Vulcan’s admin.',
          width: 556,
          height: 470,
        },
        heading: 'Find the right content',
        description: 'Related content, in one workspace.',
      },
      {
        icon: 'access',
        image: {
          src: '/images/work/vulcan-augmetics/roles.webp',
          alt: 'Organisation, clinic and hospital role names in Vulcan’s permission model.',
          width: 365,
          height: 480,
        },
        heading: 'Work within clear roles',
        description: 'Defined responsibilities, explicit permissions.',
      },
      {
        icon: 'monitoring',
        image: {
          src: '/images/work/vulcan-augmetics/monitoring-portrait.webp',
          alt: 'The API monitoring snapshot captured on 12 November 2026, showing volume, latency and errors.',
          width: 611,
          height: 745,
        },
        heading: 'Investigate with context',
        description: 'Volume, latency and errors, together.',
      },
    ],
  },
  closingHeading: 'Useful software.\nBehind the scenes.',
  brandImage: {
    src: '/images/work/vulcan-augmetics/brand.webp',
    alt: 'Vulcan Augmetics',
    width: 240,
    height: 100,
  },
}

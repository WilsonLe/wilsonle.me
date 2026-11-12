import type { VulcanShowcaseContent } from '@/content/vulcan-types'

export const vulcanContent: VulcanShowcaseContent = {
  seo: {
    title: 'Vulcan Augmetics — Work | Wilson Le',
    description:
      'Wilson Le’s in-house engineering at Vulcan Augmetics: role- and attribute-based access control, telemetry and analytics.',
  },
  name: 'Vulcan Augmetics',
  category: 'Selected work / 03',
  heading: 'Access. Analytics.\nBuilt in-house.',
  introduction:
    'Vulcan Augmetics builds upper-limb prosthetic solutions. I built the in-house access-control and telemetry/analytics systems behind its platform.',
  backLabel: 'All work',
  visitLabel: 'About Vulcan',
  visitUrl: 'https://www.wearevulcan.com/about-us/',
  facts: [
    { label: 'The platform', value: 'Private · Built in-house' },
    { label: 'My work', value: 'Access control · Telemetry & analytics' },
  ],
  heroImage: {
    src: '/images/work/vulcan-augmetics/access-rules.webp',
    alt: 'Vulcan’s in-house permission editor showing role rules and same-clinic attribute scopes.',
    width: 631,
    height: 356,
  },
  imageNote: 'Inside Vulcan · Role and attribute rules',
  workLabel: 'My contribution',
  workHeading: 'Two systems.\nBuilt in-house.',
  chapters: [
    {
      icon: 'access',
      id: 'vulcan-access',
      label: 'Role- and attribute-based access control',
      heading: 'Roles, attributes.\nOne policy.',
      description:
        'I built an in-house access-control system combining roles with scopes such as the same clinic, hospital or organisation.',
      image: {
        src: '/images/work/vulcan-augmetics/access-rules.webp',
        alt: 'Read-permission options combine a clinic role with an unrestricted or same-clinic scope.',
        width: 631,
        height: 356,
      },
      caption: 'The permission editor · Roles plus relationship-based conditions.',
      flow: {
        label: 'Role and attribute decision model',
        steps: [
          { icon: 'person', label: 'Role' },
          { icon: 'context', label: 'Attributes' },
          { icon: 'access', label: 'Allowed scope' },
        ],
      },
    },
    {
      icon: 'analytics',
      id: 'vulcan-analytics',
      label: 'Telemetry & analytics',
      heading: 'Telemetry to\nunderstanding.',
      description:
        'I built telemetry and analytics in-house: event collection, aggregate reporting and visibility into product activity and API performance.',
      image: {
        src: '/images/work/vulcan-augmetics/telemetry-report.webp',
        alt: 'An excerpt of a historical in-house telemetry report, with aggregated operation counts for hardware and user operations.',
        width: 571,
        height: 400,
      },
      caption: 'Historical aggregate report · Operation counts.',
      flow: {
        label: 'In-house telemetry and analytics workflow',
        steps: [
          { icon: 'events', label: 'Telemetry' },
          { icon: 'report', label: 'Reports' },
          { icon: 'analytics', label: 'Analytics' },
        ],
      },
    },
  ],
  impact: {
    label: 'What this enables',
    heading: 'Clear boundaries.\nUseful signals.',
    items: [
      {
        icon: 'access',
        image: {
          src: '/images/work/vulcan-augmetics/access-rules.webp',
          alt: 'Role and same-clinic permission rules in Vulcan’s in-house access-control editor.',
          width: 631,
          height: 356,
        },
        heading: 'Access follows context',
        description: 'Roles and relationships define the permitted scope.',
      },
      {
        icon: 'analytics',
        image: {
          src: '/images/work/vulcan-augmetics/telemetry-performance.webp',
          alt: 'Vulcan’s aggregate API performance view, captured on 12 November 2026, showing volume, latency and errors.',
          width: 707,
          height: 841,
        },
        heading: 'Activity becomes insight',
        description: 'In-house telemetry, reporting and performance visibility.',
      },
    ],
  },
  closingHeading: 'Vulcan Augmetics',
  brandImage: {
    src: '/images/work/vulcan-augmetics/brand.webp',
    alt: 'Vulcan Augmetics',
    width: 240,
    height: 100,
  },
}

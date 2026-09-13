import type { About, Hero, HomeContent, Now, Principles, Project, Projects } from '@/content/types'
import { siteSettings } from '@/content/en/site'

const hero: Hero = {
  identity: 'Anh Minh · Wilson online',
  heading: 'I build the whole path from idea to reliable software.',
  introduction:
    "I'm a Brisbane-based software engineer working across product interfaces, backend systems, and the infrastructure that keeps them running.",
  workCta: 'Explore selected work',
  resumeCta: 'View résumé',
  skipToWorkLabel: 'Skip to selected work',
  locationLabel: 'Based in',
  socialLabel: 'Social profiles',
}

const about: About = {
  eyebrow: 'About',
  heading: 'My professional journey',
  introduction:
    'I started in Ohio, joined Pangea Chat as a remote intern, moved to Richmond for in-office work, and later continued remotely from Brisbane. Today, I am studying, working at David Jones, and refining how I build software.',
  portrait: {
    src: 'https://avatars.githubusercontent.com/u/43991506',
    alt: 'Portrait of Anh Minh (Wilson)',
    width: 640,
    height: 640,
  },
  timelineLabel: 'Professional journey',
  illustrationLabel: 'Image placeholder',
  chapters: [
    {
      id: 'ohio-foundations',
      sequence: '01',
      period: '2020–2024',
      place: 'Granville + Columbus, Ohio',
      heading: 'From campus networks to cloud applications.',
      body: [
        'At Denison University, I studied Computer Science and worked as an Assistant Network Engineer. I resolved connectivity issues across campus devices, offices, and dormitories, installed replacement equipment during a network migration, and documented the tests, procedures, and inventory behind the work.',
        'I then interned as a Cloud Application Engineer at Designer Brands in Columbus. I developed features across cloud microservices supporting dsw.com and helped move legacy Oracle data into PostgreSQL applications running on Kubernetes. Together, those roles showed me both sides of a dependable product: the foundations people rely on and the application layers built above them.',
      ],
      image: {
        src: '/images/journey/placeholder.svg',
        alt: 'Placeholder image for the Ohio professional journey chapter',
        width: 1120,
        height: 1400,
      },
    },
    {
      id: 'richmond-office',
      sequence: '02',
      period: '2023–2026',
      place: 'Richmond, Virginia · In office',
      heading: 'Building from the office, across the stack.',
      body: [
        'I began with Pangea Chat as a remote intern before moving to Richmond, where I worked in the office. After moving to Brisbane, I continued working with Pangea Chat remotely. Across those settings, I owned frontend work for app.pangea.chat and built FastAPI services for its AI assistant and LLM workflows.',
        'I also built delivery pipelines and put telemetry, alerting, and monitoring around the production services. That experience made reliability feel less like a separate backend concern and more like part of the product experience itself.',
      ],
      image: {
        src: '/images/journey/placeholder.svg',
        alt: 'Placeholder image for the Pangea professional journey chapter',
        width: 1120,
        height: 1400,
      },
    },
    {
      id: 'brisbane-transition',
      sequence: '03',
      period: '2025–Now',
      place: 'Brisbane, Australia',
      heading: 'Starting again with a wider lens.',
      body: [
        'Moving to Brisbane opened a new professional and academic chapter. I am studying a Master of Information Systems at UniSQ, with an expected completion date of August 2027, while continuing to build software and refine the way I deliver it.',
        'Starting again in a new country has made me more deliberate about context: learning the environment, understanding the people inside it, and resisting the urge to assume that a familiar solution automatically fits a new setting.',
      ],
      image: {
        src: '/images/journey/placeholder.svg',
        alt: 'Placeholder image for the Brisbane professional journey chapter',
        width: 1120,
        height: 1400,
      },
    },
    {
      id: 'david-jones',
      sequence: '04',
      period: 'July 2026–Now',
      place: 'Indooroopilly, Queensland',
      heading: 'Learning from the shop floor.',
      body: [
        'I currently work part-time as a Sales Professional at David Jones Indooroopilly, serving customers who come into the store and replenishing stock.',
        'The work is different from engineering, and that is what makes it valuable to me. It keeps requests, handoffs, exceptions, and operating details tangible—the same things that often decide whether a software system is genuinely useful once it meets the real world.',
      ],
      image: {
        src: '/images/journey/placeholder.svg',
        alt: 'Placeholder image for the David Jones professional journey chapter',
        width: 1120,
        height: 1400,
      },
      link: {
        path: '/notes/shop-floor-systems',
        label: 'Read the field note',
      },
    },
    {
      id: 'agentic-delivery',
      sequence: '05',
      period: 'Current practice',
      place: 'Agentic software development',
      heading: 'Making agentic delivery deliberate.',
      body: [
        'Right now, I am sharpening an agentic software-development workflow built around clear specifications, isolated implementation, explicit validation, reviewable evidence, and human approval at consequential steps.',
        'The goal is not to ask an agent to write more code. It is to make complex work easier to direct, verify, resume, and trust.',
      ],
      image: {
        src: '/images/journey/placeholder.svg',
        alt: 'Placeholder image for the agentic software delivery chapter',
        width: 1120,
        height: 1400,
      },
    },
  ],
}

const projectItems: Project[] = [
  {
    id: 'pangea-chat',
    name: 'Pangea Chat',
    visibility: 'Public product',
    summary: 'A language-learning chat app where people practise while messaging friends.',
    contribution:
      'I owned frontend work on the product and built FastAPI services for its AI assistant and LLM workflows. I also set up delivery pipelines and the monitoring needed to run it in production.',
    technologies: ['Frontend', 'FastAPI', 'Python', 'LLM workflows', 'CI/CD', 'Observability'],
    url: 'https://app.pangea.chat/',
    linkLabel: 'Open Pangea Chat',
  },
  {
    id: 'cyobot-robotics-quest',
    name: 'CYOBot Robotics Quest',
    visibility: 'Public product',
    summary: 'A browser-based learning portal for coding and robotics.',
    contribution:
      'I led work on the core coding portal, implemented its CMS, and configured Keycloak SSO so authentication was managed consistently across the product.',
    technologies: ['Full-stack development', 'CMS', 'Keycloak', 'SSO'],
    url: 'https://dashboard.cyobot.com/',
    linkLabel: 'Open Robotics Quest',
  },
  {
    id: 'vulcan-internal-platform',
    name: 'Vulcan internal platform',
    visibility: 'Private internal system',
    summary: 'An internal platform for managing content, access, and production operations.',
    contribution:
      "I built the CMS, OAuth2 login flows, and a custom admin interface for identity and access management. I also added telemetry, alerting, and on-call support. Because the system is internal, I don't publish its URL, screenshots, or operational data.",
    technologies: ['CMS', 'OAuth2', 'Identity and access management', 'Observability'],
  },
]

const projects: Projects = {
  eyebrow: 'Selected work',
  heading: 'Selected work, with context.',
  introduction:
    'Three products that show how I move between user experience, platform foundations, and the work of running software.',
  productLabel: 'The product',
  contributionLabel: 'My part',
  technologiesLabel: 'Across the stack',
  items: projectItems,
}

const principles: Principles = {
  eyebrow: 'How I work',
  heading: 'The principles behind the build.',
  introduction:
    'The most useful engineering choices hold up across the interface, the deployment, and the day after launch.',
  items: [
    {
      id: 'whole-path',
      title: 'Follow the whole path',
      description:
        'The seams between interface, backend, delivery, and infrastructure shape the experience, so I work across them.',
    },
    {
      id: 'built-to-run',
      title: 'Build it to run',
      description:
        'Releases, monitoring, and operating clarity are part of the product—not chores left for later.',
    },
    {
      id: 'leave-a-map',
      title: 'Leave a map',
      description:
        'Documentation and shared workflows should make a system easier for the next person, including future me.',
    },
  ],
}

const now: Now = {
  eyebrow: 'Now',
  heading: 'Currently in Brisbane.',
  updatedLabel: 'Updated September 2026',
  items: [
    {
      label: 'Based',
      value: 'Brisbane, Queensland',
    },
    {
      label: 'Studying',
      value:
        'Master of Information Systems at the University of Southern Queensland · expected August 2027',
    },
    {
      label: 'Focused on',
      value:
        'End-to-end products, dependable delivery, and the operating details that keep software useful.',
    },
  ],
}

export const homeContent: HomeContent = {
  locale: 'en',
  siteSettings,
  hero,
  about,
  projects,
  principles,
  now,
  seo: {
    title: siteSettings.seo?.metaTitle || `${siteSettings.name} | ${siteSettings.title}`,
    description: siteSettings.seo?.metaDescription || 'Portfolio website',
  },
}

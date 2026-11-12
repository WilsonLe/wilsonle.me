import type { CyobotShowcase } from '@/content/cyobot-types'

// Personal attribution: existing portfolio home/resume; product imagery and context:
// public CYOBot pages inspected 2026-11-12. See docs/evidence/cyobot-showcase.md.
export const cyobotContent: CyobotShowcase = {
  seo: {
    title: 'CYOBot — Selected work | Wilson Le',
    description:
      'Coding portal, learning content and shared sign-in for CYOBot’s robotics learning platform. Selected work by Wilson Le.',
  },
  name: 'CYOBot',
  category: 'Selected work / Robotics education',
  heading: 'Robotics,\nwithin reach.',
  introduction:
    'A browser-based learning platform that helps students explore coding and robotics through hands-on projects.',
  backLabel: 'All work',
  visitLabel: 'Explore Robotics Quest',
  url: 'https://dashboard.cyobot.com',
  roleLabel: 'My role',
  role: 'Software Engineer',
  scopeLabel: 'My scope',
  scope: 'Coding portal · Content system · Shared sign-in',
  heroImage: {
    src: '/work/cyobot/coding-portal.webp',
    alt: 'CYOBot’s published Python portal showing a code editor, console and robot connection controls',
    width: 1600,
    height: 872,
  },
  heroCaption: 'The Python coding portal · Official CYOBot product image',
  workLabel: '01 / My contribution',
  workHeading: 'Connecting the tools\nbehind the learning.',
  contributions: [
    {
      title: 'Coding portal',
      description: 'I built the coding portal for the robotics learning platform.',
    },
    {
      title: 'Content system',
      description: 'I built the content system supporting the learning experience.',
    },
    {
      title: 'Shared sign-in',
      description: 'I built the shared sign-in flow connecting access across the platform.',
    },
  ],
  chapters: [
    {
      id: 'coding',
      label: '02 / Coding portal',
      heading: 'From an idea\nto a program.',
      description:
        'My coding portal work supports programming in the browser. The Python interface brings the editor, console and connection controls into one workspace.',
      image: {
        src: '/work/cyobot/coding-portal.webp',
        alt: 'Python code and console in the CYOBot portal; robot and Wi-Fi indicators show disconnected',
        width: 1600,
        height: 872,
      },
      caption: 'Python editor, console and connection controls.',
    },
    {
      id: 'content',
      label: '03 / Content system',
      heading: 'A place to learn.\nA path to follow.',
      description:
        'I built the content system behind the learning experience. Public learning guides illustrate how students find coding tools, projects and a starting point.',
      image: {
        src: '/work/cyobot/learning-guides.webp',
        alt: 'CYOBot’s public learning guides with Explorer, Adventurer and Pioneer learning paths',
        width: 1440,
        height: 900,
      },
      caption: 'Public learning guides · The learner-facing content experience',
    },
    {
      id: 'access',
      label: '04 / Shared sign-in',
      heading: 'One connected\nway in.',
      description:
        'I built the shared sign-in flow. The current public sign-in screen shows the entry point to the dashboard and learning platform.',
      image: {
        src: '/work/cyobot/sign-in.webp',
        alt: 'CYOBot’s public sign-in page with passkey, Google, GitHub, email and password options',
        width: 1440,
        height: 900,
      },
      caption: 'A shared entry point to the learning platform.',
    },
  ],
  impactLabel: '05 / What this enables',
  impactHeading: 'Learn. Code.\nKeep exploring.',
  capabilities: [
    {
      title: 'Code in the browser',
      description: 'A dedicated workspace for programming and experimentation.',
    },
    {
      title: 'Follow a learning path',
      description: 'Content that gives learners a place to start and projects to explore.',
    },
    {
      title: 'Connect the experience',
      description: 'Shared sign-in supporting access across the platform.',
    },
  ],
  closingHeading: 'Explore the learning experience.',
  imageCredit: 'Official coding portal image and public CYOBot interfaces, captured November 2026.',
  sourceLabel: 'Visit CYOBot',
  sourceUrl: 'https://cyobot.com/',
}

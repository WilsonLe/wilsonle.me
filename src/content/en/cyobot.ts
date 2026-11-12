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
  robotImage: {
    src: '/work/cyobot/robot.webp',
    alt: 'CYOBot Adventurer robot with articulated legs and an LED display',
    width: 816,
    height: 758,
  },
  workLabel: '01 / My contribution',
  workHeading: 'Connecting the tools\nbehind the learning.',
  contributions: [
    {
      title: 'Coding portal',
      description: 'I built the coding portal for the robotics learning platform.',
      image: {
        src: '/work/cyobot/coding-portal.webp',
        alt: 'CYOBot Python coding portal',
        width: 1600,
        height: 872,
      },
    },
    {
      title: 'Content system',
      description: 'I built the content system supporting the learning experience.',
      image: {
        src: '/work/cyobot/learning-guides.webp',
        alt: 'CYOBot learning paths and coding resources',
        width: 1440,
        height: 900,
      },
    },
    {
      title: 'Shared sign-in',
      description: 'I built the shared sign-in flow connecting access across the platform.',
      image: {
        src: '/work/cyobot/sign-in.webp',
        alt: 'The shared CYOBot sign-in entry point',
        width: 1440,
        height: 900,
      },
    },
  ],
  chapters: [
    {
      id: 'coding',
      label: '02 / Coding portal',
      heading: 'From an idea\nto a program.',
      description:
        'The editor, console and robot connection controls come together in a browser workspace.',
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
        'Learning paths connect students with coding tools, projects and a starting point.',
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
      description: 'A shared entry point connects access to the dashboard and learning platform.',
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
      title: 'Make the display respond',
      description: 'An LED heart from CYOBot’s project examples.',
      demo: {
        src: '/work/cyobot/motion/blinking-heart-effect.mp4',
        poster: '/work/cyobot/motion/blinking-heart-effect.webp',
        width: 322,
        height: 204,
        alt: 'Official CYOBot demo of a blinking heart on the robot’s LED matrix',
        sourceUrl: 'https://cyobot.com/blinking-heart-effect.gif',
      },
    },
    {
      title: 'Explore robot movement',
      description: 'A humanoid walking example from CYOBot.',
      demo: {
        src: '/work/cyobot/motion/humanoid-walking.mp4',
        poster: '/work/cyobot/motion/humanoid-walking.webp',
        width: 300,
        height: 170,
        alt: 'Official CYOBot demo of a two-legged robot walking on a tabletop',
        sourceUrl: 'https://cyobot.com/humanoid-walking.gif',
      },
    },
    {
      title: 'Build interactive activities',
      description: 'The LED chasing game combines lights and input.',
      demo: {
        src: '/work/cyobot/motion/led-chasing.mp4',
        poster: '/work/cyobot/motion/led-chasing.webp',
        width: 280,
        height: 162,
        alt: 'Official CYOBot LED chasing game with changing lights and button input',
        sourceUrl: 'https://cyobot.com/led-chasing.gif',
      },
    },
  ],
  demoSourceLabel: 'Original GIF',
  closingHeading: 'Explore the learning experience.',
  imageCredit:
    'Product imagery, public interfaces and robot demos from CYOBot, inspected November 2026.',
  sourceLabel: 'Visit CYOBot',
  sourceUrl: 'https://cyobot.com/',
}

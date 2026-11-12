import type { CyobotShowcase } from '@/content/cyobot-types'

// Attribution and scope: Wilson's explicit correction, 2026-11-12.
// Authenticated student/instructor captures: see docs/evidence/cyobot-showcase.md.
const studentImage = {
  src: '/work/cyobot/student-dashboard.webp',
  alt: 'RoboticsQuest student dashboard with the Intro to Python quest and learning levels',
  width: 1265,
  height: 712,
}
const instructorImage = {
  src: '/work/cyobot/instructor-admin.webp',
  alt: 'CYOBot Instructor quest administration panel with the workspace chatbot open in the right sidebar',
  width: 1016,
  height: 704,
}

export const cyobotContent: CyobotShowcase = {
  seo: {
    title: 'CYOBot — Selected work | Wilson Le',
    description:
      'A student coding dashboard for wireless robot projects, and an instructor content admin panel with a sidebar chatbot. Selected work by Wilson Le.',
  },
  name: 'CYOBot',
  category: 'Selected work / Robotics education',
  heading: 'Code on screen.\nBuild in the real world.',
  introduction:
    'A student coding dashboard for wireless robot projects. An instructor admin panel for creating the learning experience.',
  backLabel: 'All work',
  visitLabel: 'Open student dashboard',
  url: 'https://dashboard.cyobot.com',
  instructorLabel: 'Open instructor app',
  instructorUrl: 'https://cyobot.com/dashboard/instructor',
  roleLabel: 'My role',
  role: 'Software Engineer',
  scopeLabel: 'My scope',
  scope: 'Student coding portal · Instructor admin',
  robotImage: {
    src: '/work/cyobot/robot.webp',
    alt: 'CYOBot Adventurer robot with articulated legs and an LED display',
    width: 816,
    height: 758,
  },
  workLabel: '01 / My contribution',
  workHeading: 'Two workspaces.\nOne learning experience.',
  contributions: [
    {
      title: 'Student coding portal',
      description:
        'I built the student dashboard and simplified setup for connecting wirelessly to physical robots.',
      image: studentImage,
    },
    {
      title: 'Instructor admin',
      description:
        'I built the content system behind the instructor experience, with administration and a sidebar chatbot in one workspace.',
      image: instructorImage,
    },
  ],
  chapters: [
    {
      id: 'student',
      label: '02 / Student coding portal',
      heading: 'Connect wirelessly.\nLearn by coding.',
      description:
        'The coding portal lives in the student dashboard. Students move from a learning quest to coding with a connected physical robot.',
      image: studentImage,
      caption: 'The actual student dashboard · Intro to Python quest',
      url: 'https://dashboard.cyobot.com',
      linkLabel: 'Explore the student app',
      workflow: {
        heading: 'From the dashboard to a robot',
        steps: [
          { kind: 'dashboard', label: 'Open the student dashboard' },
          { kind: 'wireless', label: 'Connect wirelessly' },
          { kind: 'robot', label: 'Code with the robot' },
        ],
        demo: {
          src: '/work/cyobot/motion/blinking-heart-effect.mp4',
          poster: '/work/cyobot/motion/blinking-heart-effect.webp',
          width: 322,
          height: 204,
          alt: 'Official CYOBot example of a blinking heart on a physical robot’s LED matrix',
          caption: 'Code-driven LED output · Official CYOBot project example',
          sourceUrl: 'https://cyobot.com/blinking-heart-effect.gif',
        },
      },
    },
    {
      id: 'instructor',
      label: '03 / Instructor admin',
      heading: 'Create content.\nKeep help beside it.',
      description:
        'The current instructor app brings quest administration, learning content and a workspace chatbot into the same workflow.',
      image: instructorImage,
      caption: 'Quest administration with the sidebar chatbot · Current Instructor app',
      url: 'https://cyobot.com/dashboard/instructor',
      linkLabel: 'Explore the instructor app',
    },
  ],
  demoSourceLabel: 'Original GIF',
  closingHeading: 'Explore both sides of CYOBot.',
  imageCredit:
    'Student dashboard, Instructor app and robot imagery from CYOBot, inspected November 2026.',
  sourceLabel: 'Visit CYOBot',
  sourceUrl: 'https://cyobot.com/',
}

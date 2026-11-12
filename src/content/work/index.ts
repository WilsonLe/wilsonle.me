export interface WorkScreen {
  id: string
  title: string
  image: { src: string; alt: string; width: number; height: number }
  callout: { description?: string; label: string; x: number; y: number; labelX: number }
}
export interface Work {
  slug: string
  projectId: string
  name: string
  summary: string
  contributions: string[]
  tone: 'purple' | 'sand' | 'blue'
  screens: WorkScreen[]
}

export const works: Work[] = [
  {
    slug: 'pangea-chat',
    projectId: 'pangea-chat',
    name: 'Pangea Chat',
    summary: 'Learn a language through conversation.',
    tone: 'purple',
    screens: [
      {
        id: 'sentence-builder',
        title: 'Sentence builder',
        image: {
          src: '/work/screenshots/pangea-translator.webp',
          alt: 'Pangea Chat sentence builder with translation choices and explanations before a message is sent.',
          width: 2560,
          height: 1440,
        },
        callout: {
          label: 'Frontend + AI services',
          x: 66,
          y: 78,
          labelX: 68,
          description: 'Build a sentence with translation choices and explanations before sending.',
        },
      },
      {
        id: 'pangea-bot',
        title: 'Pangea Bot',
        image: {
          src: '/work/screenshots/pangea-bot.webp',
          alt: 'Pangea Bot Spanish role-play conversation with vocabulary suggestions, chat list and the world map behind it.',
          width: 2560,
          height: 1440,
        },
        callout: {
          label: 'Frontend + AI services',
          x: 64,
          y: 63,
          labelX: 36,
          description: 'Practise a language through a guided conversation with Pangea Bot.',
        },
      },
      {
        id: 'message-interpreter',
        title: 'Message interpreter',
        image: {
          src: '/work/screenshots/pangea-message-interpreter.webp',
          alt: 'Pangea Chat message interpreter showing the Spanish message ¿Cómo estás, Wilson? together with its English translation inside the chat.',
          width: 2560,
          height: 1440,
        },
        callout: {
          label: 'In-chat language assistance',
          description:
            'Read an incoming message with its translation, without leaving the conversation.',
          x: 56,
          y: 81,
          labelX: 50,
        },
      },
      {
        id: 'world-map-group-chats',
        title: 'World-map group chats',
        image: {
          src: '/work/screenshots/pangea-map.webp',
          alt: 'Pangea Chat world map with conversation activities, search and navigation.',
          width: 2560,
          height: 1440,
        },
        callout: {
          label: 'Frontend · conversation discovery',
          x: 51,
          y: 70,
          labelX: 34,
          description: 'Find conversations on the world map and practise with other people.',
        },
      },
    ],
    contributions: [
      'Built the frontend and AI assistant.',
      'Developed FastAPI services for LLM workflows.',
      'Built CI/CD, monitoring and incident response.',
      'Introduced spec-driven, AI-assisted workflows.',
    ],
  },
  {
    slug: 'vulcan-augmetics',
    projectId: 'vulcan-internal-platform',
    name: 'Vulcan Augmetics',
    summary: 'The internal platform behind the prosthetics.',
    tone: 'sand',
    screens: [
      {
        id: 'access-control',
        title: 'Roles. Attributes. Clear access.',
        image: {
          src: '/work/screenshots/vulcan-access.webp',
          alt: 'Vulcan permission editor with the organisation-manager role, Create/Read/Update/Delete tabs and role-plus-same-clinic rules.',
          width: 1265,
          height: 712,
        },
        callout: {
          label: 'Built in-house · role + attribute rules',
          x: 80,
          y: 67,
          labelX: 64,
        },
      },
      {
        id: 'internal-cms',
        title: 'One place to manage the work.',
        image: {
          src: '/work/screenshots/vulcan-cms.webp',
          alt: 'Vulcan internal CMS with full navigation and collections for users, organisations, sessions and exercises.',
          width: 1265,
          height: 712,
        },
        callout: {
          label: 'My work · internal CMS + admin',
          x: 58,
          y: 43,
          labelX: 32,
        },
      },
      {
        id: 'production-monitoring',
        title: 'Production monitoring',
        image: {
          src: '/work/screenshots/vulcan-monitoring.webp',
          alt: 'Vulcan internal monitoring dashboard with aggregate API volume, latency, errors and time-window filters.',
          width: 1265,
          height: 712,
        },
        callout: {
          label: 'API telemetry + monitoring',
          x: 51,
          y: 45,
          labelX: 50,
        },
      },
    ],
    contributions: [
      'Implemented the internal CMS.',
      'Built OAuth2 login and role/attribute access controls.',
      'Added telemetry, monitoring and on-call support.',
    ],
  },
  {
    slug: 'cyobot',
    projectId: 'cyobot-robotics-quest',
    name: 'CYOBot',
    summary: 'From learning to building with robots.',
    tone: 'blue',
    screens: [
      {
        id: 'instructor-dashboard',
        title: 'Teach, with help at your side.',
        image: {
          src: '/work/screenshots/cyobot-instructor.webp',
          alt: 'CYOBot instructor dashboard with quest management on the left and the real chatbot interface on the right.',
          width: 1280,
          height: 720,
        },
        callout: {
          label: 'My work · admin + sidebar chatbot',
          x: 83,
          y: 50,
          labelX: 58,
        },
      },
      {
        id: 'student-dashboard',
        title: 'A student’s starting point.',
        image: {
          src: '/work/screenshots/cyobot-student.webp',
          alt: 'Full CYOBot RoboticsQuest student dashboard with Python, electronics, GPIO and kinematics quests, skills and learning progress.',
          width: 1265,
          height: 1016,
        },
        callout: {
          label: 'My work · student coding dashboard',
          x: 44,
          y: 33,
          labelX: 32,
        },
      },
      {
        id: 'python-quest',
        title: 'Python coding quest',
        image: {
          src: '/work/screenshots/cyobot-python-quest.webp',
          alt: 'Actual CYOBot Python quest preview showing learning objectives, rewards and level selection over the student dashboard.',
          width: 1265,
          height: 712,
        },
        callout: {
          label: 'Coding portal · quest + level flow',
          x: 61,
          y: 30,
          labelX: 50,
        },
      },
    ],
    contributions: [
      'Built the landing page and product analytics.',
      'Led the coding portal and CMS.',
      'Centralised sign-in with Keycloak SSO.',
    ],
  },
]

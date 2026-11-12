export interface WorkScreen {
  id: string
  title: string
  image: { src: string; alt: string; width: number; height: number }
  callout: { description: string; label: string; x: number; y: number }
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
          width: 2560,
          height: 1600,
        },
        callout: {
          label: 'Built in-house · role + attribute rules',
          description:
            'I implemented access controls that combine roles with conditions such as the user’s clinic to determine which records they can access.',
          x: 80,
          y: 67,
        },
      },
      {
        id: 'internal-cms',
        title: 'One place to manage the work.',
        image: {
          src: '/work/screenshots/vulcan-cms.webp',
          alt: 'Vulcan internal CMS with full navigation and collections for users, organisations, sessions and exercises.',
          width: 2560,
          height: 1600,
        },
        callout: {
          label: 'My work · internal CMS + admin',
          description:
            'I built the internal CMS and admin workflows for managing users, organisations, sessions and exercises.',
          x: 58,
          y: 43,
        },
      },
      {
        id: 'production-monitoring',
        title: 'Production monitoring',
        image: {
          src: '/work/screenshots/vulcan-monitoring.webp',
          alt: 'Vulcan internal monitoring dashboard with aggregate API volume, latency, errors and time-window filters.',
          width: 2560,
          height: 1600,
        },
        callout: {
          label: 'API telemetry + monitoring',
          description:
            'I added API telemetry and monitoring for request volume, latency and errors.',
          x: 51,
          y: 45,
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
          alt: 'CYOBot Instructor quest catalogue with four demo robotics quests, publication states, level counts and an illustrative lesson-planning chat on the right.',
          width: 2560,
          height: 1600,
        },
        callout: {
          label: 'My work · admin + sidebar chatbot',
          description:
            'Manage robotics quests and levels with a sample lesson-planning conversation alongside.',
          x: 83,
          y: 50,
        },
      },
      {
        id: 'student-dashboard',
        title: 'A student’s starting point.',
        image: {
          src: '/work/screenshots/cyobot-student.webp',
          alt: 'CYOBot student dashboard for Avery Demo, with demo robotics quests, sample skills and rewards, a career skill map and learning shortcuts.',
          width: 2560,
          height: 2000,
        },
        callout: {
          label: 'My work · student coding dashboard',
          description:
            'A demo student workspace with robotics quests, skill progress, rewards and a career skill map.',
          x: 44,
          y: 33,
        },
      },
      {
        id: 'python-quest',
        title: 'Python coding quest',
        image: {
          src: '/work/screenshots/cyobot-python-quest.webp',
          alt: 'CYOBot Python Mission Control demo quest preview with learning objectives and a three-level learning journey over the student dashboard.',
          width: 2560,
          height: 1600,
        },
        callout: {
          label: 'Coding portal · quest + level flow',
          description:
            'A demo Python quest brings together learning objectives and a three-level journey.',
          x: 61,
          y: 30,
        },
      },
    ],
    contributions: [
      'Built the landing page and product analytics.',
      'Led the coding portal and CMS.',
      'Centralised sign-in with Keycloak SSO.',
    ],
  },
  {
    slug: 'localcut',
    projectId: 'localcut',
    name: 'LocalCut',
    summary: 'A video editor, right in the browser.',
    tone: 'sand',
    contributions: [
      'Built the local media engine and timeline editor.',
      'Added text animation, compositing and video export.',
      'Exposed editing tools to external agents through WebMCP.',
    ],
    screens: [
      {
        id: 'timeline',
        title: 'From media to a finished sequence.',
        image: {
          src: '/work/screenshots/localcut-editor.webp',
          alt: 'LocalCut with a populated demo project, original landscape artwork, a video preview, three timeline tracks and a crossfade.',
          width: 2560,
          height: 1600,
        },
        callout: {
          label: 'Media engine + timeline editor',
          description:
            'I built the editing engine and timeline for arranging media, layering titles, animating properties and applying transitions. This demo brings those tools together.',
          x: 60,
          y: 78,
        },
      },
      {
        id: 'typography',
        title: 'Titles with room for detail.',
        image: {
          src: '/work/screenshots/localcut-typography.webp',
          alt: 'LocalCut title properties with an Inter text preview, font, animation and alignment controls over the demo editing workspace.',
          width: 2560,
          height: 2000,
        },
        callout: {
          label: 'Typography + motion controls',
          description:
            'I added bundled fonts, text styling and animation controls so titles can be designed alongside the edit, with a preview before applying changes.',
          x: 50,
          y: 50,
        },
      },
    ],
  },
  {
    slug: 'localdesign',
    projectId: 'localdesign',
    name: 'LocalDesign',
    summary: 'Your canvas, locally.',
    tone: 'blue',
    contributions: [
      'Built the canvas, layer editor and frame layouts.',
      'Implemented portable typography and SVG/PNG exports.',
      'Added editable backups and WebMCP authoring tools.',
    ],
    screens: [
      {
        id: 'canvas',
        title: 'A canvas built around editable layers.',
        image: {
          src: '/work/screenshots/localdesign-canvas.webp',
          alt: 'LocalDesign with the Field Notes demo composition, semantic layers, drawing toolbar and frame inspector visible around the full canvas.',
          width: 2880,
          height: 1800,
        },
        callout: {
          label: 'Canvas engine + layer workflows',
          description:
            'I built the canvas and layer workflows for composing frames, shapes, images and text. This editable demo shows nested layers and a layout frame in context.',
          x: 50,
          y: 50,
        },
      },
      {
        id: 'typography',
        title: 'Typography that travels with the design.',
        image: {
          src: '/work/screenshots/localdesign-typography.webp',
          alt: 'LocalDesign with the Field Notes headline selected and Source Serif 4 typography, font source, size, line-height and tracking controls visible.',
          width: 2880,
          height: 1800,
        },
        callout: {
          label: 'Text shaping + portable exports',
          description:
            'I implemented text layout, font handling and portable exports, with controls for type size, spacing and line height. Bundled fonts stay with the editable design.',
          x: 87,
          y: 40,
        },
      },
    ],
  },
]

export interface WorkScreen {
  id: string
  title: string
  image: { src: string; alt: string; width: number; height: number }
  callout: { description: string; x: number; y: number }
}
export interface Work {
  slug: string
  projectId: string
  name: string
  summary: string
  contributions?: string[]
  features?: string[]
  screens: WorkScreen[]
}

export const works: Work[] = [
  {
    slug: 'pangea-chat',
    projectId: 'pangea-chat',
    name: 'Pangea Chat',
    summary: 'Learn a language through conversation.',
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
    features: [
      'Arrange local media on a multitrack timeline.',
      'Layer animated titles, apply transitions and export video.',
      'Edit with external agents through WebMCP tools.',
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
          description:
            'Arrange local media across multiple tracks, layer titles and add transitions. Preview the sequence as you edit, then export the finished video.',
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
          description:
            'Style titles with bundled fonts, alignment and animation controls. Preview typography and motion alongside the video before applying changes.',
          x: 50,
          y: 50,
        },
      },
      {
        id: 'webmcp',
        title: 'Edit with an external agent.',
        image: {
          src: '/work/screenshots/localcut-webmcp.webp',
          alt: 'An external-agent conversation beside LocalCut, with a video preview, clip list and context dialog visible in the editor.',
          width: 1920,
          height: 1080,
        },
        callout: {
          description:
            'Use WebMCP tools to let an external agent work in the editor. Steer the edit in conversation while clips, context and transcripts stay visible in LocalCut.',
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
    features: [
      'Compose frames, shapes, images and text with editable layers.',
      'Keep fonts with the design and export to SVG or PNG.',
      'Save editable backups and author with WebMCP tools.',
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
          description:
            'Compose frames, shapes, images and text on a local canvas. Organise the design with nested layers and frame layouts, keeping every element editable.',
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
          description:
            'Fine-tune type size, spacing and line height. Bundled fonts stay with the editable design, and SVG or PNG exports make it easy to share the result.',
          x: 87,
          y: 40,
        },
      },
      {
        id: 'webmcp',
        title: 'Design with an external agent.',
        image: {
          src: '/work/screenshots/localdesign-webmcp.webp',
          alt: 'An external-agent conversation beside LocalDesign, showing a CYOBot concept board with editable frames, layers and the design inspector.',
          width: 1920,
          height: 1080,
        },
        callout: {
          description:
            'Use WebMCP tools to create and refine frames, layers and text with an external agent. Keep the canvas visible alongside the conversation and adjust the result in the editor.',
          x: 50,
          y: 50,
        },
      },
    ],
  },
]

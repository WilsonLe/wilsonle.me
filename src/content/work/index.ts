export interface WorkScreen {
  id: string
  title: string
  zoom?: boolean
  wide?: boolean
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
    slug: 'kalibr',
    projectId: 'kalibr',
    name: 'Kalibr',
    summary: 'Competitive games, with a deeper view of how people play.',
    contributions: [
      'Built the game library UI and player-facing workflows.',
      'Built analytics pipelines to process gameplay into useful reporting.',
      'Developed admin panels for engagement, product usage and game-specific analysis.',
    ],
    screens: [
      {
        id: 'game-library',
        title: 'A library made for finding the next challenge.',
        zoom: true,
        image: {
          src: '/work/screenshots/kalibr-library.webp',
          alt: 'Kalibr game library with category filters, search, game cards, daily challenges and player-performance navigation.',
          width: 1265,
          height: 712,
        },
        callout: {
          x: 44,
          y: 44,
          description:
            'Browse games by category, search the library and choose a mode. Daily challenges, tournaments and performance sit alongside the games.',
        },
      },
      {
        id: 'analytics-pipeline',
        title: 'From gameplay to useful analytics.',
        zoom: true,
        image: {
          src: '/work/screenshots/kalibr-pipeline.svg',
          alt: 'Kalibr analytics architecture diagram connecting game events and replay archives to FastAPI processing, aggregate snapshots and private admin reporting.',
          width: 1704,
          height: 923,
        },
        callout: {
          x: 50,
          y: 50,
          description:
            'Process gameplay events and retained records into engagement and game-specific reports. Keep logical plays, recording packets and coverage gaps distinct, with authenticated access to private reporting.',
        },
      },
      {
        id: 'admin-panels',
        title: 'Admin panels that explain the numbers.',
        zoom: true,
        image: {
          src: '/work/screenshots/kalibr-admin.webp',
          alt: 'Kalibr admin engagement panel with labelled synthetic demo data, activity metrics, charts and game-specific navigation.',
          width: 1265,
          height: 1425,
        },
        callout: {
          x: 63,
          y: 48,
          description:
            'Inspect engagement, product usage and individual games through dedicated admin views, with period filters and explicit coverage limits. Shown with synthetic demo data; the counts are illustrative.',
        },
      },
    ],
  },
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
      'Introduced spec-driven, AI-assisted workflows, including a proactive playtest program for existing users.',
      'Invited users to a call to experience the app for 15 minutes. We noted their interactions, asked questions and gathered feedback.',
      'Agents observed in the background and extracted todos. I signed off on implementation, testing and deployment.',
      'Most changes shipped on the same day as the playtest.',
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
      'Founding software engineer.',
      'Led the internal admin dashboard and access-control system.',
      'Led telemetry, monitoring and the on-call support system.',
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
      'Founding software engineer.',
      'Led the landing page, instructor dashboard and student dashboard.',
      'Streamlined internal operational processes.',
    ],
  },
  {
    slug: 'localcut',
    projectId: 'localcut',
    name: 'LocalCut',
    summary: 'Fully open source. Video editing entirely in your browser.',
    features: [
      'Trim, arrange and layer media on a multitrack timeline.',
      'Index source clips with previews, context and transcripts for agent-assisted editing.',
      'Let any agent with browser access control the app through WebMCP.',
    ],
    screens: [
      {
        id: 'timeline',
        title: 'A timeline for the whole edit.',
        zoom: true,
        image: {
          src: '/work/screenshots/localcut-editor.webp',
          alt: 'LocalCut with a populated demo project, original landscape artwork, a video preview, three timeline tracks and a crossfade.',
          width: 2560,
          height: 1600,
        },
        callout: {
          description:
            'Arrange media across tracks, trim clips, layer titles and add transitions. Zoom into the timeline to inspect the sequence, then let an external agent help make the edit.',
          x: 60,
          y: 78,
        },
      },
      {
        id: 'asset-index',
        title: 'An asset index agents can work with.',
        zoom: true,
        image: {
          src: '/work/screenshots/localcut-asset-index.webp',
          alt: 'LocalCut asset-index clip editor with source ranges, named clips, video preview, context and transcript tabs.',
          width: 1026,
          height: 860,
        },
        callout: {
          description:
            'Organise source media into named clips with in/out points, previews, context and transcripts. An external agent can use that index to find the right material and plan an edit.',
          x: 50,
          y: 50,
        },
      },
      {
        id: 'webmcp',
        title: 'Edit with an external agent.',
        zoom: true,
        wide: true,
        image: {
          src: '/work/screenshots/localcut-webmcp.webp',
          alt: 'An external-agent conversation beside LocalCut, with a video preview, clip list and context dialog visible in the editor.',
          width: 1844,
          height: 934,
        },
        callout: {
          description:
            'Use WebMCP tools to let an external agent work in the editor. Steer the edit in conversation while clips, context and transcripts stay visible in LocalCut.',
          x: 0,
          y: 50,
        },
      },
    ],
  },
  {
    slug: 'localdesign',
    projectId: 'localdesign',
    name: 'LocalDesign',
    summary: 'Fully open source. Design entirely in your browser.',
    features: [
      'Organise work across pages, editable layers and frames.',
      'Compose and refine designs directly on a browser-local canvas.',
      'Let external agents control the design through WebMCP.',
    ],
    screens: [
      {
        id: 'canvas',
        title: 'A canvas built around editable layers.',
        zoom: true,
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
        id: 'pages-layers-frames',
        title: 'Pages, layers and frames.',
        zoom: true,
        image: {
          src: '/work/screenshots/localdesign-structure.webp',
          alt: 'LocalDesign concept board with a Pages list, a nested Layers tree, several editable frames and the page inspector.',
          width: 1346,
          height: 934,
        },
        callout: {
          description:
            'Keep separate ideas on pages, organise objects in a layer tree and build compositions inside frames. The same editable structure is available to an external agent.',
          x: 87,
          y: 40,
        },
      },
      {
        id: 'webmcp',
        title: 'Design with an external agent.',
        zoom: true,
        wide: true,
        image: {
          src: '/work/screenshots/localdesign-webmcp.webp',
          alt: 'An external-agent conversation beside LocalDesign, showing a CYOBot concept board with editable frames, layers and the design inspector.',
          width: 1844,
          height: 934,
        },
        callout: {
          description:
            'Use WebMCP tools to create and refine frames, layers and text with an external agent. Keep the canvas visible alongside the conversation and adjust the result in the editor.',
          x: 0,
          y: 50,
        },
      },
    ],
  },
]

export interface WorkScreen {
  id: string
  title: string
  image: { src: string; alt: string; width: number; height: number }
  layout?: 'feature' | 'portrait'
  robot?: { src: string; poster: string; alt: string; width: number; height: number }
  callout: { description: string }
}

export const robotAnimationLabels = {
  play: 'Play robot animation',
  pause: 'Pause robot animation',
  paused: 'Paused',
}
export interface Work {
  slug: string
  projectId: string
  name: string
  summary: string
  contributions?: string[]
  features?: string[]
  coverScreenId?: string
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
        image: {
          src: '/work/screenshots/kalibr-library.webp',
          alt: 'Kalibr game library with category filters, search, game cards, daily challenges and player-performance navigation.',
          width: 1265,
          height: 712,
        },
        callout: {
          description:
            'Browse games by category, search the library and choose a mode. Daily challenges, tournaments and performance sit alongside the games.',
        },
      },
      {
        id: 'admin-panels',
        title: 'Analytics in the admin panel.',
        image: {
          src: '/work/screenshots/kalibr-admin.webp',
          alt: 'Kalibr admin engagement panel with labelled synthetic demo data, activity metrics, charts and game-specific navigation.',
          width: 1265,
          height: 1425,
        },
        callout: {
          description:
            'Process gameplay into engagement, product-usage and game-specific reports. Inspect the results in the admin panel, with period filters and explicit coverage limits. Shown with synthetic demo data; the counts are illustrative.',
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
          alt: 'Close-up of the Pangea Chat sentence builder, with translation choices and explanations before sending a message.',
          width: 1707,
          height: 960,
        },
        callout: {
          description: 'Build a sentence with translation choices and explanations before sending.',
        },
      },
      {
        id: 'pangea-bot',
        title: 'Pangea Bot',
        image: {
          src: '/work/screenshots/pangea-bot.webp',
          alt: 'Close-up of a Pangea Bot Spanish role-play conversation and vocabulary suggestions.',
          width: 1707,
          height: 960,
        },
        callout: {
          description: 'Practise a language through a guided conversation with Pangea Bot.',
        },
      },
      {
        id: 'message-interpreter',
        title: 'Message interpreter',
        image: {
          src: '/work/screenshots/pangea-message-interpreter.webp',
          alt: 'Pangea Chat message interpreter showing the Spanish message ¿Cómo estás, Wilson? together with its English translation inside the chat.',
          width: 1707,
          height: 960,
        },
        callout: {
          description:
            'Read an incoming message with its translation, without leaving the conversation.',
        },
      },
      {
        id: 'world-map-group-chats',
        title: 'World-map group chats',
        image: {
          src: '/work/screenshots/pangea-map.webp',
          alt: 'Close-up of Pangea Chat world-map conversation activities.',
          width: 1707,
          height: 960,
        },
        callout: {
          description: 'Find conversations on the world map and practise with other people.',
        },
      },
    ],
    contributions: [
      'Built the frontend and AI assistant.',
      'Developed FastAPI services for LLM workflows.',
      'Built CI/CD, monitoring and incident response.',
      'Spearheaded agentic software development across the team, streamlining our feedback-to-spec-to-feature pipeline. Agents turned feedback from 15-minute user playtests into todos; I signed off on implementation, testing and deployment, with most changes shipped the same day.',
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
        robot: {
          src: '/work/robots/distance-sensing.gif',
          poster: '/work/robots/distance-sensing.webp',
          alt: 'A real CYOBot quadruped using its distance sensor on a wooden floor.',
          width: 255,
          height: 144,
        },
        callout: {
          description:
            'Manage robotics quests and levels with a sample lesson-planning conversation alongside.',
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
        robot: {
          src: '/work/robots/balancing.gif',
          poster: '/work/robots/balancing.webp',
          alt: 'A real CYOBot robot balancing as its support is tilted.',
          width: 304,
          height: 228,
        },
        callout: {
          description:
            'A demo student workspace with robotics quests, skill progress, rewards and a career skill map.',
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
        robot: {
          src: '/work/robots/remote-control.gif',
          poster: '/work/robots/remote-control.webp',
          alt: 'A real CYOBot robot operated with a handheld controller.',
          width: 300,
          height: 232,
        },
        callout: {
          description:
            'A demo Python quest brings together learning objectives and a three-level journey.',
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
        image: {
          src: '/work/screenshots/localcut-editor.webp',
          alt: 'LocalCut with a populated demo project, original landscape artwork, a video preview, three timeline tracks and a crossfade.',
          width: 2560,
          height: 1600,
        },
        callout: {
          description:
            'Arrange media across tracks, trim clips, layer titles and add transitions. Inspect the sequence on the timeline and let an external agent help make the edit.',
        },
      },
      {
        id: 'asset-index',
        title: 'An asset index agents can work with.',
        image: {
          src: '/work/screenshots/localcut-asset-index.webp',
          alt: 'LocalCut asset-index clip editor with source ranges, named clips, video preview, context and transcript tabs.',
          width: 1026,
          height: 860,
        },
        callout: {
          description:
            'Organise source media into named clips with in/out points, previews, context and transcripts. An external agent can use that index to find the right material and plan an edit.',
        },
      },
      {
        id: 'webmcp',
        title: 'Edit with an external agent.',
        image: {
          src: '/work/screenshots/localcut-webmcp.webp',
          alt: 'An external-agent conversation beside LocalCut, with a video preview, clip list and context dialog visible in the editor.',
          width: 1844,
          height: 934,
        },
        callout: {
          description:
            'Use WebMCP tools to let an external agent work in the editor. Steer the edit in conversation while clips, context and transcripts stay visible in LocalCut.',
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
        image: {
          src: '/work/screenshots/localdesign-canvas.webp',
          alt: 'LocalDesign with the Field Notes demo composition, semantic layers, drawing toolbar and frame inspector visible around the full canvas.',
          width: 2880,
          height: 1800,
        },
        callout: {
          description:
            'Compose frames, shapes, images and text on a local canvas. Organise the design with nested layers and frame layouts, keeping every element editable.',
        },
      },
      {
        id: 'pages-layers-frames',
        title: 'Pages, layers and frames.',
        image: {
          src: '/work/screenshots/localdesign-structure.webp',
          alt: 'LocalDesign concept board with a Pages list, a nested Layers tree, several editable frames and the page inspector.',
          width: 1346,
          height: 934,
        },
        callout: {
          description:
            'Keep separate ideas on pages, organise objects in a layer tree and build compositions inside frames. The same editable structure is available to an external agent.',
        },
      },
      {
        id: 'webmcp',
        title: 'Design with an external agent.',
        image: {
          src: '/work/screenshots/localdesign-webmcp.webp',
          alt: 'An external-agent conversation beside LocalDesign, showing a CYOBot concept board with editable frames, layers and the design inspector.',
          width: 1844,
          height: 934,
        },
        callout: {
          description:
            'Use WebMCP tools to create and refine frames, layers and text with an external agent. Keep the canvas visible alongside the conversation and adjust the result in the editor.',
        },
      },
    ],
  },
  {
    slug: 'habby',
    projectId: 'habby',
    name: 'Habby',
    summary: 'A habit tracker for iPhone.',
    coverScreenId: 'today',
    screens: [
      {
        id: 'lock-screen-water',
        title: 'Live Activities',
        layout: 'feature',
        image: {
          src: '/work/screenshots/habby-lock-screen-water.webp',
          alt: 'A water-tracking Live Activity with a daily count and buttons to add a serving or skip the habit.',
          width: 804,
          height: 466,
        },
        callout: {
          description: 'Log a serving of water from a reminder on the Lock Screen.',
        },
      },
      {
        id: 'dynamic-island-expanded',
        title: 'Dynamic Island',
        layout: 'feature',
        image: {
          src: '/work/screenshots/habby-dynamic-island-expanded.webp',
          alt: 'An expanded Walk timer in the Dynamic Island with a progress track and Pause, Finish and Skip buttons.',
          width: 804,
          height: 298,
        },
        callout: {
          description: 'Watch your Walk timer fill as you go. Touch and hold it for controls.',
        },
      },
      {
        id: 'sleep',
        title: 'Sleep tracking',
        layout: 'feature',
        image: {
          src: '/work/screenshots/habby-sleep-preview.webp',
          alt: 'Sleep preview showing a 10 PM to 7 AM schedule and a sample bedtime marked complete.',
          width: 1206,
          height: 2622,
        },
        callout: {
          description: 'Development preview of bedtime check-ins with optional Apple Health.',
        },
      },
      {
        id: 'apple-health-steps',
        title: 'Walk tracking',
        layout: 'feature',
        image: {
          src: '/work/screenshots/habby-apple-health-steps.webp',
          alt: 'Walk habit with an hourly bar chart of example step counts.',
          width: 804,
          height: 740,
        },
        callout: {
          description: 'Count Apple Health steps toward your walking goal and see them by hour.',
        },
      },
      {
        id: 'today',
        title: 'Today',
        layout: 'portrait',
        image: {
          src: '/work/screenshots/habby-today.webp',
          alt: 'Habby Today screen with a plant companion, daily progress and a list of habits.',
          width: 804,
          height: 1748,
        },
        callout: {
          description: 'See what’s due today and check in on your habits and your plant companion.',
        },
      },
      {
        id: 'water',
        title: 'Log a glass of water',
        layout: 'portrait',
        image: {
          src: '/work/screenshots/habby-water.webp',
          alt: 'Drink water drawer with a progress ring and a control for logging another serving.',
          width: 804,
          height: 1748,
        },
        callout: {
          description: 'Tap to add a serving and see how much of your daily goal you’ve reached.',
        },
      },
      {
        id: 'week',
        title: 'Last 7 days',
        layout: 'portrait',
        image: {
          src: '/work/screenshots/habby-week.webp',
          alt: 'Weekly view with a daily activity chart and a breakdown of progress by habit.',
          width: 804,
          height: 1748,
        },
        callout: {
          description: 'Review daily activity and see how each habit is going.',
        },
      },
      {
        id: 'dynamic-island-compact',
        title: 'Timer in the Dynamic Island',
        image: {
          src: '/work/screenshots/habby-dynamic-island-compact.webp',
          alt: 'Habby’s mascot and a timer with a partially filled progress track in the compact Dynamic Island.',
          width: 804,
          height: 152,
        },
        callout: {
          description: 'See your timer and its progress at a glance while using your iPhone.',
        },
      },
      {
        id: 'screen-time-window',
        title: 'A screen-free evening',
        image: {
          src: '/work/screenshots/habby-screen-time-window.webp',
          alt: 'Screen-free evening editor with a 10 PM to 6 AM window and a Select apps button.',
          width: 804,
          height: 740,
        },
        callout: {
          description:
            'Choose your quiet hours and the apps to include in the Screen Time routine.',
        },
      },
    ],
  },
]

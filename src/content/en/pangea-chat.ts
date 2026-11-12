import type { WorkShowcaseContent } from '@/content/types'

const conversation = {
  src: '/images/work/pangea-chat/conversation.webp',
  alt: 'An example Spanish conversation between Wilson and Pangea Bot, with vocabulary available inside the chat.',
  width: 626,
  height: 763,
}

const vocabulary = {
  src: '/images/work/pangea-chat/vocabulary.webp',
  alt: 'The word monopatín opens a vocabulary card with its pronunciation and English meaning, skateboard.',
  width: 626,
  height: 763,
}

const services = {
  actions: { icon: 'github-actions', name: 'GitHub Actions' },
  ecs: { icon: 'ecs', name: 'Amazon ECS' },
  ec2: { icon: 'ec2', name: 'Amazon EC2' },
  sentry: { icon: 'sentry', name: 'Sentry' },
  pagerduty: { icon: 'pagerduty', name: 'PagerDuty' },
} as const

export const pangeaChatContent: WorkShowcaseContent = {
  path: '/work/pangea-chat',
  seo: {
    title: 'Pangea Chat — Selected work | Wilson Le',
    description:
      'Frontend, FastAPI and LLM services, and production delivery for Pangea Chat. A closer look at Wilson Le’s engineering work, illustrated with the real app.',
  },
  title: 'Pangea Chat',
  introduction: 'Learn a language through conversation. Built from the interface to production.',
  backLabel: 'Selected work',
  visitLabel: 'Explore the app',
  visitUrl: 'https://app.pangea.chat/',
  facts: [
    { label: 'Role', value: 'Software Engineer' },
    { label: 'Period', value: 'May 2023 — April 2026' },
    { label: 'Scope', value: 'Frontend · AI services · Delivery' },
    { label: 'Team', value: 'Shared ownership with one other engineer' },
  ],
  heroImages: [
    {
      src: '/images/work/pangea-chat/discover.webp',
      alt: 'Pangea Chat’s world map connects language activities to real places.',
      width: 626,
      height: 763,
    },
    conversation,
    vocabulary,
  ],
  imageNote:
    'Current app screens, captured with an example conversation. Open an image for a closer look.',
  workLabel: 'My contribution · a team of two engineers',
  chapters: [
    {
      id: 'experience',
      label: 'The experience',
      heading: 'Start with a conversation.',
      description:
        'One other engineer and I shared ownership of app.pangea.chat. Together, we brought language practice into a familiar chat experience, with activities to explore and people or a bot to practise with.',
      details: ['Frontend development', 'Product interface'],
      images: [
        {
          src: '/images/work/pangea-chat/roleplay.webp',
          alt: 'A real Pangea activity offers a choice to play with Pangea Bot or with other learners.',
          width: 626,
          height: 763,
        },
        conversation,
      ],
      caption: 'From choosing an activity to taking part in the conversation.',
    },
    {
      id: 'ai-services',
      label: 'The intelligence',
      heading: 'Help, right where the words are.',
      description:
        'As part of our two-engineer team, I worked on FastAPI services for the AI assistant and LLM workflows. Language support sits inside the conversation: learners can work through translation choices or open a word’s meaning and pronunciation.',
      details: ['FastAPI services', 'AI assistant', 'LLM workflows'],
      images: [
        {
          src: '/images/work/pangea-chat/translation.webp',
          alt: 'Interactive translation asks the learner to choose a Spanish greeting before continuing their message.',
          width: 626,
          height: 763,
        },
        vocabulary,
      ],
      caption: 'Interactive translation and vocabulary support in the real app.',
    },
  ],
  delivery: {
    label: 'The operation',
    heading: 'Build it to ship. Keep it observable.',
    description:
      'Our shared ownership extended into production. My contributions included GitHub Actions delivery workflows, releases to the AWS ECS/EC2 stack, observability in Sentry, and setting up PagerDuty paging for on-call engineers.',
    steps: [
      {
        title: 'Automate',
        detail: 'Delivery workflows',
        services: [services.actions],
      },
      {
        title: 'Release',
        detail: 'AWS production stack',
        services: [services.ecs, services.ec2],
      },
      {
        title: 'Observe',
        detail: 'Application observability',
        services: [services.sentry],
      },
      {
        title: 'Respond',
        detail: 'Paging for on-call engineers',
        services: [services.pagerduty],
      },
    ],
  },
  impact: {
    label: 'What the work enables',
    heading: 'A complete path from conversation to production.',
    items: [
      {
        heading: 'A place to practise.',
        description:
          'An interface that brings activities, conversation, and language tools together.',
        visual: { kind: 'image', image: conversation },
      },
      {
        heading: 'Support in the moment.',
        description: 'AI services behind the assistant and language-learning workflows.',
        visual: { kind: 'image', image: vocabulary },
      },
      {
        heading: 'A path from release to response.',
        description:
          'GitHub Actions for delivery, AWS for production, Sentry for visibility, and PagerDuty to page the on-call engineer.',
        visual: {
          kind: 'services',
          services: [
            services.actions,
            services.ecs,
            services.ec2,
            services.sentry,
            services.pagerduty,
          ],
        },
      },
    ],
  },
  closeHeading: 'See the conversation for yourself.',
}

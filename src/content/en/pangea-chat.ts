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

const translation = {
  src: '/images/work/pangea-chat/translation.webp',
  alt: 'Interactive translation asks the learner to choose a Spanish greeting before continuing their message.',
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
      'Pangea Bot conversation practice and in-chat language-learning assistance. Explore the real app and Wilson Le’s contributions within a two-engineer team.',
  },
  title: 'Pangea Chat',
  introduction: 'A chatbot to practise with. Language-learning assistance inside the chat.',
  backLabel: 'Selected work',
  visitLabel: 'Explore the app',
  visitUrl: 'https://app.pangea.chat/',
  facts: [
    { label: 'Role', value: 'Software Engineer' },
    { label: 'Period', value: 'May 2023 — April 2026' },
    { label: 'Features', value: 'Chatbot · Language-learning assistance' },
    { label: 'Team', value: 'Shared ownership with one other engineer' },
  ],
  heroImages: [translation, conversation, vocabulary],
  imageNote:
    'Current app screens, captured with an example conversation. Open an image for a closer look.',
  workLabel: 'Two features · shared ownership',
  chapters: [
    {
      id: 'experience',
      label: 'The chatbot',
      heading: 'Practise with Pangea Bot.',
      description:
        'Choose a scenario and practise a new language with Pangea Bot. The chatbot gives learners a partner for a guided conversation. One other engineer and I shared ownership of the app, including the frontend and AI services behind this experience.',
      details: ['Pangea Bot', 'Guided scenarios', 'Conversation practice'],
      images: [
        {
          src: '/images/work/pangea-chat/roleplay.webp',
          alt: 'A real Pangea activity offers a choice to play with Pangea Bot or with other learners.',
          width: 626,
          height: 763,
        },
        conversation,
      ],
      caption: 'Choose Pangea Bot, then practise through a real conversation.',
      artwork: {
        kind: 'chatbot',
        title: 'A guided conversation with Pangea Bot',
        description:
          'Illustration based on the app: choose a school scenario, introduce yourself, and continue when Pangea Bot replies. The arrows and circles identify each step.',
        callouts: ['Choose a scenario', 'Try a reply', 'Keep talking'],
        partner: 'Pangea Bot',
        scenario: 'First day at school',
        messages: ['Hola, me llamo Lucía.', '¡Hola! Me llamo Wilson.', '¿Cómo estás, Wilson?'],
      },
      artworkNote: 'Illustration based on the app, with an example conversation.',
      originalScreenLabel: 'Original screen',
    },
    {
      id: 'ai-services',
      label: 'Language-learning assistance',
      heading: 'Learn as you write.',
      description:
        'Work through interactive translation choices while composing a message. Open a word to see its meaning and pronunciation, then continue the conversation. Within our two-engineer team, I contributed to the frontend and FastAPI services for the AI assistant and LLM workflows.',
      details: ['Interactive translation', 'Word meanings', 'Pronunciation'],
      images: [translation, vocabulary],
      caption: 'Translation choices, word meanings, and pronunciation inside the chat.',
      artwork: {
        kind: 'assistance',
        title: 'Language-learning assistance inside the conversation',
        description:
          'Illustration based on the app: choose a translation while writing a greeting, open the meaning of monopatín, and hear its pronunciation. Labels point to the translation choices, word meaning, and audio control.',
        callouts: ['Translate as you write', 'See its meaning', 'Hear pronunciation'],
        heading: 'Language help',
        draft: 'Hello! My name is Wilson.',
        translationLabel: 'Translation choices',
        choices: ['¡Hola!', 'Buenos días', 'Adiós'],
        word: 'monopatín',
        meaning: 'skateboard',
      },
      artworkNote: 'Illustration based on the app’s translation and vocabulary tools.',
      originalScreenLabel: 'Original screen',
    },
  ],
  delivery: {
    label: 'Supporting the experience',
    heading: 'The engineering behind the conversation.',
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
    heading: 'Keep learning inside the conversation.',
    items: [
      {
        heading: 'A partner to practise with.',
        description: 'Practise a new language with Pangea Bot in a guided scenario.',
        image: conversation,
      },
      {
        heading: 'Help finding the words.',
        description: 'Work through translation choices while composing your message.',
        image: translation,
        imagePosition: 'bottom',
      },
      {
        heading: 'Understand a word. Keep going.',
        description: 'See the meaning and pronunciation of a word without leaving the chat.',
        image: vocabulary,
      },
    ],
  },
  closeHeading: 'See the conversation for yourself.',
}

import type { WorkContent, WorkImage } from '@/content/work-types'

const discover: WorkImage = {
  src: '/images/work/pangea/discover.webp',
  alt: 'Pangea Chat map with a conversation activity and a search activities field.',
  width: 626,
  height: 763,
}
const conversation: WorkImage = {
  src: '/images/work/pangea/conversation.webp',
  alt: 'A Spanish roleplay conversation with Lucía in Pangea Chat.',
  width: 626,
  height: 763,
}
const practice: WorkImage = {
  src: '/images/work/pangea/practice.webp',
  alt: 'The Spanish word monopatín selected in a chat, with pronunciation and its meaning: skateboard.',
  width: 626,
  height: 763,
}
const draft: WorkImage = {
  src: '/images/work/pangea/translated-draft.webp',
  alt: 'A Spanish introduction being composed inside a Pangea Chat roleplay.',
  width: 626,
  height: 763,
}

export const pangeaChat: WorkContent = {
  slug: 'pangea-chat',
  locale: 'en',
  name: 'Pangea Chat',
  eyebrow: 'Selected work / 01',
  heading: 'A new language.\nA real conversation.',
  introduction:
    'Pangea Chat brings language practice into the conversations you want to have. Chat with friends, explore roleplays, and get AI support along the way.',
  backLabel: 'All work',
  productUrl: 'https://app.pangea.chat/',
  productLabel: 'Open Pangea Chat',
  role: { label: 'My role', value: 'Software Engineer' },
  period: { label: 'When', value: '2023 — 2026' },
  heroImages: [discover, conversation, draft],
  imageNote: 'Pangea Chat · Product screens and sample roleplays',
  story: {
    label: 'The experience',
    heading: 'Learning happens\nin the conversation.',
    chapters: [
      {
        id: 'discover',
        label: 'Discover',
        heading: 'Find a reason to talk.',
        description:
          'Start with a conversation worth having. A map of activities offers a way into language practice, with topics and scenarios to explore.',
        image: discover,
        caption: 'Discover conversation activities on the map.',
      },
      {
        id: 'converse',
        label: 'Converse',
        heading: 'Try the words out.',
        description:
          'Step into a roleplay and use the language in context. Here, a first day at school becomes a Spanish conversation with Lucía.',
        image: conversation,
        caption: 'A Spanish roleplay: First Day at the School Entrance.',
      },
      {
        id: 'understand',
        label: 'Understand',
        heading: 'Keep the meaning close.',
        description:
          'Explore an unfamiliar word without leaving the chat. Pronunciation and meaning sit alongside the message, so help stays connected to the conversation.',
        image: practice,
        caption: 'Select a word to explore its pronunciation and meaning.',
      },
    ],
  },
  contribution: {
    label: 'My contribution',
    heading: 'From the interface\nto the systems behind it.',
    introduction:
      'I built across the frontend, AI services, and delivery systems behind Pangea Chat. My work connected the experience people use with the software that supports it.',
    items: [
      {
        heading: 'Frontend',
        description: 'Built the interface through which learners interact with the product.',
      },
      {
        heading: 'AI services',
        description: 'Built services supporting the product’s AI-powered language learning.',
      },
      {
        heading: 'Delivery systems',
        description: 'Built the delivery systems behind the running product.',
      },
    ],
  },
  impact: {
    label: 'What that enables',
    heading: 'Less distance between\nlearning and using.',
    description:
      'A connected product experience: a reason to start, a place to practise, and support when a word gets in the way.',
    items: [
      {
        heading: 'Practice with context',
        description: 'Use language in a conversation, with a purpose.',
      },
      { heading: 'Help in the moment', description: 'Understand a word where you encounter it.' },
      {
        heading: 'One connected experience',
        description: 'Move from discovery to conversation to understanding.',
      },
    ],
  },
  closing: 'See where the conversation goes.',
  seo: {
    title: 'Pangea Chat — Work | Wilson Le',
    description:
      'A look inside Pangea Chat and Wilson Le’s work across its frontend, AI services, and delivery systems.',
  },
}

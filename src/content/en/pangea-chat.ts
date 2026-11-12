import type { WorkShowcase } from '@/content/work-types'

// Attribution: existing home/resume content. Product context and public demonstration
// images: https://pangea.chat/ (inspected 2026-11-12). See docs/evidence/pangea-showcase.md.
export const pangeaChatContent: WorkShowcase = {
  seo: {
    title: 'Pangea Chat — Selected work | Wilson Le',
    description:
      'Frontend, AI services and delivery systems for Pangea Chat, a language-learning product built around conversation. Selected work by Wilson Le.',
  },
  name: 'Pangea Chat',
  category: 'Selected work / Language learning',
  heading: 'A new language.\nA real conversation.',
  introduction:
    'Pangea Chat helps friends practise languages together, with AI support woven into the conversation.',
  backLabel: 'All work',
  visitLabel: 'Explore Pangea Chat',
  url: 'https://app.pangea.chat/',
  roleLabel: 'My role',
  role: 'Software Engineer',
  scopeLabel: 'My scope',
  scope: 'Frontend · AI services · Delivery systems',
  heroImages: [
    {
      src: '/work/pangea-chat/conversation.webp',
      alt: 'Pangea Chat demonstration of a French conversation with contextual verb-conjugation help',
    },
    {
      src: '/work/pangea-chat/map.webp',
      alt: 'Pangea activity map and Spanish 101 course with conversation activities',
    },
    {
      src: '/work/pangea-chat/bot.webp',
      alt: 'Pangea Bot demonstration with voice messages and a Russian vocabulary card',
    },
  ],
  workLabel: '01 / My contribution',
  workHeading: 'From the interface\nto the systems behind it.',
  contributions: [
    {
      title: 'Frontend',
      description: 'I built the frontend behind the product’s language-learning experience.',
    },
    {
      title: 'AI services',
      description: 'I built AI services supporting the experience beyond the interface.',
    },
    { title: 'Delivery systems', description: 'I built the delivery systems behind the product.' },
  ],
  storyLabel: 'The product in practice',
  chapters: [
    {
      id: 'conversation',
      label: '02 / Conversation',
      heading: 'Keep the conversation going.',
      description:
        'Language support sits beside the message. Learners can explore vocabulary and get help with conjugation as they write.',
      image: {
        src: '/work/pangea-chat/conversation.webp',
        alt: 'A French chat with a verb-conjugation prompt beside the message composer',
      },
      caption: 'Contextual help, inside the conversation.',
    },
    {
      id: 'practice',
      label: '03 / Shared practice',
      heading: 'Give practice\na purpose.',
      description:
        'Roleplay gives a conversation a setting and a goal. Learners can invite friends, join classmates or practise with Pangea Bot.',
      image: {
        src: '/work/pangea-chat/roleplay.webp',
        alt: 'A shopping roleplay activity offering invitations to course participants, friends or Pangea Bot',
      },
      caption: 'A shared scenario. A reason to start talking.',
    },
  ],
  impactLabel: '04 / What this enables',
  impactHeading: 'More ways to use\na new language.',
  capabilities: [
    {
      title: 'Learn in context',
      description: 'Vocabulary and language help alongside the conversation.',
    },
    { title: 'Practise together', description: 'Shared activities with friends and classmates.' },
    {
      title: 'Start a conversation',
      description: 'A bot partner when a learner wants to practise.',
    },
  ],
  closingHeading: 'See it in conversation.',
  imageCredit: 'Product demonstrations courtesy of Pangea Chat.',
  imageCreditLabel: 'Product image source',
  imageCreditUrl: 'https://pangea.chat/',
}

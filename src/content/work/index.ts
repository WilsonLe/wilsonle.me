import type { Metadata } from 'next'
import { SITE_URL } from '@/site-config'
import type { Locale } from '@/lib/i18n'

export interface WorkScreen {
  id: string
  title: string
  description: string
  image: { src: string; alt: string; width: number; height: number }
  callout: { label: string; x: number; y: number; labelX: number }
}

export interface Work {
  slug: string
  projectId: string
  name: string
  summary: string
  credit: string
  url: string
  tone: 'purple' | 'sand' | 'blue'
  screens: WorkScreen[]
}

function image(name: string, alt: string, width = 1280, height = 720) {
  return { src: `/work/screenshots/${name}.webp`, alt, width, height }
}

export const works: Work[] = [
  {
    slug: 'pangea-chat',
    projectId: 'pangea-chat',
    name: 'Pangea Chat',
    summary: 'Learn a language through conversation.',
    credit:
      'One other engineer and I shared ownership of the frontend, AI services and delivery systems.',
    url: 'https://app.pangea.chat/',
    tone: 'purple',
    screens: [
      {
        id: 'world-map',
        title: 'A world of conversations.',
        description: 'The world map brings language activities into one place.',
        image: image(
          'pangea-map',
          'Pangea Chat world map with conversation activities, search and navigation.',
        ),
        callout: { label: 'Frontend · world map UI', x: 48, y: 28, labelX: 34 },
      },
      {
        id: 'interactive-translator',
        title: 'Learn while you write.',
        description:
          'Interactive translation offers choices and explains the language inside the chat.',
        image: image(
          'pangea-translator',
          'Interactive translator showing Spanish phrase choices and an explanation inside the full Pangea Chat interface.',
        ),
        callout: { label: 'AI services · interactive translation', x: 66, y: 78, labelX: 68 },
      },
      {
        id: 'pangea-bot',
        title: 'A partner to practise with.',
        description:
          'Pangea Bot keeps a role-play conversation going, with vocabulary help close by.',
        image: image(
          'pangea-bot',
          'Pangea Bot Spanish role-play conversation with vocabulary suggestions, chat list and the world map behind it.',
        ),
        callout: { label: 'Frontend + AI · Pangea Bot', x: 64, y: 63, labelX: 36 },
      },
    ],
  },
  {
    slug: 'vulcan-augmetics',
    projectId: 'vulcan-internal-platform',
    name: 'Vulcan Augmetics',
    summary: 'The internal platform behind the prosthetics.',
    credit: 'I implemented the in-house access-control system and internal CMS/admin workflows.',
    url: 'https://www.wearevulcan.com/about-us/',
    tone: 'sand',
    screens: [
      {
        id: 'access-control',
        title: 'Roles. Attributes. Clear access.',
        description:
          'I implemented access rules that combine a person’s role with conditions such as belonging to the same clinic, hospital or organisation.',
        image: image(
          'vulcan-access',
          'Vulcan permission editor with the organisation-manager role, Create/Read/Update/Delete tabs and role-plus-same-clinic rules.',
          1265,
          712,
        ),
        callout: { label: 'Built in-house · role + attribute rules', x: 80, y: 67, labelX: 64 },
      },
      {
        id: 'internal-cms',
        title: 'One place to manage the work.',
        description:
          'I built internal content and admin workflows for users, organisations and programme content.',
        image: image(
          'vulcan-cms',
          'Vulcan internal CMS with full navigation and collections for users, organisations, sessions and exercises.',
          1265,
          712,
        ),
        callout: { label: 'My work · internal CMS + admin', x: 58, y: 43, labelX: 32 },
      },
    ],
  },
  {
    slug: 'cyobot',
    projectId: 'cyobot-robotics-quest',
    name: 'CYOBot',
    summary: 'From learning to building with robots.',
    credit:
      'I built the student coding portal and the instructor content system with its sidebar chatbot.',
    url: 'https://quest.cyobot.com/',
    tone: 'blue',
    screens: [
      {
        id: 'instructor-dashboard',
        title: 'Teach, with help at your side.',
        description:
          'The instructor app brings quest management and a sidebar chatbot into the same workspace.',
        image: image(
          'cyobot-instructor',
          'CYOBot instructor dashboard with quest management on the left and the real chatbot interface on the right.',
        ),
        callout: { label: 'My work · admin + sidebar chatbot', x: 83, y: 50, labelX: 58 },
      },
      {
        id: 'student-dashboard',
        title: 'A student’s starting point.',
        description:
          'The student dashboard brings coding quests and progress together. I also worked on setup for wireless access to physical robots.',
        image: image(
          'cyobot-student',
          'Full CYOBot RoboticsQuest student dashboard with Python, electronics, GPIO and kinematics quests, skills and learning progress.',
          1265,
          1016,
        ),
        callout: { label: 'My work · student coding dashboard', x: 44, y: 33, labelX: 32 },
      },
    ],
  },
]

export function getWork(slug: string) {
  return works.find((work) => work.slug === slug)
}

export function getWorkMetadata(work: Work, locale: Locale): Metadata {
  const canonical = `${locale === 'vi' ? '/vi' : ''}/work/${work.slug}`
  const title = `${work.name} — Work | Wilson Le`
  const description = `${work.summary} ${work.credit}`
  const socialImage = work.screens[0].image
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: new URL(canonical, SITE_URL).toString(),
      languages: {
        en: new URL(`/en/work/${work.slug}`, SITE_URL).toString(),
        vi: new URL(`/vi/work/${work.slug}`, SITE_URL).toString(),
        'x-default': new URL(`/work/${work.slug}`, SITE_URL).toString(),
      },
    },
    openGraph: {
      title,
      description,
      url: new URL(canonical, SITE_URL).toString(),
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      images: [
        {
          url: socialImage.src,
          width: socialImage.width,
          height: socialImage.height,
          alt: socialImage.alt,
        },
      ],
    },
    twitter: { card: 'summary_large_image', title, description, images: [socialImage.src] },
  }
}

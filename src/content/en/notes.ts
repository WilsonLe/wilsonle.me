import type { FieldNoteContent } from '@/content/types'
import { siteSettings } from '@/content/en/site'

export const shopFloorSystemsNote: FieldNoteContent = {
  locale: 'en',
  siteSettings,
  slug: 'shop-floor-systems',
  eyebrow: 'Field note 01',
  title: 'What the shop floor is teaching me about software',
  standfirst:
    'My current role at David Jones sits outside software engineering. That distance has made several engineering lessons clearer.',
  authorLabel: 'By Anh Minh (Wilson)',
  publishedDate: '2026-09-11',
  publishedLabel: 'September 2026',
  hero: {
    src: '/images/journey/placeholder.svg',
    alt: 'Placeholder image for the shop-floor systems field note',
    width: 1120,
    height: 1400,
  },
  sections: [
    {
      id: 'work-in-front-of-me',
      heading: 'The work in front of me',
      paragraphs: [
        'Since July 2026, I have worked part-time as a Sales Professional at David Jones Indooroopilly. My day-to-day work is straightforward to describe: serving customers who come into the store and replenishing stock.',
        'It sits outside software engineering, but it gives me another view of how systems meet everyday use. The value of that perspective is difficult to compress into a résumé bullet. It shows up instead in the questions I now ask when I design a workflow.',
      ],
    },
    {
      id: 'whole-experience',
      heading: 'The interface is not the whole experience',
      paragraphs: [
        'In software, it is easy to focus on the surface directly in front of us: the screen, the endpoint, or the feature being shipped. People experience the entire path around that surface. They notice whether the next step is clear, whether the right information is available, and whether somebody can help when the expected path breaks down.',
        'That is one reason I like working across interfaces, services, delivery, and operations. A polished interaction cannot compensate for a process that loses context behind it.',
      ],
    },
    {
      id: 'handoffs-carry-state',
      heading: 'Every handoff carries state',
      paragraphs: [
        'Any process involving several people depends on the context that moves between them. What has already happened? What is needed next? Who can make the next decision? When those answers are implicit, even simple work becomes harder to complete reliably.',
        'The same is true when software work moves between a person and an AI agent, or between several agents. A useful handoff needs an explicit objective, a known source of truth, clear authority, and evidence of the state being handed over.',
      ],
    },
    {
      id: 'exceptions-are-workflow',
      heading: 'Exceptions are the real workflow',
      paragraphs: [
        'A process is easiest to describe through its happy path. Real work includes incomplete information, changed priorities, unusual requests, and moments when the next action needs judgment rather than automation.',
        'I want the systems I build to handle that reality honestly. That means preserving useful state, making failure visible, and giving a person a clear place to intervene instead of disguising uncertainty as success.',
      ],
    },
    {
      id: 'agentic-development',
      heading: 'Bringing it back to agentic development',
      paragraphs: [
        'My current work on agentic software development is an attempt to make those principles concrete. I start with a clear specification, give implementation an isolated workspace, verify the result against observable requirements, and retain evidence that another person can review.',
        'The agent is useful because it can carry complex work forward. The workflow is dependable because its scope, authority, validation, and human review points are explicit. The goal is not simply more generated code; it is work that is easier to direct, verify, resume, and trust.',
      ],
    },
    {
      id: 'another-vantage-point',
      heading: 'Another vantage point',
      paragraphs: [
        'Retail has not replaced software in my professional direction. It has widened the set of situations I can learn from. The shop floor is another place to observe where people, information, and operations meet—and where small details determine whether the whole system works.',
      ],
    },
  ],
  backLabel: 'Back to professional journey',
  seo: {
    title: 'What the shop floor is teaching me about software | Anh Minh',
    description:
      'A field note from Anh Minh on customer-facing retail work, operational handoffs, and building more dependable agentic software-development workflows.',
  },
}

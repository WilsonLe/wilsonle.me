import type {
  About,
  Education,
  Experience,
  HomeContent,
  Project,
  SkillStack,
} from '@/content/types'
import { siteSettings } from '@/content/en/site'

const about: About = {
  heading: 'About Me',
  content: [
    "I'm a software engineer who enjoys building end-to-end products, from user-facing experiences to the backend systems and infrastructure that keep them running.",
    'My work spans startups, freelance projects, and production systems at scale, with a focus on turning ideas into reliable software that teams can ship, operate, and grow with confidence.',
  ],
}

const projects: Project[] = [
  {
    id: 'pangea-chat',
    name: 'Pangea Chat',
    visibility: 'Public product',
    summary: 'A language-learning chat app where people practise while messaging friends.',
    contribution:
      'I owned frontend work on the product and built FastAPI services for its AI assistant and LLM workflows. I also set up delivery pipelines and the monitoring needed to run it in production.',
    technologies: ['Frontend', 'FastAPI', 'Python', 'LLM workflows', 'CI/CD', 'Observability'],
    url: 'https://app.pangea.chat/',
    linkLabel: 'Open Pangea Chat',
  },
  {
    id: 'cyobot-robotics-quest',
    name: 'CYOBot Robotics Quest',
    visibility: 'Public product',
    summary: 'A browser-based learning portal for coding and robotics.',
    contribution:
      'I led work on the core coding portal, implemented its CMS, and configured Keycloak SSO so authentication was managed consistently across the product.',
    technologies: ['Full-stack development', 'CMS', 'Keycloak', 'SSO'],
    url: 'https://dashboard.cyobot.com/',
    linkLabel: 'Open Robotics Quest',
  },
  {
    id: 'vulcan-internal-platform',
    name: 'Vulcan internal platform',
    visibility: 'Private internal system',
    summary: 'An internal platform for managing content, access, and production operations.',
    contribution:
      "I built the CMS, OAuth2 login flows, and a custom admin interface for identity and access management. I also added telemetry, alerting, and on-call support. Because the system is internal, I don't publish its URL, screenshots, or operational data.",
    technologies: ['CMS', 'OAuth2', 'Identity and access management', 'Observability'],
  },
]

const experiences: Experience[] = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Pangea Chat',
    location: 'Remote',
    startDate: '2023-05-01',
    endDate: '2026-04-30',
    current: false,
    highlights: [
      'Owned frontend work for app.pangea.chat and built an event-driven AI assistant for LLM-enabled product features.',
      'Designed and maintained FastAPI services for LLM workflows and core business logic, including performance and reliability work across the stack.',
      'Built CI/CD pipelines for the chatbot stack, making releases faster and easier to operate.',
      'Put telemetry, alerting, and monitoring in place for production services and supported incident response.',
      'Introduced spec-driven, AI-assisted workflows and maintained codebase documentation for agent-based development.',
    ],
  },
  {
    id: '2',
    title: 'Software Engineer',
    company: 'CYOBot',
    location: 'Dover, Delaware',
    startDate: '2023-12-01',
    endDate: '2024-05-01',
    current: false,
    highlights: [
      'Built the product landing page and added analytics to understand how people were using it.',
      'Led development of the core coding portal and implemented its CMS for publishing and deployment.',
      'Configured Keycloak SSO across the company, centralizing authentication and strengthening access controls.',
    ],
  },
  {
    id: '3',
    title: 'Software Engineer',
    company: 'Vulcan Augmetics',
    location: 'Ho Chi Minh, Vietnam',
    startDate: '2023-09-01',
    endDate: '2023-12-01',
    current: false,
    highlights: [
      'Implemented the CMS used for internal content management and team workflows.',
      'Built OAuth2 login flows and a custom admin interface for identity and access management.',
      'Added telemetry, alerting, monitoring, and an on-call process for production services.',
    ],
  },
  {
    id: '4',
    title: 'Software Engineer',
    company: 'Century International Development Investment',
    location: 'Ho Chi Minh, Vietnam',
    startDate: '2022-12-01',
    endDate: '2023-05-01',
    current: false,
    highlights: [
      'Built an end-to-end encrypted messaging service for internal company use.',
      'Integrated calendar and notification services and built an admin dashboard over existing databases.',
      'Developed notification workflows for time-sensitive company updates.',
    ],
  },
  {
    id: '5',
    title: 'Cloud Application Engineer Intern',
    company: 'Designer Brands Inc.',
    location: 'Columbus, Ohio',
    startDate: '2022-05-01',
    endDate: '2022-12-01',
    current: false,
    highlights: [
      'Developed features across cloud microservices supporting dsw.com.',
      'Migrated legacy Oracle data to PostgreSQL applications running on Kubernetes.',
      'Reduced unnecessary outbound traffic by filtering internal metadata before responses reached end users.',
    ],
  },
  {
    id: '6',
    title: 'Assistant Network Engineer',
    company: 'Denison University',
    location: 'Granville, Ohio',
    startDate: '2021-05-01',
    endDate: '2022-05-01',
    current: false,
    highlights: [
      'Resolved campus network tickets covering device, office, and dormitory connectivity issues.',
      'Configured and installed replacement devices during a campus network migration.',
      'Documented network test and connection procedures and managed the network asset inventory.',
    ],
  },
  {
    id: '7',
    title: 'Co-Founder, Full-Stack Engineer',
    company: 'DeerX',
    location: 'Columbus, Ohio',
    startDate: '2021-08-01',
    endDate: '2024-05-01',
    current: false,
    highlights: [
      'Founded an open-source community for Denison students to get started with open-source contributions.',
      'Led an engineering team building a full-stack mobile marketplace.',
      'Integrated chat and notification services into the marketplace.',
      'Built features that made it easier for students to exchange used items on campus.',
    ],
  },
]

const education: Education[] = [
  {
    id: '1',
    institution: 'University of Southern Queensland',
    degree: 'Master of Information Systems',
    location: 'Queensland, Australia',
    graduationDate: '2027-08-01',
    coursework: ['Management of Cyber Security', 'Systems Analysis and Design'],
  },
  {
    id: '2',
    institution: 'Denison University',
    degree: 'Bachelor of Science in Computer Science',
    location: 'Granville, Ohio',
    graduationDate: '2024-05-01',
    gpa: '3.52/4.00',
    coursework: [
      'Data Structures',
      'Algorithm Design and Analysis',
      'Data Systems',
      'Computer Systems',
      'Operating Systems',
      'Parallel Computing',
      'Quantum Computing',
      'Artificial Intelligence',
      'Statistics',
    ],
  },
]

const skillStack: SkillStack = {
  frontend: ['HTML', 'CSS', 'React', 'React Native', 'Tailwind CSS', 'Sass', 'Electron'],
  backend: [
    'Express.js',
    'Next.js',
    'FastAPI',
    'Flask',
    'Django',
    'Ansible',
    'Docker',
    'Kubernetes',
    'Celery',
    'RabbitMQ',
    'Apache Kafka',
    'Redis',
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'SQLite',
    'Terraform',
    'Pinecone',
    'LangChain',
    'LangGraph',
  ],
  cloud: [
    'Amazon Web Services (ECS, EC2, Lambda, SQS, RDS, S3, SNS, SES, VPC, Cognito, IAM, EventBridge)',
    'Google Cloud Platform (Firebase, Cloud Storage, Cloud SQL)',
    'Vercel',
    'Serverless Framework',
  ],
  languages: ['Java', 'Python', 'TypeScript'],
  tools: ['Claude Code', 'VSCode Copilot Chat'],
}

export const homeContent: HomeContent = {
  locale: 'en',
  siteSettings,
  about,
  projects,
  experiences,
  education,
  skillStack,
  seo: {
    title: siteSettings.seo?.metaTitle || `${siteSettings.name} | ${siteSettings.title}`,
    description: siteSettings.seo?.metaDescription || 'Portfolio website',
  },
}

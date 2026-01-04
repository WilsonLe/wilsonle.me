// Types
export interface SiteSettings {
  name: string
  title: string
  tagline?: string
  location?: string
  email?: string
  phone?: string
  social?: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface About {
  heading: string
  content: string[]
}

export interface Experience {
  id: string
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  highlights: string[]
}

export interface Skill {
  id: string
  category: string
  items: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  location?: string
  graduationDate: string
  gpa?: string
  coursework?: string[]
}

// Content
export const siteSettings: SiteSettings = {
  name: 'Minh',
  title: 'I code',
  tagline: '',
  location: '',
  email: 'minhle02.work@gmail.com',
  phone: '+61 452-685-096',
  social: {
    github: 'https://github.com/WilsonLe',
    linkedin: 'https://linkedin.com/in/wilsonle02',
  },
  seo: {
    metaTitle: 'Minh | Full Stack Software Engineer',
    metaDescription:
      'Full Stack Software Engineer with experience in enterprise-grade JavaScript/TypeScript and fast-paced Python startup environments.',
  },
}

export const about: About = {
  heading: 'About Me',
  content: [
    "I'm a Full Stack Software Engineer with experience spanning enterprise-grade JavaScript/TypeScript applications and fast-paced Python startup environments.",
    "I specialize in building scalable web applications with modern technologies like React, Next.js, and Node.js, while also delivering AI-powered solutions using Python and FastAPI. I thrive in both structured enterprise settings and agile startup cultures.",
  ],
}

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Backend Engineer',
    company: 'Pangea Chat',
    location: 'Richmond, Virginia',
    startDate: '2023-05-01',
    current: true,
    highlights: [
      'Increased first-time user engagement with the app by 50% by developing an AI assistant chatbot for app.pangea.chat using an event-driven architecture that handles over 1,000 requests per second, thereby optimizing throughput and reliability for rapid user interactions.',
      'Boosted overall system scalability and reduced latency by 30% by designing and maintaining a robust FastAPI-based core backend server that handled LLM prompt engineering and critical business logic.',
      'Shortened deployment time by 90% and minimized operational overhead by implementing comprehensive CI/CD pipelines that automated the rollout of the chatbot and all dependent services.',
      'Reduced incident response delay by 90% by setting up a comprehensive telemetry, alert, and monitoring system for both the services, ensuring quicker identification and resolution of critical production issues.',
    ],
  },
  {
    id: '2',
    title: 'Backend Engineer',
    company: 'CYOBot',
    location: 'Dover, Delaware',
    startDate: '2023-12-01',
    endDate: '2024-05-01',
    current: false,
    highlights: [
      'Increased user engagement by 40% and reduced bounce rates by 25% by developing a high-performance landing page integrated with Google Analytics, enabling real-time metrics and data-driven optimizations.',
      'Boosted user adoption by 60% and cut onboarding time by 30% by leading the development of the company\'s core coding portal, offering a streamlined user experience for new sign-ups.',
      'Increased deployment speed by 50% by implementing a headless CMS to streamline content management, reducing overhead for developers and content editors.',
      'Maintained 99.9% uptime and reduced incident response time by 40% by establishing a comprehensive telemetry and monitoring system, ensuring rapid detection and resolution of infrastructure issues.',
      'Enhanced security and achieved industry-standard compliance by configuring company-wide SSO with Keycloak, centralizing user authentication and reinforcing data protection.',
    ],
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'Vulcan Augmetics',
    location: 'Ho Chi Minh, Vietnam',
    startDate: '2023-09-01',
    endDate: '2023-12-01',
    current: false,
    highlights: [
      'Improved content management efficiency by 50% by integrating a headless CMS, enabling seamless updates and streamlined collaboration across teams.',
      'Implemented OAuth2 login for users, enhancing authentication security and simplifying user access management.',
      'Developed custom-built identity access management system (IAM) for users, increasing admin productivity when designing user authorization flow.',
      'Established a telemetry, alert, and monitoring system, reducing incident response time by 35% and ensuring 99.9% uptime for mission critical services.',
    ],
  },
  {
    id: '4',
    title: 'Backend Engineer',
    company: 'Century International Development Investment',
    location: 'Ho Chi Minh, Vietnam',
    startDate: '2022-12-01',
    endDate: '2023-05-01',
    current: false,
    highlights: [
      'Facilitated secure communication for 50+ high-profile employees with end-to-end encrypted messaging service.',
      'Boosted employees productivity by 20 hrs/week by implementing calendar service, tightly integrated with chat service.',
      'Increased employee timely response to company updates by 40% by implementing notification service that tightly integrates with chat and calendar service.',
      'Enhanced front-end developers productivity 50% by integrating an admin dashboard over existing databases.',
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
      'Assisted in developing 3 cloud-based microservices for www.dsw.com, handles 10M+ requests per day.',
      'Optimized initial page load time by 0.2 seconds by implementing Python scripts to migrate 2000+ product categories and 3000+ product pages from Oracle proprietary software to internal apps using PostgreSQL and Kubernetes.',
      'Reduce microservices production outbound traffic 2% by developing features that restrict microservices to send verbose responses to only internal microservices requests.',
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
      'Resolved over 200 network-related tickets, ensuring a 95% first-call resolution rate, including patching office devices to the campus network and troubleshooting network issues for office and dormitory clients.',
      'Supported campus network migration, configuring and installing over 50 replacement devices, contributing to a 30% improvement in network reliability.',
      'Conducted speed tests on the upgraded campus network, documenting processes that streamlined future network connection setups and reduced troubleshooting time by 20%.',
      'Managed inventory of 1,000+ network items (cables, switches, APs, cameras), maintained accurate records in device databases, and compiled monthly reports to assist supervisors in data-driven decision-making.',
    ],
  },
]

export interface SkillStack {
  frontend: string[]
  backend: string[]
  cloud: string[]
  languages: string[]
}

export const skillStack: SkillStack = {
  frontend: ['HTML', 'CSS', 'ReactJS', 'React Native', 'TailwindCSS', 'Sass', 'Electron'],
  backend: ['Express.js', 'Next.js', 'FastAPI', 'Flask', 'Django', 'Ansible Playbook', 'Docker', 'Kubernetes', 'Celery', 'RabbitMQ', 'Apache Kafka', 'Redis', 'MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Terraform', 'Pinecone', 'Langchain'],
  cloud: ['Vercel', 'Serverless Framework', 'Firebase', 'GCP Cloud Storage', 'GCP Cloud SQL', 'AWS ECS', 'AWS EC2', 'AWS Lambda', 'AWS SQS', 'AWS RDS', 'AWS S3', 'AWS SNS', 'AWS SES', 'AWS VPC', 'AWS Cognito', 'AWS IAM', 'AWS EventBridge'],
  languages: ['Java', 'Python', 'TypeScript'],
}

// Keep for backwards compatibility
export const skills: Skill[] = []

export const education: Education[] = [
  {
    id: '1',
    institution: 'University of Southern Queensland',
    degree: 'Master of Information System',
    location: 'Queensland, Australia',
    graduationDate: '2027-09-01',
    coursework: [
      'Management of Cyber Security',
      'Systems Analysis and Design',
    ],
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

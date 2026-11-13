import type { TechStack } from '@/content/types'

// Approved skillStack from the full résumé at f9d1363, regrouped for readable slides.
export const techStack: TechStack = {
  heading: 'Tech stack',
  categoriesLabel: 'Tech stack sections',
  playLabel: 'Play',
  pauseLabel: 'Pause',
  playDescription: 'Start automatic tech stack rotation',
  pauseDescription: 'Pause automatic tech stack rotation',
  groups: [
    {
      id: 'frontend',
      label: 'Frontend',
      technologies: ['HTML', 'CSS', 'React', 'React Native', 'Tailwind CSS', 'Sass', 'Electron'],
    },
    {
      id: 'backend',
      label: 'Backend',
      technologies: ['Express.js', 'Next.js', 'FastAPI', 'Flask', 'Django'],
    },
    {
      id: 'data-ai',
      label: 'Data & AI',
      technologies: [
        'Redis',
        'PostgreSQL',
        'MySQL',
        'MongoDB',
        'SQLite',
        'Pinecone',
        'LangChain',
        'LangGraph',
      ],
    },
    {
      id: 'cloud',
      label: 'Cloud & ops',
      technologies: [
        'AWS',
        'Google Cloud Platform',
        'Vercel',
        'Serverless Framework',
        'Ansible',
        'Docker',
        'Kubernetes',
        'Terraform',
      ],
    },
    { id: 'languages', label: 'Languages', technologies: ['Java', 'Python', 'TypeScript'] },
    {
      id: 'tools',
      label: 'Tools & messaging',
      technologies: ['Claude Code', 'VSCode Copilot Chat', 'Celery', 'RabbitMQ', 'Apache Kafka'],
    },
  ],
}

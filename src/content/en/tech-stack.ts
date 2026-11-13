import type { TechStack } from '@/content/types'

// Approved skillStack from the full résumé at f9d1363, regrouped for readable slides.
export const techStack: TechStack = {
  heading: 'Skills',
  categoriesLabel: 'Skill sections',
  previousLabel: 'Previous skill',
  nextLabel: 'Next skill',
  groups: [
    {
      id: 'frontend',
      label: 'Frontend',
      technologies: [
        { name: 'HTML', icon: '/skills/html5.svg' },
        { name: 'CSS', icon: '/skills/css3.svg' },
        { name: 'React', icon: '/skills/react.svg' },
        { name: 'React Native', icon: '/skills/react.svg' },
        { name: 'Tailwind CSS', icon: '/skills/tailwindcss.svg' },
        { name: 'Sass', icon: '/skills/sass.svg' },
        { name: 'Electron', icon: '/skills/electron.svg' },
      ],
    },
    {
      id: 'backend',
      label: 'Backend',
      technologies: [
        { name: 'Express.js', icon: '/skills/express.svg' },
        { name: 'Next.js', icon: '/skills/nextjs.svg' },
        { name: 'FastAPI', icon: '/skills/fastapi.svg' },
        { name: 'Flask', icon: '/skills/flask.svg' },
        { name: 'Django', icon: '/skills/django.svg' },
      ],
    },
    {
      id: 'data-ai',
      label: 'Data & AI',
      technologies: [
        { name: 'Redis', icon: '/skills/redis.svg' },
        { name: 'PostgreSQL', icon: '/skills/postgresql.svg' },
        { name: 'MySQL', icon: '/skills/mysql.svg' },
        { name: 'MongoDB', icon: '/skills/mongodb.svg' },
        { name: 'SQLite', icon: '/skills/sqlite.svg' },
        { name: 'Pinecone', icon: '/skills/vector-database.svg' },
        { name: 'LangChain', icon: '/skills/langchain.svg' },
        { name: 'LangGraph', icon: '/skills/langgraph.svg' },
      ],
    },
    {
      id: 'cloud',
      label: 'Cloud & ops',
      technologies: [
        { name: 'AWS', icon: '/skills/amazonwebservices.svg' },
        { name: 'Google Cloud Platform', icon: '/skills/googlecloud.svg' },
        { name: 'Vercel', icon: '/skills/vercel.svg' },
        { name: 'Serverless Framework', icon: '/skills/serverless.svg' },
        { name: 'Ansible', icon: '/skills/ansible.svg' },
        { name: 'Docker', icon: '/skills/docker.svg' },
        { name: 'Kubernetes', icon: '/skills/kubernetes.svg' },
        { name: 'Terraform', icon: '/skills/terraform.svg' },
      ],
    },
    {
      id: 'languages',
      label: 'Languages',
      technologies: [
        { name: 'Java', icon: '/skills/java.svg' },
        { name: 'Python', icon: '/skills/python.svg' },
        { name: 'TypeScript', icon: '/skills/typescript.svg' },
      ],
    },
    {
      id: 'tools',
      label: 'AI tools & messaging',
      technologies: [
        { name: 'Claude Code', icon: '/skills/claude.svg' },
        { name: 'VSCode Copilot Chat', icon: '/skills/githubcopilot.svg' },
        { name: 'Celery', icon: '/skills/celery.svg' },
        { name: 'RabbitMQ', icon: '/skills/rabbitmq.svg' },
        { name: 'Apache Kafka', icon: '/skills/apachekafka.svg' },
      ],
    },
  ],
}

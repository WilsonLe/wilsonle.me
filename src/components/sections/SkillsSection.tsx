import type { ResumeLabels, SkillStack } from '@/content/types'

interface SkillsSectionProps {
  skillStack: SkillStack
  labels: ResumeLabels
}

export function SkillsSection({ skillStack, labels }: SkillsSectionProps) {
  const groups = [
    { id: 'tools', heading: labels.toolsHeading, items: skillStack.tools, accent: 'signal' },
    {
      id: 'frontend',
      heading: labels.frontendHeading,
      items: skillStack.frontend,
      accent: 'blueprint',
    },
    {
      id: 'backend',
      heading: labels.backendHeading,
      items: skillStack.backend,
      accent: 'signal',
    },
    { id: 'cloud', heading: labels.cloudHeading, items: skillStack.cloud, accent: 'blueprint' },
    {
      id: 'languages',
      heading: labels.languagesHeading,
      items: skillStack.languages,
      accent: 'signal',
    },
  ]

  return (
    <section
      id="skills"
      className="field-grid border-b border-rule bg-ink px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-8 border-b border-rule pb-8">
          <h2
            id="skills-heading"
            className="font-display text-5xl font-medium leading-none tracking-[-0.04em] text-paper sm:text-7xl"
          >
            {labels.skillsHeading}
          </h2>
          <span
            aria-hidden="true"
            className="font-label hidden text-xs font-bold tracking-[0.14em] text-blueprint sm:block"
          >
            R02
          </span>
        </div>

        <div className="grid border-l border-t border-rule md:grid-cols-2 lg:grid-cols-6">
          {groups.map((group, index) => (
            <article
              key={group.id}
              className={`min-w-0 border-b border-r border-rule p-6 sm:p-8 ${
                index === 2 || index === 3 ? 'lg:col-span-3' : 'lg:col-span-2'
              }`}
            >
              <h3
                className={`font-label border-l-2 pl-3 text-xs font-bold uppercase leading-5 tracking-[0.12em] ${
                  group.accent === 'signal'
                    ? 'border-signal text-signal'
                    : 'border-blueprint text-blueprint'
                }`}
              >
                {group.heading}
              </h3>
              <ul className="mt-7 flex min-w-0 flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-label max-w-full break-words border border-rule bg-ink-raised px-2.5 py-1.5 text-[0.68rem] leading-5 text-paper-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

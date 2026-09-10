import type { Projects } from '@/content/types'

interface ProjectsSectionProps {
  projects: Projects
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (projects.items.length === 0) {
    return null
  }

  return (
    <section
      id="work"
      className="paper-grid bg-paper px-4 py-24 text-ink sm:px-6 lg:px-8 lg:py-32"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <p className="font-label text-xs font-bold uppercase tracking-[0.16em] text-signal-deep">
              <span aria-hidden="true">02 / </span>
              {projects.eyebrow}
            </p>
            <h2
              id="work-heading"
              className="font-display mt-5 max-w-xl text-4xl font-medium leading-[0.95] tracking-[-0.035em] sm:text-5xl lg:text-7xl"
            >
              {projects.heading}
            </h2>
          </div>
          <p className="max-w-2xl self-end text-lg leading-8 text-ink/75">
            {projects.introduction}
          </p>
        </div>

        <ol className="mt-16 border-t border-ink lg:mt-20">
          {projects.items.map((project, index) => (
            <li key={project.id} className="border-b border-ink">
              <article
                className={`grid min-w-0 gap-9 px-0 py-10 transition-colors sm:px-5 lg:grid-cols-[minmax(13rem,0.65fr)_minmax(0,1.35fr)] lg:gap-16 lg:px-8 lg:py-14 ${
                  index === 0 ? 'bg-blueprint/35' : 'hover:bg-paper-muted/35'
                }`}
              >
                <header className="min-w-0">
                  <div className="flex items-start justify-between gap-5">
                    <span
                      className="font-label text-xs font-bold tracking-[0.14em] text-signal-deep"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-label max-w-44 border border-ink/35 px-3 py-1.5 text-right text-[0.65rem] font-semibold uppercase leading-4 tracking-[0.1em] text-ink/70">
                      {project.visibility}
                    </span>
                  </div>
                  <h3 className="font-display mt-8 break-words text-3xl font-medium leading-tight sm:text-4xl">
                    {project.name}
                  </h3>

                  {project.url && project.linkLabel ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-label mt-7 inline-flex items-center gap-2 border-b-2 border-signal-deep pb-1 text-xs font-bold uppercase tracking-[0.1em] text-ink transition-colors hover:text-signal-deep"
                    >
                      {project.linkLabel}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </header>

                <dl className="min-w-0 space-y-8">
                  <div className="grid gap-2 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6">
                    <dt className="font-label text-[0.68rem] font-bold uppercase tracking-[0.13em] text-ink/60">
                      {projects.productLabel}
                    </dt>
                    <dd className="text-lg leading-8 text-ink">{project.summary}</dd>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6">
                    <dt className="font-label text-[0.68rem] font-bold uppercase tracking-[0.13em] text-ink/60">
                      {projects.contributionLabel}
                    </dt>
                    <dd className="leading-7 text-ink/75">{project.contribution}</dd>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6">
                    <dt className="font-label text-[0.68rem] font-bold uppercase tracking-[0.13em] text-ink/60">
                      {projects.technologiesLabel}
                    </dt>
                    <dd className="min-w-0">
                      <ul
                        className="flex min-w-0 flex-wrap gap-2"
                        aria-label={`${project.name}: ${projects.technologiesLabel}`}
                      >
                        {project.technologies.map((technology) => (
                          <li
                            key={technology}
                            className="font-label max-w-full break-words border border-ink/25 bg-paper/70 px-2.5 py-1.5 text-[0.68rem] leading-4 text-ink"
                          >
                            {technology}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

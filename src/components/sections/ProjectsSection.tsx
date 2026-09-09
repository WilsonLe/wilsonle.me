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
      className="scroll-mt-20 bg-slate-900/50 px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              {projects.eyebrow}
            </p>
            <h2 id="work-heading" className="mt-4 text-3xl font-bold text-white md:text-5xl">
              {projects.heading}
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">{projects.introduction}</p>
        </div>

        <ol className="mt-14 space-y-6">
          {projects.items.map((project, index) => (
            <li key={project.id}>
              <article
                className={`glass grid gap-8 rounded-xl p-6 transition-colors hover:bg-slate-800/60 md:p-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14 ${
                  index === 0 ? 'border-blue-500/50' : ''
                }`}
              >
                <header className="flex flex-col items-start">
                  <div className="flex w-full items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-blue-400" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="rounded-full border border-slate-600 px-3 py-1 text-xs font-medium text-slate-300">
                      {project.visibility}
                    </span>
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold text-white md:text-3xl">
                    {project.name}
                  </h3>

                  {project.url && project.linkLabel ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
                    >
                      {project.linkLabel}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </header>

                <dl className="space-y-7">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {projects.productLabel}
                    </dt>
                    <dd className="mt-2 text-lg leading-8 text-slate-100">{project.summary}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {projects.contributionLabel}
                    </dt>
                    <dd className="mt-2 leading-7 text-slate-300">{project.contribution}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {projects.technologiesLabel}
                    </dt>
                    <dd className="mt-3">
                      <ul
                        className="flex flex-wrap gap-2"
                        aria-label={`${project.name} technologies`}
                      >
                        {project.technologies.map((technology) => (
                          <li
                            key={technology}
                            className="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-blue-300"
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

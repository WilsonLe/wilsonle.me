import Image from 'next/image'
import Link from 'next/link'
import type { Projects } from '@/content/types'
import { works } from '@/content/work'

export function ProjectsSection({
  projects,
  basePath = '',
}: {
  projects: Projects
  basePath?: string
}) {
  if (projects.items.length === 0) return null
  return (
    <section
      id="work"
      className="paper-grid bg-paper px-4 py-24 text-ink sm:px-6 lg:px-8 lg:py-32"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-7xl">
        <h2
          id="work-heading"
          className="font-display text-4xl font-medium leading-[0.95] tracking-[-0.035em] sm:text-5xl lg:text-7xl"
        >
          {projects.heading}
        </h2>
        <ol className="mt-16 border-t border-ink lg:mt-20">
          {projects.items.map((project, index) => {
            const work = works.find((item) => item.projectId === project.id)
            return (
              <li key={project.id} className="border-b border-ink">
                <article className="grid min-w-0 items-center gap-8 py-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14 lg:py-14">
                  {work && (
                    <Link
                      href={`${basePath}/work/${work.slug}`}
                      className="block rounded-sm bg-ink/10 p-5 sm:p-9"
                      aria-label={`${project.name} — ${basePath === '/vi' ? 'Xem dự án' : 'View work'}`}
                    >
                      <Image
                        {...work.screens[0].image}
                        alt={work.screens[0].image.alt}
                        sizes="(min-width: 1024px) 600px, 90vw"
                        className="h-auto w-full rounded-md shadow-lg"
                      />
                    </Link>
                  )}
                  <div className="min-w-0">
                    <header>
                      <div className="font-label flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.12em] text-ink/70">
                        <span className="text-signal-deep">0{index + 1}</span>
                        <span>{project.visibility}</span>
                      </div>
                      <h3 className="font-display mt-5 text-3xl leading-tight sm:text-4xl">
                        {project.name}
                      </h3>
                    </header>
                    <dl className="mt-5 space-y-4">
                      <div>
                        <dt className="sr-only">{projects.productLabel}</dt>
                        <dd className="text-lg leading-8">{project.summary}</dd>
                      </div>
                      <div>
                        <dt className="font-label mb-1 text-[0.65rem] uppercase tracking-[0.1em] text-ink/65">
                          {projects.contributionLabel}
                        </dt>
                        <dd className="text-sm leading-7 text-ink/75">
                          {work?.credit || project.contribution}
                        </dd>
                      </div>
                    </dl>
                    <div className="font-label mt-6 flex flex-wrap gap-6 text-xs font-semibold">
                      {work && (
                        <Link
                          className="border-b-2 border-signal-deep pb-1"
                          href={`${basePath}/work/${work.slug}`}
                        >
                          {basePath === '/vi' ? 'Xem dự án' : 'View work'} →
                        </Link>
                      )}
                      {project.url && project.linkLabel && (
                        <a
                          className="work-text-link py-1"
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.linkLabel} ↗
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

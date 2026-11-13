import type { Projects } from '@/content/types'
import { works } from '@/content/work'
import { ScrollEntrance } from '@/components/ScrollEntrance'
import { TabbedWork } from '@/components/TabbedWork'
import { AnnotatedScreenshot } from '@/components/AnnotatedScreenshot'

export function ProjectsSection({ projects }: { projects: Projects }) {
  if (projects.items.length === 0) return null
  return (
    <section
      id="work"
      className="bg-paper px-4 py-20 text-ink sm:px-6 lg:px-8 lg:py-28"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollEntrance className="work-heading">
          <h2
            id="work-heading"
            className="font-display text-5xl font-medium leading-display tracking-[-0.035em] sm:text-6xl lg:text-7xl"
          >
            {projects.heading}
          </h2>
        </ScrollEntrance>
        <TabbedWork
          choices={projects.items.map((project) => {
            const work = works.find((item) => item.projectId === project.id)
            const id = work?.slug || project.id
            return {
              id,
              label: work?.name || project.name,
              panelId: `work-panel-${id}`,
              href: `#${id}`,
            }
          })}
          labels={{
            top: projects.tabsLabel,
            bottom: projects.bottomTabsLabel,
            previous: projects.previousTabsLabel,
            next: projects.nextTabsLabel,
          }}
        >
          {projects.items.map((project) => {
            const work = works.find((item) => item.projectId === project.id)
            const highlights = work?.features ?? work?.contributions
            return (
              <article
                key={project.id}
                id={work?.slug || project.id}
                className="work-project min-w-0 scroll-mt-24 py-10 sm:py-14 lg:py-16"
                aria-labelledby={`${project.id}-heading`}
              >
                <ScrollEntrance className="work-intro grid items-start gap-7 pb-8 md:grid-cols-2 md:gap-14 lg:pb-10">
                  <header>
                    <h3
                      id={`${project.id}-heading`}
                      className="font-display text-4xl leading-tight tracking-[-0.03em] sm:text-5xl"
                    >
                      {work?.name || project.name}
                    </h3>
                    <p className="mt-3 text-lg leading-7">{work?.summary || project.summary}</p>
                    {project.url && project.linkLabel && (
                      <a
                        className="font-label work-text-link mt-5 inline-flex py-1 text-xs font-semibold text-signal-deep"
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.linkLabel} ↗
                      </a>
                    )}
                  </header>
                  <dl>
                    <dt className="font-label text-[0.65rem] uppercase tracking-[0.1em] text-ink/65">
                      {work?.features ? projects.featuresLabel : projects.contributionLabel}
                    </dt>
                    <dd className="mt-3 text-sm leading-7 text-ink/80">
                      {highlights ? (
                        <ul className="space-y-1">
                          {highlights.map((bullet) => (
                            <li key={bullet} className="flex gap-3">
                              <span aria-hidden="true" className="text-signal-deep">
                                ↳
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        project.contribution
                      )}
                    </dd>
                  </dl>
                </ScrollEntrance>
                {work && (
                  <div className="work-features" aria-label={`${work.name} screenshots`}>
                    {work.screens.map((screen) => (
                      <AnnotatedScreenshot
                        key={screen.id}
                        id={`${work.slug === 'pangea-chat' ? 'pangea' : work.slug}-${screen.id}`}
                        screen={screen}
                      />
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </TabbedWork>
      </div>
    </section>
  )
}

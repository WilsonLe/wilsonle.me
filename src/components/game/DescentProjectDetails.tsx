import Image from 'next/image'
import { RobotOverlay } from '@/components/RobotOverlay'
import type { Project, Projects } from '@/content/types'
import type { Work } from '@/content/work'

export function projectScreenId(work: Work, screen: Work['screens'][number]) {
  return `${work.slug === 'pangea-chat' ? 'pangea' : work.slug}-${screen.id}`
}

export function DescentProjectDetails({
  project,
  work,
  labels,
}: {
  project: Project
  work?: Work
  labels: Pick<Projects, 'contributionLabel' | 'featuresLabel'>
}) {
  const highlights =
    work?.features ?? work?.contributions ?? (project.contribution ? [project.contribution] : [])
  const hasHighlights = highlights.length > 0
  const featuredScreens = work?.screens.filter((screen) => screen.layout === 'feature') ?? []
  return (
    <>
      <div
        className={
          hasHighlights ? undefined : 'my-4 flex flex-wrap items-center justify-between gap-3'
        }
      >
        <p className={`descent-dialog-summary ${hasHighlights ? '' : 'mt-0'}`}>
          {work?.summary || project.summary}
        </p>
        {(hasHighlights || project.url) && (
          <div className={hasHighlights ? 'descent-contribution' : undefined}>
            {hasHighlights && (
              <>
                <h3>{work?.features ? labels.featuresLabel : labels.contributionLabel}</h3>
                <ul>
                  {highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </>
            )}
            {project.url && (
              <a
                className="descent-outline-link"
                href={project.url}
                target="_blank"
                rel="noreferrer"
                data-portfolio-action="project_link_clicked"
                data-portfolio-project={project.id}
              >
                {project.linkLabel || project.name}
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        )}
      </div>
      {work && featuredScreens.length > 0 && (
        <div
          role="group"
          aria-label={labels.featuresLabel}
          className="mb-5 grid grid-cols-2 border-y border-[#304751] md:hidden"
        >
          {featuredScreens.map((screen) => (
            <button
              key={screen.id}
              type="button"
              className="min-h-11 px-2 text-left text-sm text-signal underline underline-offset-4"
              onClick={() => {
                const target = document.getElementById('descent-' + projectScreenId(work, screen))
                target?.scrollIntoView({ block: 'start' })
                target?.focus({ preventScroll: true })
              }}
            >
              {screen.title}
            </button>
          ))}
        </div>
      )}
      {work && (
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-x-5">
          {work.screens.map((screen) => {
            const featured = screen.layout === 'feature'
            const portrait = screen.layout === 'portrait'
            const columns = featured
              ? 'md:col-span-6 md:[@media(max-height:960px)]:col-span-3'
              : portrait
                ? 'md:col-span-4'
                : 'md:col-span-12'
            const { width, height } = screen.image
            const imageFit =
              height > width
                ? 'object-cover object-[center_42%]'
                : width > height * 2
                  ? 'object-contain'
                  : 'object-cover'
            return (
              <figure
                key={screen.id}
                id={'descent-' + projectScreenId(work, screen)}
                className={`descent-dialog-screen ${columns}${featured || portrait ? ' flex flex-col' : ''}`}
                data-portfolio-view="screenshot"
                data-portfolio-target={screen.id}
                data-portfolio-project={project.id}
                tabIndex={featured ? -1 : undefined}
              >
                <figcaption>
                  <h3>{screen.title}</h3>
                  <p>{screen.callout.description}</p>
                </figcaption>
                <div className="relative mt-auto">
                  <a
                    className={
                      featured
                        ? 'block aspect-video overflow-hidden border border-[#456572] bg-ink'
                        : portrait
                          ? 'mx-auto block max-w-64'
                          : 'block'
                    }
                    href={screen.image.src}
                    target="_blank"
                    rel="noreferrer"
                    data-portfolio-action="screenshot_clicked"
                    data-portfolio-target={screen.id}
                    data-portfolio-project={project.id}
                    aria-label={`Open full screenshot: ${screen.title}`}
                  >
                    <Image
                      {...screen.image}
                      alt={screen.image.alt}
                      className={featured ? `h-full border-0 ${imageFit}` : undefined}
                      unoptimized
                    />
                  </a>
                  {screen.robot && (
                    <RobotOverlay
                      robot={screen.robot}
                      projectId={project.id}
                      screenId={screen.id}
                    />
                  )}
                </div>
              </figure>
            )
          })}
        </div>
      )}
    </>
  )
}

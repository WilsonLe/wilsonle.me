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
  const highlights = work?.features ?? work?.contributions ?? [project.contribution]
  return (
    <>
      <p className="descent-dialog-summary">{work?.summary || project.summary}</p>
      <section className="descent-contribution">
        <h3>{work?.features ? labels.featuresLabel : labels.contributionLabel}</h3>
        <ul>
          {highlights.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        {project.url && (
          <a className="descent-outline-link" href={project.url} target="_blank" rel="noreferrer">
            {project.linkLabel || project.name}
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </section>
      {work?.screens.map((screen) => (
        <figure
          key={screen.id}
          id={'descent-' + projectScreenId(work, screen)}
          className="descent-dialog-screen"
        >
          <figcaption>
            <h3>{screen.title}</h3>
            <p>{screen.callout.description}</p>
          </figcaption>
          <div className="relative">
            <a
              className="block"
              href={screen.image.src}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open full screenshot: ${screen.title}`}
            >
              <Image {...screen.image} alt={screen.image.alt} unoptimized />
            </a>
            {screen.robot && <RobotOverlay robot={screen.robot} />}
          </div>
        </figure>
      ))}
    </>
  )
}

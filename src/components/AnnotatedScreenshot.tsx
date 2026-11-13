import Image from 'next/image'
import type { WorkScreen } from '@/content/work'
import { ScrollEntrance } from '@/components/ScrollEntrance'
import { RobotOverlay } from '@/components/RobotOverlay'

export function AnnotatedScreenshot({ screen, id }: { screen: WorkScreen; id: string }) {
  const { image, callout } = screen
  return (
    <ScrollEntrance
      as="figure"
      id={id}
      className="work-capture work-feature"
      labelledBy={`${id}-title`}
    >
      <div className="work-image-mat">
        <div className="work-shot-view">
          <a
            className="block"
            href={image.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open full screenshot: ${screen.title}`}
          >
            <Image {...image} alt={image.alt} unoptimized className="h-auto w-full" />
          </a>
          {screen.robot && <RobotOverlay robot={screen.robot} />}
        </div>
      </div>
      <figcaption className="work-callout">
        <div className="work-callout-copy">
          <h4
            id={`${id}-title`}
            className="font-display text-3xl leading-tight tracking-[-0.025em] sm:text-4xl"
          >
            {screen.title}
          </h4>
          <p className="mt-4 max-w-sm text-sm leading-7 text-ink/75">{callout.description}</p>
        </div>
      </figcaption>
    </ScrollEntrance>
  )
}

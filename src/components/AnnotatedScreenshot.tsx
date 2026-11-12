'use client'

import Image from 'next/image'
import { type CSSProperties, useEffect, useRef } from 'react'
import type { WorkScreen } from '@/content/work'

export function AnnotatedScreenshot({
  screen,
  id,
  zoom = false,
}: {
  screen: WorkScreen
  id: string
  zoom?: boolean
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const figure = ref.current
    if (!figure || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          figure.dataset.entered = 'true'
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(figure)
    return () => observer.disconnect()
  }, [])

  const { image, callout } = screen
  // Keep surrounding app context; pan toward the focus without exposing empty edges.
  const zoomScale = 1.5
  const zoomOffset = (position: number) =>
    Math.max(100 * (1 - zoomScale), Math.min(0, 50 - position * zoomScale))
  const zoomStyle = {
    '--zoom-scale': zoomScale,
    '--zoom-x': `${zoomOffset(callout.x)}%`,
    '--zoom-y': `${zoomOffset(callout.y)}%`,
  } as CSSProperties
  return (
    <figure
      ref={ref}
      id={id}
      className="work-capture work-feature"
      data-zoom={zoom ? 'true' : undefined}
      aria-labelledby={`${id}-title`}
    >
      <div className="work-image-mat">
        <a
          className="work-shot-view"
          href={image.src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open full screenshot: ${screen.title}`}
        >
          <div className="work-zoom-layer" style={zoom ? zoomStyle : undefined}>
            <Image {...image} alt={image.alt} unoptimized className="h-auto w-full" />
          </div>
        </a>
      </div>
      <figcaption className="work-callout" tabIndex={zoom ? 0 : undefined}>
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
    </figure>
  )
}

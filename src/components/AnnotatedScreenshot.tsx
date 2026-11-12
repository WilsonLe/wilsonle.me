'use client'

import Image from 'next/image'
import { type CSSProperties, useEffect, useRef, useState } from 'react'
import type { WorkScreen } from '@/content/work'

export function AnnotatedScreenshot({
  screen,
  id,
  zoom = false,
  labels,
}: {
  screen: WorkScreen
  id: string
  zoom?: boolean
  labels: { zoom: string; fit: string; hint: string }
}) {
  const ref = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)

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
  useEffect(() => {
    const viewport = viewportRef.current
    if (!expanded || !viewport) return
    viewport.focus({ preventScroll: true })
    viewport.scrollTo({
      left: (callout.x / 100) * image.width - viewport.clientWidth / 2,
      top: (callout.y / 100) * image.height - viewport.clientHeight / 2,
    })
  }, [expanded, callout.x, callout.y, image.width, image.height])
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
      data-wide={screen.wide ? 'true' : undefined}
      data-expanded={expanded ? 'true' : undefined}
      aria-labelledby={`${id}-title`}
    >
      <div className="work-image-mat">
        <div
          ref={viewportRef}
          id={`${id}-viewport`}
          className="work-shot-view"
          tabIndex={expanded ? 0 : undefined}
          role={expanded ? 'region' : undefined}
          aria-label={expanded ? `${screen.title}. ${labels.hint}` : undefined}
        >
          <div
            className="work-zoom-layer"
            style={expanded ? { width: image.width } : zoom ? zoomStyle : undefined}
          >
            <a
              className="block"
              href={image.src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open full screenshot: ${screen.title}`}
            >
              <Image {...image} alt={image.alt} unoptimized className="h-auto w-full" />
            </a>
          </div>
        </div>
        {zoom && (
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs leading-5">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={`${id}-viewport`}
              className="work-text-link min-h-11 px-2 font-semibold text-signal-deep"
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? labels.fit : labels.zoom} {expanded ? '−' : '+'}
            </button>
            {expanded && <span className="text-ink/70">{labels.hint}</span>}
          </div>
        )}
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

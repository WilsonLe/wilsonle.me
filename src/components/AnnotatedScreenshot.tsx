'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { WorkScreen } from '@/content/work'

export function AnnotatedScreenshot({
  screen,
  priority = false,
  compact = false,
  layout = 'gallery',
  sequence = 0,
}: {
  screen: WorkScreen
  priority?: boolean
  compact?: boolean
  layout?: 'gallery' | 'split'
  sequence?: number
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
  const height = (1000 * image.height) / image.width
  const targetX = callout.x * 10
  const targetY = (callout.y * height) / 100
  const labelPosition = compact ? 50 : callout.labelX
  const labelX = labelPosition * 10

  if (layout === 'split') {
    return (
      <figure
        ref={ref}
        id={`pangea-${screen.id}`}
        className="work-capture pangea-feature"
        aria-labelledby={`pangea-${screen.id}-title`}
      >
        <div className="pangea-image-mat">
          <a
            className="pangea-shot-view"
            href={image.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open full screenshot: ${screen.title}`}
          >
            <div
              className="pangea-zoom-layer"
              style={{ transformOrigin: `${callout.x}% ${callout.y}%` }}
            >
              <Image
                {...image}
                alt={image.alt}
                sizes="(min-width: 1280px) 740px, (min-width: 900px) 60vw, 90vw"
                priority={priority}
                className="h-auto w-full"
              />
              <svg
                className="pangea-target-overlay"
                viewBox={`0 0 1000 ${height}`}
                fill="none"
                aria-hidden="true"
              >
                <path className="work-leader" d={`M 1000 ${targetY} H ${targetX + 18}`} />
                <circle className="work-target" cx={targetX} cy={targetY} r="18" />
                <circle cx={targetX} cy={targetY} r="3" fill="currentColor" stroke="none" />
              </svg>
            </div>
          </a>
        </div>
        <figcaption className="pangea-callout" tabIndex={0}>
          <div className="pangea-callout-copy">
            <p className="font-label text-xs text-ink/65">
              <span className="mr-3 text-signal-deep">0{sequence + 1}</span>
              {callout.label}
            </p>
            <h4
              id={`pangea-${screen.id}-title`}
              className="font-display mt-5 text-3xl leading-tight tracking-[-0.025em] sm:text-4xl"
            >
              {screen.title}
            </h4>
            {callout.description && (
              <p className="mt-4 max-w-sm text-sm leading-7 text-ink/75">{callout.description}</p>
            )}
          </div>
        </figcaption>
      </figure>
    )
  }

  return (
    <figure ref={ref} className={`work-capture${compact ? ' work-capture--compact' : ''}`}>
      <div className="work-capture-mat">
        <div className="work-capture-image">
          <a
            href={image.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open full screenshot: ${screen.title}`}
          >
            <Image
              {...image}
              alt={image.alt}
              sizes={
                compact
                  ? '(min-width: 1280px) 560px, (min-width: 640px) 45vw, 90vw'
                  : '(min-width: 1280px) 1120px, 90vw'
              }
              priority={priority}
              className="h-auto w-full rounded-lg"
            />
          </a>
          <svg
            className="work-annotation"
            viewBox={`0 0 1000 ${height}`}
            fill="none"
            aria-hidden="true"
          >
            <path
              className="work-leader"
              d={`M ${labelX} -26 L ${labelX} ${targetY - 38} L ${targetX} ${targetY}`}
            />
            <circle className="work-target" cx={targetX} cy={targetY} r="13" />
            <circle cx={targetX} cy={targetY} r="3" fill="currentColor" stroke="none" />
          </svg>
          <span aria-hidden="true" className="work-callout" style={{ left: `${labelPosition}%` }}>
            <span className="work-callout-dot" aria-hidden="true" />
            {callout.label}
          </span>
        </div>
      </div>
      <figcaption className="sr-only">{callout.label}</figcaption>
    </figure>
  )
}

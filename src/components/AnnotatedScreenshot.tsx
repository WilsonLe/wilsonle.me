'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { WorkScreen } from '@/content/work'

export function AnnotatedScreenshot({
  screen,
  priority = false,
}: {
  screen: WorkScreen
  priority?: boolean
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
  const labelX = callout.labelX * 10

  return (
    <figure ref={ref} className="work-capture">
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
              sizes="(min-width: 1280px) 1120px, 90vw"
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
          <span aria-hidden="true" className="work-callout" style={{ left: `${callout.labelX}%` }}>
            <span className="work-callout-dot" aria-hidden="true" />
            {callout.label}
          </span>
        </div>
      </div>
      <figcaption className="sr-only">{callout.label}</figcaption>
    </figure>
  )
}

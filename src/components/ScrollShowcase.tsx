'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { WorkChapter } from '@/content/work-types'

interface ScrollShowcaseProps {
  chapters: WorkChapter[]
}

export function ScrollShowcase({ chapters }: ScrollShowcaseProps) {
  const root = useRef<HTMLDivElement>(null)
  const [enhanced, setEnhanced] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const media = window.matchMedia(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
    )
    const update = () => setEnhanced(media.matches && 'IntersectionObserver' in window)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enhanced || !root.current) return
    let observer: IntersectionObserver
    const observe = () => {
      observer?.disconnect()
      // Percentage root margins resolve against width. Use height-based pixels
      // so the active region remains at the viewport centre on wide screens.
      const inset = Math.round(window.innerHeight * 0.4)
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActive(Number(entry.target.getAttribute('data-chapter')))
          }
        },
        { rootMargin: `-${inset}px 0px -${inset}px 0px` },
      )
      root.current
        ?.querySelectorAll('[data-chapter]')
        .forEach((chapter) => observer.observe(chapter))
    }
    observe()
    window.addEventListener('resize', observe)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', observe)
    }
  }, [enhanced])

  return (
    <div ref={root} className="work-story" data-enhanced={enhanced}>
      <div className="work-story-chapters">
        {chapters.map((chapter, index) => (
          <article
            key={chapter.id}
            id={chapter.id}
            className="work-chapter"
            data-chapter={index}
            data-active={active === index}
            aria-labelledby={`${chapter.id}-heading`}
          >
            <div className="max-w-md">
              <p className="font-label text-xs font-bold uppercase tracking-[0.14em] text-ink/60">
                <span className="mr-5 text-signal-deep">{String(index + 1).padStart(2, '0')}</span>
                {chapter.label}
              </p>
              <h3
                id={`${chapter.id}-heading`}
                className="font-display mt-6 text-4xl leading-[1.08] tracking-[-0.035em] sm:text-5xl"
              >
                {chapter.heading}
              </h3>
              <p className="mt-6 text-base leading-8 text-ink/70 sm:text-lg">
                {chapter.description}
              </p>
            </div>
            <figure className="work-story-inline">
              <div className="flex justify-center bg-lilac px-6 py-10 sm:p-12">
                <Image
                  {...chapter.image}
                  alt={chapter.image.alt}
                  sizes="(min-width: 768px) 380px, 80vw"
                  className="work-screen w-full max-w-[380px] rounded-xl"
                />
              </div>
              <figcaption className="font-label mt-4 text-xs leading-6 text-ink/60">
                {chapter.caption}
              </figcaption>
            </figure>
          </article>
        ))}
      </div>
      {enhanced ? (
        <div className="work-story-stage" aria-hidden="true">
          {chapters.map((chapter, index) => (
            <figure key={chapter.id} className="work-story-frame" data-visible={active === index}>
              <div className="work-story-canvas">
                <Image
                  {...chapter.image}
                  alt=""
                  sizes="380px"
                  className="work-screen max-h-full w-auto max-w-full rounded-xl object-contain"
                />
              </div>
              <figcaption className="font-label mt-4 text-xs leading-6 text-ink/60">
                {chapter.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </div>
  )
}

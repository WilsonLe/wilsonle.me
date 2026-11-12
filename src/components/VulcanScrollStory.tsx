'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { VulcanSystemFlow } from '@/components/VulcanSystemFlow'
import { VulcanIcon } from '@/components/VulcanIcon'
import type { VulcanChapter } from '@/content/vulcan-types'

interface VulcanScrollStoryProps {
  chapters: VulcanChapter[]
}

export function VulcanScrollStory({ chapters }: VulcanScrollStoryProps) {
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
    <div ref={root} className="vulcan-story" data-enhanced={enhanced}>
      <div className="vulcan-story-chapters">
        {chapters.map((chapter, index) => (
          <article
            key={chapter.id}
            id={chapter.id}
            className="vulcan-chapter"
            data-chapter={index}
            data-active={active === index}
            aria-labelledby={`${chapter.id}-heading`}
          >
            <figure className="vulcan-story-inline">
              <div className="flex justify-center bg-vulcan-sand p-8 sm:p-14">
                <Image
                  {...chapter.image}
                  alt={chapter.image.alt}
                  sizes="(min-width: 768px) 380px, 80vw"
                  className="vulcan-screen w-full max-w-[380px] rounded-xl"
                />
              </div>
              <figcaption className="font-label mt-4 text-xs leading-6 text-ink/60">
                {chapter.caption}
              </figcaption>
            </figure>
            <div className="max-w-md">
              <VulcanIcon name={chapter.icon} className="mb-6 h-10 w-10 text-signal-deep" />
              <p className="font-label text-xs font-bold uppercase tracking-[0.14em] text-ink/60">
                <span className="mr-5 text-signal-deep">{String(index + 1).padStart(2, '0')}</span>
                {chapter.label}
              </p>
              <h3
                id={`${chapter.id}-heading`}
                className="font-display mt-6 whitespace-pre-line text-4xl leading-[1.08] tracking-[-0.035em] sm:text-5xl"
              >
                {chapter.heading}
              </h3>
              <VulcanSystemFlow flow={chapter.flow} />
              <p className="mt-6 text-base leading-8 text-ink/70 sm:text-lg">
                {chapter.description}
              </p>
            </div>
          </article>
        ))}
      </div>
      {enhanced ? (
        <div className="vulcan-story-stage" aria-hidden="true">
          {chapters.map((chapter, index) => (
            <figure key={chapter.id} className="vulcan-story-frame" data-visible={active === index}>
              <div className="vulcan-story-canvas">
                <Image
                  {...chapter.image}
                  alt=""
                  sizes="380px"
                  className="h-full w-full object-contain drop-shadow-xl"
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

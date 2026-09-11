'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { JourneyChapter } from '@/content/types'

interface JourneyTimelineProps {
  chapters: JourneyChapter[]
  illustrationLabel: string
  routeBasePath: string
  timelineLabel: string
}

export function JourneyTimeline({
  chapters,
  illustrationLabel,
  routeBasePath,
  timelineLabel,
}: JourneyTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [activeChapterId, setActiveChapterId] = useState(chapters[0]?.id ?? '')

  useEffect(() => {
    const timeline = timelineRef.current

    if (!timeline) {
      return
    }

    timeline.dataset.enhanced = 'true'

    const chapterElements = Array.from(
      timeline.querySelectorAll<HTMLElement>('[data-journey-chapter]'),
    )

    let animationFrame = 0

    const updateActiveChapter = () => {
      animationFrame = 0
      const readingLine = window.innerHeight * 0.36
      const chapterGeometry = chapterElements.map((chapter) => ({
        chapter,
        rect: chapter.getBoundingClientRect(),
      }))
      const chapterAtReadingLine = chapterGeometry.find(
        ({ rect }) => rect.top <= readingLine && rect.bottom >= readingLine,
      )
      const closestChapter = chapterGeometry.reduce((closest, candidate) =>
        Math.abs(candidate.rect.top - readingLine) < Math.abs(closest.rect.top - readingLine)
          ? candidate
          : closest,
      )
      const activeChapter = chapterAtReadingLine ?? closestChapter
      const chapterId = activeChapter?.chapter.dataset.journeyChapter

      if (chapterId) {
        setActiveChapterId(chapterId)
      }
    }

    const requestActiveChapterUpdate = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateActiveChapter)
      }
    }

    updateActiveChapter()
    window.addEventListener('scroll', requestActiveChapterUpdate, { passive: true })
    window.addEventListener('resize', requestActiveChapterUpdate)

    return () => {
      delete timeline.dataset.enhanced
      window.removeEventListener('scroll', requestActiveChapterUpdate)
      window.removeEventListener('resize', requestActiveChapterUpdate)

      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [chapters])

  return (
    <div
      ref={timelineRef}
      className="journey-layout mt-20 border-t border-ink/25 pt-6 lg:mt-28 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[15rem_minmax(0,1fr)] xl:gap-20"
    >
      <nav
        className="journey-index -mx-4 top-20 z-20 mb-10 border-y border-ink/20 bg-paper/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:mx-0 lg:mb-0 lg:self-start lg:border-y-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none"
        aria-label={timelineLabel}
      >
        <p className="font-label hidden border-t border-ink/30 pt-4 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-ink/60 lg:block">
          {timelineLabel}
        </p>
        <ol className="flex snap-x gap-2 overflow-x-auto pb-1 lg:mt-7 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
          {chapters.map((chapter) => {
            const isActive = chapter.id === activeChapterId

            return (
              <li key={chapter.id} className="shrink-0 snap-start lg:shrink">
                <a
                  href={`#journey-${chapter.id}`}
                  aria-current={isActive ? 'step' : undefined}
                  onClick={() => setActiveChapterId(chapter.id)}
                  className={`journey-index-link group grid min-w-[9.5rem] grid-cols-[auto_1fr] gap-3 border px-3 py-3 text-left transition-colors lg:min-w-0 lg:border-x-0 lg:border-b-0 lg:px-0 lg:py-4 ${
                    isActive
                      ? 'border-ink bg-ink text-paper lg:border-t-ink lg:bg-transparent lg:text-ink'
                      : 'border-ink/25 bg-paper text-ink/65 hover:border-ink hover:text-ink lg:border-t-ink/20 lg:bg-transparent'
                  }`}
                >
                  <span
                    className={`font-label text-[0.66rem] font-bold tracking-[0.12em] ${
                      isActive ? 'text-signal' : 'text-signal-deep'
                    }`}
                  >
                    {isActive ? '●' : chapter.sequence}
                  </span>
                  <span>
                    <span className="font-label block text-[0.62rem] font-semibold uppercase tracking-[0.11em]">
                      {chapter.place}
                    </span>
                    <span className="mt-1 hidden text-xs leading-5 lg:block">{chapter.period}</span>
                  </span>
                </a>
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="min-w-0">
        {chapters.map((chapter) => (
          <article
            key={chapter.id}
            id={`journey-${chapter.id}`}
            data-journey-chapter={chapter.id}
            className="journey-chapter grid scroll-mt-40 gap-10 border-b border-ink/25 py-14 first:pt-8 sm:gap-12 sm:py-20 lg:min-h-[82svh] lg:grid-cols-[minmax(16rem,0.82fr)_minmax(0,1.18fr)] lg:items-start lg:gap-16 lg:scroll-mt-28 lg:py-24"
            aria-labelledby={`journey-${chapter.id}-heading`}
          >
            <figure className="journey-media relative mx-auto w-full max-w-lg lg:top-28 lg:mx-0 lg:self-start">
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 h-full w-full border border-signal-deep"
              />
              <div className="relative aspect-[4/5] overflow-hidden border border-ink bg-blueprint">
                <Image
                  src={chapter.image.src}
                  alt={chapter.image.alt}
                  width={chapter.image.width}
                  height={chapter.image.height}
                  sizes="(min-width: 1280px) 27rem, (min-width: 1024px) 34vw, calc(100vw - 3rem)"
                  className="journey-parallax-image h-[112%] w-full -translate-y-[6%] object-cover"
                />
              </div>
              <figcaption className="font-label mt-4 flex items-center justify-between gap-4 text-[0.63rem] font-semibold uppercase tracking-[0.12em] text-ink/55">
                <span>{illustrationLabel}</span>
                <span aria-hidden="true">
                  {chapter.sequence} / {String(chapters.length).padStart(2, '0')}
                </span>
              </figcaption>
            </figure>

            <div className="min-w-0 lg:pt-[12vh]">
              <div className="font-label flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.68rem] font-bold uppercase tracking-[0.14em]">
                <span className="text-signal-deep">{chapter.sequence}</span>
                <span>{chapter.place}</span>
                <span className="text-ink/55">{chapter.period}</span>
              </div>
              <h3
                id={`journey-${chapter.id}-heading`}
                className="font-display mt-6 max-w-3xl text-4xl font-medium leading-[0.98] tracking-[-0.04em] sm:text-5xl xl:text-6xl"
              >
                {chapter.heading}
              </h3>
              <div className="mt-8 max-w-3xl space-y-6 border-l border-ink/25 pl-5 text-base leading-8 text-ink/78 sm:pl-8 sm:text-lg">
                {chapter.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {chapter.link && (
                <Link
                  href={`${routeBasePath}${chapter.link.path}`}
                  className="font-label mt-9 inline-flex items-center gap-3 border-b-2 border-signal-deep pb-1 text-xs font-bold uppercase tracking-[0.11em] text-ink transition-colors hover:text-signal-deep"
                >
                  {chapter.link.label}
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

import Image from 'next/image'
import { JourneyTimeline } from '@/components/sections/JourneyTimeline'
import type { About } from '@/content/types'

interface AboutSectionProps {
  about: About
  routeBasePath: string
}

export function AboutSection({ about, routeBasePath }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="paper-grid bg-paper px-4 py-24 text-ink sm:px-6 lg:px-8 lg:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-14 lg:grid-cols-[minmax(14rem,0.48fr)_minmax(0,1.52fr)] lg:gap-20">
          <div className="relative max-w-sm border border-ink bg-blueprint p-3 sm:p-5">
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -right-4 h-full w-full border border-signal-deep"
            />
            <Image
              src={about.portrait.src}
              alt={about.portrait.alt}
              width={about.portrait.width}
              height={about.portrait.height}
              sizes="(min-width: 1024px) 24rem, calc(100vw - 3rem)"
              className="relative aspect-square h-auto w-full border border-ink object-cover grayscale"
            />
          </div>

          <div className="min-w-0">
            <p className="font-label text-xs font-bold uppercase tracking-[0.16em] text-signal-deep">
              <span aria-hidden="true">05 / </span>
              {about.eyebrow}
            </p>
            <h2
              id="about-heading"
              className="font-display mt-5 max-w-5xl text-5xl font-medium leading-[0.92] tracking-[-0.04em] sm:text-6xl lg:text-8xl"
            >
              {about.heading}
            </h2>
            <p className="mt-9 max-w-3xl border-l border-ink/30 pl-5 text-lg leading-8 text-ink/80 sm:pl-8 sm:text-xl sm:leading-9">
              {about.introduction}
            </p>
          </div>
        </div>

        <JourneyTimeline
          chapters={about.chapters}
          illustrationLabel={about.illustrationLabel}
          routeBasePath={routeBasePath}
          timelineLabel={about.timelineLabel}
        />
      </div>
    </section>
  )
}

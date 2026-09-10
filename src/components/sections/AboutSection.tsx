import Image from 'next/image'
import type { About } from '@/content/types'

interface AboutSectionProps {
  about: About
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="bg-paper px-4 py-24 text-ink sm:px-6 lg:px-8 lg:py-32"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[minmax(16rem,0.68fr)_minmax(0,1.32fr)] lg:gap-24">
        <div className="relative max-w-md border border-ink bg-blueprint p-3 sm:p-5">
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 h-full w-full border border-signal-deep"
          />
          <Image
            src={about.portrait.src}
            alt={about.portrait.alt}
            width={640}
            height={640}
            sizes="(min-width: 1024px) 32rem, calc(100vw - 3rem)"
            className="relative aspect-square h-auto w-full border border-ink object-cover grayscale"
          />
        </div>

        <div className="min-w-0">
          <p className="font-label text-xs font-bold uppercase tracking-[0.16em] text-signal-deep">
            <span aria-hidden="true">05 / </span>
            {about.heading}
          </p>
          <h2
            id="about-heading"
            className="font-display mt-5 text-5xl font-medium leading-[0.95] tracking-[-0.035em] sm:text-6xl lg:text-8xl"
          >
            {about.heading}
          </h2>

          <div className="mt-10 max-w-3xl space-y-5 border-l border-ink/30 pl-5 text-base leading-8 text-ink/80 sm:pl-8 sm:text-lg">
            {about.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import type { Principles } from '@/content/types'
import { SdlcCycleChart } from '@/components/sections/SdlcCycleChart'

interface PrinciplesSectionProps {
  principles: Principles
}

export function PrinciplesSection({ principles }: PrinciplesSectionProps) {
  return (
    <section
      id="approach"
      className="border-b border-rule bg-ink px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      aria-labelledby="approach-heading"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-label text-xs font-bold uppercase tracking-[0.16em] text-blueprint">
          <span aria-hidden="true">03 / </span>
          {principles.eyebrow}
        </p>
        <h2
          id="approach-heading"
          className="font-display mt-5 max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.035em] text-paper sm:text-5xl lg:text-7xl"
        >
          {principles.heading}
        </h2>

        <SdlcCycleChart principles={principles} />
        <p className="mt-6 text-sm text-paper-muted">
          <a
            href={principles.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-blueprint underline-offset-4 hover:text-paper focus-visible:text-paper"
          >
            {principles.source.label}
          </a>
        </p>
      </div>
    </section>
  )
}

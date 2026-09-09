import type { Now } from '@/content/types'

interface NowSectionProps {
  now: Now
}

export function NowSection({ now }: NowSectionProps) {
  return (
    <section
      id="now"
      className="paper-grid bg-blueprint px-4 py-24 text-ink sm:px-6 lg:px-8 lg:py-32"
      aria-labelledby="now-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
        <div>
          <p className="font-label text-xs font-bold uppercase tracking-[0.16em] text-ink/70">
            <span aria-hidden="true">04 / </span>
            {now.eyebrow}
          </p>
          <h2
            id="now-heading"
            className="font-display mt-5 max-w-xl text-4xl font-medium leading-[0.95] tracking-[-0.035em] sm:text-5xl lg:text-7xl"
          >
            {now.heading}
          </h2>
          <p className="font-label mt-6 w-fit border-l-2 border-signal-deep pl-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink/70">
            {now.updatedLabel}
          </p>
        </div>

        <dl className="border-y border-ink">
          {now.items.map((item) => (
            <div
              key={item.label}
              className="grid min-w-0 gap-3 border-b border-ink/35 py-6 last:border-b-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-7"
            >
              <dt className="font-label text-[0.68rem] font-bold uppercase tracking-[0.13em] text-ink/65">
                {item.label}
              </dt>
              <dd className="min-w-0 break-words text-lg leading-8 text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

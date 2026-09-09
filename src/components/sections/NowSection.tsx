import type { Now } from '@/content/types'

interface NowSectionProps {
  now: Now
}

export function NowSection({ now }: NowSectionProps) {
  return (
    <section
      id="now"
      className="scroll-mt-20 bg-slate-900/50 px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="now-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            {now.eyebrow}
          </p>
          <h2 id="now-heading" className="mt-4 text-3xl font-bold text-white md:text-5xl">
            {now.heading}
          </h2>
          <p className="mt-5 text-sm text-slate-400">{now.updatedLabel}</p>
        </div>

        <dl className="divide-y divide-slate-700 border-y border-slate-700">
          {now.items.map((item) => (
            <div key={item.label} className="grid gap-2 py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                {item.label}
              </dt>
              <dd className="leading-7 text-slate-200">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

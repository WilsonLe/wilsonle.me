import type { Principles } from '@/content/types'

interface PrinciplesSectionProps {
  principles: Principles
}

export function PrinciplesSection({ principles }: PrinciplesSectionProps) {
  return (
    <section
      id="approach"
      className="scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="approach-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              {principles.eyebrow}
            </p>
            <h2 id="approach-heading" className="mt-4 text-3xl font-bold text-white md:text-5xl">
              {principles.heading}
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">{principles.introduction}</p>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {principles.items.map((principle, index) => (
            <li key={principle.id} className="glass rounded-xl p-6">
              <p className="text-sm font-semibold text-blue-400" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-6 text-xl font-semibold text-white">{principle.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{principle.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

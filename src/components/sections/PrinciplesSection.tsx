import type { Principles } from '@/content/types'

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
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <p className="font-label text-xs font-bold uppercase tracking-[0.16em] text-blueprint">
              <span aria-hidden="true">03 / </span>
              {principles.eyebrow}
            </p>
            <h2
              id="approach-heading"
              className="font-display mt-5 max-w-xl text-4xl font-medium leading-[0.95] tracking-[-0.035em] text-paper sm:text-5xl lg:text-7xl"
            >
              {principles.heading}
            </h2>
          </div>
          <p className="max-w-2xl self-end text-lg leading-8 text-paper-muted">
            {principles.introduction}
          </p>
        </div>

        <ol className="mt-16 grid border-l border-t border-rule md:grid-cols-3 lg:mt-20">
          {principles.items.map((principle, index) => (
            <li
              key={principle.id}
              className="min-w-0 border-b border-r border-rule p-6 sm:p-8 lg:min-h-80"
            >
              <p
                className={`font-label text-xs font-bold tracking-[0.14em] ${
                  index === 1 ? 'text-signal' : 'text-blueprint'
                }`}
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="font-display mt-12 text-3xl font-medium leading-tight text-paper">
                {principle.title}
              </h3>
              <p className="mt-5 text-sm leading-7 text-paper-muted">{principle.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

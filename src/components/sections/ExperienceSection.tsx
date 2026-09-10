import type { Experience } from '@/content/types'

interface ExperienceSectionProps {
  experiences: Experience[]
  heading: string
  presentLabel: string
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
}

export function ExperienceSection({ experiences, heading, presentLabel }: ExperienceSectionProps) {
  if (experiences.length === 0) {
    return null
  }

  return (
    <section
      id="experience"
      className="paper-grid bg-paper px-4 py-24 text-ink sm:px-6 lg:px-8 lg:py-32"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-8 border-b border-ink pb-8">
          <h2
            id="experience-heading"
            className="font-display text-5xl font-medium leading-none tracking-[-0.04em] sm:text-7xl"
          >
            {heading}
          </h2>
          <span
            aria-hidden="true"
            className="font-label hidden text-xs font-bold tracking-[0.14em] text-signal-deep sm:block"
          >
            R01
          </span>
        </div>

        <ol>
          {experiences.map((experience, index) => (
            <li key={experience.id} className="border-b border-ink/40">
              <article className="grid min-w-0 gap-5 py-9 lg:grid-cols-[3rem_13rem_minmax(0,1fr)] lg:gap-8 lg:py-12">
                <span
                  aria-hidden="true"
                  className="font-label text-xs font-bold tracking-[0.12em] text-signal-deep"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="font-label min-w-0 text-[0.68rem] uppercase leading-5 tracking-[0.1em] text-ink/65">
                  <p>
                    {formatDate(experience.startDate)} –{' '}
                    {experience.current
                      ? presentLabel
                      : experience.endDate
                        ? formatDate(experience.endDate)
                        : ''}
                  </p>
                  {experience.location ? <p className="mt-2">{experience.location}</p> : null}
                </div>

                <div className="min-w-0">
                  <h3 className="font-display break-words text-3xl font-medium leading-tight sm:text-4xl">
                    {experience.title}
                  </h3>
                  <p className="mt-2 text-base font-semibold text-blueprint-deep">
                    {experience.company}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {experience.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex min-w-0 items-start gap-3 text-sm leading-7 text-ink/75"
                      >
                        <span className="shrink-0 text-signal-deep" aria-hidden="true">
                          →
                        </span>
                        <span className="min-w-0">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

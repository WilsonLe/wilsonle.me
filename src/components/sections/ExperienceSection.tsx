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

function getInitials(company: string): string {
  return company
    .split(/\s+/)
    .filter((word) => !['inc.', 'international', 'investment'].includes(word.toLowerCase()))
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

export function ExperienceSection({ experiences, heading, presentLabel }: ExperienceSectionProps) {
  if (experiences.length === 0) {
    return null
  }

  return (
    <section
      id="experience"
      className="mx-auto max-w-[660px] rounded-xl border border-[#dededb] bg-white px-5 py-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] sm:px-6"
      aria-labelledby="experience-heading"
    >
      <h1 id="experience-heading" className="text-lg font-semibold tracking-[-0.02em]">
        {heading}
      </h1>

      <ol className="mt-5">
        {experiences.map((experience) => (
          <li key={experience.id} className="border-b border-[#e5e5e3] last:border-b-0">
            <article className="flex min-w-0 gap-3 py-4 sm:gap-4">
              <span
                aria-hidden="true"
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-md text-sm font-semibold tracking-[-0.03em] ${
                  experience.company === 'Lyra'
                    ? 'bg-gradient-to-br from-[#713cff] to-[#2257ff]'
                    : 'bg-[#edf1f6] text-[#364f70]'
                }`}
              >
                {experience.company === 'Lyra' ? null : getInitials(experience.company)}
              </span>

              <div className="min-w-0 text-sm leading-[1.45]">
                <h2 className="font-semibold text-[#202124]">{experience.title}</h2>
                <p className="text-[#33363a]">
                  {experience.company} · {experience.employmentType}
                </p>
                <p className="mt-0.5 text-[#686b70]">
                  {formatDate(experience.startDate)} –{' '}
                  {experience.current
                    ? presentLabel
                    : experience.endDate
                      ? formatDate(experience.endDate)
                      : ''}{' '}
                  · {experience.duration}
                </p>
                {experience.location ? (
                  <p className="mt-0.5 text-[#686b70]">{experience.location}</p>
                ) : null}
                {experience.summary ? (
                  <p className="mt-2 text-[#33363a]">{experience.summary}</p>
                ) : null}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}

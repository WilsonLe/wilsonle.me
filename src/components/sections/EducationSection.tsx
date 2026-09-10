import type { Education, ResumeLabels } from '@/content/types'

interface EducationSectionProps {
  education: Education[]
  labels: ResumeLabels
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
}

function isExpectedGraduation(dateString: string): boolean {
  return new Date(dateString) > new Date()
}

export function EducationSection({ education, labels }: EducationSectionProps) {
  if (education.length === 0) {
    return null
  }

  return (
    <section
      id="education"
      className="paper-grid bg-blueprint px-4 py-24 text-ink sm:px-6 lg:px-8 lg:py-32"
      aria-labelledby="education-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-8 border-b border-ink pb-8">
          <h2
            id="education-heading"
            className="font-display text-5xl font-medium leading-none tracking-[-0.04em] sm:text-7xl"
          >
            {labels.educationHeading}
          </h2>
          <span
            aria-hidden="true"
            className="font-label hidden text-xs font-bold tracking-[0.14em] text-ink/65 sm:block"
          >
            R03
          </span>
        </div>

        <div className="grid border-l border-t border-ink lg:grid-cols-2">
          {education.map((item) => (
            <article key={item.id} className="min-w-0 border-b border-r border-ink p-6 sm:p-9">
              <p className="font-label text-[0.68rem] font-bold uppercase leading-5 tracking-[0.11em] text-ink/65">
                {isExpectedGraduation(item.graduationDate)
                  ? labels.expectedGraduationLabel
                  : labels.graduatedLabel}{' '}
                · {formatDate(item.graduationDate)}
              </p>
              <h3 className="font-display mt-7 break-words text-3xl font-medium leading-tight sm:text-4xl">
                {item.institution}
              </h3>
              <p className="mt-3 text-base font-semibold">{item.degree}</p>
              {item.location ? <p className="mt-2 text-sm text-ink/65">{item.location}</p> : null}

              {item.gpa ? (
                <p className="mt-6 text-sm text-ink/75">
                  <span className="font-label text-[0.68rem] font-bold uppercase tracking-[0.11em]">
                    {labels.gpaLabel}:
                  </span>{' '}
                  {item.gpa}
                </p>
              ) : null}

              {item.coursework && item.coursework.length > 0 ? (
                <div className="mt-7 border-t border-ink/30 pt-5">
                  <p className="font-label text-[0.68rem] font-bold uppercase tracking-[0.11em] text-ink/65">
                    {labels.courseworkLabel}
                  </p>
                  <ul className="mt-4 flex min-w-0 flex-wrap gap-2">
                    {item.coursework.map((course) => (
                      <li
                        key={course}
                        className="font-label max-w-full break-words border border-ink/30 bg-blueprint/50 px-2.5 py-1.5 text-[0.68rem] leading-5"
                      >
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

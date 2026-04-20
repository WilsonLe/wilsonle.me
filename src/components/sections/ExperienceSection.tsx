import type { Experience } from '@/content/types'

interface ExperienceSectionProps {
  experiences: Experience[]
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (!experiences || experiences.length === 0) {
    return null
  }

  return (
    <section id="experience" className="py-24 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="gradient-text">Experience</span>
        </h2>

        <div className="relative pl-8 md:pl-12">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />

          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-8 md:-left-12 top-0 w-4 h-4 rounded-full bg-blue-500 -translate-x-1/2" />

                <div className="glass rounded-xl p-6 hover:bg-slate-800/60 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                      <p className="text-blue-400 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-sm">
                        {formatDate(exp.startDate)} -{' '}
                        {exp.current ? 'Present' : exp.endDate ? formatDate(exp.endDate) : ''}
                      </p>
                      <p className="text-slate-500 text-sm">{exp.location}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mt-4">
                    {exp.highlights?.map((highlight, hIndex) => (
                      <li key={hIndex} className="flex items-start gap-2 text-slate-300 text-sm">
                        <span className="text-blue-400 shrink-0">▹</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

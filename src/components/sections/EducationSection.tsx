import type { Education } from '@/lib/content'

interface EducationSectionProps {
  education: Education[]
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function isExpectedGraduation(dateString: string): boolean {
  const date = new Date(dateString)
  return date > new Date()
}

export function EducationSection({ education }: EducationSectionProps) {
  if (!education || education.length === 0) {
    return null
  }

  return (
    <section id="education" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="gradient-text">Education</span>
        </h2>

        <div className="space-y-8">
          {education.map((edu) => (
            <div key={edu.id} className="glass rounded-xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{edu.institution}</h3>
                  <p className="text-blue-400">{edu.degree}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-sm">
                    {isExpectedGraduation(edu.graduationDate) ? 'Expected Graduation' : 'Graduated'} {formatDate(edu.graduationDate)}
                  </p>
                  {edu.location && <p className="text-slate-500 text-sm">{edu.location}</p>}
                </div>
              </div>

              {edu.gpa && (
                <p className="text-slate-300 mb-4">
                  <span className="text-slate-400">GPA:</span> {edu.gpa}
                </p>
              )}

              {edu.coursework && edu.coursework.length > 0 && (
                <div>
                  <p className="text-slate-400 text-sm mb-2">Relevant Coursework:</p>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs text-slate-300 bg-slate-800 rounded-full"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

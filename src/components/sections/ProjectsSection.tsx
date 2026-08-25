import type { Project } from '@/content/types'

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <section id="projects" className="py-24 bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          <span className="gradient-text">Selected Projects</span>
        </h2>
        <p className="max-w-2xl mx-auto mt-4 mb-12 text-center text-slate-300">
          A closer look at three products I have helped build and operate.
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`glass rounded-xl p-6 hover:bg-slate-800/60 transition-colors ${
                index === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                <span className="rounded-full border border-slate-600 px-3 py-1 text-xs font-medium text-slate-300">
                  {project.visibility}
                </span>
              </div>

              <p className="mt-4 text-slate-200">{project.summary}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{project.contribution}</p>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
                {project.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="rounded-md bg-slate-800 px-2.5 py-1 text-xs text-blue-300"
                  >
                    {technology}
                  </li>
                ))}
              </ul>

              {project.url && project.linkLabel ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {project.linkLabel}
                  <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

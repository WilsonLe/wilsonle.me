import Link from 'next/link'
import { AnnotatedScreenshot } from '@/components/AnnotatedScreenshot'
import { works, type Work } from '@/content/work'

export function WorkPageView({ work, basePath = '' }: { work: Work; basePath?: string }) {
  return (
    <article className="work-page bg-paper text-ink" data-tone={work.tone}>
      <header className="mx-auto max-w-7xl px-4 pb-10 pt-32 sm:px-6 sm:pb-12 sm:pt-40 lg:px-8">
        <div className="font-label flex items-center justify-between gap-5 text-xs">
          <Link className="work-text-link" href={`${basePath || '/'}#work`}>
            ← All work
          </Link>
          <a className="work-text-link" href={work.url} target="_blank" rel="noopener noreferrer">
            {work.name} ↗
          </a>
        </div>
        <div className="mt-12 grid items-end gap-7 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <h1 className="font-display text-5xl leading-none tracking-[-0.045em] sm:text-7xl lg:text-8xl">
              {work.name}
            </h1>
            <p className="mt-5 text-xl leading-relaxed sm:text-2xl">{work.summary}</p>
          </div>
          <p className="max-w-md text-sm leading-7 text-ink/75">{work.credit}</p>
        </div>
        <nav
          aria-label="Product screens"
          className="font-label mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t border-ink/25 pt-5 text-xs"
        >
          {work.screens.map((screen, index) => (
            <a key={screen.id} className="work-text-link py-1" href={`#${screen.id}`}>
              <span className="mr-2 text-ink/55">0{index + 1}</span>
              {screen.id.split('-').join(' ')}
            </a>
          ))}
        </nav>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {work.screens.map((screen, index) => (
          <section
            key={screen.id}
            id={screen.id}
            className="work-screen"
            aria-labelledby={`${screen.id}-title`}
          >
            <AnnotatedScreenshot screen={screen} priority={index === 0} />
            <div className="work-screen-caption">
              <div className="flex items-baseline gap-4">
                <span className="font-label text-xs text-signal-deep">0{index + 1}</span>
                <h2
                  id={`${screen.id}-title`}
                  className="font-display text-3xl tracking-[-0.025em] sm:text-4xl"
                >
                  {screen.title}
                </h2>
              </div>
              <p className="max-w-lg text-sm leading-7 text-ink/75">{screen.description}</p>
            </div>
          </section>
        ))}
      </div>

      <nav
        aria-label="More work"
        className="mx-auto mt-6 flex max-w-7xl flex-wrap items-center justify-between gap-6 border-t border-ink/25 px-4 py-12 sm:px-6 lg:px-8"
      >
        <Link className="font-label work-text-link text-xs" href={`${basePath || '/'}#work`}>
          ← All work
        </Link>
        <div className="flex flex-wrap gap-6">
          {works
            .filter((other) => other.slug !== work.slug)
            .map((other) => (
              <Link
                key={other.slug}
                className="work-text-link text-sm"
                href={`${basePath}/work/${other.slug}`}
              >
                {other.name} →
              </Link>
            ))}
        </div>
      </nav>
    </article>
  )
}

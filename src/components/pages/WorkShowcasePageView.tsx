import Image from 'next/image'
import Link from 'next/link'
import { ScrollShowcase } from '@/components/ScrollShowcase'
import type { WorkContent } from '@/content/work-types'

interface WorkShowcasePageViewProps {
  content: WorkContent
  routeBasePath: string
}

export function WorkShowcasePageView({ content, routeBasePath }: WorkShowcasePageViewProps) {
  const workUrl = `${routeBasePath}/#work`

  return (
    <div className="bg-paper text-ink">
      <section
        className="px-5 pb-16 pt-32 sm:px-8 sm:pt-36 lg:pb-24"
        aria-labelledby="project-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-4 border-b border-ink/20 pb-6">
            <Link
              href={workUrl}
              className="font-label text-xs font-semibold hover:text-signal-deep"
            >
              <span aria-hidden="true">← </span>
              {content.backLabel}
            </Link>
            <p className="font-label text-[0.65rem] uppercase tracking-[0.14em] text-ink/60">
              {content.eyebrow}
            </p>
          </div>
          <div className="grid gap-8 pb-12 pt-10 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:pb-16 lg:pt-14">
            <div>
              <p className="font-label text-xs font-bold uppercase tracking-[0.15em] text-signal-deep">
                {content.name}
              </p>
              <h1
                id="project-heading"
                className="font-display mt-5 whitespace-pre-line text-[clamp(2.8rem,5.7vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.045em]"
              >
                {content.heading}
              </h1>
            </div>
            <div className="lg:pt-9">
              <p className="max-w-lg text-base leading-8 text-ink/75">{content.introduction}</p>
              <a
                href={content.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label mt-6 inline-flex items-center gap-6 border-b border-ink pb-2 text-xs font-bold transition-colors hover:text-signal-deep"
              >
                {content.productLabel}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <figure>
            <div className="work-hero-canvas">
              {content.heroImages.map((image, index) => (
                <Image
                  key={image.src}
                  {...image}
                  alt={image.alt}
                  priority={index === 1}
                  sizes="(min-width: 1280px) 340px, (min-width: 640px) 30vw, 54vw"
                  className={`work-screen work-hero-screen work-hero-screen-${index + 1}`}
                />
              ))}
            </div>
            <figcaption className="font-label mt-4 text-[0.65rem] leading-6 text-ink/55">
              {content.imageNote}
            </figcaption>
          </figure>
          <dl className="mt-9 grid grid-cols-2 gap-6 border-b border-ink/20 pb-9 sm:max-w-xl">
            {[content.role, content.period].map((item) => (
              <div key={item.label}>
                <dt className="font-label text-[0.65rem] uppercase tracking-[0.12em] text-ink/55">
                  {item.label}
                </dt>
                <dd className="mt-2 text-sm font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="experience-heading" className="px-5 py-12 sm:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-label text-xs font-bold uppercase tracking-[0.14em] text-signal-deep">
            {content.story.label}
          </p>
          <h2
            id="experience-heading"
            className="font-display mt-6 whitespace-pre-line text-4xl leading-[1.05] tracking-[-0.035em] sm:text-6xl"
          >
            {content.story.heading}
          </h2>
          <ScrollShowcase chapters={content.story.chapters} />
        </div>
      </section>

      <section
        aria-labelledby="contribution-heading"
        className="border-t border-ink/20 px-5 py-20 sm:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div>
              <p className="font-label text-xs font-bold uppercase tracking-[0.14em] text-signal-deep">
                {content.contribution.label}
              </p>
              <h2
                id="contribution-heading"
                className="font-display mt-6 whitespace-pre-line text-4xl leading-[1.08] tracking-[-0.035em] sm:text-5xl"
              >
                {content.contribution.heading}
              </h2>
            </div>
            <p className="max-w-lg self-end text-lg leading-8 text-ink/70">
              {content.contribution.introduction}
            </p>
          </div>
          <ol className="mt-14 grid gap-9 sm:grid-cols-3 sm:gap-10 lg:mt-20">
            {content.contribution.items.map((item, index) => (
              <li key={item.heading} className="border-t border-ink/35 pt-5">
                <span className="font-label text-xs text-ink/50" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 text-xl font-medium">{item.heading}</h3>
                <p className="mt-4 max-w-xs text-sm leading-7 text-ink/70">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="impact-heading"
        className="bg-ink px-5 py-20 text-paper sm:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <p className="font-label text-xs font-bold uppercase tracking-[0.14em] text-signal">
            {content.impact.label}
          </p>
          <h2
            id="impact-heading"
            className="font-display mt-8 whitespace-pre-line text-[clamp(2.5rem,5.5vw,5.2rem)] leading-[1.06] tracking-[-0.035em]"
          >
            {content.impact.heading}
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-8 text-paper-muted">
            {content.impact.description}
          </p>
          <ul className="mt-16 grid gap-8 sm:grid-cols-3 sm:gap-10">
            {content.impact.items.map((item) => (
              <li key={item.heading} className="border-t border-paper/25 pt-6">
                <h3 className="text-base font-medium">{item.heading}</h3>
                <p className="mt-3 max-w-xs text-sm leading-7 text-paper-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:py-28" aria-labelledby="closing-heading">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 sm:flex-row sm:items-end">
          <div>
            <h2
              id="closing-heading"
              className="font-display max-w-xl text-4xl leading-tight tracking-[-0.035em] sm:text-5xl"
            >
              {content.closing}
            </h2>
            <a
              href={content.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-label mt-8 inline-flex items-center gap-8 border-b border-ink pb-3 text-xs font-bold hover:text-signal-deep"
            >
              {content.productLabel}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <Link
            href={workUrl}
            className="font-label border-b border-ink/40 pb-2 text-xs font-semibold hover:text-signal-deep"
          >
            <span aria-hidden="true">← </span>
            {content.backLabel}
          </Link>
        </div>
      </section>
    </div>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { ShowcaseScroll } from '@/components/ShowcaseScroll'
import { ShowcaseServiceIcon } from '@/components/ShowcaseServiceIcon'
import type { WorkShowcaseContent } from '@/content/types'

interface WorkShowcasePageViewProps {
  content: WorkShowcaseContent
  basePath: string
}

export function WorkShowcasePageView({ content, basePath }: WorkShowcasePageViewProps) {
  const workHref = `${basePath || '/'}#work`

  return (
    <ShowcaseScroll>
      <article className="px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:px-12 lg:pb-28">
        <header className="mx-auto max-w-7xl">
          <Link
            href={workHref}
            className="font-label inline-flex items-center gap-3 text-xs tracking-wide text-ink/65 transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span>
            {content.backLabel}
          </Link>

          <div className="mt-12 grid gap-9 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-20">
            <div>
              <h1 className="font-display text-6xl font-normal leading-none tracking-[-0.055em] sm:text-8xl lg:text-[7.5rem]">
                {content.title}
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/70 sm:text-xl">
                {content.introduction}
              </p>
            </div>
            <dl className="grid gap-4 border-t border-ink/15 pt-6 text-sm lg:mb-1">
              {content.facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[5rem_1fr] gap-5">
                  <dt className="text-ink/65">{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="mt-12 sm:mt-16" data-showcase-reveal>
            <div className="showcase-hero-gallery grid grid-cols-[1fr_1.2fr_1fr] items-center gap-3 overflow-hidden rounded-2xl bg-pangea-lilac px-4 py-10 sm:gap-8 sm:px-12 sm:py-16 lg:px-24 lg:py-20">
              {content.heroImages.map((image, index) => (
                <a
                  key={image.src}
                  href={image.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`showcase-screen overflow-hidden rounded-lg bg-[#121117] shadow-xl shadow-ink/15 sm:rounded-xl ${
                    index === 0
                      ? '-rotate-6 translate-y-4'
                      : index === 2
                        ? 'rotate-6 translate-y-4'
                        : 'relative z-10'
                  }`}
                >
                  <Image
                    {...image}
                    alt={image.alt}
                    priority={index === 1}
                    sizes="(max-width: 640px) 32vw, (max-width: 1024px) 28vw, 360px"
                    className="h-auto w-full"
                  />
                </a>
              ))}
            </div>
            <figcaption className="mt-4 text-xs leading-6 text-ink/65">
              {content.imageNote}
            </figcaption>
          </figure>
        </header>

        <div className="mx-auto mt-24 max-w-7xl border-t border-ink/20 sm:mt-32">
          <p className="font-label pt-7 text-xs uppercase tracking-[0.13em] text-ink/65">
            {content.workLabel}
          </p>
          {content.chapters.map((chapter, index) => (
            <section
              key={chapter.id}
              id={chapter.id}
              aria-labelledby={`${chapter.id}-heading`}
              className="grid items-center gap-10 border-b border-ink/15 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-28"
            >
              <div data-showcase-reveal>
                <p className="font-label text-xs tracking-wide text-ink/65">
                  <span className="mr-4 text-signal-deep">0{index + 1}</span>
                  {chapter.label}
                </p>
                <h2
                  id={`${chapter.id}-heading`}
                  className="font-display mt-6 max-w-lg text-4xl font-normal leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl"
                >
                  {chapter.heading}
                </h2>
                <p className="mt-7 max-w-lg text-base leading-8 text-ink/70">
                  {chapter.description}
                </p>
                <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink/65">
                  {chapter.details.map((detail) => (
                    <li key={detail} className="border-b border-ink/20 pb-1">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <figure data-showcase-reveal>
                <div className="grid items-start gap-6 rounded-xl sm:grid-cols-2 bg-pangea-lilac/65 p-5 sm:gap-6 sm:p-8">
                  {chapter.images.map((image, imageIndex) => (
                    <a
                      key={image.src}
                      href={image.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`showcase-screen block overflow-hidden rounded-lg shadow-lg shadow-ink/10 ${imageIndex === 1 ? 'sm:mt-9' : ''}`}
                    >
                      <Image
                        {...image}
                        alt={image.alt}
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 43vw, 320px"
                        className="h-auto w-full"
                      />
                    </a>
                  ))}
                </div>
                <figcaption className="mt-4 max-w-lg text-xs leading-6 text-ink/65">
                  {chapter.caption}
                </figcaption>
              </figure>
            </section>
          ))}

          <section
            id="delivery"
            aria-labelledby="delivery-heading"
            className="py-16 sm:py-24 lg:py-28"
          >
            <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20" data-showcase-reveal>
              <div>
                <p className="font-label text-xs tracking-wide text-ink/65">
                  <span className="mr-4 text-signal-deep">03</span>
                  {content.delivery.label}
                </p>
                <h2
                  id="delivery-heading"
                  className="font-display mt-6 max-w-lg text-4xl font-normal leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl"
                >
                  {content.delivery.heading}
                </h2>
              </div>
              <p className="max-w-xl self-end text-base leading-8 text-ink/70">
                {content.delivery.description}
              </p>
            </div>

            <ol
              className="showcase-pipeline relative mt-14 grid gap-10 overflow-hidden rounded-xl bg-ink px-7 py-10 text-paper sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:gap-10 lg:py-14"
              data-showcase-reveal
            >
              {content.delivery.steps.map((step, index) => (
                <li key={step.title} className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-label text-xs text-paper-muted">0{index + 1}</span>
                    {index < content.delivery.steps.length - 1 && (
                      <span aria-hidden="true" className="hidden text-paper-muted lg:block">
                        →
                      </span>
                    )}
                  </div>
                  <h3 className="font-display mt-4 text-3xl sm:text-4xl">{step.title}</h3>
                  <ul className="mt-6 grid gap-3">
                    {step.services.map((service) => (
                      <li key={service.icon} className="flex items-center gap-3 text-sm">
                        <ShowcaseServiceIcon icon={service.icon} />
                        <span>{service.name}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 max-w-48 text-xs leading-6 text-paper-muted">{step.detail}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <section
          id="impact"
          aria-labelledby="impact-heading"
          className="mx-auto max-w-7xl border-t border-ink/20 py-16 sm:py-24"
          data-showcase-reveal
        >
          <p className="font-label text-xs uppercase tracking-[0.13em] text-ink/65">
            {content.impact.label}
          </p>
          <h2
            id="impact-heading"
            className="font-display mt-6 max-w-3xl text-4xl font-normal leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl"
          >
            {content.impact.heading}
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-7">
            {content.impact.items.map((item) => (
              <figure key={item.heading} className="min-w-0">
                {item.visual.kind === 'image' ? (
                  <a
                    href={item.visual.image.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-72 overflow-hidden rounded-xl bg-pangea-lilac p-5 pb-0 lg:h-80 lg:p-7 lg:pb-0"
                  >
                    <Image
                      {...item.visual.image}
                      alt={item.visual.image.alt}
                      sizes="(max-width: 767px) 90vw, 400px"
                      className="h-full w-full rounded-t-lg object-cover object-center shadow-lg shadow-ink/10"
                    />
                  </a>
                ) : (
                  <div className="flex h-72 items-center rounded-xl bg-ink px-6 text-paper lg:h-80 lg:px-8">
                    <ol className="grid w-full gap-1">
                      {item.visual.services.map((service, index, services) => (
                        <li key={service.icon} className="relative flex items-center gap-4 text-sm">
                          <span className="relative z-10 inline-flex bg-ink">
                            <ShowcaseServiceIcon icon={service.icon} />
                          </span>
                          <span>{service.name}</span>
                          {index < services.length - 1 && (
                            <span
                              aria-hidden="true"
                              className="absolute left-6 top-12 h-6 border-l border-paper-muted/45"
                            />
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                <figcaption className="mt-6">
                  <h3 className="text-lg font-medium tracking-tight">{item.heading}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-ink/65">{item.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <footer className="mx-auto max-w-7xl border-t border-ink/20 pt-12 sm:flex sm:items-end sm:justify-between sm:gap-10">
          <div>
            <p className="font-display max-w-lg text-3xl leading-tight sm:text-4xl">
              {content.closeHeading}
            </p>
            <a
              href={content.visitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-5 border-b border-ink pb-1 text-sm font-medium transition-colors hover:text-signal-deep"
            >
              {content.visitLabel}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <Link
            href={workHref}
            className="mt-8 inline-flex min-h-11 items-center gap-3 text-sm text-ink/65 hover:text-ink sm:mt-0"
          >
            <span aria-hidden="true">←</span>
            {content.backLabel}
          </Link>
        </footer>
      </article>
    </ShowcaseScroll>
  )
}

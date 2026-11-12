import Image from 'next/image'
import Link from 'next/link'
import { WorkScroll } from '@/components/work/WorkScroll'
import type { WorkShowcase } from '@/content/work-types'

interface WorkShowcasePageViewProps {
  content: WorkShowcase
  basePath: string
}

export function WorkShowcasePageView({ content, basePath }: WorkShowcasePageViewProps) {
  const homePath = basePath || '/'

  return (
    <div className="work-showcase bg-paper text-ink">
      <WorkScroll>
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 lg:pt-32">
          <Link
            href={`${homePath}#work`}
            className="font-label inline-flex min-h-11 items-center gap-3 text-xs font-semibold uppercase tracking-wider hover:underline"
          >
            <span aria-hidden="true">←</span>
            {content.backLabel}
          </Link>
          <header className="pb-10 pt-8 lg:pb-12 lg:pt-10" data-work-reveal>
            <p className="font-label text-xs uppercase tracking-[0.12em] text-ink/65">
              {content.category}
            </p>
            <p className="mt-9 text-lg font-semibold tracking-tight">{content.name}</p>
            <h1 className="font-display mt-4 whitespace-pre-line text-[clamp(3.4rem,7vw,6.5rem)] font-normal leading-[0.98] tracking-[-0.055em]">
              {content.heading}
            </h1>
            <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-20">
              <p className="max-w-xl text-lg leading-relaxed text-ink/75 sm:text-xl">
                {content.introduction}
              </p>
              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="justify-self-start self-end border-b border-ink pb-2 text-sm font-medium transition-colors hover:text-signal-deep"
              >
                {content.visitLabel} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </header>
          <dl className="grid gap-6 border-t border-ink/25 py-7 sm:grid-cols-2">
            <div>
              <dt className="font-label text-[0.65rem] uppercase tracking-widest text-ink/60">
                {content.roleLabel}
              </dt>
              <dd className="mt-2 text-sm">{content.role}</dd>
            </div>
            <div>
              <dt className="font-label text-[0.65rem] uppercase tracking-widest text-ink/60">
                {content.scopeLabel}
              </dt>
              <dd className="mt-2 text-sm leading-6">{content.scope}</dd>
            </div>
          </dl>
          <div
            className="relative mt-7 grid grid-cols-2 items-center overflow-hidden bg-[#e7e1ef] px-1 py-8 sm:grid-cols-3 sm:px-6 sm:py-14 lg:px-16"
            data-work-reveal
          >
            {content.heroImages.map((image, index) => (
              <div
                key={image.src}
                className={`work-product-image ${index === 1 ? 'translate-y-6' : ''} ${index === 2 ? 'hidden sm:block' : ''}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  unoptimized
                  height={1000}
                  priority={index < 2}
                  sizes="(max-width: 639px) 48vw, (max-width: 1279px) 30vw, 360px"
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>
          <section className="py-24 lg:py-36" aria-labelledby="contribution-heading">
            <div className="grid gap-8 lg:grid-cols-[1fr_2fr]" data-work-reveal>
              <p className="font-label text-xs uppercase tracking-wider text-ink/60">
                {content.workLabel}
              </p>
              <h2
                id="contribution-heading"
                className="font-display whitespace-pre-line text-4xl leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl"
              >
                {content.workHeading}
              </h2>
            </div>
            <div className="mt-14 grid gap-9 sm:grid-cols-3 lg:mt-20 lg:gap-14">
              {content.contributions.map((item, index) => (
                <div key={item.title} className="border-t border-ink/25 pt-6" data-work-reveal>
                  <span className="font-label text-xs text-ink/50" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-ink/70">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
          <div aria-label={content.storyLabel}>
            {content.chapters.map((chapter, index) => (
              <section
                key={chapter.id}
                aria-labelledby={`${chapter.id}-heading`}
                className="work-chapter grid gap-10 border-t border-ink/20 py-16 lg:grid-cols-2 lg:gap-24 lg:py-24"
              >
                <div className="self-start lg:sticky lg:top-40" data-work-reveal>
                  <p className="font-label text-xs uppercase tracking-wider text-ink/60">
                    {chapter.label}
                  </p>
                  <h2
                    id={`${chapter.id}-heading`}
                    className="font-display mt-8 max-w-md whitespace-pre-line text-5xl leading-[1.05] tracking-[-0.04em] lg:text-6xl"
                  >
                    {chapter.heading}
                  </h2>
                  <p className="mt-7 max-w-sm leading-8 text-ink/70">{chapter.description}</p>
                </div>
                <figure data-work-reveal>
                  <div
                    className={`overflow-hidden px-3 py-8 sm:px-8 lg:py-16 ${index === 0 ? 'bg-[#e7e1ef]' : 'bg-[#e3e8dc]'}`}
                  >
                    <Image
                      src={chapter.image.src}
                      alt={chapter.image.alt}
                      width={800}
                      unoptimized
                      height={1000}
                      sizes="(max-width: 1023px) 90vw, 520px"
                      className="work-product-image mx-auto h-auto w-full max-w-lg"
                    />
                  </div>
                  <figcaption className="mt-4 text-xs leading-6 text-ink/60">
                    {chapter.caption}
                  </figcaption>
                </figure>
              </section>
            ))}
          </div>
          <section
            aria-labelledby="impact-heading"
            className="border-t border-ink/20 pb-16 pt-20 lg:pb-24 lg:pt-28"
          >
            <p className="font-label text-xs uppercase tracking-wider text-ink/60">
              {content.impactLabel}
            </p>
            <h2
              id="impact-heading"
              className="font-display mt-8 whitespace-pre-line text-5xl leading-[1.05] tracking-[-0.04em] lg:text-7xl"
              data-work-reveal
            >
              {content.impactHeading}
            </h2>
            <div className="mt-14 grid gap-10 sm:grid-cols-3 lg:gap-16">
              {content.capabilities.map((item) => (
                <div key={item.title} data-work-reveal>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink/70">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
          <div
            className="flex flex-col items-start justify-between gap-10 border-t border-ink/25 py-14 sm:flex-row sm:items-end"
            data-work-reveal
          >
            <h2 className="font-display max-w-md text-4xl tracking-[-0.035em] sm:text-5xl">
              {content.closingHeading}
            </h2>
            <a
              href={content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-ink pb-2 text-sm font-medium hover:text-signal-deep"
            >
              {content.visitLabel} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="max-w-2xl text-xs leading-6 text-ink/55">
            {content.imageCredit}{' '}
            <a
              href={content.imageCreditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              {content.imageCreditLabel}
              <span aria-hidden="true"> ↗</span>
            </a>
          </p>
        </div>
      </WorkScroll>
    </div>
  )
}

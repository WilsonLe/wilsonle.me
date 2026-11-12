import Image from 'next/image'
import Link from 'next/link'
import { WorkScroll } from '@/components/work/WorkScroll'
import type { CyobotShowcase } from '@/content/cyobot-types'

export function CyobotShowcasePageView({
  content,
  basePath,
}: {
  content: CyobotShowcase
  basePath: string
}) {
  const home = basePath || '/'
  return (
    <div className="work-showcase bg-paper text-ink">
      <WorkScroll>
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 lg:pt-32">
          <Link
            href={`${home}#work`}
            className="font-label inline-flex min-h-11 items-center gap-3 text-xs font-semibold uppercase tracking-wider hover:underline"
          >
            <span aria-hidden="true">←</span>
            {content.backLabel}
          </Link>
          <header className="pb-10 pt-8 lg:pb-14 lg:pt-10" data-work-reveal>
            <p className="font-label text-xs uppercase tracking-[0.12em] text-ink/65">
              {content.category}
            </p>
            <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
              <div>
                <p className="text-lg font-semibold">{content.name}</p>
                <h1 className="font-display mt-4 whitespace-pre-line text-[clamp(3.6rem,7vw,6.8rem)] font-normal leading-[0.98] tracking-[-0.055em]">
                  {content.heading}
                </h1>
                <p className="mt-7 max-w-md text-lg leading-relaxed text-ink/75">
                  {content.introduction}
                </p>
                <a
                  href={content.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-block border-b border-ink pb-2 text-sm font-medium hover:text-signal-deep"
                >
                  {content.visitLabel} <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="order-first justify-self-center lg:order-last" data-work-reveal>
                <Image
                  {...content.robotImage}
                  alt={content.robotImage.alt}
                  unoptimized
                  priority
                  sizes="(max-width: 1023px) 300px, 420px"
                  className="h-auto w-full max-w-[18rem] lg:max-w-[26rem]"
                />
              </div>
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
          <figure className="mt-7" data-work-reveal>
            <div className="overflow-hidden bg-[#e7e1ef] p-3 sm:p-8 lg:p-14">
              <Image
                {...content.heroImage}
                alt={content.heroImage.alt}
                unoptimized
                priority
                sizes="(max-width: 1279px) 90vw, 1100px"
                className="work-product-image h-auto w-full border border-ink/10"
              />
            </div>
            <figcaption className="mt-4 text-xs leading-6 text-ink/60">
              {content.heroCaption}
            </figcaption>
          </figure>
          <section aria-labelledby="contribution-heading" className="py-24 lg:py-32">
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
            <div className="mt-14 grid gap-9 sm:grid-cols-3 lg:gap-14">
              {content.contributions.map((item, index) => (
                <div key={item.title} data-work-reveal>
                  <div className="mb-6 overflow-hidden bg-[#e7e1ef] p-3">
                    <Image
                      {...item.image}
                      alt={item.image.alt}
                      unoptimized
                      sizes="(max-width: 639px) 90vw, 390px"
                      className="aspect-[16/10] h-auto w-full object-contain"
                    />
                  </div>
                  <span className="font-label text-xs text-ink/50" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink/70">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
          {content.chapters.map((chapter, index) => (
            <section
              key={chapter.id}
              className="work-chapter grid gap-10 border-t border-ink/20 py-16 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16 lg:py-24"
              aria-labelledby={`${chapter.id}-heading`}
            >
              <div className="self-start lg:sticky lg:top-36" data-work-reveal>
                <p className="font-label text-xs uppercase tracking-wider text-ink/60">
                  {chapter.label}
                </p>
                <h2
                  id={`${chapter.id}-heading`}
                  className="font-display mt-8 whitespace-pre-line text-4xl leading-[1.08] tracking-[-0.04em] sm:text-5xl"
                >
                  {chapter.heading}
                </h2>
                <p className="mt-7 max-w-sm leading-8 text-ink/70">{chapter.description}</p>
              </div>
              <figure data-work-reveal>
                <div
                  className={`overflow-hidden p-3 sm:p-6 lg:p-8 ${index === 1 ? 'bg-[#e3e8dc]' : 'bg-[#e7e1ef]'}`}
                >
                  <Image
                    {...chapter.image}
                    alt={chapter.image.alt}
                    unoptimized
                    sizes="(max-width: 1023px) 90vw, 650px"
                    className="work-product-image h-auto w-full border border-ink/10"
                  />
                </div>
                <figcaption className="mt-4 text-xs leading-6 text-ink/60">
                  {chapter.caption}
                </figcaption>
              </figure>
            </section>
          ))}
          <section
            aria-labelledby="impact-heading"
            className="border-t border-ink/20 py-20 lg:py-28"
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
            <div className="mt-14 grid gap-10 sm:grid-cols-3 lg:gap-10">
              {content.capabilities.map((item) => (
                <figure key={item.title} data-work-reveal>
                  <div className="overflow-hidden bg-[#e3e8dc] p-3">
                    <video
                      aria-label={item.demo.alt}
                      controls
                      loop
                      muted
                      playsInline
                      preload="none"
                      poster={item.demo.poster}
                      width={item.demo.width}
                      height={item.demo.height}
                      className="aspect-[16/10] h-auto w-full object-contain"
                    >
                      <source src={item.demo.src} type="video/mp4" />
                      <a href={item.demo.sourceUrl}>{content.demoSourceLabel}</a>
                    </video>
                  </div>
                  <figcaption className="mt-6">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink/70">{item.description}</p>
                    <a
                      href={item.demo.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-xs underline underline-offset-4"
                    >
                      {content.demoSourceLabel} <span aria-hidden="true">↗</span>
                    </a>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
          <div
            className="grid items-center gap-10 border-t border-ink/25 py-14 sm:grid-cols-[1fr_1.4fr] lg:gap-20"
            data-work-reveal
          >
            <Image
              {...content.robotImage}
              alt={content.robotImage.alt}
              unoptimized
              sizes="(max-width: 639px) 250px, 350px"
              className="mx-auto h-auto w-full max-w-[18rem]"
            />
            <div>
              <h2 className="font-display max-w-lg text-4xl tracking-[-0.035em] sm:text-5xl">
                {content.closingHeading}
              </h2>
              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block border-b border-ink pb-2 text-sm font-medium hover:text-signal-deep"
              >
                {content.visitLabel} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <p className="max-w-2xl text-xs leading-6 text-ink/60">
            {content.imageCredit}{' '}
            <a
              href={content.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              {content.sourceLabel} <span aria-hidden="true">↗</span>
            </a>
          </p>
        </div>
      </WorkScroll>
    </div>
  )
}

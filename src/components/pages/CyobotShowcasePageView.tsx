import Image from 'next/image'
import Link from 'next/link'
import { WorkScroll } from '@/components/work/WorkScroll'
import { WirelessStepIcon } from '@/components/work/WirelessStepIcon'
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
            <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
              <div>
                <p className="text-lg font-semibold">{content.name}</p>
                <h1 className="font-display mt-4 whitespace-pre-line text-[clamp(3.2rem,5.5vw,5.6rem)] font-normal leading-[1.02] tracking-[-0.05em]">
                  {content.heading}
                </h1>
                <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink/75">
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
              <Image
                {...content.robotImage}
                alt={content.robotImage.alt}
                unoptimized
                priority
                sizes="(max-width: 1023px) 300px, 420px"
                className="order-first mx-auto h-auto w-full max-w-[18rem] lg:order-last lg:max-w-[26rem]"
              />
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
          <section aria-labelledby="contribution-heading" className="pb-24 pt-14 lg:pb-32 lg:pt-20">
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
            <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:gap-14">
              {content.contributions.map((item, index) => (
                <div key={item.title} data-work-reveal>
                  <div className="mb-6 overflow-hidden bg-[#e7e1ef] p-3 sm:p-4">
                    <Image
                      {...item.image}
                      alt={item.image.alt}
                      unoptimized
                      sizes="(max-width: 639px) 90vw, 580px"
                      className="aspect-[16/11] h-auto w-full object-contain"
                    />
                  </div>
                  <span className="font-label text-xs text-ink/50" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-ink/70">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
          {content.chapters.map((chapter, index) => (
            <section
              id={chapter.id}
              key={chapter.id}
              aria-labelledby={`${chapter.id}-heading`}
              className="border-t border-ink/20 py-16 lg:py-24"
            >
              <div className="work-chapter grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
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
                  <a
                    href={chapter.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-block border-b border-ink pb-2 text-sm font-medium hover:text-signal-deep"
                  >
                    {chapter.linkLabel} <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <figure data-work-reveal>
                  <div
                    className={`overflow-hidden p-3 sm:p-6 lg:p-8 ${index === 1 ? 'bg-[#e3e8dc]' : 'bg-[#e7e1ef]'}`}
                  >
                    <Image
                      {...chapter.image}
                      alt={chapter.image.alt}
                      unoptimized
                      sizes="(max-width: 1023px) 90vw, 740px"
                      className="work-product-image h-auto w-full border border-ink/10"
                    />
                  </div>
                  <figcaption className="mt-4 text-xs leading-6 text-ink/60">
                    {chapter.caption}
                  </figcaption>
                </figure>
              </div>
              {chapter.workflow ? (
                <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
                  <div className="border-y border-ink/20 py-8" data-work-reveal>
                    <h3 className="font-display text-2xl tracking-tight">
                      {chapter.workflow.heading}
                    </h3>
                    <ol className="mt-8 grid gap-6 sm:grid-cols-3">
                      {chapter.workflow.steps.map((step, stepIndex) => (
                        <li
                          key={step.kind}
                          className="relative flex flex-col items-center text-center"
                        >
                          {step.kind === 'robot' ? (
                            <Image
                              {...content.robotImage}
                              alt=""
                              unoptimized
                              sizes="96px"
                              className="h-24 w-24 object-contain"
                            />
                          ) : (
                            <WirelessStepIcon kind={step.kind} />
                          )}
                          {stepIndex < chapter.workflow!.steps.length - 1 ? (
                            <span
                              className="absolute -right-3 top-8 hidden text-xl text-ink/40 sm:block"
                              aria-hidden="true"
                            >
                              →
                            </span>
                          ) : null}
                          <p className="mt-4 max-w-36 text-sm leading-6">{step.label}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <figure className="mx-auto w-full max-w-sm" data-work-reveal>
                    <div className="bg-[#e3e8dc] p-3">
                      <video
                        aria-label={chapter.workflow.demo.alt}
                        controls
                        loop
                        muted
                        playsInline
                        preload="none"
                        poster={chapter.workflow.demo.poster}
                        width={chapter.workflow.demo.width}
                        height={chapter.workflow.demo.height}
                        className="h-auto w-full"
                      >
                        <source src={chapter.workflow.demo.src} type="video/mp4" />
                        <a href={chapter.workflow.demo.sourceUrl}>{content.demoSourceLabel}</a>
                      </video>
                    </div>
                    <figcaption className="mt-3 text-xs leading-6 text-ink/60">
                      {chapter.workflow.demo.caption}{' '}
                      <a
                        href={chapter.workflow.demo.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4"
                      >
                        {content.demoSourceLabel} <span aria-hidden="true">↗</span>
                      </a>
                    </figcaption>
                  </figure>
                </div>
              ) : null}
            </section>
          ))}
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
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-6">
                <a
                  href={content.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-ink pb-2 text-sm font-medium hover:text-signal-deep"
                >
                  {content.visitLabel} <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={content.instructorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-ink pb-2 text-sm font-medium hover:text-signal-deep"
                >
                  {content.instructorLabel} <span aria-hidden="true">↗</span>
                </a>
              </div>
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

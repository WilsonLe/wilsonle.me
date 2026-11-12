import Image from 'next/image'
import Link from 'next/link'
import { VulcanIcon } from '@/components/VulcanIcon'
import { VulcanScrollStory } from '@/components/VulcanScrollStory'
import type { VulcanShowcaseContent } from '@/content/vulcan-types'

interface VulcanWorkPageViewProps {
  content: VulcanShowcaseContent
  basePath: string
}

export function VulcanWorkPageView({ content, basePath }: VulcanWorkPageViewProps) {
  const workUrl = `${basePath || '/'}#work`
  return (
    <div className="bg-paper text-ink">
      <section
        className="px-5 pb-16 pt-32 sm:px-8 lg:pb-24 lg:pt-36"
        aria-labelledby="vulcan-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-5 border-b border-ink/20 pb-6">
            <Link
              href={workUrl}
              className="font-label inline-flex min-h-11 items-center gap-3 text-xs font-semibold hover:text-signal-deep"
            >
              <span aria-hidden="true">←</span>
              {content.backLabel}
            </Link>
            <p className="font-label text-[0.65rem] uppercase tracking-[0.14em] text-ink/60">
              {content.category}
            </p>
          </div>
          <div className="grid gap-8 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-x-16 lg:gap-y-6 lg:py-14">
            <div className="self-end lg:col-start-1 lg:row-start-1">
              <p className="font-label text-xs font-bold uppercase tracking-[0.15em] text-signal-deep">
                {content.name}
              </p>
              <h1
                id="vulcan-heading"
                className="font-display mt-5 whitespace-pre-line text-[clamp(2.7rem,4.8vw,4.8rem)] font-medium leading-[1.03] tracking-[-0.045em]"
              >
                {content.heading}
              </h1>
            </div>
            <figure className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="flex aspect-[4/3] items-center overflow-hidden bg-vulcan-sand p-5 sm:p-8 lg:p-10">
                <Image
                  {...content.heroImage}
                  alt={content.heroImage.alt}
                  priority
                  sizes="(min-width: 1280px) 640px, (min-width: 1024px) 55vw, 90vw"
                  className="h-full w-full object-contain drop-shadow-xl"
                />
              </div>
              <figcaption className="font-label mt-4 text-xs leading-6 text-ink/60">
                {content.imageNote}
              </figcaption>
            </figure>
            <div className="lg:col-start-1 lg:row-start-2">
              <p className="max-w-md text-base leading-8 text-ink/75">{content.introduction}</p>
            </div>
          </div>
          <dl className="mt-9 grid gap-6 border-b border-ink/20 pb-9 sm:grid-cols-2 lg:max-w-3xl">
            {content.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-label text-[0.65rem] uppercase tracking-[0.12em] text-ink/60">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-sm font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:py-20" aria-labelledby="vulcan-work-heading">
        <div className="mx-auto max-w-7xl">
          <p className="font-label text-xs font-bold uppercase tracking-[0.14em] text-signal-deep">
            {content.workLabel}
          </p>
          <h2
            id="vulcan-work-heading"
            className="font-display mt-6 whitespace-pre-line text-4xl leading-[1.05] tracking-[-0.035em] sm:text-6xl"
          >
            {content.workHeading}
          </h2>
          <VulcanScrollStory chapters={content.chapters} />
        </div>
      </section>

      <section
        className="border-t border-ink/20 px-5 py-20 sm:px-8 lg:py-28"
        aria-labelledby="vulcan-signin-heading"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 lg:gap-24">
          <figure>
            <div className="flex justify-center bg-vulcan-sand p-6 sm:p-10">
              <Image
                {...content.signIn.image}
                alt={content.signIn.image.alt}
                sizes="(min-width: 768px) 380px, 80vw"
                className="vulcan-screen h-auto w-full max-w-[380px] rounded-md"
              />
            </div>
            <figcaption className="font-label mt-4 text-xs leading-6 text-ink/60">
              {content.signIn.caption}
            </figcaption>
          </figure>
          <div>
            <VulcanIcon name="access" className="mb-8 h-12 w-12 text-signal-deep" />
            <p className="font-label text-xs font-bold uppercase tracking-[0.14em] text-signal-deep">
              {content.signIn.label}
            </p>
            <h2
              id="vulcan-signin-heading"
              className="font-display mt-6 whitespace-pre-line text-4xl leading-[1.08] tracking-[-0.035em] sm:text-5xl"
            >
              {content.signIn.heading}
            </h2>
            <p className="mt-6 max-w-md text-base leading-8 text-ink/70 sm:text-lg">
              {content.signIn.description}
            </p>
          </div>
        </div>
      </section>

      <section
        className="bg-ink px-5 py-20 text-paper sm:px-8 lg:py-28"
        aria-labelledby="vulcan-impact-heading"
      >
        <div className="mx-auto max-w-7xl">
          <p className="font-label text-xs font-bold uppercase tracking-[0.14em] text-signal">
            {content.impact.label}
          </p>
          <h2
            id="vulcan-impact-heading"
            className="font-display mt-8 whitespace-pre-line text-4xl leading-[1.06] tracking-[-0.035em] sm:text-6xl"
          >
            {content.impact.heading}
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-10">
            {content.impact.items.map((item) => (
              <li key={item.heading} className="border-t border-paper/25 pt-6">
                <div className="mb-7 flex aspect-[4/3] items-center justify-center bg-ink-soft p-5">
                  <Image
                    {...item.image}
                    alt={item.image.alt}
                    sizes="(min-width: 1024px) 370px, (min-width: 640px) 30vw, 85vw"
                    className="h-full w-full object-contain"
                  />
                </div>
                <VulcanIcon name={item.icon} className="mb-5 h-9 w-9 text-signal" />
                <h3 className="text-base font-medium">{item.heading}</h3>
                <p className="mt-3 max-w-xs text-sm leading-7 text-paper-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="border-t border-rule bg-ink px-5 py-12 text-paper sm:px-8"
        aria-labelledby="vulcan-closing-heading"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <h2 id="vulcan-closing-heading" className="sr-only">
            {content.closingHeading}
          </h2>
          <a
            href={content.visitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-wrap items-center gap-5"
          >
            <Image
              {...content.brandImage}
              alt={content.brandImage.alt}
              sizes="180px"
              className="h-auto w-36 sm:w-44"
            />
            <span className="font-label inline-flex min-h-11 items-center gap-4 border-b border-paper/50 text-xs font-semibold group-hover:text-signal">
              {content.visitLabel}
              <span aria-hidden="true">↗</span>
            </span>
          </a>
          <Link
            href={workUrl}
            className="font-label inline-flex min-h-11 items-center gap-3 border-b border-paper/40 text-xs font-semibold hover:text-signal"
          >
            <span aria-hidden="true">←</span>
            {content.backLabel}
          </Link>
        </div>
      </section>
    </div>
  )
}

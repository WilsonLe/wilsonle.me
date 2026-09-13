import Image from 'next/image'
import Link from 'next/link'
import { ContactSection } from '@/components/sections/ContactSection'
import type { FieldNoteContent } from '@/content/types'
import { buildAbsoluteUrl } from '@/site-config'

interface FieldNotePageViewProps {
  canonicalPath: string
  content: FieldNoteContent
  routeBasePath: string
}

export function FieldNotePageView({
  canonicalPath,
  content,
  routeBasePath,
}: FieldNotePageViewProps) {
  const aboutHref = `${routeBasePath || '/'}#about`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: content.title,
    description: content.standfirst,
    datePublished: content.publishedDate,
    author: {
      '@type': 'Person',
      name: content.siteSettings.name,
      alternateName: content.siteSettings.alternateName,
    },
    image: buildAbsoluteUrl(content.hero.src),
    mainEntityOfPage: buildAbsoluteUrl(canonicalPath),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article>
        <header className="field-grid border-b border-rule px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:px-8 lg:pb-28">
          <div className="mx-auto max-w-7xl">
            <Link
              href={aboutHref}
              className="font-label inline-flex items-center gap-3 border-b-2 border-blueprint pb-1 text-xs font-bold uppercase tracking-[0.11em] text-paper transition-colors hover:text-blueprint"
            >
              <span aria-hidden="true">←</span>
              {content.backLabel}
            </Link>

            <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.22fr)_minmax(20rem,0.78fr)] lg:items-end lg:gap-20">
              <div>
                <p className="font-label text-xs font-bold uppercase tracking-[0.16em] text-signal">
                  {content.eyebrow}
                </p>
                <h1 className="font-display mt-7 max-w-5xl text-[clamp(3.5rem,8vw,7.5rem)] font-medium leading-[0.88] tracking-[-0.05em] text-paper">
                  {content.title}
                </h1>
                <p className="mt-8 max-w-3xl text-lg leading-8 text-paper-muted sm:text-xl sm:leading-9">
                  {content.standfirst}
                </p>
                <div className="font-label mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-5 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-paper-muted">
                  <span>{content.authorLabel}</span>
                  <time dateTime={content.publishedDate}>{content.publishedLabel}</time>
                </div>
              </div>

              <figure className="relative mx-auto w-full max-w-md border border-rule bg-ink-raised p-3 lg:mx-0 lg:ml-auto">
                <div
                  aria-hidden="true"
                  className="absolute -bottom-3 -right-3 h-full w-full border border-signal"
                />
                <Image
                  src={content.hero.src}
                  alt={content.hero.alt}
                  width={content.hero.width}
                  height={content.hero.height}
                  priority
                  sizes="(min-width: 1024px) 28rem, calc(100vw - 3rem)"
                  className="relative aspect-[4/5] h-auto w-full border border-rule object-cover"
                />
              </figure>
            </div>
          </div>
        </header>

        <div className="paper-grid bg-paper px-4 py-20 text-ink sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[13rem_minmax(0,46rem)] lg:justify-center lg:gap-20">
            <aside className="font-label hidden text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-ink/60 lg:block">
              <div className="sticky top-28 border-t border-ink/30 pt-4">
                <p>{content.eyebrow}</p>
                <p className="mt-3 text-ink">{content.publishedLabel}</p>
              </div>
            </aside>

            <div className="min-w-0">
              {content.sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="border-t border-ink/25 py-12 first:pt-0 first:border-t-0 sm:py-16"
                  aria-labelledby={`${section.id}-heading`}
                >
                  <p className="font-label text-[0.68rem] font-bold uppercase tracking-[0.15em] text-signal-deep">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2
                    id={`${section.id}-heading`}
                    className="font-display mt-4 text-4xl font-medium leading-tight tracking-[-0.035em] sm:text-5xl"
                  >
                    {section.heading}
                  </h2>
                  <div className="mt-7 space-y-6 text-lg leading-8 text-ink/80 sm:text-xl sm:leading-9">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}

              <div className="mt-8 border-l-4 border-signal bg-blueprint px-6 py-7 sm:px-8">
                <Link
                  href={aboutHref}
                  className="font-label inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.11em] text-ink decoration-signal-deep decoration-2 underline-offset-4 hover:underline"
                >
                  <span aria-hidden="true">←</span>
                  {content.backLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <ContactSection siteSettings={content.siteSettings} />
    </>
  )
}

import type { WebsiteTemplatesContent } from '@/content/types'

interface WebsiteTemplatesPageViewProps {
  content: WebsiteTemplatesContent
  routeBasePath: string
}

export function WebsiteTemplatesPageView({
  content,
  routeBasePath,
}: WebsiteTemplatesPageViewProps) {
  return (
    <>
      <section
        className="field-grid border-b border-rule px-4 pb-16 pt-32 sm:px-6 sm:pt-40 lg:px-8"
        aria-labelledby="templates-heading"
      >
        <div className="mx-auto max-w-7xl">
          <p className="font-label text-xs font-bold uppercase tracking-[0.16em] text-signal">
            {content.eyebrow}
          </p>
          <h1
            id="templates-heading"
            className="font-display mt-7 max-w-5xl text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.05em] text-paper"
          >
            {content.heading}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-paper-muted">
            {content.introduction}
          </p>
        </div>
      </section>
      <div className="paper-grid bg-paper px-4 py-16 text-ink sm:px-6 lg:px-8 lg:py-24">
        <ul className="mx-auto grid max-w-7xl gap-12">
          {content.items.map((template) => {
            const previewPath = template.standalonePreview
              ? template.path
              : `${routeBasePath}${template.path}`
            return (
              <li key={template.id}>
                <article
                  className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-12"
                  aria-labelledby={template.id}
                >
                  <div className="min-w-0 overflow-hidden border border-ink/30 bg-ink">
                    <div className="flex items-center gap-3 border-b border-rule px-4 py-3 text-paper-muted">
                      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-signal" />
                      <span className="font-label text-xs">{template.name}</span>
                    </div>
                    <iframe
                      src={previewPath}
                      title={template.previewTitle}
                      loading="lazy"
                      className="block h-[32rem] w-full border-0"
                    />
                  </div>
                  <div className="min-w-0 py-2 lg:py-6">
                    <p className="font-label text-xs font-bold uppercase tracking-[0.12em] text-signal-deep">
                      {template.category}
                    </p>
                    <h2
                      id={template.id}
                      className="font-display mt-5 text-4xl font-medium tracking-tight"
                    >
                      {template.name}
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-ink/75">{template.description}</p>
                    <ul className="mt-7 flex flex-wrap gap-2">
                      {template.features.map((feature) => (
                        <li
                          key={feature}
                          className="font-label border border-ink/25 px-3 py-2 text-xs"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={previewPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-label mt-9 inline-flex items-center gap-3 border-b-2 border-signal-deep pb-2 text-xs font-bold uppercase tracking-[0.1em] hover:text-signal-deep focus-visible:outline-2 focus-visible:outline-offset-4"
                    >
                      {content.previewLabel}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

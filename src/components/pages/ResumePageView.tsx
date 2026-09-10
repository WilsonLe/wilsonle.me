import Link from 'next/link'
import { ContactSection } from '@/components/sections/ContactSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import type { ResumeContent } from '@/content/types'
import { getLocalizedHref } from '@/lib/i18n'

interface ResumePageViewProps {
  content: ResumeContent
}

export function ResumePageView({ content }: ResumePageViewProps) {
  return (
    <>
      <section
        className="field-grid border-b border-rule px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:px-8 lg:pb-28"
        aria-labelledby="resume-heading"
      >
        <div className="mx-auto max-w-7xl">
          <p className="font-label text-xs font-bold uppercase tracking-[0.16em] text-signal">
            <span aria-hidden="true">R00 / </span>
            {content.intro.eyebrow}
          </p>
          <h1
            id="resume-heading"
            className="font-display mt-7 max-w-5xl text-[clamp(3.5rem,9vw,8rem)] font-medium leading-[0.88] tracking-[-0.05em] text-paper"
          >
            {content.intro.heading}
          </h1>
          <div className="mt-9 grid gap-8 border-t border-rule pt-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <p className="max-w-2xl text-lg leading-8 text-paper-muted">{content.intro.summary}</p>
            <Link
              href={getLocalizedHref(content.locale)}
              className="font-label inline-flex w-fit items-center gap-3 border-b-2 border-blueprint pb-1 text-xs font-bold uppercase tracking-[0.11em] text-paper transition-colors hover:text-blueprint"
            >
              <span aria-hidden="true">←</span>
              {content.intro.backLabel}
            </Link>
          </div>
        </div>
      </section>

      <ExperienceSection
        experiences={content.experiences}
        heading={content.labels.experienceHeading}
        presentLabel={content.labels.presentLabel}
      />
      <SkillsSection skillStack={content.skillStack} labels={content.labels} />
      <EducationSection education={content.education} labels={content.labels} />
      <ContactSection siteSettings={content.siteSettings} />
    </>
  )
}

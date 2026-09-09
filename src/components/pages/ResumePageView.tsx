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
      <section className="px-4 pb-12 pt-32 sm:px-6 lg:px-8" aria-labelledby="resume-heading">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            {content.intro.eyebrow}
          </p>
          <h1 id="resume-heading" className="text-4xl font-bold text-white md:text-6xl">
            {content.intro.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{content.intro.summary}</p>
          <Link
            href={getLocalizedHref(content.locale)}
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
          >
            <span aria-hidden="true">←</span>
            {content.intro.backLabel}
          </Link>
        </div>
      </section>

      <ExperienceSection experiences={content.experiences} />
      <SkillsSection skillStack={content.skillStack} />
      <EducationSection education={content.education} />
      <ContactSection siteSettings={content.siteSettings} />
    </>
  )
}

import { ExperienceSection } from '@/components/sections/ExperienceSection'
import type { ResumeContent } from '@/content/types'

interface ResumePageViewProps {
  content: ResumeContent
}

export function ResumePageView({ content }: ResumePageViewProps) {
  return (
    <div className="min-h-screen bg-[#f5f5f3] px-4 pb-16 pt-28 text-[#1f1f1f] sm:px-6 sm:pt-32">
      <ExperienceSection
        experiences={content.experiences}
        heading={content.labels.experienceHeading}
        presentLabel={content.labels.presentLabel}
      />
    </div>
  )
}

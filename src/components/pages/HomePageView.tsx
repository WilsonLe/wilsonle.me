import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import type { HomeContent } from '@/content/types'
import { buildAbsoluteUrl, getSocialLinks } from '@/site-config'

interface HomePageViewProps {
  canonicalPath: string
  content: HomeContent
}

export function HomePageView({ canonicalPath, content }: HomePageViewProps) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: content.siteSettings.name,
    url: buildAbsoluteUrl(canonicalPath),
    jobTitle: content.siteSettings.title,
    email: content.siteSettings.email,
    sameAs: getSocialLinks(),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <HeroSection siteSettings={content.siteSettings} />
      <AboutSection about={content.about} />
      <ExperienceSection experiences={content.experiences} />
      <SkillsSection skillStack={content.skillStack} />
      <EducationSection education={content.education} />
      <ContactSection siteSettings={content.siteSettings} />
    </>
  )
}

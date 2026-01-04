import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { EducationSection } from '@/components/sections/EducationSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { siteSettings, about, experiences, education } from '@/lib/content'

export default function HomePage() {
  return (
    <>
      <HeroSection siteSettings={siteSettings} />
      <AboutSection about={about} />
      <ExperienceSection experiences={experiences} />
      <SkillsSection />
      <EducationSection education={education} />
      <ContactSection siteSettings={siteSettings} />
    </>
  )
}

import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { NowSection } from '@/components/sections/NowSection'
import { PrinciplesSection } from '@/components/sections/PrinciplesSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import type { HomeContent } from '@/content/types'
import { buildAbsoluteUrl, getSocialLinks } from '@/site-config'

interface HomePageViewProps {
  canonicalPath: string
  content: HomeContent
  routeBasePath: string
}

export function HomePageView({ canonicalPath, content, routeBasePath }: HomePageViewProps) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: content.siteSettings.name,
    alternateName: content.siteSettings.alternateName,
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
      <HeroSection
        basePath={routeBasePath}
        hero={content.hero}
        siteSettings={content.siteSettings}
      />
      <ProjectsSection projects={content.projects} />
      <PrinciplesSection principles={content.principles} />
      <NowSection now={content.now} />
      <AboutSection about={content.about} routeBasePath={routeBasePath} />
      <ContactSection siteSettings={content.siteSettings} />
    </>
  )
}

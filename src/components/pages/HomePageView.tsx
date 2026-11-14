import { DescentGame } from '@/components/game/DescentGame'
import { ContactSection } from '@/components/sections/ContactSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { descentContent } from '@/content/en/descent'
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
      <DescentGame content={content} copy={descentContent} />
      <noscript>
        <style>{'.descent-page[data-ready]{display:none}'}</style>
        <HeroSection
          basePath={routeBasePath}
          hero={content.hero}
          siteSettings={content.siteSettings}
        />
        <ProjectsSection projects={content.projects} />
        <ContactSection siteSettings={content.siteSettings} />
      </noscript>
    </>
  )
}

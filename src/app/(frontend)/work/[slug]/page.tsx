import { notFound } from 'next/navigation'
import { WorkShowcasePageView } from '@/components/pages/WorkShowcasePageView'
import { getWorkContent, getWorkMetadata, workSlugs } from '@/content/work'

type WorkPageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return workSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: WorkPageProps) {
  const { slug } = await params
  const content = getWorkContent('en', slug)
  if (!content) notFound()
  return getWorkMetadata(content)
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params
  const content = getWorkContent('en', slug)
  if (!content) notFound()
  return <WorkShowcasePageView content={content} routeBasePath="" />
}

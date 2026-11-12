import { notFound } from 'next/navigation'
import { WorkPageView } from '@/components/pages/WorkPageView'
import { getWork, getWorkMetadata, works } from '@/content/work'

type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() {
  return works.map(({ slug }) => ({ slug }))
}
export async function generateMetadata({ params }: Props) {
  const work = getWork((await params).slug)
  if (!work) notFound()
  return getWorkMetadata(work, 'en')
}
export default async function WorkPage({ params }: Props) {
  const work = getWork((await params).slug)
  if (!work) notFound()
  return <WorkPageView work={work} />
}

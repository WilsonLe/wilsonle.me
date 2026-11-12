import { workShowcaseMetadata } from '@/app/(frontend)/work/metadata'
import { WorkShowcasePageView } from '@/components/pages/WorkShowcasePageView'
import { getPangeaChatContent } from '@/content'

const content = getPangeaChatContent('en')

export const metadata = workShowcaseMetadata(content, 'en')

export default function PangeaChatPage() {
  return <WorkShowcasePageView content={content} basePath="" />
}

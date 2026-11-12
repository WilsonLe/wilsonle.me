import { WorkShowcasePageView } from '@/components/pages/WorkShowcasePageView'
import { getPangeaChatContent } from '@/content'
import { workMetadata } from '@/lib/work-metadata'

const content = getPangeaChatContent('en')
export const metadata = workMetadata(content, 'en')

export default function PangeaChatPage() {
  return <WorkShowcasePageView content={content} basePath="" />
}

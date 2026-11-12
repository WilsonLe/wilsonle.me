import { VulcanWorkPageView } from '@/components/pages/VulcanWorkPageView'
import { getVulcanContent, getVulcanMetadata } from '@/content/vulcan'

export const metadata = getVulcanMetadata('en')

export default function VulcanWorkPage() {
  return <VulcanWorkPageView content={getVulcanContent('en')} basePath="" />
}

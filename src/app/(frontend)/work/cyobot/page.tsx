import { CyobotShowcasePageView } from '@/components/pages/CyobotShowcasePageView'
import { getCyobotContent } from '@/content'
import { cyobotMetadata } from '@/lib/cyobot-metadata'

const content = getCyobotContent('en')
export const metadata = cyobotMetadata(content, 'en')

export default function CyobotPage() {
  return <CyobotShowcasePageView content={content} basePath="" />
}

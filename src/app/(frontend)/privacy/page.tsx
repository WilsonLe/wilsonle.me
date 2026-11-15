import { PrivacyPolicy, privacyMetadata } from '@/components/pages/PrivacyPolicy'

export const metadata = privacyMetadata('en')

export default function PrivacyPage() {
  return <PrivacyPolicy locale="en" />
}

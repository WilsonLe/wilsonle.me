import type { SiteSettings } from '@/content/types'

export function getContactLinks({ social, socialLabels, contact }: SiteSettings) {
  const links = [
    {
      id: 'contact-github',
      href: social?.github,
      label: socialLabels.github,
      text: socialLabels.github,
    },
    {
      id: 'contact-linkedin',
      href: social?.linkedin,
      label: socialLabels.linkedin,
      text: socialLabels.linkedin,
    },
    {
      id: 'contact-booking',
      href: contact.booking.url,
      label: contact.booking.label,
      text: contact.booking.text,
    },
  ]
  return links.filter((link): link is (typeof links)[number] & { href: string } =>
    Boolean(link.href),
  )
}

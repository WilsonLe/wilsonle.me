import type { SiteSettings } from '@/content/types'

interface ContactSectionProps {
  siteSettings: SiteSettings
}

export function ContactSection({ siteSettings }: ContactSectionProps) {
  const contactLinks = [
    {
      id: 'email',
      href: siteSettings.email ? `mailto:${siteSettings.email}` : undefined,
      label: siteSettings.contact.emailLabel,
      value: siteSettings.email,
      external: false,
    },
    {
      id: 'booking',
      href: siteSettings.contact.booking.url,
      label: siteSettings.contact.booking.label,
      value: siteSettings.contact.booking.text,
      external: true,
    },
    {
      id: 'github',
      href: siteSettings.social?.github,
      label: siteSettings.socialLabels.github,
      value: siteSettings.socialLabels.github,
      external: true,
    },
    {
      id: 'linkedin',
      href: siteSettings.social?.linkedin,
      label: siteSettings.socialLabels.linkedin,
      value: siteSettings.socialLabels.linkedin,
      external: true,
    },
  ].filter(
    (link): link is { id: string; href: string; label: string; value: string; external: boolean } =>
      Boolean(link.href && link.value),
  )

  return (
    <section
      id="contact"
      className="bg-signal px-4 py-20 text-ink sm:px-6 lg:px-8 lg:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.8fr)] lg:items-end lg:gap-20">
        <div>
          <h2
            id="contact-heading"
            className="font-display max-w-3xl text-5xl font-medium leading-display tracking-[-0.035em] sm:text-7xl lg:text-8xl"
          >
            {siteSettings.contact.heading}
          </h2>
        </div>

        <ul className="border-t border-ink">
          {contactLinks.map((link) => (
            <li key={link.id} className="border-b border-ink">
              <a
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="group grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-3 py-4 transition-colors hover:bg-ink hover:text-signal sm:grid-cols-[5.5rem_minmax(0,1fr)_auto]"
              >
                <span className="font-label col-span-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] opacity-80 sm:col-span-1">
                  {link.label}
                </span>
                <span className="min-w-0 break-words text-sm sm:text-base">{link.value}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

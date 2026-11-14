// Local concept preview. TODO(i18n): vi — controls currently fall back to English.
// Portfolio headings and biography come from the existing locale content.
export const descentContent = {
  controls: 'Explore the city',
  jetpack: 'Jetpack',
  viewProject: 'View project',
  closeProject: 'Close project',
  backToTop: 'Back to top',
} as const

export type DescentCopy = typeof descentContent

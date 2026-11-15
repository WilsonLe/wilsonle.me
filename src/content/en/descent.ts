// TODO(i18n): Localize the original control and project labels for Vietnamese.
// Portfolio headings and biography come from the existing locale content.
export const descentContent = {
  controls: 'Explore the city',
  jetpack: 'Jetpack',
  regionLabel:
    'Interactive portfolio. Move with WASD, the arrow keys, or the on-screen controls. Jump with Space, Up, or W. Double-tap a jump key and hold the second press to fly.',
  upLeft: 'Jump or fly up-left',
  upRight: 'Jump or fly up-right',
  viewProject: 'View project',
  closeProject: 'Close project',
  backToTop: 'Back to top',
} as const

export type DescentCopy = Record<keyof typeof descentContent, string>

import type { Locale } from '@/lib/i18n'

const links = {
  en: { href: '/privacy', label: 'Privacy policy' },
  vi: { href: '/vi/privacy', label: 'Chính sách quyền riêng tư' },
}

export function privacyLink(locale: Locale) {
  return links[locale]
}

export const privacyCopy = {
  en: {
    title: 'Privacy policy',
    description: 'How this portfolio uses analytics and optional session recordings.',
    back: 'Back to the portfolio',
    analyticsTitle: 'Site analytics',
    analytics:
      'I use PostHog to collect information about visits, interactions, and performance so I can improve the portfolio.',
    replayTitle: 'Session replay',
    replay:
      'If you opt in, PostHog records a masked replay of your visit. You can turn it off here.',
    choice: {
      initial: 'Session replay is off',
      enabled: 'Session replay is allowed in this browser',
      turnOn: 'Allow masked replay',
      turnOff: 'Turn off replay',
      blocked: 'Your browser privacy signal blocks session replay.',
      unavailable: 'Your browser could not save the preference.',
    },
    contact: 'Contact Wilson about privacy',
    providerPolicy: 'PostHog’s privacy policy',
  },
  vi: {
    title: 'Chính sách quyền riêng tư',
    description: 'Cách trang giới thiệu sử dụng dữ liệu phân tích và bản ghi phiên tùy chọn.',
    back: 'Về trang giới thiệu',
    analyticsTitle: 'Phân tích truy cập',
    analytics:
      'Tôi dùng PostHog để thu thập thông tin về lượt truy cập, cách sử dụng và hiệu năng nhằm cải thiện trang giới thiệu.',
    replayTitle: 'Bản ghi phiên (session replay)',
    replay:
      'Nếu bạn đồng ý, PostHog ghi lại phiên truy cập với nội dung được che. Bạn có thể tắt tại đây.',
    choice: {
      initial: 'Đang tắt ghi phiên',
      enabled: 'Đã cho phép ghi phiên trong trình duyệt này',
      turnOn: 'Cho phép ghi phiên có che nội dung',
      turnOff: 'Tắt ghi phiên',
      blocked: 'Tín hiệu quyền riêng tư của trình duyệt đang chặn ghi phiên.',
      unavailable: 'Trình duyệt không thể lưu lựa chọn.',
    },
    contact: 'Liên hệ Wilson về quyền riêng tư',
    providerPolicy: 'Chính sách quyền riêng tư của PostHog',
  },
}

export type ReplayChoiceCopy = (typeof privacyCopy)['en']['choice']

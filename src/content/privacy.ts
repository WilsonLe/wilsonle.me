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
    analytics: [
      'Site analytics runs by default. I use PostHog in the United States to understand how people find the portfolio, what they use, and where the site runs slowly.',
      'PostHog receives page visits and duration, referring sites, recognised campaign tags, general browser and device information, and actions like opening a project or using the city controls. It also receives performance measurements and broad categories of browser errors.',
      'Visit identifiers stay in memory and reset on a full page reload. Page URLs are sent without query strings or fragments. PostHog receives connection information such as your IP address when your browser sends an event. The site honours Do Not Track and Global Privacy Control.',
    ],
    replayTitle: 'Session replay',
    replay: [
      'You can allow PostHog to record how you move through the portfolio. Recordings show layout, scrolling, and clicks. Page text and inputs are masked, and the recorder excludes canvas graphics, embedded pages, console logs, and network activity.',
      'Your choice is stored in this browser. Recording applies on your next portfolio visit. You can return here to turn it off for future activity.',
    ],
    choice: {
      initial: 'Session replay is off',
      enabled: 'Session replay is allowed in this browser',
      turnOn: 'Allow masked replay',
      turnOff: 'Turn off replay',
      blocked: 'Your browser privacy signal blocks session replay.',
      unavailable: 'Your browser could not save the preference.',
    },
    contactTitle: 'Questions about your data',
    contact: 'Contact Wilson through the portfolio.',
    providerPolicy: 'PostHog’s privacy policy',
  },
  vi: {
    title: 'Chính sách quyền riêng tư',
    description: 'Cách trang giới thiệu sử dụng dữ liệu phân tích và bản ghi phiên tùy chọn.',
    back: 'Về trang giới thiệu',
    analyticsTitle: 'Phân tích truy cập',
    analytics: [
      'Tính năng phân tích truy cập được bật mặc định. Tôi dùng PostHog tại Hoa Kỳ để hiểu cách khách truy cập tìm đến trang, sử dụng các phần trên trang và gặp tình trạng tải chậm ở đâu.',
      'PostHog nhận dữ liệu lượt xem và thời gian trên trang, nguồn giới thiệu, thẻ chiến dịch được nhận diện, thông tin chung về trình duyệt và thiết bị, cùng các thao tác như mở dự án hoặc điều khiển nhân vật. Dịch vụ cũng nhận số đo hiệu năng và nhóm lỗi trình duyệt.',
      'Mã lượt truy cập chỉ nằm trong bộ nhớ và được tạo lại khi tải lại trang. Địa chỉ trang gửi đi không chứa chuỗi truy vấn hoặc đoạn neo. PostHog nhận thông tin kết nối như địa chỉ IP khi trình duyệt gửi sự kiện. Trang tôn trọng tín hiệu Không theo dõi (Do Not Track) và Global Privacy Control.',
    ],
    replayTitle: 'Bản ghi phiên (session replay)',
    replay: [
      'Bạn có thể cho phép PostHog ghi lại cách bạn tương tác với trang. Bản ghi thể hiện bố cục, thao tác cuộn và nhấp. Văn bản và nội dung nhập được che. Bản ghi bỏ qua đồ họa canvas, trang nhúng, nhật ký trình duyệt và hoạt động mạng.',
      'Lựa chọn được lưu trong trình duyệt này. Việc ghi bắt đầu ở lần truy cập trang giới thiệu tiếp theo. Bạn có thể quay lại đây để tắt ghi cho các thao tác sau đó.',
    ],
    choice: {
      initial: 'Đang tắt ghi phiên',
      enabled: 'Đã cho phép ghi phiên trong trình duyệt này',
      turnOn: 'Cho phép ghi phiên có che nội dung',
      turnOff: 'Tắt ghi phiên',
      blocked: 'Tín hiệu quyền riêng tư của trình duyệt đang chặn ghi phiên.',
      unavailable: 'Trình duyệt không thể lưu lựa chọn.',
    },
    contactTitle: 'Câu hỏi về dữ liệu của bạn',
    contact: 'Liên hệ Wilson qua trang giới thiệu.',
    providerPolicy: 'Chính sách quyền riêng tư của PostHog',
  },
}

export type ReplayChoiceCopy = (typeof privacyCopy)['en']['choice']

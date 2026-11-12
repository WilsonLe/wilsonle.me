# Pangea Chat showcase

Scope: `/work/pangea-chat`, its en/vi variants and the Pangea entry in Selected work. The user's request replaces an earlier video direction with a minimal, professional, image-led scroll showcase. Vietnamese deliberately uses the site's existing English fallback convention.

## Content and imagery provenance

- Personal role and contribution: existing `src/content/en/home.ts` and `src/content/en/resume.ts`, also verified on https://www.wilsonle.me/ on 2026-11-12. The page retains the established frontend, AI services and delivery systems attribution. It makes no provider, architecture, adoption, performance or learning-result claims.
- Product capabilities: https://pangea.chat/ inspected 2026-11-12. Chat, contextual conjugation/vocabulary support, shared roleplay and bot practice are presented as product capabilities, not individual feature ownership.
- Official public demonstration images from the same page, downloaded 2026-11-12. Their sample conversations are public marketing demonstrations, not private user chats. Locally encoded as WebP at quality 86; content preserved.

| Local asset (`public/work/pangea-chat/`) | Original source                                                                      |
| ---------------------------------------- | ------------------------------------------------------------------------------------ |
| map.webp                                 | https://pangea-chat-client-assets.s3.us-east-1.amazonaws.com/Carousel_2_ratio4x5.png |
| conversation.webp                        | https://pangea-chat-client-assets.s3.us-east-1.amazonaws.com/Carousel_3_ratio4x5.png |
| roleplay.webp                            | https://pangea-chat-client-assets.s3.us-east-1.amazonaws.com/Carousel_4_ratio4x5.png |
| bot.webp                                 | https://pangea-chat-client-assets.s3.us-east-1.amazonaws.com/Carousel_5_ratio4x5.png |

## Design and implementation

Existing ink/paper palette and editorial serif; generous whitespace and lavender image stages. The server-rendered showcase view and typed content can serve later projects, without placeholder routes. A small IntersectionObserver leaf adds one-time entrance motion. Native view-timeline image drift is progressive enhancement; unsupported browsers keep entrance motion and static images. Reduced motion disables both. Without JavaScript, all content and images remain in document order. Desktop chapter text sticks within its own section; mobile reads linearly. There is no scroll hijacking, autoplay, tracking, new dependency or CMS change.

Metadata and the sitemap follow existing locale conventions. No ADR is needed: this extends the existing typed-content/server-component routing design. Rollback is reverting the scoped PR; there are no migrations or production data writes.

## Verification notes

The local package manager was pnpm 11, outside the repository's supported range. Dependencies were installed with `npx --yes pnpm@10.28.2 install --frozen-lockfile`; the lockfile is unchanged. Preview and tests use a task-owned port (3197), Chrome and disposable SQLite databases, never production data.

At 768px, Next's image optimizer stalled on the negotiated image response for some 750px variants; a direct curl with Chrome's Accept header reproduced the stall, while the source WebP returned successfully. The four already encoded WebP assets total 184 KiB, so these images bypass runtime transformation (`unoptimized`) while retaining intrinsic dimensions, responsive layout, priority for the first hero pair and native lazy loading elsewhere. The focused browser test covers image loading at 375, 768 and 1440px.

Focused Playwright tests cover home/showcase/product links, locale destinations, canonical/hreflang and sitemap entries, unknown routes, real image loads, viewport overflow, keyboard focus, reduced motion and no-JavaScript reading. An ignored local Playwright config points these same committed tests to the owned preview port and installed Chrome; the repository's default runner is unchanged.

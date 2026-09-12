# Professional journey evidence

These captures document the review draft of the professional-journey About
redesign and shop-floor field note from the production Next.js build. The
captured source tree is implementation commit `a6920e6`.

| Route                         | 1440px viewport                      | 375px viewport                     |
| ----------------------------- | ------------------------------------ | ---------------------------------- |
| Home and professional journey | [Desktop](./home-desktop.webp)       | [Mobile](./home-mobile.webp)       |
| `/notes/shop-floor-systems`   | [Desktop](./field-note-desktop.webp) | [Mobile](./field-note-mobile.webp) |

All lazy About images were scrolled into view and confirmed decoded before the
full-page captures were taken. The captures are review evidence, not
visual-regression baselines.

## Placeholder-first review

Every timeline node and the field-note hero intentionally use the same neutral,
code-authored local placeholder at `public/images/journey/placeholder.svg`.
This keeps the 4:5 image frames and page rhythm visible while Wilson reviews the
story order, paragraph copy, timeline navigation, and responsive layout.

No generated artwork, employer photography, logos, likenesses, or documentary
location imagery is included in the current branch. Final imagery and its
provenance remain deferred until the copy and layout are approved. The removed
draft illustrations remain recoverable from the branch history if an earlier
comparison is ever needed.

## Review coverage

The Playwright suite verifies desktop and mobile layouts, keyboard timeline
navigation, active chapter tracking, scroll-driven placeholders, reduced-motion
and short-viewport fallbacks, complete no-JavaScript content, local SVG decoding,
localized article routes and metadata, sitemap entries, and console errors.

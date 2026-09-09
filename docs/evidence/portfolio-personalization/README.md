# Portfolio personalization evidence

These full-page captures document the approved systems field-notes redesign from
the production Next.js build. They are review evidence, not visual-regression
baselines.

| Route  | 1440px viewport                  | 375px viewport                 |
| ------ | -------------------------------- | ------------------------------ |
| Home   | [Desktop](./home-desktop.webp)   | [Mobile](./home-mobile.webp)   |
| Résumé | [Desktop](./resume-desktop.webp) | [Mobile](./resume-mobile.webp) |

The Playwright suite separately verifies 375px, 768px, and 1440px layout width,
heading hierarchy, anchor offsets, keyboard navigation, reduced motion, palette
contrast, portrait loading, and social-image metadata.

# Professional journey evidence

These captures document the approved professional-journey About redesign and
shop-floor field note from the production Next.js build. The captured source
tree is recorded in implementation commit `150a813`.

| Route                         | 1440px viewport                      | 375px viewport                     |
| ----------------------------- | ------------------------------------ | ---------------------------------- |
| Home and professional journey | [Desktop](./home-desktop.webp)       | [Mobile](./home-mobile.webp)       |
| `/notes/shop-floor-systems`   | [Desktop](./field-note-desktop.webp) | [Mobile](./field-note-mobile.webp) |

All lazy About images were scrolled into view and confirmed decoded before the
full-page captures were taken. The captures are review evidence, not
visual-regression baselines.

## Illustration provenance

The four original editorial illustrations were created with OpenAI's built-in
image-generation mode, visually inspected, and converted to 1120 x 1400 WebP
assets with Sharp at quality 88. They are illustrations rather than photographs
of Denison, Designer Brands, Pangea Chat, Richmond, Brisbane, or David Jones.

| Final asset                                      | Source output                                   | Prompt brief                                                                                                                                                                                                                  |
| ------------------------------------------------ | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/images/journey/ohio-foundations.webp`    | `exec-9025cb07-9d1c-42c0-935d-72ec5c1937f1.png` | A generalized Ohio progression from campus network engineering to cloud applications, rendered as a refined editorial paper collage; no people, text, logos, or exact buildings.                                              |
| `public/images/journey/richmond-remote.webp`     | `exec-6ca734da-f8a6-4405-b163-83971c9b209b.png` | An entirely unoccupied Richmond remote-work scene connecting an empty desk to abstract interface, AI-assistant, service, delivery, monitoring, and infrastructure layers; no text, logos, exact landmarks, or human presence. |
| `public/images/journey/brisbane-shop-floor.webp` | `exec-9604cde2-2883-4a0c-afdb-8d83d9fbf35c.png` | A generalized Brisbane-to-retail scene connecting information-systems study with stock flow, handoffs, and service pathways; no people, branding, exact landmarks, or identifiable store interior.                            |
| `public/images/journey/agentic-delivery.webp`    | `exec-2be0220a-6f94-4ed2-927b-a0e30c81b743.png` | A calm, human-directed agentic workflow progressing through specifications, isolated workspaces, validation, evidence, review gates, and release; no people, robots, code, or text.                                           |

One earlier Richmond generation,
`exec-4e8f70ef-415a-4af1-a5da-2911ccd92cc8.png`, was rejected because its human
figure could be mistaken for Wilson. It is not included in the website.

## Review coverage

The Playwright suite verifies desktop and mobile layouts, keyboard timeline
navigation, active chapter tracking, scroll-driven artwork, reduced-motion and
short-viewport fallbacks, complete no-JavaScript content, local WebP decoding,
localized article routes and metadata, sitemap entries, and console errors.

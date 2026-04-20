---
applyTo: 'src/app/(frontend)/**,src/components/**'
description: 'Rules for Next.js App Router frontend code: Server Components, client-component boundaries, accessibility, and the `@/*` import alias used by the portfolio site.'
---

# Frontend instructions

Applies to public-site routes under `src/app/(frontend)/**` and shared React
components under `src/components/**`.

## Component model

- **Default to Server Components.** Only add `'use client'` when the component
  needs `useState`, `useEffect`, refs, browser APIs, or DOM event handlers.
- Keep client components small and push them to leaves of the tree. Pass
  server-fetched data down as props rather than re-fetching on the client.
- Section components (`src/components/sections/*`) receive typed content as
  props from the page — they must not import from `@/lib/content` themselves.
  The page composes content + section components.

## Imports & structure

- Use the `@/*` alias (e.g. `@/components/sections/HeroSection`). Do not use
  long relative paths like `../../../lib/content`.
- One component per file. Filename matches exported component in PascalCase.
- Co-locate component-specific helpers in the same file unless reused.

## Accessibility

- Use semantic landmarks: `<header>`, `<main>`, `<section aria-labelledby=...>`,
  `<nav>`, `<footer>`, `<article>`.
- Every heading level must be logical — one `<h1>` per page (the hero), then
  `<h2>` per section.
- All `<img>` (and `next/image`) need meaningful `alt` text. Decorative images
  use `alt=""`.
- Icon-only buttons/links require `aria-label`.
- Interactive elements must be reachable by keyboard and have visible focus
  styles (Tailwind `focus-visible:` utilities).
- Respect `prefers-reduced-motion` for any animation.

## Routing & i18n

- The app uses path-based i18n: `/` (English default) and `/vi/...` for
  Vietnamese. When adding a new route, add both locales and update
  `sitemap.ts` + `alternates.languages` metadata.
- Don't hard-code strings in components. Read them from the locale's content
  module and pass as props.

## Data fetching

- Use `async` Server Components and `fetch` with explicit `cache` / `next`
  options. Do not introduce SWR/React Query unless a client-only need appears.
- For Payload data, import from `payload` and call `getPayload({ config })` in
  Server Components — never expose Payload's local API to the client.

## Do not

- Do not import server-only modules (Payload, `fs`, `db`) into client
  components.
- Do not use `next/head` — use the Metadata API (see seo instructions).
- Do not add CSS-in-JS or CSS modules; use Tailwind utilities.

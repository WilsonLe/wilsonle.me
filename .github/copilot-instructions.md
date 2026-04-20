# Copilot Instructions — wilsonle.me

These instructions apply to the entire repository. Scoped instruction files under
[.github/instructions/](instructions/) extend these rules for specific areas of the
codebase — read the one whose `applyTo` matches the files you are touching before
making changes.

## 1. Purpose of this repo

`wilsonle.me` is the personal **portfolio + blog** site for Minh (Wilson) Le.

- **Portfolio**: resume-style sections (hero, about, experience, skills, education,
  contact) rendered from typed content modules.
- **Blog**: authored **in code** as MDX files (see
  [content.instructions.md](instructions/content.instructions.md)). The blog is
  not authored through a CMS UI.
- **Payload CMS is used as a backend only** — a typed data store for dynamic data
  such as contact-form submissions, media uploads, and future comments/analytics.
  **Do not** put page copy, blog posts, or portfolio data in Payload collections.
  **Do not** generate new Payload collections without an explicit request.
- **i18n**: English (default) and Vietnamese. Routing is path-based:
  `/` and `/en/...` serve English, `/vi/...` serves Vietnamese. Keep both locales
  in sync when adding user-facing copy.

Canonical production URL: `https://wilsonle.me`.

## 2. Stack

- **Next.js 15** (App Router, React 19, Server Components by default)
- **Payload CMS 3** (mounted under `src/app/(payload)/`, admin at `/admin`)
- **SQLite** via `@payloadcms/db-sqlite` (not MongoDB — ignore any stale README
  references to Mongo)
- **Tailwind CSS v4** (utility-first, via `@tailwindcss/postcss`)
- **TypeScript 5** with path alias `@/*` → `src/*`
- **Vitest** for integration tests, **Playwright** for e2e
- **pnpm** as package manager, **Docker** for deployment

## 3. Repository layout (load-bearing)

```
src/
  app/
    (frontend)/          Public site routes, layout, globals.css, sitemap.ts
    (payload)/           Payload admin + API routes — do not mix with frontend
  collections/           Payload collections (Users, Media) — add only on request
  components/            React components; sections/ are the home-page sections
  lib/content.ts         Current portfolio content source (see content instructions)
  payload.config.ts      Payload config
  payload-types.ts       GENERATED — never edit by hand; run `pnpm generate:types`
tests/
  int/                   Vitest integration tests
  e2e/                   Playwright e2e tests
```

> `src/payload-types.ts` and `src/app/(payload)/admin/importMap.js` are generated.
> Never hand-edit. Regenerate with `pnpm generate:types` and
> `pnpm generate:importmap`.

## 4. Required checks before declaring a change done

Run these from the repo root. Do not claim completion without them passing for the
surface you touched.

| Check             | Command                        | When                                      |
| ----------------- | ------------------------------ | ----------------------------------------- |
| Lint              | `pnpm lint`                    | Always                                    |
| Type-check        | `pnpm exec tsc --noEmit`       | Always when TS changed                    |
| Format            | `pnpm exec prettier --check .` | Always                                    |
| Integration tests | `pnpm test:int`                | When touching API, collections, lib/      |
| Production build  | `pnpm build`                   | Before shipping non-trivial changes       |
| E2E (optional)    | `pnpm test:e2e`                | When changing routes, layout, or sections |

If a check fails, **fix it** rather than suppressing it. Do not add
`eslint-disable`, `@ts-ignore`, or `@ts-expect-error` without a justifying comment.

## 5. Content rules (summary — see content.instructions.md)

- Content lives **in code**, typed, under `src/content/{en,vi}/...` (target
  structure) with per-page SEO co-located. `src/lib/content.ts` is the current
  holding pen and is considered too restrictive — do not add new fields to it;
  propose the move to `src/content/` instead.
- **Never fabricate personal data** (names, dates, companies, links). If a value
  is missing, ask — do not invent.
- **Never modify resume/bio copy** without explicit user confirmation.
- **Never fabricate external URLs** (GitHub handles, LinkedIn profiles, company
  sites). Copy existing links verbatim or leave blank.
- Keep `en` and `vi` keys in structural sync. If you can't translate, leave a
  TODO marker; do not machine-translate silently.

## 6. SEO rules (summary — see seo.instructions.md)

- Use the Next.js **Metadata API** (`export const metadata` / `generateMetadata`)
  in every route segment. No `next/head`.
- Source defaults from the site settings content module; never hard-code
  title/description strings inline in components.
- Every public page must set: `title`, `description`, `openGraph`, `twitter`,
  `alternates.canonical`, and `alternates.languages` (en/vi).
- OG image URLs must be **absolute** (built from the canonical base URL).
- Home page emits **JSON-LD `Person`** schema.
- `/admin/**` and `/api/**` must be `noindex, nofollow` (via `robots` metadata or
  `robots.txt`).
- Update `src/app/(frontend)/sitemap.ts` whenever routes are added or removed.

## 7. Styling & component rules (summary — see styling + frontend instructions)

- Tailwind v4 utilities only. No CSS modules. Global styles stay in
  `src/app/(frontend)/globals.css` and `styles.css`.
- **Server Components by default.** Add `'use client'` only when a component uses
  state, effects, browser APIs, or event handlers.
- Use semantic HTML (`<header>`, `<main>`, `<section>`, `<nav>`, `<article>`).
  Every `<img>` needs `alt`; every icon-only button needs `aria-label`.
- Imports use the `@/*` alias for anything under `src/`.

## 8. Security & safety

- Do not commit secrets. Environment variables belong in `.env` (gitignored) and
  `test.env` for tests.
- Payload admin is auth-gated; do not relax access control in `Users.ts` or any
  collection without explicit request.
- Treat all form input (contact form, future APIs) as untrusted — validate on the
  server side.
- Follow the OWASP Top 10; in particular, never construct raw SQL, never render
  unsanitized HTML, and keep `dangerouslySetInnerHTML` out of user-facing paths.

## 9. What **not** to do

- Don't add dependencies casually. Propose and justify before installing.
- Don't introduce a second CSS system (styled-components, CSS modules, vanilla
  CSS files per component).
- Don't create new Payload collections, migrations, or admin customizations
  without explicit request.
- Don't rewrite `src/payload-types.ts` or the admin import map by hand.
- Don't add Vercel/Payload-Cloud-specific code paths — deployment target is
  Docker.
- Don't add tracking, analytics, or third-party scripts without confirmation.

## 10. Deployment

Deployed via Docker using the provided `Dockerfile` and `docker-compose.yml`.
Assume a standalone container runtime — do not rely on Vercel-only features
(edge runtime, `@vercel/*` adapters, ISR-on-demand) unless explicitly asked.

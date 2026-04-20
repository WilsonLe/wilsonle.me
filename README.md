# wilsonle.me

Personal portfolio and blog for Minh (Wilson) Le. Built with Next.js 15,
Payload CMS 3, and Tailwind CSS v4.

Production: <https://wilsonle.me>

## What this repo is

- **Portfolio** — resume-style home page (hero, about, experience, skills,
  education, contact) rendered from typed content modules.
- **Blog** — authored **in code** as MDX files under `src/content/blog/<locale>/`.
  No headless CMS in front of blog posts.
- **Payload CMS** — used as a **backend data store only** (media, contact-form
  submissions, auth). Not the authoring surface for site or blog content.
- **i18n** — English (default) and Vietnamese, path-based routing:
  `/` and `/en/...` serve English, `/vi/...` serves Vietnamese.

Contributor and AI-assistant conventions live in
[`.github/copilot-instructions.md`](.github/copilot-instructions.md) and the
scoped files under [`.github/instructions/`](.github/instructions/).

## Stack

| Area            | Choice                                               |
| --------------- | ---------------------------------------------------- |
| Framework       | Next.js 15 (App Router, React 19, Server Components) |
| CMS/backend     | Payload CMS 3 (admin at `/admin`)                    |
| Database        | SQLite via `@payloadcms/db-sqlite`                   |
| Styling         | Tailwind CSS v4 (`@tailwindcss/postcss`)             |
| Language        | TypeScript 5 (path alias `@/*` → `src/*`)            |
| Tests           | Vitest (integration), Playwright (e2e)               |
| Package manager | pnpm                                                 |
| Deployment      | Docker                                               |

## Repository layout

```
src/
  app/
    (frontend)/          Public site routes, layout, globals.css, sitemap.ts
    (payload)/           Payload admin + API routes
  collections/           Payload collections (Users, Media)
  components/            React components; sections/ drive the home page
  content/               Typed content by locale (target structure)
    en/ vi/              site.ts, home.ts, blog/*.mdx
  lib/content.ts         Legacy holding pen — being migrated to src/content/
  payload.config.ts      Payload config
  payload-types.ts       Generated — do not edit
tests/
  int/                   Vitest integration tests
  e2e/                   Playwright e2e tests
```

`src/payload-types.ts` and `src/app/(payload)/admin/importMap.js` are
generated. Regenerate via `pnpm generate:types` and
`pnpm generate:importmap`.

## Getting started

Requirements: Node `^18.20.2 || >=20.9.0`, pnpm `^9 || ^10`.

```sh
pnpm install
cp .env.example .env   # then fill in secrets (Payload secret, etc.)
pnpm dev
```

Open <http://localhost:3000>. The Payload admin lives at
<http://localhost:3000/admin>.

### Scripts

| Script                    | Purpose                             |
| ------------------------- | ----------------------------------- |
| `pnpm dev`                | Next dev server                     |
| `pnpm devsafe`            | Wipe `.next/` then start dev        |
| `pnpm build`              | Production build                    |
| `pnpm start`              | Run the built app                   |
| `pnpm lint`               | ESLint                              |
| `pnpm test:int`           | Vitest integration tests            |
| `pnpm test:e2e`           | Playwright end-to-end tests         |
| `pnpm test`               | Integration + e2e                   |
| `pnpm generate:types`     | Regenerate `src/payload-types.ts`   |
| `pnpm generate:importmap` | Regenerate Payload admin import map |

### Before committing

```sh
pnpm lint
pnpm exec tsc --noEmit
pnpm exec prettier --check .
pnpm test:int
pnpm build
```

## Content model

- Site content (portfolio copy, SEO strings, socials) lives in code under
  `src/content/<locale>/` as typed TS modules.
- Blog posts are MDX files under `src/content/blog/<locale>/<slug>.mdx` with
  frontmatter (`title`, `description`, `date`, `tags`, optional `ogImage`,
  optional `draft`).
- English and Vietnamese must stay structurally in sync.
- **Never** put site copy or blog posts into Payload collections. See
  [`.github/instructions/content.instructions.md`](.github/instructions/content.instructions.md).

## SEO

- Uses the Next.js Metadata API (no `next/head`).
- Every public page sets `title`, `description`, `openGraph`, `twitter`,
  `alternates.canonical`, and `alternates.languages` for en/vi.
- Home page emits JSON-LD `Person` schema; blog posts emit `BlogPosting`.
- `sitemap.ts` enumerates all public routes in both locales.
- `/admin` and `/api` are `noindex, nofollow`.
- Full rules: [`.github/instructions/seo.instructions.md`](.github/instructions/seo.instructions.md).

## Deployment

Deployed via Docker using the provided `Dockerfile` and `docker-compose.yml`.
There are no assumptions about Vercel or Payload Cloud — the runtime is a
standalone Node container backed by a SQLite volume.

```sh
docker compose up --build
```

Environment variables come from `.env` (gitignored). Test runs use
`test.env`.

## License

MIT — see [LICENSE](LICENSE) if present, otherwise treat as MIT per
`package.json`.

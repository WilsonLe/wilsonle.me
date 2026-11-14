# wilsonle.me

Personal portfolio and blog for Wilson Le. Built with Next.js 15,
Payload CMS 3, and Tailwind CSS v4.

The homepage is a portfolio with an interactive pixel character.
The city has five districts: rooftops, street market, transit tunnels, sewers, and
reactor core. The scenery is rendered with Canvas 2D behind semantic portfolio
content, with aircraft and window lights on the rooftops, hovercars in the
market, railway signals, a flowing sewer with drifting debris, and a pulsing
reactor. Reduced motion keeps the scenery still.

### Interactive portfolio

Run `pnpm exec next dev --hostname 127.0.0.1 --port 3117` using pnpm 9 or 10,
then open <http://127.0.0.1:3117>. Use the local environment described below.

Use WASD or the arrow keys. Up jumps. Double tap Up or W and hold the second
press to fly with the jetpack. Down drops through ledges. On a touchscreen, tap
or hold the on-screen controls to move, or swipe to scroll through the portfolio.
Double tap the up control and hold the second tap to fly.

Press **E** beside a project billboard, or click or tap a billboard, to see the
project and its screenshots. The portfolio navigation scrolls to each section
and brings the character along. Sound is opt-in. The Skills panel is below Work.
Without JavaScript, the static portfolio still exposes the project descriptions,
screenshots, skills, résumé and contact links.

Focused checks: `pnpm exec tsx --test src/components/game/descent-engine.test.ts`.
The controls currently use the same English fallback as the Vietnamese homepage.

Production: <https://wilsonle.me>

## What this repo is

- **Portfolio** — interactive home page with work showcases, skills, contact
  and a direct résumé PDF download, rendered from typed content modules.
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
| Deployment      | Vercel production, Docker for standalone hosting     |

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

### Résumé download

All home locales download `public/wilson-le-resume.pdf` directly. The former
`/resume`, `/en/resume`, and `/vi/resume` pages have been removed.
The English PDF uses the existing facts in `src/content/en/resume.ts` and
site contact details. After an approved content change, regenerate it with
`pnpm generate:resume` (requires the Playwright Chromium browser), then render
and inspect the PDF before committing.

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

The public site is deployed by Vercel from GitHub's `main` branch. Use the
Production deployment status and the public domain to verify a release.

The repository also includes a `Dockerfile` and `docker-compose.yml` for
standalone development.

```sh
docker compose up --build
```

Environment variables come from `.env` (gitignored). Test runs use
`test.env`.

## License

MIT — see [LICENSE](LICENSE) if present, otherwise treat as MIT per
`package.json`.

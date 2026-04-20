---
applyTo: 'src/app/**/layout.tsx,src/app/**/page.tsx,src/app/(frontend)/sitemap.ts,src/app/(frontend)/robots.ts,public/robots.txt'
description: 'SEO rules: Next.js Metadata API, canonical + hreflang, OpenGraph/Twitter, JSON-LD Person schema, sitemap/robots, and noindex for admin/api.'
---

# SEO instructions

Applies to metadata exports, `sitemap.ts`, `robots.ts`/`robots.txt`, and any
route segment that renders public HTML.

## Canonical base

Production base URL: **`https://wilsonle.me`**. All absolute URLs (OG images,
canonical, sitemap entries, JSON-LD) must be built from this base — prefer a
single exported constant (e.g., `SITE_URL`) sourced from the site settings
content module, not re-typed per file.

## Metadata API (required)

- Use `export const metadata: Metadata` or `export async function generateMetadata`.
  **Never use `next/head`.**
- Source `title`, `description`, and OG defaults from the site/page content
  module — do not hard-code copy inline.
- Every **public** route segment must set:
  - `title` (use a `title.template` in the root layout for suffixing)
  - `description`
  - `alternates.canonical` (absolute URL)
  - `alternates.languages` with both `en` and `vi` entries
  - `openGraph` (`title`, `description`, `url`, `siteName`, `images`, `locale`,
    `type`)
  - `twitter` (`card: 'summary_large_image'`, `title`, `description`, `images`)
- OG/Twitter image URLs must be **absolute**. Provide `width`, `height`, and
  `alt`.

## Root layout defaults

Root layout (`src/app/(frontend)/layout.tsx`) should set:

- `metadataBase: new URL(SITE_URL)`
- `title.default` and `title.template` (e.g., `"%s · Minh Le"`)
- Default `openGraph.siteName`, `openGraph.locale`, `twitter.creator`
- `robots: { index: true, follow: true }` for the public site
- `icons` and `manifest` when those assets exist

## JSON-LD

- Home page emits a `Person` schema via a `<script type="application/ld+json">`
  tag rendered server-side. Fields: `name`, `url`, `sameAs` (socials),
  `jobTitle`, `email` (only if already public).
- Blog posts emit `BlogPosting` schema with `headline`, `datePublished`,
  `author`, `inLanguage`, `mainEntityOfPage`.

## Sitemap & robots

- `src/app/(frontend)/sitemap.ts` must enumerate all public routes in both
  locales, with `alternates.languages` when using Next's built-in shape.
- Update the sitemap whenever routes are added/removed or blog posts change.
- `robots.txt` (or `robots.ts`) must:
  - `Allow: /`
  - `Disallow: /admin` and `Disallow: /api`
  - Reference the sitemap: `Sitemap: https://wilsonle.me/sitemap.xml`
- Admin/API routes additionally set `robots: { index: false, follow: false }`
  in their metadata.

## i18n SEO

- `alternates.languages` must include both `en-US` (or `en`) and `vi-VN` (or
  `vi`) pointing to the corresponding locale URL, plus an `x-default`
  pointing to the English URL.
- `openGraph.locale` matches the rendered locale; use `alternateLocale` for
  the other.

## Do not

- Do not add `noindex` to public pages.
- Do not use relative URLs for canonical/OG/JSON-LD.
- Do not duplicate metadata between layout and page — let page-level metadata
  override via Next's merge semantics.
- Do not embed tracking scripts, pixels, or analytics without explicit
  request.

---
applyTo: 'src/lib/content.ts,src/content/**'
description: 'Rules for authoring site content in code: typed modules, en/vi locales, per-page SEO, blog as MDX, and strict no-fabrication rules for personal/resume data.'
---

# Content instructions

Applies to `src/lib/content.ts` and the target content tree under
`src/content/**`.

## Source of truth

- All site content (portfolio sections, blog posts, SEO strings) is authored
  **in code**, typed, and version-controlled.
- **Payload is not the CMS.** Do not move user-facing copy into Payload
  collections.

## Target structure (convention)

```
src/content/
  en/
    site.ts          Site-wide settings: name, title, socials, seo defaults
    home.ts          Home-page sections: about, experience, skills, education, contact
    blog/
      <slug>.mdx     Blog posts, each with frontmatter (title, description, date, tags)
  vi/
    site.ts
    home.ts
    blog/
      <slug>.mdx
  index.ts           Locale registry + helpers (getContent(locale), listPosts(locale))
```

`src/lib/content.ts` is the current holding pen. It is **too restrictive** for
the blog + i18n goal — do not add new fields to it. When a task touches
content, propose migrating the relevant slice into `src/content/<locale>/`.

## Types

- Define types once (e.g., `src/content/types.ts`) and reuse across locales so
  `en` and `vi` stay structurally identical.
- Every page-level content module exports a typed `seo` object (see
  seo instructions). SEO co-locates with the content it describes.

## Locales

- Default locale is **English (`en`)**. Vietnamese (`vi`) is secondary.
- `en` and `vi` must stay **structurally in sync** — same keys, same shape.
- If a translation is missing, leave a clearly marked `// TODO(i18n): vi`
  placeholder that falls back to English at render time. Do not machine-
  translate silently.

## Blog

- Blog posts are **MDX** files under `src/content/blog/<locale>/<slug>.mdx`.
- Each post has frontmatter: `title`, `description`, `date` (ISO 8601),
  `tags` (string[]), optional `ogImage` (absolute URL), optional `draft`.
- Slugs are kebab-case, stable, and locale-matched (same slug across locales
  when the post is the same article).
- Do not add a WYSIWYG authoring flow, Payload blog collection, or headless
  CMS adapter.

## Fabrication rules (strict)

- **Never invent personal data** — names, dates, companies, roles, GPAs,
  phone numbers, emails, URLs. If a value is missing, ask the user.
- **Never modify resume/bio copy** (about, experience, education entries)
  without explicit confirmation in the current turn.
- **Never fabricate external URLs** (GitHub, LinkedIn, company sites,
  project links). Copy existing values verbatim or leave empty.
- Dates use ISO 8601 (`YYYY-MM-DD` or `YYYY-MM`). Do not reformat existing
  dates silently.

## Validation

- Every content change must type-check (`pnpm exec tsc --noEmit`).
- When adding a new locale key, update both `en` and `vi`.
- External links: preserve verbatim; do not normalize, shorten, or "fix"
  them.

# CYOBot showcase

The user corrected this chat's project to CYOBot and explicitly confirmed that correction services, bot services, DevOps and playtest details belong to Pangea Chat. This candidate includes only CYOBot's existing coding portal, content system and shared sign-in attribution. The earlier Pangea draft is preserved separately and is not included in this diff.

## Provenance

Personal role/contribution: existing `src/content/en/home.ts` and `src/content/en/resume.ts`, verified on https://www.wilsonle.me/ on 2026-11-12. No new résumé dates, stack, metrics, provider or adoption claims.

Product context: https://cyobot.com/ inspected 2026-11-12. The three images were collected earlier in this same chat for the now-replaced video request, all on 2026-11-12:

| Local asset (`public/work/cyobot/`) | Source                                             | Meaning/limits                                                                                                                                                                                                                                                  |
| ----------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coding-portal.webp                  | https://cyobot.com/env-python.png                  | Official published portal screenshot. Disconnected indicators are preserved. It shows the interface, not a successful robot run. Resized to 1600×872 and encoded WebP quality 88.                                                                               |
| learning-guides.webp                | https://cyobot.com/learn                           | Public browser capture, 1440×900, encoded WebP quality 88. Illustrates learner-facing content, not private CMS authoring.                                                                                                                                       |
| sign-in.webp                        | https://cyobot.com/student/login?next=%2Fdashboard | Public browser capture, 1440×900, encoded WebP quality 88. No credentials entered, private learner data captured or cross-app authentication success claimed. Current provider options are visible product context, not claims of individual feature ownership. |

Full screenshots retain source content. Their current interfaces do not date every visual feature to Wilson's tenure. No private dashboard/CMS or physical robot operation was tested. Public interfaces illustrate the established contribution; no reconstructed app or fake results are used.

## Implementation and validation scope

Server-rendered typed content, default/en/vi routes, metadata with site name/canonical/language alternatives and sitemap entries follow the existing site pattern. Vietnamese retains the explicit English fallback. A visual link is added only to CYOBot's homepage entry. No placeholder projects, new dependencies, CMS/schema, biography or tracking changes.

The existing paper/ink editorial style is used with restrained image stages. `WorkScroll` adds one-time entrance motion through IntersectionObserver; CSS view-timeline image drift progressively enhances supported desktop browsers. Normal reading/alt text/links remain without JavaScript. Reduced motion disables animation; desktop chapter text sticks within its section and mobile reads linearly. The three pre-encoded images total about 135 KiB and bypass runtime image transformation, retaining intrinsic dimensions and native lazy loading.

No ADR is warranted for this extension of the established typed-content/server-route architecture. Rollback is reverting this scoped PR, with no migration or production data state to undo. Preview and integration checks use task-owned port 3197 and disposable SQLite databases. Package installation uses supported pnpm 10 via npx; lockfile unchanged. Browser checks cover links, metadata/locales/404s/sitemap, image loads and overflow at narrow/tablet/desktop widths, keyboard focus, reduced motion and no-JS content.

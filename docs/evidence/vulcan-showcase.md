# Vulcan Augmetics work showcase

The user redirected this chat to Vulcan Augmetics; Pangea is owned by other chats.
This change adds only Vulcan work routes, content, imagery, motion and a home entry.
Static routes and Vulcan-prefixed components/styles avoid owning the concurrent
Pangea implementation. The shared optional project showcase shape matches that work.

## Sources and attribution

- Personal contribution: `src/content/en/home.ts`, the existing Vulcan entry:
  content and access workflows, then production monitoring. The current résumé
  does not contain a Vulcan role/date entry, so this page adds neither. Résumé,
  biography and other project content remain unchanged.
- Company context: [Vulcan's official about page](https://www.wearevulcan.com/about-us/),
  inspected 12 November 2026. Copy says only that Vulcan builds upper-limb prosthetic
  solutions. No medical efficacy or hardware authorship claims.
- Real application: https://api.wearevulcan.com/admin, read-only inspection on
  12 November 2026 using the user's signed-in browser. No settings, roles or
  permissions were edited. Sign-in imagery comes from the empty form captured in
  this same task earlier that day.

## Published image inventory

All images are faithful pixel crops of real app captures, encoded locally as WebP
at quality 88–90. No generated UI, private records, credentials or raw telemetry.

| Asset under `public/images/work/vulcan-augmetics/` | Visible content                                                                                |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| content.webp                                       | Users and Orgs collection navigation; no individual records                                    |
| roles.webp                                         | Only role names; account identities, IDs and timestamp columns excluded                        |
| monitoring-portrait.webp                           | Aggregate API metrics and filters, dated snapshot; no request payloads or individual telemetry |
| sign-in.webp                                       | Empty form and Google/Apple/Facebook buttons; no credentials                                   |

Monitoring values are a capture-time window, not a live feed, improvement claim or
business outcome. Role/access copy describes Wilson's existing attribution and
visible capabilities. Sign-in providers are described as product features, without
claiming sole authorship. The deleted empty role draft is not used.

## Behavior and verification

Desktop uses IntersectionObserver with viewport-height pixel insets, recreated on
resize, to crossfade the sticky screenshot. Scroll remains native; all text stays
readable. Mobile, reduced motion, unavailable observer support and no JavaScript
retain every inline image in document order. Decorative duplicates are hidden from
assistive technology. Listeners/observers clean up on unmount and preference changes.

English is the default; Vietnamese explicitly uses the project's English fallback
convention. Routes have canonical/hreflang/OG/Twitter metadata and sitemap entries.
No dependencies, CMS/backend changes or migrations are introduced. Rollback is a
scoped revert. Build/static checks and actual responsive/fallback/browser journeys
are recorded in the draft PR and its bounded independent-review note.

## Image-led refinement

The user's follow-up explicitly asks for visual-led treatment in every section.
The hero gives the real workspace a prominent position; chapter screenshots precede
supporting copy on mobile; contribution and impact use simple grid, shield and pulse
icons; sign-in leads with its screenshot; each impact pairs an actual screen with a
short caption. The compact close uses `brand.webp` (240 × 100), a faithful crop of
the Vulcan wordmark from the same sign-in image. Icons are editorial navigation cues,
not simulated app UI. Paragraphs were reduced and redundant copy removed. The desktop
image dimensions are explicit so image selection/density does not shrink their layout.

`content-detail.webp` is a closer crop of the first two columns of the same workspace, used where a larger visual is needed. `monitoring-portrait.webp` uses the responsive dashboard capture from the earlier work on the same day (611 × 745), keeping its actual values and date. The full-width fresh monitoring capture remains outside the public bundle.

# Vulcan Augmetics work showcase

Current scope: the user's 12 November 2026 refinement focuses this image-led work
page on two in-house systems: role- and attribute-based access control, and
telemetry/analytics. The content/find-content and separate sign-in stories have
been removed. Homepage project copy and SEO follow the same scope. Résumé,
biography, Pangea and CYOBot content are unchanged.

## Attribution and evidence

- The user explicitly supplied the in-house authorship and role/attribute +
  telemetry/analytics scope in the current request. Earlier homepage attribution
  described content/access workflows and monitoring; the current page follows the
  user's more specific correction.
- Vulcan context: [the official about page](https://www.wearevulcan.com/about-us/).
  Copy says only that Vulcan builds upper-limb prosthetic solutions.
- Real application inspection: https://api.wearevulcan.com/admin, read-only in the
  user's signed-in browser. An existing published role's Read tab shows role rules
  and `sameClinic`, `sameHospital` and `sameOrg` conditions. The publish button
  remained disabled; no roles, checkboxes or permissions were changed.
- The existing Telemetry Reports viewer exposes aggregated operation counts,
  duration percentiles and user-count/trend categories. Only a historical aggregate
  operation-count excerpt is published; report IDs, individual users, raw events,
  patient records, credentials and payloads are excluded.
- API performance imagery is a dated 12 November 2026 capture. Values describe its
  capture window; no improvement, medical result or business outcome is asserted.

## Current public images

Faithful screenshot crops are encoded as WebP at quality 90. Each app excerpt has
48 pixels of neutral padding on every side, in addition to the page's image-frame
padding. Pixel content is preserved; no generated controls or numbers.

| Asset in `public/images/work/vulcan-augmetics/` | Dimensions | Subject                                                 |
| ----------------------------------------------- | ---------- | ------------------------------------------------------- |
| access-rules.webp                               | 631 × 356  | Complete clinic-role and same-clinic read-rule examples |
| telemetry-report.webp                           | 571 × 400  | Historical aggregate hardware/user operation counts     |
| telemetry-performance.webp                      | 707 × 841  | Aggregate request volume, latency, errors and filters   |
| brand.webp                                      | 240 × 100  | Wordmark cropped from the earlier empty sign-in capture |

The wordmark preserves its original crop. Superseded content, role-list, sign-in
and monitoring assets are removed from the public bundle. Original captures remain
in local evidence and Git history.

## Visual and interaction contract

Two contribution chapters pair actual app excerpts with compact editorial flows:
role + attributes → allowed scope, and telemetry → reports → analytics. These flows
explain the systems; they are distinct from real app UI. Impact has two illustrated
panels aligned to those systems. The hero and compact brand close remain image-led.

Desktop IntersectionObserver uses viewport-height pixel margins and refreshes on
resize. Images crossfade while scrolling stays native. Mobile, reduced motion,
missing observer support and noJS retain all images in reading order. Accessible
original figures remain available; the decorative sticky stack is aria-hidden.
Observers and media/resize listeners clean up on unmount or preference changes.

Typed en/vi content follows the site's explicit English-fallback convention. Root,
English and Vietnamese routes have canonical/hreflang/OG/Twitter metadata and sitemap
entries. No new dependencies, backend/CMS changes or migrations. Rollback is a scoped
revert. Verification and exact-candidate independent review are recorded in PR #26.

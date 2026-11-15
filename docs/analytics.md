# Portfolio analytics

The public portfolio sends events to its dedicated PostHog US project on
`wilsonle.me` and `www.wilsonle.me`. Coverage includes `/`, `/en`, and `/vi`.
The analytics component honors Do Not Track and Global Privacy Control.
Visitors whose browsers block analytics or disable JavaScript are missing from
these reports. A full reload starts a new in-memory visit, so this setup counts
visits and actions without measuring unique people across visits.

| Signal                                   | Fields and interpretation                                                                                                                                                                                                                                                   |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$pageview` and `$pageleave`             | Page path, locale, page duration when available, referrer site, device class, browser and major version, operating system, viewport band, coarse pointer and reduced motion.                                                                                                |
| Campaign attribution                     | Known `utm_source` and `utm_medium` categories, plus a flag for tagged links. Unknown tag values map to `other`.                                                                                                                                                            |
| `portfolio_interaction` impressions      | `section_seen`, `project_billboard_seen`, and `screenshot_seen` mark the first time at least 25% of the item is in view on a route.                                                                                                                                         |
| `portfolio_interaction` actions          | Navigation and menu use, résumé clicks, project dialog opens and closes, project links, screenshot links and animation controls, contact links, Skills tabs and browse buttons. Targets come from the site's own labels and IDs. A résumé click records intent to download. |
| `portfolio_interaction` city progression | Renderer mode, first movement and its input method, first successful jump and jetpack use, first visit to each of the five districts, sound changes, and the highest scroll milestone reached at each crossing.                                                             |
| `$web_vitals`                            | LCP, CLS, INP, and FCP when supported by the browser. TTFB uses the initial document's Navigation Timing entry. Values are reported without element or network attribution.                                                                                                 |
| `portfolio_interaction` failure signals  | One event per observed error category per visit, such as a script error, rejected promise, or failed image load.                                                                                                                                                            |

Event data uses a fixed set of properties. The collector keeps the page path
and referrer site and drops query strings and fragments. It sends public
portfolio IDs for interactions. Event properties exclude free text, form values,
keystrokes, full outbound URLs, error messages, stack traces, and individual
person profiles. Visit state stays in memory and the SDK reads the public project
token from the build environment.

The visitor notices and replay preference are in the policy at `/privacy` and
`/vi/privacy`. The preference stores only whether replay is allowed for that
browser. A visitor can enable or withdraw it on the policy page. The SDK loads
the recorder only on a subsequent eligible portfolio visit with permission. It
stops when the preference is removed, including when another tab changes it.
The policy and CMS routes stay outside the recording scope.

Replay masks page text and inputs, filters attributes, and limits page URLs to
the portfolio origin and path. The recorder excludes forms, embedded pages,
canvas graphics, console logs and network data. Verify a serialized replay
after changing any of these settings. The dedicated PostHog project also needs
Session Replay enabled. To pause replay, turn that setting off for the project.

For a controlled check, intercept PostHog requests from a local production build.
Verify the initial visit and route change, use keyboard and touch controls, open
a project and a screenshot, reach the contact floor, and check the typed events
and sanitized payload. Check the opt-out, preview, and CMS cases separately. After
release, confirm a fresh public-site visit lands in the portfolio project.

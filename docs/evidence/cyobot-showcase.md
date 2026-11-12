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

The existing paper/ink editorial style is used with restrained image stages. `WorkScroll` adds one-time entrance motion through IntersectionObserver; CSS view-timeline image drift progressively enhances supported desktop browsers. Normal reading/alt text/links remain without JavaScript. Reduced motion disables animation; desktop chapter text sticks within its section and mobile reads linearly. The public interface images and robot illustration are pre-encoded and bypass runtime transformation, retaining intrinsic dimensions and native lazy loading; the initial hero visuals use priority loading.

No ADR is warranted for this extension of the established typed-content/server-route architecture. Rollback is reverting this scoped PR, with no migration or production data state to undo. Preview and integration checks use task-owned port 3197 and disposable SQLite databases. Package installation uses supported pnpm 10 via npx; lockfile unchanged. Browser checks cover links, metadata/locales/404s/sitemap, image loads and overflow at narrow/tablet/desktop widths, keyboard focus, reduced motion and no-JS content.

## Image-led update and robot motion

The user's follow-up asks for every section, especially My contribution, to lead with images. The hero and closing now use CYOBot's actual robot product illustration; the contribution cards each show the corresponding real interface; chapter images take the larger column with brief supporting copy; enabled capabilities use three official robot demonstrations.

The live homepage's public application chunk (`app/page-2309cf28862986c0.js`, inspected 2026-11-12) identifies GIF/static-image pairs for project previews. The following files were fetched from the official site, visually inspected across multiple frames, and encoded as silent H.264 MP4 with fast-start headers. No content was synthesized or sped up. One bottom pixel is padded where required for even H.264 dimensions. Static WebP posters preserve each original first frame. Native controls start paused, offer play/pause and looping, require no JavaScript and avoid unwanted autoplay (including reduced-motion users). Original GIF links stay available beside each demo.

| Original GIF                                 | SHA-256 of source                                                  | Output dimensions / duration / frames | Encoded bytes |
| -------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------- | ------------- |
| https://cyobot.com/blinking-heart-effect.gif | `64c779bb1eeed6115ee51ac0ea4ee1e32e97069801ab2ab1ec74731bc2a7592f` | 322×204 / 1.50s / 30                  | 24,797        |
| https://cyobot.com/humanoid-walking.gif      | `b97300c47fd2803d861f03b62cc833bb13baf94c2fe85c9048028a8efe22a54e` | 300×170 / 5.70s / 114                 | 100,493       |
| https://cyobot.com/led-chasing.gif           | `e4ab0f8fb07bda87cef7aeedccadfc8dc56e707ed685ab7fc266330de9170314` | 280×162 / 11.35s / 227                | 252,839       |

The three outputs have **zero audio streams**; their total is 378,129 bytes instead of roughly 8.5 MB of GIFs. Native controls serve the original visible sequence efficiently. The fourth static image `robot.webp` (816×758, quality 90) comes from https://cyobot.com/intro-robot.png.

The official Python guide at https://cyobot.notion.site/Getting-Started-for-Python-0ca24e77efbc4bea88a471ef6abed8db describes the Wi-Fi portal, display output and a robot-dancing activity using movement APIs. This supports the relationship between browser coding and robot projects, but does not establish that the exact on-page editor screenshot operated the robots in these GIFs. The page labels these as CYOBot project examples rather than a captured live run. The inspected remote-control GIF is excluded: the site's own project description says another CYOBrain controls the robot wirelessly, so it would be misleading to call that direct portal control.

No personal attribution changes were introduced. This is a new user-requested visual work item after the previously cleared `9f9074b` candidate, not remediation of a reviewer finding. The final review must refresh against the new head before handoff.

# CYOBot showcase — student coding and instructor administration

The current user brief focuses on two areas: the coding portal **is the student dashboard**, with easy setup for wireless connection to physical robots; the content system should be shown through the current Instructor admin panel and its sidebar chatbot. Standalone Python/Block portal imagery, public learning-guide imagery and the separate sign-in chapter are removed. The page and homepage preview now use the actual student app.

## Attribution and live inspection

Personal scope comes from Wilson's explicit correction in this chat on 2026-11-12, together with the existing CYOBot role. The page credits the student dashboard/wireless setup and instructor content system. It introduces no provider/architecture, performance, adoption or measured setup-time claims, and does not alter résumé/about entries. Pangea's correction/bot-service/DevOps/playtest details remain outside CYOBot's attribution.

The user authorized Google sign-in using a named development account. Via the existing Chrome session:

- `https://dashboard.cyobot.com` redirected to **https://quest.cyobot.com/**, the actual RoboticsQuest student app. Google account selection used the requested account. The dashboard showed published Python/electronics/GPIO/kinematics quests. Inspected Intro to Python and its Level 1 questions without submitting answers. The hardware-coding Level 5 was progress-locked; no lock was bypassed. The capture shows the dashboard's actual Python quest preview, not a coding-editor screenshot or a completed robot connection.
- The current **Instructor app** at https://cyobot.com/dashboard/instructor was inspected with the same requested account. Its app selector visibly showed Instructor. Quests, skills, rewards, review controls, quest authoring/learning objectives and workspace chat were inspected. The screenshot shows https://cyobot.com/dashboard/quests with the chat sidebar open. No content edits, publications, quiz submissions or chatbot messages were performed.
- The earlier main-site student workspace contained no published quests and must not be confused with the separate RoboticsQuest student product.

The sidebar chatbot capture is its genuine initial state. No generated conversation or content-generation success is simulated. The screenshot excludes account email, workspace identifiers and private learner records. The existing empty development draft is visible only as an untitled draft row. Screenshot crops preserve actual UI pixels.

## Current media

| Local asset (`public/work/cyobot/`)        | Source and treatment                                                                                                                                                                                                                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| student-dashboard.webp                     | Authenticated https://quest.cyobot.com/ Python quest preview; browser capture 1265×712, WebP quality 90. Actual student dashboard/learning flow, not the standalone portal.                                                                                                                            |
| instructor-admin.webp                      | Authenticated https://cyobot.com/dashboard/quests in Instructor context, workspace chat open. Main-area capture 1016×704 cropped in the screenshot API to omit account/workspace navigation. WebP quality 90.                                                                                          |
| robot.webp                                 | Official https://cyobot.com/intro-robot.png, 816×758, WebP quality 90.                                                                                                                                                                                                                                 |
| motion/blinking-heart-effect.mp4 and .webp | Official https://cyobot.com/blinking-heart-effect.gif, visually inspected and encoded as a silent H.264 loop plus original first-frame poster. 322×204, 1.5s, 30 frames, 24,797 encoded bytes, zero audio streams. Source SHA-256: `64c779bb1eeed6115ee51ac0ea4ee1e32e97069801ab2ab1ec74731bc2a7592f`. |

The dashboard → wireless connection → robot illustration is a **conceptual workflow** reflecting the user's stated capability. It is not a fabricated app screenshot or a verified step-by-step pairing procedure. No physical robot was connected or controlled in this task. The LED-heart loop remains labelled as an official CYOBot project example, not a run from the captured dashboard. Other robot demos are omitted to keep the page focused on the two work areas.

## Design, behavior and validation

Two large image-led contribution cards and two chapters use typed content in the existing paper/ink visual system. The student chapter adds the brief wireless workflow with visual icons and the relevant LED example. The instructor chapter gives the actual admin/chat screenshot the larger image column. Shared sign-in is not a separate focus. Both app destinations are linked from the page. No placeholder projects, new dependency, CMS/schema or tracking change.

Default/en/vi routes, language alternatives, canonical/social metadata and sitemap conventions are preserved. Vietnamese remains an explicitly marked English fallback. Homepage showcase images now carry their real intrinsic dimensions rather than a fixed aspect ratio.

`WorkScroll` provides one-time entrance motion, with progressively enhanced native image drift on supported desktop browsers. Reduced motion disables these animations; all text/images remain server-rendered without JavaScript. The silent robot loop starts paused with native keyboard-accessible play/pause controls, static poster, looping and an original-GIF source link. It is usable without JavaScript and does not autoplay.

Preview/build use task-owned port 3197 and disposable SQLite configuration. Focused browser coverage includes app links, both work-area identities, two image-led contribution cards, the three-step wireless diagram, current image loads/overflow at narrow/tablet/desktop widths, locales/metadata/sitemap/404s, keyboard and no-JS/reduced-motion/media fallback. Runtime evidence is Chrome with mobile viewport emulation; physical hardware, Safari/Firefox and production behavior are separate from this preview.

This is a new user-requested scope correction after `e5c87e3` was cleared, not remediation of a reviewer finding. Final review must refresh on the new head. No ADR is warranted for this extension of the typed-content/server-route pattern. Rollback is reverting the scoped PR; there are no migrations or application data changes to undo. Merge and production deployment remain separate.

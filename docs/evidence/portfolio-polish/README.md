# Portfolio polish

Candidate evidence captured from the local production build on 13 November 2026.

- Work has six server-rendered project panels, with one selected at a time and synchronized labelled tabs above and below. Twelve inter-feature rules remain across the catalogue. Numbered pre-titles are removed.
- LocalCut and LocalDesign use product feature lists and descriptions; client projects retain their contribution lists.
- Contact begins with its heading. The footer has compact identity/navigation and copyright rows; location is removed.
- The live [AMSOFT](https://amsoft.vn/) stylesheet supplied the near-black `#080b0c`, cyan `#78e3f2`, dark cyan `#156675`, and supporting tokens. The existing off-white `#f4eddd` is retained.
- Header, hero, mobile menu, and footer download `/wilson-le-resume.pdf` on `/`, `/en`, and `/vi`. The former resume routes return 404 and are absent from the sitemap. The shared PDF is English, matching the current Vietnamese fallback content.
- The one-page tagged PDF was rendered and visually inspected. Text extraction confirms all four existing experience entries and both existing education entries. Social links are preserved. `pnpm generate:resume` regenerates it from the existing typed facts with the already-installed Playwright renderer; it is served as a static file.

The current contribution and showcase update adds Kalibr first, expands Pangea's user-supplied playtest workflow, identifies CYOBot/Vulcan as founding software engineer work, and focuses LocalCut/LocalDesign on their requested browser-local features. There are eighteen feature images. Kalibr's library is a public live capture; its analytics row shows the actual admin component rendered locally with visibly labelled synthetic data. The architecture diagram is removed. See [complete source and fixture provenance](../product-showcases.md).

The supplied ChatGPT/app captures remain exact 1844 ×934 crops excluding OS/browser chrome. All rows now follow the Vulcan CMS image-left/caption-right format and introduce both the image and its labelled text together. The Work heading and each project introduction use the same 650ms once-only entrance. Reduced motion and missing JavaScript leave content readable.

All custom zoom behavior is removed. Pangea's former 1.5× views are now static 1707 ×960 source-pixel crops. Hover/focus never scales images, and full-size links retain the visible focus outline outside the clip.

The follow-up [typography audit and WebMCP integration](typography-audit.md) documents the user-reported overlap, the failing regression, secondary enlargement defects and the new screenshot provenance.

## Captures

Project-only captures, including mobile Work, omit the fixed site header to keep screenshot content unobstructed; screenshots of the site itself retain it.

- [Scrollable menu on a short viewport at 200% text](menu-short-enlarged.webp)
- [Tech-stack carousel, desktop](tech-stack-desktop.webp)
- [Tech-stack carousel, mobile](tech-stack-mobile.webp)
- [Project tabs, desktop](project-tabs-desktop.webp)
- [Project tabs, mobile](project-tabs-mobile.webp)
- [Corrected hero, desktop](hero-desktop.webp)
- [Corrected hero, mobile](hero-mobile.webp)
- [Kalibr, desktop](kalibr-desktop.webp)
- [Kalibr, mobile](kalibr-mobile.webp)
- [Pangea playtest contribution](pangea-contribution-desktop.webp)
- [Pangea static close-ups](pangea-static-desktop.webp)
- [Screenshot-link keyboard focus](image-keyboard-focus-desktop.webp)
- [LocalCut external-agent feature](localcut-webmcp-desktop.webp)
- [LocalDesign external-agent feature](localdesign-webmcp-desktop.webp)
- [Keyboard focus on the primary CTA, desktop](hero-keyboard-focus-desktop.webp)
- [LocalCut, desktop](localcut-desktop.webp)
- [LocalDesign, desktop](localdesign-desktop.webp)
- [Contact and footer, desktop](contact-footer-desktop.webp)
- [Work, mobile](work-mobile.webp)
- [Contact and footer, mobile](contact-footer-mobile.webp)

## Verification

- `pnpm lint`, `pnpm exec tsc --noEmit`, and `pnpm exec prettier --check .` pass.
- `pnpm build` passes; Payload emits its existing dynamic-import dependency warning.
- All 29 frontend Playwright checks pass and exercise all home locales, desktop/tablet/mobile overflow and anchor targets, keyboard navigation, reduced motion, palette contrast, direct PDF downloads, removed routes, sitemap, and metadata against the production build.
- Download cases use separate visitor sessions per locale. A diagnostic reproduced Chromium throttling the eleventh rapid download in one session; that same footer link succeeds in a fresh session. All four download entry points remain covered for each locale.
- The independent first-pass review found an invisible primary-CTA focus outline. Cyan outlines now contrast with dark surfaces, with dark outlines on paper/cyan. The added regression test failed on the reviewed candidate at contrast ratio 1, then passed after correction; it waits for the existing color transition to settle. The focused production rendering was also visually inspected.
- Typography checks cover actual line-ink separation, clipping, 11 viewport widths on all three home routes, two serif fallbacks, 200% root text size and expanded mobile navigation. All 29 checks pass against the rebuilt production app.
- A new focus regression reproduces the image-link outline being clipped by the new scroll viewport. The shared frame draws its focus cue outside the clip. The later zoom-opening review finding is removed with the entire custom zoom interaction under the latest user instruction.
- New content checks cover Kalibr-first ordering, the supplied contribution details, native crop dimensions, condensed workflow bullet and feature captions. Static-image/entrance checks cover all eighteen rows, matching image/caption timing, all project introductions, hover/focus invariance, Pangea source dimensions and reduced motion.
- Actual entrance sampling confirms image and caption opacity/translation progress together: both reached opacity 0.84 together and ended fully visible with zero translation. Static hover/focus and reduced-motion states are covered separately.
- Production render inspection confirms six project boundaries, all twelve inter-feature rules, the unchanged off-white token, and the cyan accent. Screenshots establish appearance; download/route tests establish behavior.

No database, CMS, deployment, or production state changes are part of this delivery.

## Carousel and project tabs

The hero metadata block is replaced by a 36-technology carousel sourced from the full approved résumé at f9d1363. Six labelled category tabs replace dots, with Play/Pause, hover/focus/offscreen pausing and reduced-motion support. The PDF remains unchanged. Work tabs select one project, synchronize the top/bottom controls, and preserve project/feature hashes, locale/query paths and Back/Forward. Selecting from the bottom reveals the top selector below the fixed header. Without JavaScript, all Work articles and all 36 tech entries remain readable through native links. Pangea's fourth bullet emphasizes team leadership and the feedback-to-spec-to-feature pipeline.

Five dedicated navigation checks cover real rotation and pausing with a controlled browser clock, keyboard category selection, both project selectors, tall-project bottom switching, deep links/history, reduced motion and no-JavaScript fallback. The existing typography matrix now audits each selected project rather than hidden panels; it also checks every tech category at enlarged text sizes.

The project-tab change exposed two regression branches during author checks. Restoring a hidden panel restarted finished CSS entrances (animation start time changed and opacity fell to 0.11); completion markers now remove finished animations. A wrapped selector on 375×420 at 200% text could focus its final tab below the screen (y672..760); selection and arrow-key movement now reveal that tab below the fixed header with a bottom margin. Both scenarios have failing-before/passing-after checks retained in local task evidence and current regressions.

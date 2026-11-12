# Text-overlap and WebMCP follow-up

Requested by the user on 13 November 2026, in the existing PR #34. The supplied hero screenshot reports a visible defect that the previous page-overflow and focus checks did not detect. Two subsequent user-supplied screenshots add external-agent WebMCP examples for LocalCut and LocalDesign.

## Cause and affected surfaces

The hero's `0.88` line height lets the serif font's descenders collide with the next line. The regression reproduced the defect at 320px: “Deployed”/“Engineer at” had a −5.67px ink gap and “Engineer at”/“Lyra” a −3.61px gap. Measuring only element boxes or document scroll width misses this failure.

A shared `leading-display` token of `1.15` now controls the hero and section headings; the hero's tracking is relaxed to match the other large headings. The same unsafe sub-1 line-height recipe was removed from the currently unmounted About, Now and Principles headings. Existing project and screenshot headings already use a more generous line height and retain it.

Enlarged-text inspection also reproduced a clipped hero word, a LocalDesign heading widening its grid beyond the viewport, and Contact values squeezed into a 7px column. Headings can now wrap long words, and narrow Contact links place their label above the value. Desktop Contact keeps its existing columns. The same audit with the mobile menu expanded reproduced a clipped Download résumé label at 200% text; narrow menus now use one column and keep two columns from the small-screen breakpoint upward. No copy, resume facts, colors, navigation destinations, or download behavior changed for this fix.

## Regression and audit scope

`tests/e2e/typography.e2e.spec.ts` measures DOM text-line positions and the rendered font's Canvas ascent/descent metrics. It requires positive separation between adjacent lines, checks text against viewport and container boundaries even where overflow is hidden, and checks page overflow. It waits for font readiness and a paint after viewport changes. The original candidate fails this regression.

Runtime coverage includes header, hero, Work headings/feature lists/captions, Contact and footer on `/`, `/en` and `/vi`, at 320, 375, 640, 768, 867, 960, 1023, 1024, 1210, 1440 and 1920px. Additional root-route checks exercise Georgia and generic-serif fallbacks at 375/1210/1440px, plus 200% root text size at 320/375/768/1210px, including the expanded mobile menu. The unmounted sections have source-only coverage; this follow-up does not restore them to the page.

## Supplied WebMCP captures

- `localcut-webmcp.webp`: an external-agent conversation beside LocalCut's video, clip list and context dialog.
- `localdesign-webmcp.webp`: an external-agent conversation beside LocalDesign's editable CYOBot concept board, layer tree and inspector.

Both complete 1920 × 1080 frames are preserved, including the agent and application panes. The original PNGs are unchanged. Lossless WebP conversion preserves every decoded RGBA pixel, verified by byte comparison. The user identified these as WebMCP-controlled examples; captions describe product features, not personal implementation contributions or an assistant built into the apps. Full-resolution screenshot links remain available. The Work section now contains 16 screenshots and 11 inter-feature dividers.

## Short-height navigation

The follow-up independent audit found another supported case at 375 × 420 and 200% text: the fixed, expanded navigation placed Contact below the viewport, and scrolling the document could not reveal it. The retained regression fails on that candidate (Contact bottom 507px versus viewport height 420px). The panel is now capped to the viewport space below the header and scrolls internally. Real keyboard Tab navigation reveals every link at 375 × 420 and 667 × 320; Enter activates Contact and closes the menu. The focused Contact state was rendered and inspected. The broader typography helper checks horizontal bounds and line separation; this separate interaction regression checks vertical reachability in fixed navigation.

## Delivery

The user explicitly requested this new audit after the earlier handoff and asked to keep the same PR. This is a bounded follow-up review/fix cycle for that new request, with its original finding and final verification recorded in PR comments. The earlier completed review history and focus fix remain preserved. Merge and production deployment remain outside the request.

Final local verification: all 22 frontend/typography checks pass against the production build. Lint, TypeScript, formatting and the production build pass. The two supplied assets are served and decoded at their original 1920 × 1080 dimensions. Updated hero, Work, WebMCP feature, Contact and footer screenshots were captured from that build. Hosted preview and current-head independent review are read back separately in PR #34.

## Subsequent project-content request

The later 13 November user instruction supersedes the initial complete-frame presentation: both supplied agent images are now exact 1844 × 934 crops excluding OS/browser chrome. The new asset-index and pages/layers/frames views are further exact source-region crops. Kalibr is first; Work now has six projects and nineteen feature images, with thirteen inter-feature dividers. Native-resolution scroll zoom, the wider two-pane layouts, contribution changes, synthetic Kalibr demo and source-backed pipeline diagram are documented in [product showcases](../product-showcases.md). The same typography, enlarged-text and short-height navigation audit remains active on the expanded content.

The latest controlling user instruction removes all custom zoom behavior, turns Pangea's former post-zoom views into static source-pixel crops, and replaces Kalibr's architecture overview with its actual analytics/admin panel. Work now has eighteen images and twelve inter-feature rules. A shared once-only entrance introduces all Work text blocks and labelled images together, using the existing Vulcan CMS treatment. See current [showcase contracts](../product-showcases.md).

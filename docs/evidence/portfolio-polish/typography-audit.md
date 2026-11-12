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

## Delivery

This separately user-reported defect and new image request extend the same PR. They do not remediate a finding from the previous completed second review; the final review is refreshed for the new work and revision, retaining the earlier focus finding and its verified fix as history. No third automatic remediation pass is inferred, and merge/production deployment remain outside this request.

Final local verification: all 21 frontend/typography checks pass against the production build. Lint, TypeScript, formatting and the production build pass. The two supplied assets are served and decoded at their original 1920 × 1080 dimensions. Updated hero, Work, WebMCP feature, Contact and footer screenshots were captured from that build. Hosted preview and current-head independent review are read back separately in PR #34.

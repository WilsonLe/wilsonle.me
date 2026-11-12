# Portfolio polish

Candidate evidence captured from the local production build on 13 November 2026.

- Work retains five project boundaries and now has horizontal rules between all eleven adjacent screenshot pairs. Numbered project/category and screenshot pre-titles are removed.
- LocalCut and LocalDesign use product feature lists and descriptions; client projects retain their contribution lists.
- Contact begins with its heading. The footer has a compact identity/navigation row and a quieter copyright/location row.
- The live [AMSOFT](https://amsoft.vn/) stylesheet supplied the near-black `#080b0c`, cyan `#78e3f2`, dark cyan `#156675`, and supporting tokens. The existing off-white `#f4eddd` is retained.
- Header, hero, mobile menu, and footer download `/wilson-le-resume.pdf` on `/`, `/en`, and `/vi`. The former resume routes return 404 and are absent from the sitemap. The shared PDF is English, matching the current Vietnamese fallback content.
- The one-page tagged PDF was rendered and visually inspected. Text extraction confirms all four existing experience entries and both existing education entries. Social links are preserved. `pnpm generate:resume` regenerates it from the existing typed facts with the already-installed Playwright renderer; it is served as a static file.

The follow-up [typography audit and WebMCP integration](typography-audit.md) documents the user-reported overlap, the failing regression, secondary enlargement defects and the new screenshot provenance.

## Captures

Project-only captures, including mobile Work, omit the fixed site header to keep screenshot content unobstructed; screenshots of the site itself retain it.

- [Corrected hero, desktop](hero-desktop.webp)
- [Corrected hero, mobile](hero-mobile.webp)
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
- All 21 frontend Playwright checks pass and exercise all home locales, desktop/tablet/mobile overflow and anchor targets, keyboard navigation, reduced motion, palette contrast, direct PDF downloads, removed routes, sitemap, and metadata against the production build.
- Download cases use separate visitor sessions per locale. A diagnostic reproduced Chromium throttling the eleventh rapid download in one session; that same footer link succeeds in a fresh session. All four download entry points remain covered for each locale.
- The independent first-pass review found an invisible primary-CTA focus outline. Cyan outlines now contrast with dark surfaces, with dark outlines on paper/cyan. The added regression test failed on the reviewed candidate at contrast ratio 1, then passed after correction; it waits for the existing color transition to settle. The focused production rendering was also visually inspected.
- Typography checks cover actual line-ink separation, clipping, 11 viewport widths on all three home routes, two serif fallbacks, 200% root text size and expanded mobile navigation. All 21 checks pass against the rebuilt production app.
- Production render inspection confirms five project boundaries, all eleven inter-feature rules, the unchanged off-white token, and the cyan accent. Screenshots establish appearance; download/route tests establish behavior.

No database, CMS, deployment, or production state changes are part of this delivery.

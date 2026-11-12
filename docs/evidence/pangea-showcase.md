# Pangea Chat work showcase

The requested scroll-based work page replaces the earlier video direction. Scope is
the Pangea homepage link, `/work/pangea-chat`, its `/en` and `/vi` variants, and the
reusable work view. Vietnamese uses the site's explicitly marked English fallback.

## Content and image sources

- Personal attribution: existing `src/content/en/home.ts` (frontend, AI services,
  delivery systems) and `src/content/en/resume.ts` (Software Engineer, 2023–2026).
  The résumé and biography are unchanged.
- Product imagery: actual Pangea Chat app captures from https://app.pangea.chat/
  prepared for this user's showcase on 2026-11-12. The conversation screens are
  a sample Spanish roleplay with Pangea Bot, not a private conversation with another
  user. The map shows the app's discover-activity view.
- `public/images/work/pangea/`: `discover.webp`, `conversation.webp`,
  `practice.webp`, and `translated-draft.webp`. Encoded from the original 626 × 763
  captures as WebP at quality 86. No generated UI, tracking, or remote image fetches.
- Product chapters describe visible capabilities. They do not attribute ownership
  of each pictured feature to Wilson. Impact remains qualitative; no business,
  performance, or learning metrics are asserted.

## Interaction contract

Desktop uses IntersectionObserver to select a sticky image as chapters enter the
middle of the viewport. Images crossfade and move slightly; scrolling stays native.
All chapter text remains readable. Mobile, reduced motion, missing observer support,
and JavaScript disabled retain every image beside its chapter in document order.
Original image descriptions remain accessible when the decorative sticky stack is
enabled. The observer and media listener clean up on unmount and preference changes.
The active region uses viewport-height pixels and updates on resize: percentage
root margins resolve against width ([Intersection Observer specification](https://www.w3.org/TR/intersection-observer/#dom-intersectionobserver-rootmargin)).

## Validation

Run lint, TypeScript, formatting, production build, and focused browser checks for
routes, images, locale links, metadata, desktop/mobile layouts, scrolling in both
directions, keyboard access, reduced motion and JavaScript disabled. Review the
committed base-to-head diff independently before handing off the draft PR.

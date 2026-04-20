---
applyTo: '**/*.css,**/*.scss,postcss.config.mjs,src/app/(frontend)/globals.css,src/app/(frontend)/styles.css,src/app/(payload)/custom.scss'
description: 'Styling rules: Tailwind CSS v4 utility-first, no CSS modules or CSS-in-JS, where global styles live, and how Payload admin styling is scoped.'
---

# Styling instructions

Applies to CSS/SCSS files and PostCSS config. The project uses **Tailwind CSS v4**
via `@tailwindcss/postcss`.

## Rules

- **Utility-first Tailwind.** Apply styling via class names in JSX. Do not
  introduce CSS modules, styled-components, emotion, vanilla-extract, or
  per-component `.css` files.
- **Global frontend styles** live in `src/app/(frontend)/globals.css` (Tailwind
  layers, CSS variables, base resets) and `src/app/(frontend)/styles.css`
  (project-specific global classes). Add new tokens as CSS variables in
  `globals.css` and consume them via `var(--token)` or Tailwind arbitrary
  values.
- **Payload admin styles** live in `src/app/(payload)/custom.scss` and are
  scoped to the admin UI. Do not leak them into the frontend.
- Prefer **design tokens as CSS variables** (colors, spacing scale extensions,
  fonts) in `globals.css` over editing Tailwind config for one-offs.
- Use `@layer base | components | utilities` when adding custom CSS so
  specificity and purge behavior stay predictable.

## Responsive & theming

- Mobile-first: write base utilities for small screens, then add `sm: md: lg:`
  overrides.
- Dark mode (if added) uses the `class` strategy with a `dark` class on
  `<html>`. Don't use `prefers-color-scheme` media queries directly in
  components.

## Accessibility

- Maintain WCAG AA contrast on all text/background combinations.
- Don't remove focus styles. If overriding, provide a visible `focus-visible:`
  state.
- Respect `motion-reduce:` variants for animations.

## Do not

- Do not add `!important` to break specificity fights — restructure instead.
- Do not inline `style={{...}}` for static values that belong in classes.
- Do not install alternative styling libraries.

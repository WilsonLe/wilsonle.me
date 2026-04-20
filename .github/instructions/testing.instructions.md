---
applyTo: 'tests/**,**/*.spec.ts,**/*.spec.tsx,vitest.config.mts,vitest.setup.ts,playwright.config.ts'
description: 'Testing rules: Vitest for integration, Playwright for e2e, test.env for isolated test DB, and which checks are required before a change is considered done.'
---

# Testing instructions

Applies to `tests/**`, `vitest.config.mts`, `vitest.setup.ts`, and
`playwright.config.ts`.

## Test types

- **Integration (`tests/int/**`, Vitest)** — exercise Payload's local API,
route handlers, and `lib/`utilities. Run with`pnpm test:int`.
- **End-to-end (`tests/e2e/**`, Playwright)** — exercise the running site over
HTTP. Run with `pnpm test:e2e`.
- **Unit tests** live alongside the module as `*.spec.ts(x)` when a piece of
  logic is pure and worth isolating. Keep them minimal — prefer integration
  tests for anything that touches Payload or Next.

## Environment

- Tests load `test.env` (not `.env`). Never point tests at the dev or
  production SQLite file.
- Integration tests must initialize Payload with the test config and tear
  down between runs. Do not share state across files.

## Required checks (before declaring done)

| When you change…                                   | Run                                                                   |
| -------------------------------------------------- | --------------------------------------------------------------------- |
| Any TS/TSX                                         | `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm exec prettier --check .` |
| `src/lib/**`, `src/collections/**`, route handlers | `pnpm test:int`                                                       |
| Routes, layout, or sections                        | `pnpm test:e2e` (or at least `pnpm build`)                            |
| Anything non-trivial                               | `pnpm build`                                                          |

Do not skip checks by adding `--skip`, `.only`, `.skip`, or `it.todo` in
committed code.

## Writing tests

- Use descriptive `describe`/`it` names phrased as behaviors.
- Assert on observable behavior, not implementation details.
- Prefer Payload's local API over HTTP in integration tests — faster and
  type-safe.
- For Playwright, use role-based selectors (`getByRole`, `getByLabel`) and
  avoid brittle CSS selectors.
- Do not commit tests that depend on network access or real external
  services.

## Do not

- Do not disable ESLint or type errors to make tests pass.
- Do not commit snapshot files larger than the code they cover — prefer
  explicit assertions.
- Do not add a third test runner (Jest, Mocha). Vitest + Playwright only.

# ILYVANTA Digital — Next.js migration

Phase 1 foundation. Production remains on the existing Site. See docs/LEGACY_AUDIT.md for confirmed findings and limitations.

## Local commands (Node 22+)

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run test:production
npx playwright install --with-deps chromium firefox webkit
npm run test:e2e
# Manual production review:
npm run start -- --port 4173
```

## Structure

- app/: App Router, metadata, errors and design-system CSS.
- content/: reviewed legacy content snapshot, preserved during migration.
- components/legacy-document.tsx: trusted-content SSR compatibility boundary.
- public/: existing artwork and enhancement scripts.
- scripts/: repeatable import and verification.
- e2e/: browser, responsive, keyboard, no-JS and axe tests; playwright.config.ts runs three engines.
- docs/: audit, inventory, routes, architecture, deployment and phase results.

## Environment

Use .env.example as a names-only template. SITE_URL controls canonicals; SITE_INDEXABLE defaults false to avoid indexing unfinished previews. No provider keys are configured. New database, email and AI work must fail safely until those dependencies are explicitly provisioned.

## Workflow

Remote branch: `feature/next-foundation` in `ILYVANTA-Digital/ilyvanta-digital.github.io`. Review: https://github.com/ILYVANTA-Digital/ilyvanta-digital.github.io/pull/1 (draft). The application lives in `next-site/`. The separate legacy Site checkout retains the original source; this GitHub repository contains the migration snapshot, not that checkout's full history. Do not merge or change the production domain until a preview is reviewed and all required gates pass.

## Verification status

Install, lint, types, four content tests, production build and 42 HTTP assertions passed locally and in GitHub Actions. The initial remote browser run passed 43/60 tests, with 17 contrast failures. Readability fixes are awaiting recheck; see docs/TESTING.md. Phase 2 remains gated. Vercel preview access is separately blocked by workspace authorization.

## Importing the legacy content

`python3 scripts/import-legacy.py` requires the full repository with the old `public/` directory alongside `next-site/`. It is not needed to build an extracted app-only checkpoint, which already contains the content snapshot and assets.

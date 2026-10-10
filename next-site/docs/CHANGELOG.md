# Change log

## GitHub checkpoint — 10 October 2026

- Resolved organization connector access and uploaded 48 foundation files on `feature/next-foundation`.
- Opened draft PR #1 without modifying the production branch or live website.
- Started GitHub Actions verification. A started workflow is not a passing result; Phase 1 acceptance remains pending.
- Kept the existing root README and initial GitHub commit history intact.
- Ran all three browser engines on GitHub: 43/60 passed, 17 contrast failures. Kept reveal text opaque, darkened muted labels, and added retained browser reports with responsive screenshots for recheck.
- Recheck passed all 60 browser tests and 42 HTTP assertions, with lint/types/build/content checks passing. Reviewed responsive homepage screenshots. Hosted preview remains blocked by Vercel workspace permissions.

## 0.1.0 — Phase 1 foundation checkpoint, 9 October 2026

- Inventoried legacy source and preserved seven content routes, original artwork, project details and four hosted sample demos.
- Added a separate Next.js App Router and strict TypeScript application on a feature branch.
- Added native metadata, sitemap, robots, manifest, favicon, error and not-found screens.
- Introduced design tokens, focus treatment, motion preferences and server-rendered business advice.
- Made navigation available when its enhancement script fails and replaced the unconfigured form with an honest direct-contact panel.
- Added lint, typecheck, content tests, built-server HTTP checks and a three-engine Playwright/axe suite.
- Added CI definition and migration/deployment documentation.
- Browser execution remains blocked in the current environment; see TESTING.md. No production cutover or remote GitHub write occurred.

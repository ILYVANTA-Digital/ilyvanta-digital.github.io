# Legacy audit — Phase 1, 8 October 2026

Baseline: `0d4ed65eee2872d21269d59d6576a0569557c407`.
Scope: tracked source, generated public pages, migration files, route/asset references and handoff exports. `legacy-inventory.json` inventories all 80 tracked files by size and SHA-256. Generated duplicate exports are catalogued, not treated as independently maintained applications. Third-party node_modules and binaries are not line-by-line source reviews.

## CONFIRMED

### Preserve

- 7 indexable content routes, 4 sample-workspace routes and custom 404.
- Four honest self-directed project narratives, descriptive images, LinkedIn/GitHub/contact links.
- Brand palette, typography direction, original concept artwork, business-type guidance.
- Skip link, labels, motion pause, reduced-motion CSS, escape-to-close navigation.
- Unique descriptions/canonicals, sitemap/robots, truthful entity and work schemas.
- Existing working Worker/D1 demo behavior and 69 passing business/API/DOM checks.

### Technical debt

- Three Python generation stages make replacements against HTML strings. Changes to one marker can silently skip a later modification.
- CSS is layered across style.css (24,548 characters), upgrade.css (5,407), international.css (14,437), with repeated selectors and corrective overrides. Demo CSS adds 10,071 characters. Cascade duplication is confirmed; removal of individual rules needs visual coverage.
- Generated HTML and a second GitHub export duplicate deployable content in source control.
- JavaScript is imperative IIFE code with document-level selectors. It assumes full document navigation. It cannot simply be reused with React client routing.
- Every static asset is embedded in the Worker module, including base64 image bytes. This couples static delivery and API deploys.
- There are no lint/typecheck/start scripts in the legacy package.
- The business advice container is empty until JavaScript runs. Mobile navigation depends on JS toggling. These are progressive-enhancement gaps.
- No Next.js, React application architecture, native framework image optimization, leads table, qualification model, AI API, analytics or content hub exists in the legacy project.
- Email provider values are not configured. The existing UI reports unavailability; mocked provider tests are not delivery proof.

### Security and privacy

- Same-origin JSON writes, validation, parameterized SQL, secure guest cookie, isolated demo workspaces and fixed email recipient exist.
- Request-length checks happen after reading the full request into memory.
- Contact limit is keyed by session and may be evaded by resetting cookies. No independent verified IP/global abuse budget exists.
- Guest workspaces have no retention cleanup. Cookie expiry does not delete server records.
- Do not trust `oai-authenticated-user-id` in a different hosting environment; that trust boundary belongs to the existing host only.
- No leads database or visitor consent flow exists. Do not migrate sample records into a CRM.

### Migration and SEO risks

- GitHub Pages is static-only; it cannot run Next.js server APIs, D1 or PostgreSQL.
- Next.js/Vercel must not inherit platform-specific identity-header trust.
- Copying Worker CSP verbatim would block required Next.js inline bootstrap scripts. A reviewed nonce/hash strategy is later security work.
- Canonicals must not change before an approved domain cutover. Preview builds must remain noindex.
- Demos should keep their existing backend until parity is established. Temporary redirects preserve entry paths without pretending the backend was migrated.
- GitHub write attempt earlier returned 403. Remote branch/PR creation is blocked pending integration access or explicitly approved browser fallback.

## LIKELY — not proven by source inspection

- CSS consolidation and splitting homepage enhancements from other routes could reduce parsing/work.
- Third-party font requests could affect first rendering on slow networks.
- Some small secondary text and muted colors could fail comfortable-reading/contrast targets. Instrumented contrast and browser checks are needed.
- Long content and transformed cards might cause clipping at widths not yet measured.

## REQUIRES TESTING

- Actual WCAG 2.2 AA conformance, screen readers, 200% zoom, Safari and Firefox.
- All nine requested viewport widths on the migrated build.
- Real physical mobile heat, frame rate and touch behavior.
- Production Core Web Vitals and Lighthouse baseline; no scores have been fabricated.
- Real mail delivery, real PostgreSQL writes, hosted rate limits and AI behavior.
- Live Search Console indexing, GA4 conversion events, bot crawling and AI citations.

## Baseline evidence

`npm test`: 69 checks passed. `python3 scripts/check-pages.py`: 12 documents and 272 metadata/link/asset checks passed. These cover local Node SQLite and simulated DOM, not live inbox or cross-browser behavior. Existing phone-width browser evidence is retained in the legacy handoff, not claimed as testing the Next.js migration.

## Decision

Build Next.js App Router + strict TypeScript as an isolated `next-site/` app on `feature/next-foundation`. Retain trusted content behind a clearly named server-rendered migration adapter; preserve scripts with full document navigation until native components replace them. This is a controlled compatibility foundation, not a claim that the entire premium rebuild has been completed. Preserve the live Site and its data. New services and inquiry work starts only after Phase 1 gates pass.

# Phase 2 — native agency experience and lead system

PHASE: 2 — Core UX, services, case studies and lead system.

TASK: Replace the temporary legacy HTML adapter with a native, responsive agency experience and a safe, qualified inquiry system.

FILES REVIEWED: Master execution prompt (all phase requirements), Phase 1 audit and CI results, legacy project descriptions and limitations, route metadata, layout, tests, provider documentation.

FILES CREATED: See the Phase 2 section in FILES_CHANGED.md for the complete per-file inventory.

FILES MODIFIED: Route renderer, root layout, content registry, package/lock configuration, environment example, TS/Biome configuration, production and browser checks, workflow and documentation.

IMPLEMENTATION:
- 26 server-rendered content routes: homepage, services index + 6 service pages, solutions index + 5 solution pages, work index + 4 detailed project studies, studio, process, contact, insights index + a useful planning article, privacy and preserved search-visibility explanation.
- Fresh graphite/mint and off-white editorial layout, responsive grids, compact mobile navigation, accessible states and meaningful links.
- Existing original artwork now uses next/image. Only homepage hero is prioritized; remaining images are lazy by default. The old runtime HTML adapter, CSS and enhancement IIFEs were removed; source snapshot remains for audit.
- Each project clearly separates original technology, hosted sample behavior, tests, known limitations and next iteration. Counts derive from four actual projects; no fabricated client or market success.
- Qualified form, Zod validation, bounded body reader, safe errors, same-origin checks, honeypot, PostgreSQL rate limits, idempotent lead persistence and transactional outbox with server-side Resend calls.
- Metadata per route, distinct project social images, sitemap and truthful JSON-LD preserved/expanded as part of the new page structure. This is not a claim of full Phase 5 acceptance or rankings.

WHY THIS APPROACH: Content remains readable without client JavaScript. Small interactive components support navigation and form feedback. Durable database state prevents per-instance rate-limit bypass and lost notification tasks. Existing demos and URLs remain useful while the website is upgraded.

TESTS RUN: Local lint (warnings are failures), TypeScript, 9 content/contact tests and production build. Production HTTP and expanded three-engine browser/database CI results will be recorded below after completion.

RESULTS: Development implementation exists; full Phase 2 acceptance is not yet claimed. Phase 1's actual acceptance criteria passed on the previously tested foundation; hosted preview access is a separate deployment blocker, not a reason to stop implementing Phase 2.

RISKS: No real email delivery has been verified. No production database or provider configuration is enabled. Hosted demo links remain on a separate deployment. Physical devices, Lighthouse comparison and real-world vitals remain unmeasured. The ordinary CSS interaction states are not the full Phase 3 WebGL experience.

REMAINING: Browser/CI review; provider-backed form acceptance; Vercel preview authorization; actual-device review. Phase 3 3D, Phase 4 AI assistant, full Phase 5 discovery/analytics and Phase 6 launch remain open, in the requested order.

NEXT TASK: Resolve any new production/browser failures, review screenshots, then enable and verify the real contact providers when authorized access is available. Keep provider-dependent acceptance explicitly open while continuing independent phases in the requested order. Do not claim a completed launch.

## Verification update — 12 October 2026

Local production build and 591 production assertions pass. First remote run also passed all three real PostgreSQL integration tests, but 24/126 browser checks failed for the documented issues. Those issues are fixed in `b23cb85ad5bf9e034fdbe456bbad3a50933a548d`; rerun pending. Actual Resend delivery, a configured production/preview database, hosted Next.js preview and physical-device verification remain blocked/unavailable. Vercel scope access was rechecked and still returns 403.

Second browser run: 135/138 passed. All twelve real demo navigation/workspace-load checks passed. The three remaining failures were Playwright text extraction from noscript; the test now checks that the no-JavaScript email link itself is visible and usable.

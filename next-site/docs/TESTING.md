# Verification history — latest results 12 October 2026

## Current status

Combined CI at `af6e4bf` passes 168/168 browser tests, lint/types, 15 unit tests, 3 PostgreSQL tests, build and 950 HTTP checks. Lighthouse measured mobile 94→93, desktop 100→100; see [MEASURED_QA.md](MEASURED_QA.md). Hosted Netlify preview remains blocked by a sign-in state error. Sections below are dated historical records, not current completion claims.

## Historical foundation status

The existing production Site has not been replaced. Phase 2 has not started.

## GitHub browser evidence

Draft PR: https://github.com/ILYVANTA-Digital/ilyvanta-digital.github.io/pull/1

Initial run: https://github.com/ILYVANTA-Digital/ilyvanta-digital.github.io/actions/runs/38046401161 at `7257388d25ed587056c398a544a627315a6745a5`.

- Dependency install, lint, types, four content tests, build and 42 production HTTP assertions passed on GitHub.
- All three browser engines installed and executed. 43 of 60 browser tests passed; 17 failed automated colour-contrast checks.
- Nine-width overflow checks, keyboard menu, 404 recovery, reduced-motion and no-JavaScript checks passed in all three engines.
- Low contrast affected muted labels and text during opacity-based scroll reveals. The fix keeps text fully opaque during transform animation and darkens the affected labels.
- Recheck at `fbf277dfdd8042e12f1d3facd328e0f9238da87a`: **60/60 browser tests passed**. Install, lint, types, content tests, production build and 42 HTTP checks also passed. Run: https://github.com/ILYVANTA-Digital/ilyvanta-digital.github.io/actions/runs/38046669559
- CI retained nine full-page homepage screenshots across three widths and three engines. The 390px homepage was reviewed across all sections, with 768px and 1440px hero/contact/footer inspection. No clipping was seen in these inspected views. This is not a visual review of every work page.
- Browser report artifact: https://github.com/ILYVANTA-Digital/ilyvanta-digital.github.io/actions/runs/38046669559/artifacts/11668100651 (seven-day retention). Automated tests and emulated viewports do not constitute physical-mobile testing.

The local-environment results below are historical; remote browser execution has now resolved the browser-launch blocker.

| Check | Result | Scope |
| --- | --- | --- |
| `npm ci` | PASS | Clean dependency install; npm emits an environment-level http-proxy warning |
| `npm run lint` | PASS | Biome: 19 source/config/test files, zero warnings; trusted HTML and motion override exceptions are narrowly scoped |
| `npm run typecheck` | PASS | Strict TypeScript, including the Playwright suite |
| `npm test` | PASS | 4 content-contract tests |
| `npm run build` | PASS | Next.js production build, all seven preserved content pages and metadata endpoints |
| `npm run test:production` | PASS | 42 HTTP assertions against the built app: pages, redirects, metadata endpoints, 404 and preview crawl policy |
| Browser preview | BLOCKED | Preview browser cannot connect to the local production server (`ERR_CONNECTION_REFUSED`) |
| Chromium install | BLOCKED | Downloaded browser archive was invalid; installer retries also failed |
| Firefox E2E | BLOCKED / 20 test failures | Browser crashes at `browserContext.newPage`, before visiting the app; no application assertions passed |
| WebKit | BLOCKED | Missing system libraries; dependency installer denied setgroups/setegid/seteuid operations |
| Physical mobile | NOT VERIFIED | No physical device available |
| Lighthouse / field vitals | NOT MEASURED | No scores or before/after improvement claimed |

Firefox and WebKit browser downloads eventually succeeded using the installer's normal alternate URLs. Browser execution did not become usable. No sandbox controls were disabled.

## What the browser suite will verify

20 tests per engine, 60 across Chromium, Firefox and WebKit:

- All seven pages: successful navigation, primary heading, canonical, runtime/console errors and automated axe checks.
- Nine widths (320, 360, 390, 430, 768, 1024, 1280, 1440, 1920), each visiting all seven pages for horizontal overflow.
- Mobile menu keyboard opening, Escape closing and focus return.
- Work-page navigation and custom 404 recovery.
- Reduced-motion initial state.
- JavaScript-disabled navigation, useful homepage content and direct email contact.

These are implemented tests, not passing browser evidence. Automated axe coverage alone is not a WCAG certification. WebKit coverage is not a real iPhone/Safari device test.

## Reproduce in a browser-capable runner

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run test:production
npx playwright install --with-deps chromium firefox webkit
npm run test:e2e
```

Both production checks and Playwright own their local server lifecycle. Do not start an additional server on port 4173. CI executes the same build and checks; it must fail rather than silently skip browser errors.

## Remaining Phase 1 acceptance

Automated responsive layout, navigation, contrast and runtime assertions now have passing browser evidence, together with the scoped screenshot review above. A hosted preview and manual review across all routes remain pending. The Vercel connector returns a workspace authorization error. Physical-device verification and Lighthouse measurements have not been performed. Complete preview review before marking the entire phase accepted or merging.

The foundation still uses a documented HTML compatibility adapter, raw legacy image markup and legacy enhancement scripts. Native React sections and Next image migration remain pending. A finished redesign, functional lead database, email delivery, AI assistant, new 3D engine, analytics, Search Console ranking gains and Vercel deployment are not claimed. The draft remote PR exists; preview deployment is separately blocked by Vercel workspace authorization.

## Phase 2 first run — 11 October 2026

Commit: `13d9f768b481ab17e84dac603e3a61c46bd08352`.
Run: https://github.com/ILYVANTA-Digital/ilyvanta-digital.github.io/actions/runs/38170849298

Passed: lint, strict types, 9 content/contact tests, 3 real PostgreSQL integration tests, production build and 591 production HTTP/link/schema/API checks. PostgreSQL tests verify concurrent duplicate handling, atomic rate limits and durable outbox failure/retry using an intercepted email transport.

Browser result: 102/126 passed. The 24 failures across three engines came from three implementation issues (RSC prefetch across external demo redirects, reduced-motion CSS specificity and localhost origin handling when bound to 0.0.0.0), plus one ambiguous no-JavaScript test locator. No automated accessibility violations or tested horizontal overflow were reported in that run.

Fix commit: `b23cb85ad5bf9e034fdbe456bbad3a50933a548d`. Demo links now use normal document navigation; reduced-motion rules match the affected components; local origin checks cover the bind address while rejecting external origins; the no-JS assertion targets the form's own fallback. Screenshot capture scrolls lazy images into view and verifies they loaded. Twelve new browser checks follow all four real demo links and wait for the sample workspace to load.

Visual review: first-run screenshots reviewed for the homepage, hotel study and contact page at 390px and 1440px (including 2x screenshots). Hero, form, headings and footer fit their layouts. Some initial full-page screenshots contained unloaded below-fold images because the screenshot had not scrolled to trigger lazy loading; capture now explicitly validates those images. This is browser emulation, not a physical-device test.

Second run: https://github.com/ILYVANTA-Digital/ilyvanta-digital.github.io/actions/runs/38278936085 — 135/138 passed, including every live demo link and loaded sample dashboard. Remaining no-JS checks used a text matcher that excludes noscript content; changed to assert the actual fallback email link is visible.

## Phase 2 verified rerun — 12 October 2026

Commit: `6eb78942636101a953415ae7d7b4eb4da08e4648`.
Run: https://github.com/ILYVANTA-Digital/ilyvanta-digital.github.io/actions/runs/38279767488
Job: `114913916509`, conclusion `success`.

Verified from job results and logs: lint, strict types, 9 content/contact tests, 3 PostgreSQL integration tests, production build, 591 production checks and **138/138 browser tests** across Chromium, Firefox and WebKit passed. This includes no-JavaScript direct-email fallback and navigation to all four hosted sample workspaces. Email transport in database tests is mocked; real inbox delivery is not verified.

This result covers the Phase 2 commit only. Local Phase 3 commit `c9330d5` has not been uploaded or browser-tested: the GitHub tree write was not executed because automatic approval review hit a usage limit. Vercel deployment remains blocked by the previously observed workspace 403. Physical-device testing and Lighthouse scores remain unverified.

PHASE: 2 verification / 3 handoff. TASK: Verify the completed CI rerun. FILES REVIEWED: CI job steps and logs, this testing record. FILES CREATED: None. FILES MODIFIED: docs/TESTING.md. IMPLEMENTATION: Recorded exact passing commit and test scope. WHY THIS APPROACH: Keep measured evidence separate from later untested changes. TESTS RUN: No redundant rerun; inspected the completed CI evidence. RESULTS: PASS within the stated Phase 2 scope. RISKS: Passing local/CI checks do not prove hosted email delivery or physical-device behavior. REMAINING: Phase 3 browser/performance verification and provider connections. NEXT TASK: Resolve the required OpenAI credential decision before AI implementation.

## Phase 5/6 local verification — 12 October 2026

Phase 5: lint/types, 12 tests, production build and 718 HTTP/content checks passed. Phase 6 final local verification: lint/types, **15 tests**, production build and **950 HTTP/link/schema/header/contact checks** passed. `npm audit --omit=dev` reported zero known runtime dependency vulnerabilities. Recursive client-bundle checks found none of the configured server-secret environment identifiers. No new secret was created or exposed by those checks.

New browser cases cover no-JS FAQ access, no analytics requests in preview, and CSP-compatible navigation. They are implemented and typechecked, **not run**: the browser-capable CI has not received these local commits. The last 138/138 passing browser evidence remains scoped to remote Phase 2 SHA `6eb78942636101a953415ae7d7b4eb4da08e4648`. Never reuse that result for the new 3D, SEO, consent UI or security changes.

Netlify project creation/readback succeeded. No Netlify build, deployed function, real inbox delivery, GA DebugView event, physical phone test, Lighthouse comparison or production launch occurred. The contact success browser test uses an explicitly mocked response; database transport tests also mock actual email sending.

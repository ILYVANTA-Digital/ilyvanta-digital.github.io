# Phase 1 verification — updated 10 October 2026

## Status: PARTIALLY IMPLEMENTED / BROWSER FIXES AWAITING RECHECK

The existing production Site has not been replaced. Phase 2 has not started.

## GitHub browser evidence

Draft PR: https://github.com/ILYVANTA-Digital/ilyvanta-digital.github.io/pull/1

Initial run: https://github.com/ILYVANTA-Digital/ilyvanta-digital.github.io/actions/runs/38046401161 at `7257388d25ed587056c398a544a627315a6745a5`.

- Dependency install, lint, types, four content tests, build and 42 production HTTP assertions passed on GitHub.
- All three browser engines installed and executed. 43 of 60 browser tests passed; 17 failed automated colour-contrast checks.
- Nine-width overflow checks, keyboard menu, 404 recovery, reduced-motion and no-JavaScript checks passed in all three engines.
- Low contrast affected muted labels and text during opacity-based scroll reveals. The fix keeps text fully opaque during transform animation and darkens the affected labels. It is awaiting a fresh browser run.
- Browser screenshots and reports will be retained by CI for visual review. Automated tests and emulated viewports do not constitute physical-mobile testing.

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

Responsive layout, navigation, contrast, runtime and hydration behavior need successful browser evidence. Inspect screenshots at desktop, tablet and phone widths, and perform a keyboard review. Fix genuine failures before advancing to Phase 2.

The foundation still uses a documented HTML compatibility adapter, raw legacy image markup and legacy enhancement scripts. Native React sections and Next image migration remain pending. A finished redesign, functional lead database, email delivery, AI assistant, new 3D engine, analytics, Search Console ranking gains and Vercel deployment are not claimed. The draft remote PR exists; preview deployment is separately blocked by Vercel workspace authorization.

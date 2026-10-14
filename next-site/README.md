# ILYVANTA Digital — Next.js agency website

Native Next.js agency experience on `feature/experience-completion`, stacked on the reviewed foundation branch. The public Site remains separate until a hosted preview and launch gates are reviewed.

## Run (Node 24)

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
```

For manual production review: `npm run start -- --port 4173`.

## Structure

- `app/`: App Router, metadata routes, contact API, custom error screens and responsive styles.
- `content/`: 29 route records, six service scopes, five industry approaches and four detailed project studies. `legacy-pages.json` remains an audit snapshot, not rendered HTML.
- `components/`: server-rendered page content; interactive navigation, inquiry, optional 3D and analytics-consent controls use client state.
- `lib/contact/`: Zod validation, bounded request parsing, PostgreSQL persistence, durable rate limiting and a transactional email outbox.
- `db/001_leads.sql`: repeatable migration. No database is created automatically.
- `scripts/` and `e2e/`: content, API, database, production-route and three-engine browser checks.
- `docs/PHASE_2.md`: exact implementation, verification and remaining acceptance gates.
- `docs/CONTACT_OPERATIONS.md`: safe provider setup, retry and retention instructions.

## Configuration

Copy the names from `.env.example` into the deployment environment. Never commit credentials. Preview defaults to `SITE_INDEXABLE=false`; set the canonical `SITE_URL` and enable indexing only for a reviewed production deployment. The contact form is fail-closed until database, email, a rate-limit secret and `CONTACT_ENABLED=true` are present. Build and runtime environments must agree; rebuild after changing the enabled state.

## Workflow

This repository's application root is `next-site/`. Work stays on feature branches and draft PRs. GitHub checks run builds, an isolated PostgreSQL service and Playwright Chromium/Firefox/WebKit. Those engines do not replace physical-device testing. The hosted Vercel preview is still blocked by the connected workspace's authorization; that does not prevent development or CI.

No demo is a paid-client claim. The four existing interactive demos are hosted separately on the legacy Site. No real bookings, patient data or payments belong in those samples.

## Current completion boundary (14 October 2026)

Latest uploaded SEO/security work adds 29 content routes, buyer answers, author/schema structure, consent-gated analytics support and Netlify configuration. Local build/lint/types, 15 tests and 950 production checks pass. See docs/PHASE_5.md and docs/PHASE_6.md for the exact files, evidence and limitations. Combined CI at fa617db passes 168/168 browser tests; measured Lighthouse and visual findings are in docs/MEASURED_QA.md. AI, real contact delivery, monitoring and production deployment remain pending.

Netlify private review is working at https://ilyvanta-digital.netlify.app/ (team login required). Deploy 6acf599fb14b5c2ce17cff17 uses the official Next.js runtime and fixes the initial host 404. All 29 content routes and four existing demo destinations opened in the hosted browser. Public launch, real contact delivery and AI are still pending. See docs/DEPLOYMENT.md for exact evidence. No paid plan or DNS change.

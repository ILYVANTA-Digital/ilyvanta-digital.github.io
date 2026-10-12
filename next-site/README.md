# ILYVANTA Digital — Next.js agency website

Native Next.js agency experience on `feature/core-experience`, stacked on the reviewed foundation branch. The public Site remains separate until a hosted preview and launch gates are reviewed.

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
- `content/`: 26 route records, six service scopes, five industry approaches and four detailed project studies. `legacy-pages.json` remains an audit snapshot, not rendered HTML.
- `components/`: server-rendered page content; only navigation and inquiry form need client state.
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

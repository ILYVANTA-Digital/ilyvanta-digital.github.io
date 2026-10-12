# Files changed — Phase 1

Phase 1 automated checks pass; hosted preview and full manual review remain pending. Phases 2–6 have no changes. This is a migration checkpoint, not a completed redesign.

| File | Reason |
| --- | --- |
| `.github/workflows/next-foundation.yml` | Review-branch validation and browser gates. |
| `next-site/.env.example` | Server-only variable names without secrets. |
| `next-site/.gitignore` | Exclude secrets, dependencies, build and browser-test outputs. |
| `next-site/README.md` | Application setup, reproducible dependencies, strict types, lint or local commands. |
| `next-site/app/[[...slug]]/page.tsx` | Native App Router page, metadata endpoint or themed error handling. |
| `next-site/app/error.tsx` | Native App Router page, metadata endpoint or themed error handling. |
| `next-site/app/foundation.css` | Focus, narrow layouts, reduced motion and navigation fallback. |
| `next-site/app/icon.svg` | Native App Router page, metadata endpoint or themed error handling. |
| `next-site/app/layout.tsx` | Native App Router page, metadata endpoint or themed error handling. |
| `next-site/app/legacy.css` | Preserved legacy cascade during staged migration. |
| `next-site/app/manifest.ts` | Native App Router page, metadata endpoint or themed error handling. |
| `next-site/app/not-found.tsx` | Native App Router page, metadata endpoint or themed error handling. |
| `next-site/app/robots.ts` | Native App Router page, metadata endpoint or themed error handling. |
| `next-site/app/sitemap.ts` | Native App Router page, metadata endpoint or themed error handling. |
| `next-site/app/tokens.css` | Reusable brand, typography, spacing and motion tokens. |
| `next-site/biome.json` | Application setup, reproducible dependencies, strict types, lint or local commands. |
| `next-site/components/home-link.tsx` | Full-navigation recovery for legacy script initialization. |
| `next-site/components/legacy-document.tsx` | Temporary trusted-content server-rendering boundary. |
| `next-site/content/legacy-pages.json` | Preserved seven reviewed content pages and their schema. |
| `next-site/docs/ARCHITECTURE.md` | Audit, migration evidence, architecture or reproducible handover documentation. |
| `next-site/docs/CHANGELOG.md` | Audit, migration evidence, architecture or reproducible handover documentation. |
| `next-site/docs/DEPLOYMENT.md` | Audit, migration evidence, architecture or reproducible handover documentation. |
| `next-site/docs/LEGACY_AUDIT.md` | Audit, migration evidence, architecture or reproducible handover documentation. |
| `next-site/docs/ROUTE_MAP.json` | Audit, migration evidence, architecture or reproducible handover documentation. |
| `next-site/docs/TESTING.md` | Audit, migration evidence, architecture or reproducible handover documentation. |
| `next-site/docs/legacy-inventory.json` | Audit, migration evidence, architecture or reproducible handover documentation. |
| `next-site/e2e/foundation.spec.ts` | Responsive, accessibility, navigation and fallback coverage. |
| `next-site/lib/pages.ts` | Typed content lookup or canonical/preview-indexing configuration. |
| `next-site/lib/site.ts` | Typed content lookup or canonical/preview-indexing configuration. |
| `next-site/next-env.d.ts` | Application setup, reproducible dependencies, strict types, lint or local commands. |
| `next-site/next.config.ts` | Demo preservation redirects, security headers, tracing root. |
| `next-site/package-lock.json` | Application setup, reproducible dependencies, strict types, lint or local commands. |
| `next-site/package.json` | Application setup, reproducible dependencies, strict types, lint or local commands. |
| `next-site/playwright.config.ts` | Three browser engines against the production build. |
| `next-site/public/assets/brand-sculpture.webp` | Preserved original project/brand WebP artwork. |
| `next-site/public/assets/cafe-concept.webp` | Preserved original project/brand WebP artwork. |
| `next-site/public/assets/clinic-concept.webp` | Preserved original project/brand WebP artwork. |
| `next-site/public/assets/hotel.webp` | Preserved original project/brand WebP artwork. |
| `next-site/public/assets/sports-concept.webp` | Preserved original project/brand WebP artwork. |
| `next-site/public/legacy/app.js` | Preserved enhancement behavior; app.js also gates mobile collapse on successful initialization. |
| `next-site/public/legacy/international.js` | Preserved enhancement behavior; app.js also gates mobile collapse on successful initialization. |
| `next-site/public/legacy/upgrade.js` | Preserved enhancement behavior; app.js also gates mobile collapse on successful initialization. |
| `next-site/scripts/check-built-site.mjs` | Own production server lifecycle during HTTP checks. |
| `next-site/scripts/check-production.mjs` | 42 built-app HTTP route/metadata/redirect assertions. |
| `next-site/scripts/foundation.test.mjs` | Content contract and trusted HTML checks. |
| `next-site/scripts/import-legacy.py` | Reproducible content and asset migration. |
| `next-site/tsconfig.json` | Application setup, reproducible dependencies, strict types, lint or local commands. |
| `next-site/docs/FILES_CHANGED.md` | Audit, migration evidence, architecture or reproducible handover documentation. |


## Phase 2 — core experience

- `.github/workflows/next-foundation.yml` — Repeatable production, browser and database verification or operations.
- `next-site/.env.example` — Dependencies, safe environment template or tooling configuration.
- `next-site/README.md` — Implementation, verification and operational status.
- `next-site/app/[[...slug]]/page.tsx` — Native responsive experience, accessible interaction or server inquiry endpoint.
- `next-site/app/api/contact/route.ts` — Native responsive experience, accessible interaction or server inquiry endpoint.
- `next-site/app/foundation.css` — Remove replaced legacy runtime code; native React/CSS implements the replacement.
- `next-site/app/layout.tsx` — Native responsive experience, accessible interaction or server inquiry endpoint.
- `next-site/app/legacy.css` — Remove replaced legacy runtime code; native React/CSS implements the replacement.
- `next-site/app/studio.css` — Native responsive experience, accessible interaction or server inquiry endpoint.
- `next-site/biome.json` — Dependencies, safe environment template or tooling configuration.
- `next-site/components/contact-form.tsx` — Native responsive experience, accessible interaction or server inquiry endpoint.
- `next-site/components/contact-page.tsx` — Native responsive experience, accessible interaction or server inquiry endpoint.
- `next-site/components/content-pages.tsx` — Native responsive experience, accessible interaction or server inquiry endpoint.
- `next-site/components/home-link.tsx` — Native responsive experience, accessible interaction or server inquiry endpoint.
- `next-site/components/homepage.tsx` — Native responsive experience, accessible interaction or server inquiry endpoint.
- `next-site/components/legacy-document.tsx` — Remove replaced legacy runtime code; native React/CSS implements the replacement.
- `next-site/components/navigation.tsx` — Native responsive experience, accessible interaction or server inquiry endpoint.
- `next-site/components/project-card.tsx` — Native responsive experience, accessible interaction or server inquiry endpoint.
- `next-site/components/site-shell.tsx` — Native responsive experience, accessible interaction or server inquiry endpoint.
- `next-site/components/structured-data.tsx` — Native responsive experience, accessible interaction or server inquiry endpoint.
- `next-site/content/pages.json` — Reviewed native content, project scope or route metadata.
- `next-site/content/projects.json` — Reviewed native content, project scope or route metadata.
- `next-site/content/services.json` — Reviewed native content, project scope or route metadata.
- `next-site/content/solutions.json` — Reviewed native content, project scope or route metadata.
- `next-site/db/001_leads.sql` — Validated, persistent and retryable inquiry handling.
- `next-site/docs/CONTACT_OPERATIONS.md` — Implementation, verification and operational status.
- `next-site/docs/PHASE_2.md` — Implementation, verification and operational status.
- `next-site/e2e/foundation.spec.ts` — Repeatable production, browser and database verification or operations.
- `next-site/lib/contact/email.ts` — Validated, persistent and retryable inquiry handling.
- `next-site/lib/contact/http.ts` — Validated, persistent and retryable inquiry handling.
- `next-site/lib/contact/options.ts` — Validated, persistent and retryable inquiry handling.
- `next-site/lib/contact/schema.ts` — Validated, persistent and retryable inquiry handling.
- `next-site/lib/contact/store.ts` — Validated, persistent and retryable inquiry handling.
- `next-site/lib/pages.ts` — Dependencies, safe environment template or tooling configuration.
- `next-site/package-lock.json` — Dependencies, safe environment template or tooling configuration.
- `next-site/package.json` — Dependencies, safe environment template or tooling configuration.
- `next-site/public/legacy/app.js` — Remove replaced legacy runtime code; native React/CSS implements the replacement.
- `next-site/public/legacy/international.js` — Remove replaced legacy runtime code; native React/CSS implements the replacement.
- `next-site/public/legacy/upgrade.js` — Remove replaced legacy runtime code; native React/CSS implements the replacement.
- `next-site/scripts/check-production.mjs` — Repeatable production, browser and database verification or operations.
- `next-site/scripts/contact.test.mjs` — Repeatable production, browser and database verification or operations.
- `next-site/scripts/database.integration.mjs` — Repeatable production, browser and database verification or operations.
- `next-site/scripts/foundation.test.mjs` — Repeatable production, browser and database verification or operations.
- `next-site/scripts/migrate.mjs` — Repeatable production, browser and database verification or operations.
- `next-site/scripts/retry-email.ts` — Repeatable production, browser and database verification or operations.
- `next-site/tsconfig.json` — Dependencies, safe environment template or tooling configuration.

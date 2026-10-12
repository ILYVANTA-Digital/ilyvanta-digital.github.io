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

## 12 October 2026 — implementation continuation

Paths are relative to repository root. These commits remain local; see deployment notes for the remote-write and dashboard limitations.

### Phase 5 — SEO/AEO/content (`8272b6d`)

| File | Reason |
| --- | --- |
| `next-site/app/[[...slug]]/page.tsx` | Render new guides and use article Open Graph types. |
| `next-site/app/studio.css` | Style native FAQ disclosures, guides and consent controls responsively. |
| `next-site/components/content-pages.tsx` | Add service FAQs, guide links and accurate analytics privacy content. |
| `next-site/components/insight-article.tsx` | Render guide summary, contents, author, checklist and related service. |
| `next-site/components/service-faq.tsx` | Render service-specific answers using no-JS HTML details. |
| `next-site/components/structured-data.tsx` | Link founder/studio/site entities and add Article plus full registered breadcrumbs. |
| `next-site/content/articles.json` | Add three useful business planning/search guides with explicit evidence limits. |
| `next-site/content/pages.json` | Register unique metadata and canonical routes for the new guides. |
| `next-site/content/service-faqs.json` | Add 18 buyer questions across six services. |
| `next-site/docs/PHASE_5.md` | Record Phase 5 work, verification and unresolved external acceptance. |
| `next-site/docs/SEO.md` | Document intent ownership, indexing cutover and evidence-based search measurement. |
| `next-site/docs/TESTING.md` | Record exact passing Phase 2 remote SHA and later local-only evidence. |
| `next-site/lib/site-policy.ts` | Validate canonical origin and prevent preview indexing through copied variables. |
| `next-site/lib/site.ts` | Use centralized canonical/indexing policy. |
| `next-site/scripts/check-production.mjs` | Verify new schemas, breadcrumb routes, headers and absence of active preview tracking. |
| `next-site/scripts/foundation.test.mjs` | Update expected route count while retaining metadata/content contract checks. |
| `next-site/scripts/seo.test.mjs` | Test canonical rejection, preview safeguards and content reachability. |

### Phase 6 — security/analytics/Netlify preparation (`6ce45a0`)

| File | Reason |
| --- | --- |
| `.gitignore` | Exclude Netlify account-link state. |
| `netlify.toml` | Configure Next app base, validation/build, Node version and adapter detection. |
| `next-site/.env.example` | Document inactive analytics flags without secrets. |
| `next-site/.gitignore` | Exclude local Netlify state. |
| `next-site/README.md` | Update route counts and exact completion boundary. |
| `next-site/app/api/contact/route.ts` | Use verified-host origin and network selection helpers. |
| `next-site/app/layout.tsx` | Render consent controls only for explicitly enabled production analytics. |
| `next-site/app/studio.css` | Style native FAQ disclosures, guides and consent controls responsively. |
| `next-site/components/analytics-consent.tsx` | Implement optional analytics opt-in, withdrawal, navigation and scoped conversion tracking. |
| `next-site/components/contact-form.tsx` | Emit only fixed start/saved event names without form contents. |
| `next-site/components/content-pages.tsx` | Add service FAQs, guide links and accurate analytics privacy content. |
| `next-site/docs/CHANGELOG.md` | Record dated changes without claiming a deployment. |
| `next-site/docs/CONTENT_GUIDE.md` | Explain safe editing, truthful claims and required review. |
| `next-site/docs/DEPLOYMENT.md` | Document Netlify Free team, empty project, configuration and missing linking capability. |
| `next-site/docs/PHASE_6.md` | Record Phase 6 scope, Netlify project and remaining launch gates. |
| `next-site/docs/SECURITY.md` | Document controls, residual CSP risk and unconfigured operational monitoring. |
| `next-site/docs/TESTING.md` | Record exact passing Phase 2 remote SHA and later local-only evidence. |
| `next-site/e2e/search-security.spec.ts` | Add browser checks for no-JS answers, preview tracking and CSP hydration; execution pending. |
| `next-site/lib/analytics-policy.ts` | Allow only known event names and registered paths; remove query and fragment. |
| `next-site/lib/contact/network.ts` | Select provider-owned valid IP and exact allowed origins for contact protection. |
| `next-site/next.config.ts` | Add CSP with explicit static Next inline-script limitation. |
| `next-site/scripts/check-production.mjs` | Verify new schemas, breadcrumb routes, headers and absence of active preview tracking. |
| `next-site/scripts/security.test.mjs` | Test spoofed origin/forwarding inputs and analytics privacy projection. |

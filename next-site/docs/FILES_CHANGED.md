# Files changed — Phase 1

Only Phase 1 has been implemented. Phases 2–6 have no changes. This is a migration checkpoint, not a completed redesign.

| File | Reason |
| --- | --- |
| `.gitignore` | Exclude secrets, dependencies, build and browser-test outputs. |
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

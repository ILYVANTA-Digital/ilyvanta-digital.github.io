# Architecture and migration boundaries

## Current target

Next.js 16 App Router, React, strict TypeScript. Server-rendered content and native Metadata API. CSS design tokens plus a compatibility stylesheet preserve established layout. Native error and not-found pages. No Tailwind, GSAP, WebGL or AI dependency is installed without a concrete feature needing it.

`app/[[...slug]]/page.tsx` maps reviewed content routes to `content/legacy-pages.json`. `components/legacy-document.tsx` renders checked-in trusted HTML only. It accepts no request-provided HTML. This adapter is deliberately temporary: Phase 2 replaces sections with typed React components. Browser scripts still assume full document navigation; keep native anchors for these legacy routes.

`app/tokens.css` defines colors, radii, spacing, motion and type scales. `app/foundation.css` adds accessible focus, narrow-screen fixes and no-JS content support. `app/layout.tsx` loads metadata and existing enhancement scripts after hydration.

The four `/demo/*/` paths redirect temporarily to the existing public application host. No D1 identity header or cookie is trusted by this new application. Original server and data remain unchanged.

## Planned inquiry boundary (Phase 2)

Browser form → Next.js Route Handler → Zod validation → server-only PostgreSQL adapter → transactional email adapter → safe client response. Database and delivery credentials must be configured before a real successful submission can be claimed. Durable idempotency and abuse controls are required; memory-only limits do not suffice in serverless production.

## Later phases

3: capability-gated, lazy hero 3D with static fallback. 4: grounded server-only AI with budget controls and human handoff. 5: useful service/insight content, Search Console and consent-aware analytics. 6: hardened CSP, CI, real provider QA, preview review and explicit production approval/cutover.

## Navigation plan

Home / Services / Work / Solutions / About / Insights / Contact are the target. Do not publish empty menu destinations. Existing seven content pages remain the foundation; new destinations need substantive content before entering primary navigation.

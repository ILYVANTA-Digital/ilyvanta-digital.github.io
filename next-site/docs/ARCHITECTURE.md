# Architecture and migration boundaries

## Current implementation

Next.js 16 App Router, React and strict TypeScript. The route registry in `content/pages.json` defines 26 pages and feeds metadata and sitemap generation. `app/[[...slug]]/page.tsx` resolves those records to native server components. Unknown routes return the custom 404. The previous raw-HTML adapter and enhancement scripts have been removed; `legacy-pages.json` remains an audit snapshot.

`app/studio.css` implements the responsive graphite/mint editorial system. `app/tokens.css` retains the named design primitives. Only navigation and the inquiry form are client components. Existing artwork is rendered through next/image, with priority restricted to the homepage hero. Links to the four separately hosted demos use ordinary document navigation so Next.js does not prefetch RSC payloads across the redirect.

The existing `/demo/*/` redirects preserve public entry URLs and point to the separate Site deployment. The Next.js app neither owns nor trusts the demo session. Demo APIs/data are not migrated in this phase.

## Inquiry boundary

Browser → Next.js Route Handler → bounded content-type/body parser → Zod → durable PostgreSQL quotas → transaction (lead + outbox) → safe response. Next.js `after()` attempts notification delivery; an operator retry command handles deferred outbox work. See CONTACT_OPERATIONS.md for limits and remaining launch requirements.

The browser receives no database or email credentials. Only static form-option constants are imported by the client; Zod, PostgreSQL and notification code remain on the server. Email text is plain text, and developer-owned JSON-LD is serialized with HTML delimiters escaped. No customer-provided HTML is rendered.

PostgreSQL enforces lead-id uniqueness, separates notification state from lead state and atomically increments rate-limit buckets. The outbox uses bounded attempts and stable provider idempotency keys. Preview form availability fails closed until explicitly configured. The default local origin handling accepts localhost and 127.0.0.1 on the server port, including a server bound to 0.0.0.0; arbitrary external origins are rejected.

## State of later phases

3: full capability-gated lazy hero 3D and motion performance acceptance pending. 4: grounded AI assistant and API-cost controls pending. 5: service content and metadata foundations exist; formal keyword research, discovery measurements, Search Console and privacy-aware analytics remain pending. 6: full CSP/security review, live provider acceptance, physical-device testing and production launch remain pending.

Phase 2 acceptance is still awaiting actual provider-backed email delivery and a reviewed hosted preview. Passing automated mocks or a disposable test database must not be presented as production delivery.

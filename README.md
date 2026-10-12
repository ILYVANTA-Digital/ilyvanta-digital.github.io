# ILYVANTA Digital

The new native Next.js agency application is in **[next-site/](next-site/)** on `feature/experience-completion`, draft PR #3. See [current setup](next-site/README.md) and [measured QA](next-site/docs/MEASURED_QA.md). It has not replaced the existing public Site. The documentation below describes the separate legacy Site implementation.

Agency website with four persistent interactive sample workspaces, detailed case studies, business-improvement guidance and an SEO/AI visibility service page.

## Build and validation

Requires Node 24+ and Python 3.

```bash
npm ci
npm run build
npm test
python3 scripts/check-pages.py
```

`build.py` generates base pages; `enhance.py` adds detailed content and demo routes; `international.py` applies the international design, globe and entity metadata. Author CSS, browser JavaScript and imagery in `public/`. `scripts/build.mjs` builds a Cloudflare Worker with public assets under `dist/`. Run the build before the tests because the Worker imports its generated asset module.

The original GitHub organization repository is not modified by this Sites deployment. A static export alone will not run the API or persistent demos.

## Demo scope

All projects are self-directed; there are no invented client metrics or testimonials. All interface records are sample data. Each visitor has a distinct D1 workspace keyed by the hosting platform identity or a cryptographically random, HttpOnly, Secure, SameSite browser session cookie. Client form fields cannot choose another workspace.

- Hotel: date and overlap checks, reservations, guest services, simulated payment, check-in/out, housekeeping and activity.
- Clinic: sample patient IDs, returning visits, queue, payments/refunds, printable sample slips and search.
- Café: server-priced menu ordering, quantity checks, bulk approval, preparation, cancellation and history. No WhatsApp, LLM or voice connection.
- SportsHub: event participation, product basket, authoritative prices and stock, simulated checkout and order history. No payment or shipping integration.

These browser workspaces implement focused flows inspired by the supplied source projects. They are not full deployments of the original applications. The original PHP/MySQL/SQLite and WhatsApp projects retain the separately documented gaps; do not claim those were fixed by this website upgrade.

Demo data is stored in `agency_demo_workspaces`. Optimistic revisions prevent silent overwrites; operation IDs guard replay of the same request. Reset affects one selected sample workspace. A JSON export is available. Demo routes are marked noindex and excluded from the sitemap.

## Email delivery

`POST /api/contact` validates input and sends plain-text mail through Resend to the fixed recipient `ilyvantadigital@gmail.com`. It uses the visitor's address only as reply-to. Required hosted configuration:

- `RESEND_API_KEY`: configure as a secret through the hosting settings.
- `CONTACT_FROM`: an approved sender on a verified domain in the provider account.

Until configured, the endpoint returns 503 and the interface says online sending is unavailable. It never displays a false success or loses the user's form values. Contact requests require a site session, same-origin JSON and rate limiting. The visitor must click Send enquiry to send. No email was sent during automated tests; delivery-provider responses were mocked.

Provider documentation: https://resend.com/docs/api-reference/emails/send-email

## Storage and migrations

Schema source: `db/schema.ts`. Generate changes with `npm run db:generate`; inspect the SQL before deployment. Migrations in `drizzle/` are applied by Sites. Do not edit an already applied migration. No runtime schema creation.

## Validation summary

69 workflow/API/DOM checks passed using Node SQLite and simulated DOM. Page metadata, assets and internal links are checked separately. Browser preview checked desktop and phone-width layout, navigation, visibility map, globe controls and a hotel demo payment action. Phone-width testing uses a 390px iframe with an effective 375px content area. Actual physical-device testing, Lighthouse scores and live inbox delivery have not been measured.

Images for the clinic, café and sports case studies are original generated concept artwork, not screenshots or evidence of client outcomes. The hotel image is from the supplied Aurelia House concept. Existing image-based 3D art, CSS perspective motion, motion pause and reduced-motion support are retained.

## GitHub release

`python3 scripts/export-github.py` creates an upload-ready static website under `handoff/github-pages` and a ZIP. The GitHub integration rejected branch creation with HTTP 403 (resource not accessible by integration); no GitHub upload or Pages deployment is claimed. Demo links lead to the hosted app rather than a non-existent GitHub API.

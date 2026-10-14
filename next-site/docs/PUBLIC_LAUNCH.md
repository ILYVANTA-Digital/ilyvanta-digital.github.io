# Public launch — 14 October 2026

The owner asked to continue the remaining launch work and explicitly defer the AI assistant. No AI key, paid API use or AI implementation is needed for this release.

## Hosting and indexing

Netlify production visibility is public; non-production deployments retain team protection. The reviewed runtime deploy was `6acf599fb14b5c2ce17cff17`. `SITE_URL` is `https://ilyvanta-digital.netlify.app`; `SITE_INDEXABLE=true` has been set for launch and requires a new build. Preview policy still forces noindex for non-production contexts.

GSC Wizard refused the account read with `payment_required` because its trial/subscription is inactive. No subscription was purchased, no sitemap submission or Google indexing/rank is claimed. Search Console ownership/verification for this new URL remains an independent acceptance item.

## Contact form without a separate email API key

`CONTACT_PROVIDER=netlify` selects Netlify Forms. Form detection is enabled. The static `public/__forms.html` definition lists all submitted field names and the existing honeypot. The client validates with the same inquiry schema, URL-encodes fields, and submits to that static endpoint, as required by the current Next.js runtime. Non-2xx and network failures preserve the inquiry and show an honest error; accepted transport is not evidence of inbox delivery.

Netlify stores inquiries and applies its spam filtering. Email notification destination must be configured in Netlify to `ilyvantadigital@gmail.com`. The form sends no automatic visitor receipt. The original PostgreSQL/Resend transport remains available by selecting `CONTACT_PROVIDER=database` and completing CONTACT_OPERATIONS.md; it is not provisioned by this launch. Its custom rate limits/idempotency/outbox do not apply to the Netlify transport. Netlify's own spam handling applies instead. Review Spam for missing legitimate submissions.

## Operations

- Read new inquiries in the project's Forms dashboard; configure owner notifications before claiming email setup complete.
- Export submissions from the Forms dashboard as CSV for a private backup; this is manual, not an automatic backup service. Review retention after 180 days and verify identity before handling a deletion request.
- Source is stored in GitHub. The CI validates changes and includes dedicated Netlify transport success/failure browser checks. Local lint/types, 17 unit tests and the production build passed; the local browser run could not start because its browser binary was absent. CI results and a real hosted submission still need recording.
- Check Netlify deploy status and observability for deployment errors. Dedicated uptime alerting and GA4 require a configured destination/account; neither is silently enabled.
- Physical-phone QA requires an actual device; browser emulation is not equivalent.
- No AI assistant is included in the current scope. No automatic booking, payment, clinical workflow or client-project deployment is implied by sample demos.

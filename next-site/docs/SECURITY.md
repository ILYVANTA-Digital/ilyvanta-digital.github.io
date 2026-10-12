# Security review and operational boundaries

## Implemented controls

- React escapes ordinary content; JSON-LD escapes `<` before embedding. No visitor-provided HTML renderer.
- Contact accepts POST only, checks exact origin, limits streamed bodies to 16 KiB and validates a strict Zod schema. The honeypot exits before storage. Requests without an Origin are rejected.
- SQL uses parameterized postgres templates. Duplicate references are transactional, with changed-payload conflicts rejected. Outbox retries use provider idempotency and bounded attempts.
- Persistent network/email/global limits. Provider IP headers are accepted only under the corresponding Netlify/Vercel environment, validated as IP addresses; generic x-forwarded-for is ignored. Unknown networks share a conservative bucket. Provider header rewriting still needs a hosted anti-spoofing test.
- Database keys, email provider keys and HMAC secret remain server-side. Contact is disabled until all configuration is present. RLS and public-role revocation in the migration are defense in depth, not a substitute for using a restricted app role.
- CSP blocks framing, objects and foreign form actions. Only self and explicitly named analytics endpoints are allowed for relevant resources. Existing DENY/nosniff/HSTS/referrer/permissions headers remain.
- No upload endpoint, authentication, payment endpoint or public administrative API exists in this agency app. Hosted samples are separate applications and require their own reviews.
- Environment files and .netlify state are ignored. Secret values are absent from examples and never deliberately embedded in client code.

## CSP limitation

Static Next.js hydration currently needs inline scripts, so script-src retains unsafe-inline. Inline styles support Next/React and the no-JavaScript navigation fallback. Production does not allow unsafe-eval. This is a restrictive resource policy, **not a strict nonce CSP or an XSS-proof claim**. A future strict nonce policy needs dynamic rendering and CDN/performance review. Never add broad wildcards simply to silence a violation. Actual deployed adapter headers and browser runtime need verification before launch.

## Analytics privacy

Analytics is off by default and always off in preview contexts. Enabling it needs explicit ANALYTICS_ENABLED=true, indexable production and a syntactically valid measurement ID. The Google script is not created before visitor opt-in. Withdrawal sets Google's disable flag and removes our host-scoped GA cookies; previously transmitted records are not deleted by this action.

Events use a closed allowlist and registered paths with query/fragment removed. No form answers, IDs, email addresses, free-text labels or referrer URLs are attached by our code. Advertising signals are disabled. Before activation, disable GA enhanced measurement (especially form, outbound-click and history-driven pageview collection) in the property's web-stream settings and test a real consent flow in browser network tools. Google inherently receives connection information once the visitor opts in. No analytics property was created or data sent in this cycle.

## Logging and monitoring

Contact catches log fixed event codes (`contact_request_failed`, `contact_notification_deferred`) rather than input or provider payloads. Provider/dashboard monitoring, alerts, frontend error capture and an on-call owner are **not yet configured**. Do not claim monitoring based solely on console logs. Review outbox backlog and delivery failures after launch; wire an authenticated scheduled retry worker before relying on durable delivery.

## Before production

1. Use isolated preview database and email recipients; run migration against the intended database only after review.
2. Test real receipt/agency delivery, provider timeout/retry, missing secrets and rate limits on the actual host.
3. Verify connection-IP header rewriting cannot be supplied by a visitor and exact origin checks pass on preview and production URLs.
4. Configure provider alerts, tested backup/recovery and the retention review/cleanup process. Neither automated retention deletion nor a restore exercise has run.
5. Re-run dependency audit, browser CSP/hydration/3D checks and external header verification against the real preview. No securityheaders.com grade has been measured.

Primary references reviewed 12 October 2026:
- https://nextjs.org/docs/app/guides/content-security-policy
- https://answers.netlify.com/t/upcoming-change-stripping-exposed-netlify-headers-from-function-and-proxy-requests/52665 (Netlify staff provider-header guidance; verify deployed behavior)
- https://developers.google.com/tag-platform/security/guides/privacy

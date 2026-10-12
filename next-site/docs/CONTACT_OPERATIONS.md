# Contact system operations

## Current state

Implemented, not enabled for production. No hosted PostgreSQL credential, verified Resend sender or successful inbox-delivery evidence has been provided. The form explicitly shows that limitation and keeps direct email available. Do not set CONTACT_ENABLED=true just to hide the notice.

## Provider setup after preview access works

1. Select a dedicated PostgreSQL database for the preview. Use a pooled connection near the app region and TLS in the production connection URL. Never share the production DB with automated tests.
2. Set server-only DATABASE_URL. Apply `npm run db:migrate` in the intended environment. The migration creates leads, rate limits and a transactional outbox; it does not erase existing records. The application connection must own these dedicated tables or have narrowly provisioned server privileges. RLS blocks anonymous browser access; no public read endpoint is provided.
3. Configure a Resend account with a verified sending domain, then set RESEND_API_KEY and CONTACT_FROM. A Gmail mailbox can receive notifications but is not a verified sending domain by itself. Do not paste keys into chat, source files or NEXT_PUBLIC variables.
4. Generate a private random RATE_LIMIT_SECRET (at least 32 random bytes) in the secret manager. Set CONTACT_ENABLED=true in the preview build and runtime environment and rebuild.
5. Submit an authorized test inquiry. Confirm exactly one lead and two outbox records, actual agency notification and recipient receipt, correct reply-to and no duplicate send on a transport retry. Provider acceptance is not inbox delivery; inspect the destination mailboxes or provider delivery events.
6. Verify invalid input, honeypot, same-origin protection, body limits, throttling, provider failure/retry, mobile keyboard use and the privacy notice. Only then enable the reviewed production environment.

## Failure behavior

- No provider configuration: 503, no saved lead, direct email fallback.
- Valid inquiry: a transaction saves the lead and both outbox tasks before 201. The message says the inquiry is saved, not that email has arrived.
- Duplicate UUID with identical content: no extra lead or outbox tasks. Changed content with a reused UUID returns 409.
- Resend failure or timeout: task remains retryable. `npm run email:retry` processes up to ten tasks; connect only to the intended environment. Logs do not contain the submitted brief or credentials.
- Resend requests carry stable idempotency keys. Automatic retry stops at four attempts or 23 hours, within the provider's 24-hour idempotency period. Older uncertain sends need operator review to avoid duplicate emails. A scheduler is not configured yet; establish monitored retries before production.
- IP limiting trusts x-vercel-forwarded-for only on Vercel. Other hosts share a conservative network bucket until their trusted proxy adapter is explicitly configured. Email and global quotas are also durable in PostgreSQL. Deploy firewall/body limits before public traffic.

## Maintenance before launch

Assign a responsible operator for delivery failures, account costs, backups and restore checks. Remove expired contact_rate_limits rows in a scheduled maintenance job. Review inactive inquiries after 180 days, removing unnecessary lead records (outbox cascades) unless an active engagement or necessary record requires retention. This retention review is not yet scheduled automatically. Maintain an access/correction/deletion request procedure.

## CI versus live verification

`TEST_DATABASE_URL` must point to a disposable database named `ilyvanta_test`. CI uses a real PostgreSQL 16 service, validates the migration, concurrent duplicate submissions and rate limiting, then tests outbox persistence with an intercepted email transport. No actual email is sent by CI. Browser success-state tests explicitly intercept the transport; the real unconfigured API must return 503. These results cannot substitute for provider delivery and production configuration verification.

## Technical references consulted

- https://resend.com/docs/api-reference/emails/send-email
- https://resend.com/docs/dashboard/emails/idempotency-keys
- https://github.com/porsager/postgres
- https://zod.dev/api
- https://nextjs.org/docs/app/api-reference/functions/after

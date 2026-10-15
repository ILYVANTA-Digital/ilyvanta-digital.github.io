# Public launch — 14 October 2026

The owner asked to continue the remaining launch work and explicitly defer the AI assistant. No AI key, paid API use or AI implementation is needed for this release.

## Hosting and indexing

Netlify production visibility is public; non-production deployments retain team protection. Current verified public deploy is `6ad113e64c7c8076addd8244`, application/config commit `6b09e7cdaf0ccde03a92dd1f9a97bfffc386569c`. Production build configuration sets `SITE_URL=https://ilyvanta-digital.netlify.app` and `SITE_INDEXABLE=true`. Preview policy still forces noindex for non-production contexts.

GSC Wizard refused the account read with `payment_required` because its trial/subscription is inactive. No subscription was purchased, no sitemap submission or Google indexing/rank is claimed. Search Console ownership/verification for this new URL remains an independent acceptance item.

## Contact form without a separate email API key

`CONTACT_PROVIDER=netlify` selects Netlify Forms. Form detection is enabled. The static `public/__forms.html` definition lists all submitted field names and the existing honeypot. The client validates with the same inquiry schema, URL-encodes fields, and submits to that static endpoint, as required by the current Next.js runtime. Non-2xx and network failures preserve the inquiry and show an honest error; accepted transport is not evidence of inbox delivery.

Netlify stores inquiries and applies its spam filtering. The owner notification was configured and verified in the dashboard: email `ilyvantadigital@gmail.com` on each new submission, with subject `ILYVANTA Digital — new project inquiry`. Actual inbox delivery still requires confirmation. The form sends no automatic visitor receipt. The original PostgreSQL/Resend transport remains available by selecting `CONTACT_PROVIDER=database` and completing CONTACT_OPERATIONS.md; it is not provisioned by this launch. Its custom rate limits/idempotency/outbox do not apply to the Netlify transport. Netlify's own spam handling applies instead. Review Spam for missing legitimate submissions.

## Operations

- Read new inquiries in the project's Forms dashboard; owner notifications are configured, but verify the first test message in the recipient inbox.
- Export submissions from the Forms dashboard as CSV for a private backup; this is manual, not an automatic backup service. Review retention after 180 days and verify identity before handling a deletion request.
- Source is stored in GitHub. CI validates changes and includes dedicated Netlify transport success/failure browser checks. Local lint/types, 17 unit tests and the production build passed. Local browser binaries were unavailable; the successful CI browser run and real hosted submission are recorded below.
- Check Netlify deploy status and observability for deployment errors. The dashboard labels additional deploy-email notifications as Pro; no paid upgrade was selected. Existing GitHub deployment checks remain configured. Dedicated uptime alerting and GA4 require a configured destination/account; neither is silently enabled.
- Physical-phone QA requires an actual device; browser emulation is not equivalent.
- No AI assistant is included in the current scope. No automatic booking, payment, clinical workflow or client-project deployment is implied by sample demos.

## Hosted acceptance — 15 October 2026

- Application commit `0fb3a78c07f5da8c2c387465b435b182960031b6` passed CI run `38600155421`: lint, types, 17 unit tests, 3 database integration tests, 950 production HTTP assertions, 168 cross-browser tests, and two dedicated Netlify transport browser tests. The six profile-gated tests in the general browser suite were skipped as intended; the dedicated Netlify job runs its two tests in Chromium.
- Netlify production deploy `6acfb209fa83daccd5cf044b` is ready and publicly accessible. Form `project-inquiry` was registered as `6acfb24824705af6e6196e85`.
- One clearly labeled owner-authorized inquiry was submitted through the public contact page on 15 October. The page displayed “Inquiry received”; the connector confirmed submission_count changed from 0 to 1, last_submission_at `2026-10-15T17:53:55.054+00:00`. This proves transport acceptance and storage, not inbox delivery or a real client lead.
- Hosted SEO verification caught stale metadata: the first public build still used the old ChatGPT canonical and noindex. Public SITE_URL and SITE_INDEXABLE values were added to the production build context in `netlify.toml`. A fresh local production build generates the correct Netlify canonical, index/follow metadata, and allowed robots directives.
- Broad environment-variable listing was rejected by automatic safety review because it could expose secrets. No secrets were read. The fix changes only the two public SEO values in versioned production configuration.
- SEO follow-up `6b09e7cdaf0ccde03a92dd1f9a97bfffc386569c` published successfully at `2026-10-15T17:57:57.150Z` as deploy `6ad113e64c7c8076addd8244`. Anonymous HTTP verification: robots.txt returns 200 with Allow: / (API/demo excluded), sitemap.xml contains all 29 content URLs, all 29 pages return 200 with self-referencing Netlify canonical, index/follow metadata, and no X-Robots-Tag block. The cloud browser separately verified the public homepage and canonical. This is crawl eligibility, not Google indexing or ranking.

## Remaining acceptance items

1. Owner confirms the launch-test email in Inbox/Spam at ilyvantadigital@gmail.com. Notification configuration and stored inquiry are verified, actual email delivery is not.
2. Google Search Console property verification and sitemap submission: GSC Wizard requires payment; browser fallback needs the owner's approval. No paid plan was purchased.
3. Analytics needs an owner-selected account/measurement ID; tracking remains off. No traffic numbers are invented.
4. Physical-device QA and hosted Lighthouse/PageSpeed measurements remain outstanding. Previous CI lab scores are historical and are not measurements of this public deployment.
5. Source history is backed by GitHub; inquiry CSV export and retention review remain manual. No unattended uptime alerts or automatic inquiry backups are claimed.
6. AI assistant is explicitly deferred by the owner, not a launch blocker.

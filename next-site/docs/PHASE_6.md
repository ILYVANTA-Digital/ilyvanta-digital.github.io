PHASE: 6 — security, analytics and deployment preparation (partial).
TASK: Harden the production surface and prepare the approved free Netlify path.
FILES REVIEWED: Next headers, contact origin/network/rate limits, analytics privacy, environment examples, workflow, Netlify and Google primary documentation.
FILES CREATED: repo-root netlify.toml, lib/contact/network.ts, lib/analytics-policy.ts, components/analytics-consent.tsx, scripts/security.test.mjs, e2e/search-security.spec.ts, docs/SECURITY.md, docs/CONTENT_GUIDE.md, this record.
FILES MODIFIED: next.config.ts, layout, contact handler/form, privacy content, studio CSS, env example, ignore files, production checks and deployment documentation.
IMPLEMENTATION: CSP with documented static-rendering limitation; provider-aware validated network identity; exact Netlify preview origins; closed analytics event/path allowlist; explicit visitor opt-in and withdrawal; analytics disabled in preview and by default; modern Next build config for Netlify. Created the empty Netlify project under the verified Free team.
WHY THIS APPROACH: Keep the site useful without optional services, avoid sending form data into analytics and make host migration reviewable before production launch.
TESTS RUN: Lint (zero warnings), strict types, 15 unit/content/security tests, production build, 950 HTTP/link/schema/header/contact checks, production dependency audit and built-client server-secret identifier scan.
RESULTS: All listed local checks passed; production dependency audit reported zero known vulnerabilities on 12 October 2026. Client scan found no listed server-only secret identifiers. These do not constitute a penetration test or prove absence of all vulnerabilities. Browser tests added but not executed on the new commit.
RISKS: CSP allows inline framework scripts/styles; real consent/network behavior and Netlify adapter behavior need browser review. No real provider email delivery or AI assistant is claimed. Unknown network identities share a conservative rate-limit bucket.
REMAINING: Upload latest commits, run combined browser/performance CI, connect repository to Netlify, produce and inspect hosted preview, configure/test database/email and analytics property, establish monitoring/retention/retry/backup ownership, physical-device review, AI phase and final production approval.
NEXT TASK: Connect the prepared Netlify project to the repository, review the combined preview, then complete provider-dependent acceptance.

## Netlify project

- Team: ILYVANTA Digital, Free, slug umarilyas803-hub.
- Site ID: b77a1154-0835-4747-8ac6-73d95bec7e68.
- Project: https://app.netlify.com/projects/ilyvanta-digital
- Created once and verified by get-project. No successful application deploy exists.
- New-project SSO protection remains enabled for all deploys. No public launch or removal of protection occurred.
- Exposed connector supports project creation/reads, but no repository-link/build/upload operation. Browser dashboard fallback needs explicit user approval under the browser tool instructions. Do not present an empty project URL as a working website.
- The earlier GitHub create-tree write failed automatic approval review due to a usage limit. No alternate write path was used to bypass that check; current new feature commits remain local.

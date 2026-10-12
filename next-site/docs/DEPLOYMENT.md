# Deployment plan

The live Site remains unchanged. This migration is a separate app under `next-site/`.

1. Install reviewed dependencies with `npm ci` in next-site.
2. Run lint, typecheck, unit/content tests and production build.
3. Start the exact built app with `npm run start -- --port 4173` and verify routes and UI.
4. GitHub organization access is now configured. The migration is uploaded on `feature/next-foundation`; draft PR: https://github.com/ILYVANTA-Digital/ilyvanta-digital.github.io/pull/1. Review its checks before any merge.
5. Use feature branches and pull requests. Configure Vercel Root Directory to `next-site` for the full repository or `.` for an extracted app-only release.
6. Keep SITE_INDEXABLE=false on previews. Do not switch canonicals or DNS.
7. Configure production dependencies through provider settings; never put secrets in chat or commits.
8. Review a preview and required CI checks. Stage a production build without assigning domains, verify it, then approve promotion/cutover.

Next.js APIs cannot run on GitHub Pages. GitHub stores source; Vercel is the requested target for this new app. The existing public demo host continues to provide sample workflows until backend migration is verified.

No Vercel project, DNS change, paid resource or production database is created by this foundation.

## Preview access check — 10 October 2026

The authenticated Vercel account is `umarilyas803-2491`. Its default team scope returned `403: Not authorized` when listing the intended projects. No deploy was attempted. The Vercel CLI is not installed in this environment, so an existing CLI session could not supply a fallback. The connector needs valid access to the intended workspace before preview deployment can proceed; no credentials should be placed in chat.

## Phase 2 update — 12 October 2026

The native agency experience is now on `feature/core-experience`, stacked on `feature/next-foundation`, in draft PR #2: https://github.com/ILYVANTA-Digital/ilyvanta-digital.github.io/pull/2. It is not merged or deployed. Root Directory remains `next-site`.

A fresh connector check for the intended team (`team_juxt3OzRcWDrKnmhiWrykzTQ`, scope `umarilyas803-2491`) again returned 403. The local Vercel CLI is unavailable. No alternate workspace, token or browser session was used to bypass the failed authorization. Repeated unchanged calls will not help; the authorized account connection must have access to this workspace, or the owner must import the intended repository through their own Vercel session.

After access is resolved, create a preview from `feature/core-experience`, keep indexing disabled, configure a separate preview database and verified email sender, and complete CONTACT_OPERATIONS.md's live acceptance steps. Do not deploy `main` expecting the new application: it still contains the original repository state pending review/merge.

## Netlify option — 12 October 2026

Connection verified: account umarilyas803@gmail.com, GitHub umarilyas803-hub, team ILYVANTA Digital (`umarilyas803-hub`, ID `6acd12455b5b3a8f18ef2447`), plan Free. Initial project list was empty. No paid plan was purchased. This does not itself deploy the website.

Repo-root netlify.toml sets base next-site, publish .next, Node 24 and the full local validation/build command. Next.js is auto-detected using the current OpenNext adapter; no static export, old adapter pin or SPA index.html catch-all is configured. .netlify/ is ignored in both root and app so linking state cannot accidentally be committed.

Once repository access and the GitHub write limit permit: connect ILYVANTA-Digital/ilyvanta-digital.github.io to this team, enable feature branch previews, and build the reviewed feature commit. Main currently has no application; importing main as if it contained the app will fail. Keep production publishing separate from the preview review. Plugin project creation alone does not connect a repository or trigger a build; its currently exposed tools do not provide repository linking or deploy upload.

Set SITE_URL, SITE_INDEXABLE=false, CONTACT_ENABLED=false and ANALYTICS_ENABLED=false in site settings for preview. Runtime secrets must use provider environment settings, not netlify.toml. Set secrets for both build and function use where scope controls are available; rebuild after changes. Do not enable the contact form until hosted database/Resend integration and network header behavior pass. SITE_INDEXABLE=true only after an approved production origin and launch review.

Skew protection is enabled at build for current Next.js 16.4.0. It does not automatically protect direct client fetch calls. Our contact submission has its own idempotency reference, but API compatibility across deployments still needs review; we do not enable experimental skew cookies.

Free quotas are not unlimited hosting guarantees. Review team usage before builds and production publication. No DNS change, account upgrade or previous live-site replacement occurred in this cycle.

Prepared Netlify project created and independently read back on 12 October 2026: `ilyvanta-digital`, site ID `b77a1154-0835-4747-8ac6-73d95bec7e68`, dashboard https://app.netlify.com/projects/ilyvanta-digital. It is empty, not connected to Git and has no successful app deployment. Provider default SSO protection remains on. Do not treat the allocated subdomain as a public working site.

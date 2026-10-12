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

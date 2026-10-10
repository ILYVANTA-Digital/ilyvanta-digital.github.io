# Deployment plan

The live Site remains unchanged. This migration is a separate app under `next-site/`.

1. Install reviewed dependencies with `npm ci` in next-site.
2. Run lint, typecheck, unit/content tests and production build.
3. Start the exact built app with `npm run start -- --port 4173` and verify routes and UI.
4. Grant the existing GitHub integration access to the intended repository, or authorize a browser upload fallback. No remote migration branch exists yet.
5. Use feature branches and pull requests. Configure Vercel Root Directory to `next-site` for the full repository or `.` for an extracted app-only release.
6. Keep SITE_INDEXABLE=false on previews. Do not switch canonicals or DNS.
7. Configure production dependencies through provider settings; never put secrets in chat or commits.
8. Review a preview and required CI checks. Stage a production build without assigning domains, verify it, then approve promotion/cutover.

Next.js APIs cannot run on GitHub Pages. GitHub stores source; Vercel is the requested target for this new app. The existing public demo host continues to provide sample workflows until backend migration is verified.

No Vercel project, DNS change, paid resource or production database is created by this foundation.

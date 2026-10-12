# Measured verification — 12 October 2026

Tested remote commit: `af6e4bf2659d17018a989a43c782a6ddfe4ce3aa`.
Baseline: `6eb78942636101a953415ae7d7b4eb4da08e4648` (native Phase 2).
Run: https://github.com/ILYVANTA-Digital/ilyvanta-digital.github.io/actions/runs/38284390489

## Lighthouse lab comparison

One run per device/version against production builds served on the same GitHub runner. These are not public-host PageSpeed or field measurements. The new 3D scene was not activated during Lighthouse.

| Device | Performance before → after | Accessibility | Best Practices | SEO | LCP before → after | CLS | TBT before → after |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile | 94 → 93 | 100 → 100 | 100 → 100 | 69 → 69 | 2.790s → 3.066s | 0 → 0 | 158.5ms → 112ms |
| Desktop | 100 → 100 | 100 → 100 | 100 → 100 | 69 → 69 | 0.548s → 0.558s | 0 → 0 | 0ms → 0ms |

Mobile performance did not improve. A single comparison cannot establish field performance or attribute this change to one feature. The SEO audit explicitly identifies the preview's noindex meta tag and robots.txt block. Preserve these until the public launch origin is approved. No ranking or AI-answer placement is measured.

Downloaded performance artifact: 11762248484, SHA256 `3274692463115a05fe514608dc8b7a72a61758f6337b66c31a039c2f6b733fe0`.

## Browser and production checks

Lint, strict types, 15 unit/content/security tests, 3 PostgreSQL integration tests, production build, 950 HTTP assertions and 168/168 browser tests passed. The browser suite uses Chromium, Firefox and WebKit. All four hosted sample demo links loaded their workspaces. Email sending remains mocked in integration tests; actual inbox delivery is not verified.

Downloaded browser artifact: 11762443333, SHA256 `f81457b620d687c982b058cb97f5020961f3bfdadd9a3319049e13ed789f8419`.

3D activation/pause/still-image passed with rendered screenshots in Chromium and WebKit. Firefox annotated its GPU limitation and verified only fallback. Inspected both active-3D screenshots: heading/navigation/controls fit, but the sculpture exceeded the canvas vertically. Follow-up moves the camera back to retain space around the object. This requires its own screenshot review after CI.

## Findings addressed in the follow-up

- Hero resource discovery lacked fetchpriority=high; explicitly set it on the existing priority Next image.
- Lighthouse's experimental label-content-name check found that brand/project image accessible names omitted visible labels. Include the visible studio/category text and keep the project-navigation test aligned.
- Move the 3D camera from z=5.8 to z=8.3 to prevent the observed vertical crop.

These follow-up changes are not covered by the scores above. Their measured results must be recorded separately.

## Deployment boundary

Latest application is in draft PR #3 on feature/experience-completion; main has not been replaced. Netlify project is created but not linked/deployed. Browser sign-in ended with the provider message “Invalid state key”; a fresh visit to the canonical project URL still showed login. No authenticated dashboard session, production cutover, real-device test, AI credential, hosted database/email acceptance or analytics delivery is claimed.

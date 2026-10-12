# Phase 3 — optional 3D identity

PHASE: 3. TASK: Add a purposeful identity sculpture while keeping the fast static experience intact.
FILES REVIEWED: Homepage, mobile screenshots, reduced-motion failures, R3F performance and Next.js lazy-loading documentation.
FILES CREATED: components/hero-art.tsx, components/sculpture-scene.tsx, e2e/motion.spec.ts, this record.
FILES MODIFIED: Homepage, studio CSS, package/lock and bundle-analyzer configuration.
IMPLEMENTATION: The existing hero image stays primary. On capable desktop devices a deliberate “Explore in 3D” action loads the scene. A low-complexity torus-knot and connecting ring use no external model, textures or postprocessing. On-demand rendering is capped at 30 update requests/second, pauses offscreen/when hidden, and can be paused or removed by the visitor. Mobile, reduced-motion, low-memory/CPU, data-saving and unsupported WebGL paths keep the artwork. Context-loss/error handling returns to the image.
WHY THIS APPROACH: Avoid a heavy WebGL download competing with the initial content, and keep navigation independent of graphics. No scrolling is trapped.
TESTS RUN: Lint/types and production build; added three-engine lazy-load, mobile, reduced-motion, unsupported-WebGL and activation/fallback checks. Browser results pending the combined verification run.
RESULTS: Implemented; local compilation verified. Actual GPU rendering, performance comparison, phone heat and real-device FPS are not yet verified. An unavailable runner GPU is recorded as fallback coverage, not a successful 3D test.
RISKS: Optional WebGL has additional download/GPU cost after activation. No physical-device evidence is available. The artwork is a static raster until the visitor chooses 3D.
REMAINING: Browser run, visual 3D review and measured performance. Phase 2 real email/hosted provider checks remain open.
NEXT TASK: Grounded assistant with server-only providers and explicit failure behavior; then SEO/security and combined QA.

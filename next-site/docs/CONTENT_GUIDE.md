# Content editing guide

Service definitions: content/services.json. Their buyer questions: content/service-faqs.json. Keep answers specific to the service and visible on-page; do not add unsupported schema claims.

Studies: content/projects.json. Preserve the explicit concept/sample labels. Explain workflow, original stack, deployed sample scope, limitations and proposed measures separately. Replace proposed measures with outcomes only when there is dated, attributable evidence and permission to publish it.

Guides: content/articles.json plus the preserved brief guide in components/content-pages.tsx. A new JSON guide needs its own /insights/[slug]/ entry in content/pages.json. Include a direct summary, concrete decisions, a relevant service, author identification and primary sources where needed. Publication dates must reflect real publication rather than a generated build timestamp. Review the wording before launch; code checks cannot approve business claims.

Route registry: content/pages.json owns unique titles, concise descriptions and social image paths. Images live in public/assets and use next/image. Do not copy the homepage canonical into other routes. Keep removed/renamed public routes covered by explicit redirects after reviewing the old site's authority and hosting capabilities.

Never publish fake endorsements, office locations, awards, pricing promises or completed client work. International availability is not international client history. Do not insert country pages unless they contain useful region-specific scope and evidence.

After editing run npm run lint, npm run typecheck, npm test, npm run build and npm run test:production. Browser checks cover the route registry automatically; review mobile and desktop screenshots before merging.

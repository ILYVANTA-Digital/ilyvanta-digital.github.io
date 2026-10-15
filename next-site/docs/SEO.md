# Search and AI discovery

## Implemented (Phase 5)

29 server-rendered content routes: six service detail pages, five industry approaches, four honest project studies, four studio guides, and the studio/contact/legal/index pages. Three new guides compare website/software scope, explain the first automation decision and distinguish search discovery from promises. Each service now answers three buyer questions in native HTML disclosures, readable without JavaScript. No country doorway pages or fabricated client outcomes were added.

Each route has a unique title and description under 155 characters, its own canonical and social metadata. Every work page keeps a distinct project image. Sitemap uses the route registry. JSON-LD links Organization, founder Person, WebSite and the relevant Service/CreativeWork/Article/WebPage; breadcrumbs include actual parent routes. Article dates are omitted until publication dates can be stated honestly. Do not add fake ratings, awards, offices or client counts.

## Intent map (editorial hypotheses, not measured search volumes)

| Buyer intent | Owning route | Evidence / next step |
| --- | --- | --- |
| Business website development / redesign | /services/web-design-development/ | Aurelia House concept → project brief |
| Custom business software / internal tools | /services/custom-business-software/ | Clinic concept; website-or-software guide |
| AI workflow automation | /services/ai-automation/ | Automation planning guide; explicit human review |
| Operational dashboard development | /services/dashboards/ | Clinic sample; reporting/source reconciliation |
| Commerce / ordering experience | /services/ecommerce/ | SportsHub sample; payment limitations |
| Technical SEO / AI discovery | /services/seo-ai-search/ | Search guide; observable measurement plan |
| Industry workflow planning | /solutions/[industry]/ | Distinct operational questions and relevant study |
| Prepare a project brief | /insights/prepare-a-project-brief/ | Checklist → contact |

No Semrush volume/difficulty, Search Console queries, ranking changes or AI citations have been retrieved in this cycle. These are content decisions pending actual market evidence. Do not present them as keyword research results.

## Indexing and domain cutover

SITE_URL must be an explicit HTTPS origin with no path, credentials, query or fragment. A trailing slash is normalized away. Production indexing requires SITE_INDEXABLE=true and an explicit SITE_URL. Netlify deploy-preview/branch-deploy and Vercel preview contexts always remain noindex even when shared environment variables request indexing. The existing public canonical remains the default until the launch origin is approved. Rebuild after environment changes.

Before launch: review the actual hosted response, confirm its canonical origin and HTTPS redirects, verify every important page is 200, check robots and sitemap, then enable indexing only on production. Use a Search Console URL-prefix property for a hosted subdomain; verify a Domain property only for a domain whose DNS you control. Obtain the token for this agency property; do not reuse Umar's personal portfolio token without matching the property. Submit /sitemap.xml and inspect representative homepage/service/work/article URLs. No Search Console submission has been performed here.

Keep existing public URLs reachable during migration. Determine whether the old host supports redirects before replacing its content. Do not simply leave two indexable copies on different hosts. No DNS or existing production content was changed.

## AEO / GEO / AIO scope

Visible answers, understandable service content, identifiable authors, consistent entities and inspectable project evidence are implemented. These do not guarantee rankings, snippets or AI selection. We did not add an llms.txt file as a supposed Google ranking mechanism, publish synthetic testimonials or claim FAQ rich-result eligibility.

Primary reference reviewed 12 October 2026:
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies

Google's current guidance keeps ordinary search quality practices relevant to generative discovery. At launch also review the production property's Search Console controls for generative features; availability/eligibility remains external. Structured data must describe visible content and is not a special AI inclusion requirement.

## Measurement

Record observation date, property, query, target country/device and data source. Separate brand queries from service queries. Compare relevant impressions, qualified inquiries and organic landing pages over time; do not interpret one personalized search as a universal ranking. Field INP/LCP/CLS require actual traffic or device observation. CI Lighthouse is lab evidence only, and preview noindex intentionally affects SEO audit scores.

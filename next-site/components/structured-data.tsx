import { siteOrigin, contactEmail } from "@/lib/site";
import { pages } from "@/lib/pages";
export function StructuredData({ path, page }: { path: string; page: (typeof pages)[number] }) {
  const organizationId = `${siteOrigin}/#organization`;
  const personId = `${siteOrigin}/about/#umar-ilyas`;
  const isArticle = path.startsWith("/insights/") && path !== "/insights/";
  const organization = {
    "@type": "Organization",
    "@id": organizationId,
    name: "ILYVANTA Digital",
    url: siteOrigin,
    email: contactEmail,
    founder: { "@id": personId },
    sameAs: ["https://github.com/ILYVANTA-Digital"],
  };
  const person = {
    "@type": "Person",
    "@id": personId,
    name: "Umar Ilyas",
    url: `${siteOrigin}/about/`,
    worksFor: { "@id": organizationId },
    sameAs: ["https://www.linkedin.com/in/umar-ilyas-700437268/"],
  };
  const base = {
    "@id": `${siteOrigin}${path}#content`,
    name: page.title,
    description: page.description,
    url: siteOrigin + path,
    inLanguage: "en",
  };
  const entity =
    path.startsWith("/work/") && path !== "/work/"
      ? {
          ...base,
          "@type": "CreativeWork",
          image: siteOrigin + page.image,
          creator: { "@id": organizationId },
          creativeWorkStatus: "Self-directed demonstration project",
        }
      : path.startsWith("/services/") && path !== "/services/"
        ? { ...base, "@type": "Service", provider: { "@id": organizationId } }
        : isArticle
          ? {
              ...base,
              "@type": "Article",
              headline: page.title.split(" — ")[0],
              author: { "@id": personId },
              publisher: { "@id": organizationId },
              mainEntityOfPage: siteOrigin + path,
              image: siteOrigin + page.image,
            }
          : { ...base, "@type": "WebPage", isPartOf: { "@id": `${siteOrigin}/#website` } };
  const parts = path.split("/").filter(Boolean);
  const ancestors = parts
    .map((_, i) => pages.find((p) => p.path === `/${parts.slice(0, i + 1).join("/")}/`))
    .filter((p) => p !== undefined);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      person,
      {
        "@type": "WebSite",
        "@id": `${siteOrigin}/#website`,
        name: "ILYVANTA Digital",
        url: siteOrigin,
        publisher: { "@id": organizationId },
      },
      entity,
      ...(path === "/"
        ? []
        : [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${siteOrigin}/` },
                ...ancestors.map((p, i) => ({
                  "@type": "ListItem",
                  position: i + 2,
                  name: p.title.split(" — ")[0],
                  item: siteOrigin + p.path,
                })),
              ],
            },
          ]),
    ],
  };
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Developer-owned schema escaped for HTML script embedding, never visitor input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

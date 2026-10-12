import { siteOrigin, contactEmail } from "@/lib/site";
import type { pages } from "@/lib/pages";
export function StructuredData({ path, page }: { path: string; page: (typeof pages)[number] }) {
  const organization = {
    "@type": "Organization",
    "@id": `${siteOrigin}/#organization`,
    name: "ILYVANTA Digital",
    url: siteOrigin,
    email: contactEmail,
    founder: {
      "@type": "Person",
      name: "Umar Ilyas",
      sameAs: "https://www.linkedin.com/in/umar-ilyas-700437268/",
    },
    sameAs: ["https://github.com/ILYVANTA-Digital"],
  };
  const entity =
    path.startsWith("/work/") && path !== "/work/"
      ? {
          "@type": "CreativeWork",
          name: page.title,
          description: page.description,
          url: siteOrigin + path,
          image: siteOrigin + page.image,
          creator: { "@id": `${siteOrigin}/#organization` },
          creativeWorkStatus: "Self-directed demonstration project",
        }
      : path.startsWith("/services/") && path !== "/services/"
        ? {
            "@type": "Service",
            name: page.title,
            description: page.description,
            url: siteOrigin + path,
            provider: { "@id": `${siteOrigin}/#organization` },
          }
        : {
            "@type": "WebPage",
            name: page.title,
            description: page.description,
            url: siteOrigin + path,
          };
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      entity,
      ...(path === "/"
        ? [{ "@type": "WebSite", name: "ILYVANTA Digital", url: siteOrigin }]
        : [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${siteOrigin}/` },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: page.title.split(" — ")[0],
                  item: siteOrigin + path,
                },
              ],
            },
          ]),
    ],
  };
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Developer-owned schema with escaped HTML delimiters, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

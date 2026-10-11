import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, pages } from "@/lib/pages";
import { siteOrigin } from "@/lib/site";
import projects from "@/content/projects.json";
import services from "@/content/services.json";
import solutions from "@/content/solutions.json";
import { Homepage } from "@/components/homepage";
import {
  AboutPage,
  BriefArticle,
  CaseStudy,
  InsightsPage,
  PrivacyPage,
  ProcessPage,
  SearchPage,
  ServicePage,
  ServicesPage,
  SolutionPage,
  SolutionsPage,
  WorkPage,
} from "@/components/content-pages";
import { ContactPage } from "@/components/contact-page";
import { StructuredData } from "@/components/structured-data";
type Props = { params: Promise<{ slug?: string[] }> };
const pathFor = (slug?: string[]) => (slug?.length ? `/${slug.join("/")}/` : "/");
export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.path.split("/").filter(Boolean) }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getPage(pathFor((await params).slug));
  if (!page) return {};
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      type: "website",
      title: page.title,
      description: page.description,
      url: siteOrigin + page.path,
      images: [{ url: page.image, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [page.image],
    },
  };
}
export default async function Page({ params }: Props) {
  const path = pathFor((await params).slug);
  const page = getPage(path);
  if (!page) notFound();
  let body: React.ReactNode;
  const project = projects.find((p) => path === `/work/${p.slug}/`);
  const service = services.find((s) => path === `/services/${s.slug}/`);
  const solution = solutions.find((s) => path === `/solutions/${s.slug}/`);
  if (project) body = <CaseStudy project={project} />;
  else if (service) body = <ServicePage service={service} />;
  else if (solution) body = <SolutionPage solution={solution} />;
  else
    switch (path) {
      case "/":
        body = <Homepage />;
        break;
      case "/services/":
        body = <ServicesPage />;
        break;
      case "/work/":
        body = <WorkPage />;
        break;
      case "/solutions/":
        body = <SolutionsPage />;
        break;
      case "/about/":
        body = <AboutPage />;
        break;
      case "/process/":
        body = <ProcessPage />;
        break;
      case "/contact/":
        body = <ContactPage />;
        break;
      case "/insights/":
        body = <InsightsPage />;
        break;
      case "/insights/prepare-a-project-brief/":
        body = <BriefArticle />;
        break;
      case "/privacy/":
        body = <PrivacyPage />;
        break;
      case "/expertise/search-visibility/":
        body = <SearchPage />;
        break;
      default:
        notFound();
    }
  return (
    <main id="main">
      <StructuredData path={path} page={page} />
      {body}
    </main>
  );
}

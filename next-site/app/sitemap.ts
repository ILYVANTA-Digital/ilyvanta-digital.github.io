import type { MetadataRoute } from 'next';
import { pages } from '@/lib/pages';
import { siteOrigin } from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{return pages.map(page=>({url:siteOrigin+page.path}));}

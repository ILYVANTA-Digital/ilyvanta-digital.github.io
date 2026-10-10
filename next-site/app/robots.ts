import type { MetadataRoute } from 'next';
import { siteOrigin,indexable } from '@/lib/site';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:indexable?'/':undefined,disallow:indexable?['/api/','/demo/']:'/'},sitemap:`${siteOrigin}/sitemap.xml`};}

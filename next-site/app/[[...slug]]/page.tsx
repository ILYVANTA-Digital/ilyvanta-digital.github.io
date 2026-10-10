import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPage, pages } from '@/lib/pages';
import { LegacyDocument } from '@/components/legacy-document';
import { siteOrigin } from '@/lib/site';
type Props = {params:Promise<{slug?:string[]}>};
const pathFor = (slug?:string[]) => slug?.length ? `/${slug.join('/')}/` : '/';
export function generateStaticParams(){return pages.map(page=>({slug:page.path.split('/').filter(Boolean)}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const page=getPage(pathFor((await params).slug));if(!page)return {};
 return {title:{absolute:page.title},description:page.description,alternates:{canonical:page.path},
 openGraph:{type:'website',title:page.title,description:page.description,url:siteOrigin+page.path,images:[{url:page.image,alt:'ILYVANTA Digital concept artwork'}]},
 twitter:{card:'summary_large_image',title:page.title,description:page.description,images:[page.image]}};
}
export default async function Page({params}:Props){const page=getPage(pathFor((await params).slug));if(!page)notFound();return <LegacyDocument page={page}/>;}

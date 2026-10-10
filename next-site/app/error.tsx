'use client';
import { HomeLink } from '@/components/home-link';
export default function ErrorPage({reset}:{error:Error & {digest?:string};reset:()=>void}){return <main id="main" className="error-page"><span className="eyebrow">ILYVANTA DIGITAL</span><h1>Let’s try that<br/><em>again.</em></h1><p>The page could not load. Your enquiry has not been submitted by this error screen.</p><button type="button" className="button dark" onClick={reset}>Try again</button><HomeLink>Return home</HomeLink></main>;}

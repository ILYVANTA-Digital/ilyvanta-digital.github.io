import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { siteOrigin, indexable } from '@/lib/site';
import './legacy.css';
import './tokens.css';
import './foundation.css';
export const metadata:Metadata={metadataBase:new URL(siteOrigin),title:{default:'ILYVANTA Digital',template:'%s — ILYVANTA Digital'},robots:{index:indexable,follow:true},manifest:'/manifest.webmanifest'};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#09191f',colorScheme:'light'};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body>{children}
 <Script src="/legacy/app.js" strategy="afterInteractive"/>
 <Script src="/legacy/upgrade.js" strategy="afterInteractive"/>
 <Script src="/legacy/international.js" strategy="afterInteractive"/>
 <noscript><style>{`.menu-toggle{display:none!important}#navigation{display:flex!important;position:static!important;flex-wrap:wrap}.header{flex-wrap:wrap}.motion-reveal{opacity:1!important;transform:none!important}canvas,#globe-motion{display:none!important}`}</style></noscript>
 </body></html>;
}

import type { getPage } from '@/lib/pages';
import { siteOrigin } from '@/lib/site';
type Page = NonNullable<ReturnType<typeof getPage>>;
/** Trusted, checked-in content only. Never pass a request or user-generated HTML here.
 * Temporary migration boundary: native React sections replace it incrementally.
 */
export function LegacyDocument({ page }: { page: Page }) {
  return <>
    <div dangerouslySetInnerHTML={{__html:page.body}} />
    {page.schemas.map(schema => <script key={JSON.stringify(schema)} type="application/ld+json"
      dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replaceAll('https://ilyvanta-digital.umarilyas.chatgpt.site',siteOrigin).replaceAll('<','\\u003c')}} />)}
  </>;
}

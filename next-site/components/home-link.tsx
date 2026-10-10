'use client';
import Link from 'next/link';
/** Full document navigation is required while legacy enhancement scripts are retained. */
export function HomeLink({children,className}:{children:React.ReactNode;className?:string}){
 return <Link href="/" className={className} prefetch={false} onNavigate={event=>{event.preventDefault();window.location.assign('/');}}>{children}</Link>;
}

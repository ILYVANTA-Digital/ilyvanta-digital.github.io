import records from '@/content/legacy-pages.json';
export const pages = records;
export function getPage(path: string) { return pages.find(page => page.path === path); }

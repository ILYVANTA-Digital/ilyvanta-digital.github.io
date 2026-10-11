import records from '@/content/pages.json';
export const pages = records;
export function getPage(path: string) { return pages.find(page => page.path === path); }

// Until a new domain is approved, preserve the current public site's canonical origin.
export const siteOrigin = process.env.SITE_URL || 'https://ilyvanta-digital.umarilyas.chatgpt.site';
export const indexable = process.env.SITE_INDEXABLE === 'true';
export const contactEmail = 'ilyvantadigital@gmail.com';

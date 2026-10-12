export function resolveSitePolicy(env: Record<string, string | undefined>) {
  const raw = env.SITE_URL || "https://ilyvanta-digital.umarilyas.chatgpt.site";
  const url = new URL(raw);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "SITE_URL must be an HTTPS origin without credentials, path, query or fragment.",
    );
  }
  const preview =
    (Boolean(env.CONTEXT) && env.CONTEXT !== "production") ||
    (Boolean(env.VERCEL_ENV) && env.VERCEL_ENV !== "production");
  // A deployment cannot become indexable through a copied shared preview variable.
  const indexable = !preview && env.SITE_INDEXABLE === "true" && Boolean(env.SITE_URL);
  return { siteOrigin: url.origin, indexable };
}

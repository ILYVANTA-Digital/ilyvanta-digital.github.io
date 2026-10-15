import { isIP } from "node:net";
export function trustedNetwork(request: Request, env: Record<string, string | undefined>) {
  // Only use provider-overwritten headers on that provider. Never generic forwarded-for.
  const raw =
    env.NETLIFY === "true"
      ? request.headers.get("x-nf-client-connection-ip")
      : env.VERCEL === "1"
        ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim()
        : undefined;
  return raw && isIP(raw) ? raw : "unknown-network";
}
export function allowedContactOrigin(request: Request, env: Record<string, string | undefined>) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const url = new URL(request.url);
  const allowed = new Set([url.origin, env.SITE_URL]);
  if (env.NETLIFY === "true") {
    for (const key of ["URL", "DEPLOY_URL", "DEPLOY_PRIME_URL"]) {
      if (env[key]) {
        try {
          allowed.add(new URL(env[key]).origin);
        } catch {
          /* invalid configuration grants nothing */
        }
      }
    }
  }
  if (env.VERCEL === "1" && env.VERCEL_URL) allowed.add(`https://${env.VERCEL_URL}`);
  if (!env.VERCEL && !env.NETLIFY && ["localhost", "127.0.0.1", "0.0.0.0"].includes(url.hostname)) {
    allowed.add(`${url.protocol}//localhost:${url.port}`);
    allowed.add(`${url.protocol}//127.0.0.1:${url.port}`);
  }
  return allowed.has(origin);
}

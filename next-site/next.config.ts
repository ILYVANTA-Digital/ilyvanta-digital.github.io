import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
const isDev = process.env.NODE_ENV === "development";
// Static rendering needs inline Next bootstrap scripts. No production unsafe-eval.
const csp = [
  "default-src 'self'",
  "base-uri 'none'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://region1.google-analytics.com",
  "font-src 'self'",
  `connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com${isDev ? " ws: wss:" : ""}`,
  "frame-src 'none'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
].join("; ");
const nextConfig: NextConfig = {
  trailingSlash: true,
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,
  async redirects() {
    return ["hotel", "clinic", "cafe", "sports"].map((slug) => ({
      source: `/demo/${slug}/`,
      destination: `https://ilyvanta-digital.umarilyas.chatgpt.site/demo/${slug}/`,
      permanent: false,
    }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
    ];
  },
};
export default bundleAnalyzer({ enabled: process.env.ANALYZE === "true", openAnalyzer: false })(
  nextConfig,
);

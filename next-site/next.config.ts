import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  trailingSlash: true,
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,
  async redirects() {
    return ['hotel','clinic','cafe','sports'].map(slug => ({
      source: `/demo/${slug}/`,
      destination: `https://ilyvanta-digital.umarilyas.chatgpt.site/demo/${slug}/`,
      permanent: false,
    }));
  },
  async headers() {
    return [{ source: '/:path*', headers: [
      {key:'X-Content-Type-Options',value:'nosniff'},
      {key:'X-Frame-Options',value:'DENY'},
      {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
      {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'},
      {key:'Strict-Transport-Security',value:'max-age=31536000; includeSubDomains'},
    ]}];
  },
};
export default nextConfig;

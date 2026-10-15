import { AnalyticsConsent } from "@/components/analytics-consent";
import { pages } from "@/lib/pages";
import type { Metadata, Viewport } from "next";
import { siteOrigin, indexable } from "@/lib/site";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/site-shell";
import "./tokens.css";
import "./studio.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: "ILYVANTA Digital", template: "%s — ILYVANTA Digital" },
  robots: { index: indexable, follow: true },
  manifest: "/manifest.webmanifest",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09191f",
  colorScheme: "light",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
  const analytics =
    indexable && process.env.ANALYTICS_ENABLED === "true" && /^G-[A-Z0-9]+$/.test(id);
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        {children}
        <Footer />
        {analytics && <AnalyticsConsent measurementId={id} routes={pages.map((p) => p.path)} />}
        <noscript>
          <style>{`.menu-toggle{display:none}#navigation{display:flex;position:static;flex-wrap:wrap}.site-header{flex-wrap:wrap}`}</style>
        </noscript>
      </body>
    </html>
  );
}

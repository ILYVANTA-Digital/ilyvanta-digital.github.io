"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { safeEvent } from "@/lib/analytics-policy";
type Choice = "unknown" | "granted" | "denied";
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}
const storageKey = "ilyvanta-analytics-choice-v1";
export function AnalyticsConsent({
  measurementId,
  routes,
}: {
  measurementId: string;
  routes: string[];
}) {
  const path = usePathname();
  const [choice, setChoice] = useState<Choice>("unknown");
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState("");
  const loaded = useRef(false);
  const sentPath = useRef("");
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored === "granted" || stored === "denied") setChoice(stored);
    } catch {
      /* consent remains undecided when storage is unavailable */
    }
  }, []);
  useEffect(() => {
    const win = window;
    win[`ga-disable-${measurementId}`] = choice !== "granted";
    if (choice !== "granted") return;
    if (!loaded.current) {
      win.dataLayer ??= [];
      // gtag expects Arguments objects in dataLayer.
      win.gtag = function () {
        // biome-ignore lint/complexity/noArguments: The Google tag command queue uses Arguments objects as its documented protocol.
        win.dataLayer?.push(arguments);
      };
      win.gtag("consent", "default", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      win.gtag("js", new Date());
      win.gtag("config", measurementId, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        cookie_domain: "none",
        page_referrer: "",
        page_location: location.origin + path,
      });
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.async = true;
      script.onerror = () =>
        setStatus("Analytics could not load. Your website access is unaffected.");
      document.head.appendChild(script);
      loaded.current = true;
    }
    const send = (name: string) => {
      const event = safeEvent(name, path, routes);
      if (!event) return;
      win.gtag?.("event", event.name, {
        page_location: location.origin + event.path,
        page_referrer: "",
        page_title: document.title,
      });
    };
    if (sentPath.current !== path) {
      send("page_view");
      if (path.startsWith("/work/") && path !== "/work/") send("case_study_opened");
      if (path.startsWith("/services/") && path !== "/services/") send("service_opened");
      sentPath.current = path;
    }
    const click = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href.startsWith("mailto:")) send("email_click");
      else if (href.startsWith("https://wa.me/")) send("whatsapp_click");
      else if (href.startsWith("/contact/")) {
        send("cta_click");
        send("start_project");
      }
    };
    const convert = (event: Event) => {
      if (
        event instanceof CustomEvent &&
        ["contact_started", "contact_submitted"].includes(event.detail)
      )
        send(event.detail);
    };
    document.addEventListener("click", click);
    window.addEventListener("studio-conversion", convert);
    return () => {
      document.removeEventListener("click", click);
      window.removeEventListener("studio-conversion", convert);
    };
  }, [choice, measurementId, path, routes]);
  function choose(value: "granted" | "denied") {
    window[`ga-disable-${measurementId}`] = value !== "granted";
    try {
      localStorage.setItem(storageKey, value);
    } catch {
      /* current-session choice still works */
    }
    setChoice(value);
    setEditing(false);
    if (value === "denied") {
      // Only our host-scoped analytics cookies; preference storage is retained.
      for (const cookie of document.cookie.split(";")) {
        const name = cookie.split("=")[0].trim();
        if (name === "_ga" || name.startsWith("_ga_"))
          // biome-ignore lint/suspicious/noDocumentCookie: Remove only host-scoped GA cookies, including browsers without Cookie Store support.
          document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
      }
    }
  }
  return (
    <aside className="analytics-choice wrap" aria-label="Analytics preferences">
      {choice === "unknown" || editing ? (
        <>
          <p>
            May we use optional Google Analytics to understand page visits and project inquiries?
            Form answers are not included. <a href="/privacy/">Read the privacy notice</a>.
          </p>
          <div className="button-row">
            <button type="button" className="button dark" onClick={() => choose("granted")}>
              Allow analytics
            </button>
            <button type="button" className="button dark" onClick={() => choose("denied")}>
              Decline analytics
            </button>
          </div>
        </>
      ) : (
        <button type="button" className="text-link" onClick={() => setEditing(true)}>
          Analytics preferences
        </button>
      )}
      <p role="status">{status}</p>
    </aside>
  );
}

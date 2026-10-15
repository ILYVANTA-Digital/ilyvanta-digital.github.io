export const analyticsEvents = [
  "page_view",
  "cta_click",
  "start_project",
  "contact_started",
  "contact_submitted",
  "case_study_opened",
  "service_opened",
  "whatsapp_click",
  "email_click",
] as const;
export type AnalyticsEvent = (typeof analyticsEvents)[number];
export function safeEvent(name: string, path: string, routes: readonly string[]) {
  const cleanPath = path.split(/[?#]/)[0];
  if (!analyticsEvents.includes(name as AnalyticsEvent) || !routes.includes(cleanPath)) return null;
  return { name: name as AnalyticsEvent, path: cleanPath };
}
export function announceConversion(name: AnalyticsEvent) {
  if (typeof window !== "undefined")
    window.dispatchEvent(new CustomEvent("studio-conversion", { detail: name }));
}

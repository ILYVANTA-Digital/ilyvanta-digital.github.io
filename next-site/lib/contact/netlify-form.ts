import { inquirySchema } from "./schema.ts";

type Result = { ok: boolean; message: string; fields?: Record<string, string> };

// Netlify's static form endpoint handles storage, spam filtering and notifications.
// The database/Resend API remains a separately configured transport.
export async function submitNetlifyInquiry(input: unknown, send: typeof fetch = fetch): Promise<Result> {
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] || "form");
      fields[key] ??= issue.message;
    }
    return { ok: false, message: "Please check the highlighted fields.", fields };
  }
  const body = new URLSearchParams({ "form-name": "project-inquiry" });
  for (const [key, value] of Object.entries(parsed.data)) {
    body.set(key, Array.isArray(value) ? value.join(", ") : String(value));
  }
  const response = await send("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) {
    return { ok: false, message: "We could not confirm your inquiry. Your entries are still here. Please try again or email ilyvantadigital@gmail.com." };
  }
  return { ok: true, message: "Thank you. Your inquiry was received for review. This is not a booking or project confirmation. Please email the studio if you need to follow up." };
}

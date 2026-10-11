import { after } from "next/server";
import { inquirySchema } from "@/lib/contact/schema";
import { InputError, readInquiryBody, contactReply } from "@/lib/contact/http";
import { contactConfigured, consumeRateLimit, saveInquiry } from "@/lib/contact/store";
import { deliverOutbox } from "@/lib/contact/email";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    const allowed = new Set([
      new URL(request.url).origin,
      process.env.SITE_URL,
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
    ]);
    const requestUrl = new URL(request.url);
    if (!process.env.VERCEL && ["localhost", "127.0.0.1"].includes(requestUrl.hostname)) {
      allowed.add(`${requestUrl.protocol}//localhost:${requestUrl.port}`);
      allowed.add(`${requestUrl.protocol}//127.0.0.1:${requestUrl.port}`);
    }
    if (!origin || !allowed.has(origin))
      return contactReply(request, 403, "Please submit the inquiry from this website.");
    const body = await readInquiryBody(request);
    const parsed = inquirySchema.safeParse(body);
    if (!parsed.success) {
      const fields: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] || "form");
        fields[key] ??= issue.message;
      }
      return contactReply(request, 400, "Please check the highlighted fields and try again.", {
        fields,
      });
    }
    if (parsed.data.websiteCompany)
      return contactReply(request, 202, "Thank you for your inquiry.");
    if (!contactConfigured())
      return contactReply(
        request,
        503,
        "The project form is temporarily unavailable. Please email ilyvantadigital@gmail.com; your details have not been saved.",
      );
    // Vercel overwrites this provider header; never trust arbitrary x-forwarded-for.
    const network =
      process.env.VERCEL === "1"
        ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() || "unknown"
        : "non-vercel";
    const limits = await Promise.all([
      consumeRateLimit(`network:${network}`, 5, 900),
      consumeRateLimit(`email:${parsed.data.email}`, 3, 86400),
      consumeRateLimit("all", 100, 86400),
    ]);
    if (limits.some((value) => !value))
      return contactReply(
        request,
        429,
        "Too many attempts. Please wait before trying again, or email the studio.",
      );
    const result = await saveInquiry(parsed.data);
    if (result.conflict)
      return contactReply(
        request,
        409,
        "This form reference has already been used. Reload the page to start a new inquiry.",
      );
    after(async () => {
      try {
        await deliverOutbox(result.id);
      } catch {
        console.error("contact_notification_deferred");
      }
    });
    return contactReply(
      request,
      201,
      "Your inquiry has been saved. A confirmation email will follow if delivery succeeds.",
      { reference: result.id },
    );
  } catch (error) {
    if (error instanceof InputError) return contactReply(request, error.status, error.message);
    console.error("contact_request_failed");
    return contactReply(
      request,
      503,
      "We could not confirm your submission. Please email the studio rather than sending it repeatedly.",
    );
  }
}

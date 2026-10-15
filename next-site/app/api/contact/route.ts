import { after } from "next/server";
import { allowedContactOrigin, trustedNetwork } from "@/lib/contact/network";
import { inquirySchema } from "@/lib/contact/schema";
import { InputError, readInquiryBody, contactReply } from "@/lib/contact/http";
import { contactConfigured, consumeRateLimit, saveInquiry } from "@/lib/contact/store";
import { deliverOutbox } from "@/lib/contact/email";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function POST(request: Request) {
  try {
    if (!allowedContactOrigin(request, process.env))
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
    const network = trustedNetwork(request, process.env);
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

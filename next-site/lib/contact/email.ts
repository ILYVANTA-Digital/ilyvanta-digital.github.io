import { database } from "./store.ts";
// Outbox messages are plain text. Never insert user text into HTML or mail headers.
export async function deliverOutbox(leadId?: string) {
  const sql = database();
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM)
    throw new Error("Email unavailable");
  // Retry only within Resend's idempotency window. Older uncertain sends need operator review.
  const rows =
    await sql`UPDATE contact_outbox SET state='sending',claimed_at=now(),attempts=attempts+1 WHERE id IN (SELECT id FROM contact_outbox WHERE (state IN ('pending','failed') OR (state='sending' AND claimed_at<now()-interval '2 minutes')) AND attempts<4 AND created_at>now()-interval '23 hours' AND (${leadId ?? null}::uuid IS NULL OR lead_id=${leadId ?? null}::uuid) ORDER BY id LIMIT 10 FOR UPDATE SKIP LOCKED) RETURNING id,lead_id,kind`;
  let sent = 0;
  for (const row of rows) {
    try {
      const [lead] = await sql`SELECT * FROM leads WHERE id=${row.lead_id}`;
      if (!lead) continue;
      const receipt = row.kind === "receipt";
      const lines = [
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Company: ${lead.company}`,
        `Country: ${lead.country}`,
        `Website: ${lead.website}`,
        `Project: ${lead.project_type}`,
        `Stage: ${lead.project_stage}`,
        `Problem: ${lead.problem}`,
        `Budget: ${lead.budget}`,
        `Timeline: ${lead.timeline}`,
        `Services: ${lead.services.join(", ")}`,
        `Message: ${lead.message}`,
        `Lead score (context only): ${lead.lead_score}`,
      ];
      const body = {
        from: process.env.CONTACT_FROM,
        to: [receipt ? lead.email : "ilyvantadigital@gmail.com"],
        reply_to: receipt ? "ilyvantadigital@gmail.com" : lead.email,
        subject: receipt
          ? "Your project inquiry — ILYVANTA Digital"
          : "New ILYVANTA Project Inquiry",
        text: receipt
          ? `Thanks — your project inquiry has been received.\n\nWe’ll review what you shared and reply if we need more details. Scope, pricing and timing are agreed separately.\n\nReference: ${lead.id}\n\nILYVANTA Digital\nilyvantadigital@gmail.com`
          : lines.join("\n\n"),
      };
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `inquiry-${row.lead_id}-${row.kind}`,
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error("Provider rejected send");
      const data = await response.json();
      if (typeof data.id !== "string") throw new Error("Missing provider reference");
      await sql`UPDATE contact_outbox SET state='sent',sent_at=now(),provider_id=${data.id},last_error=NULL WHERE id=${row.id}`;
      sent++;
    } catch {
      await sql`UPDATE contact_outbox SET state='failed',last_error='send_failed' WHERE id=${row.id}`;
    }
  }
  return { attempted: rows.length, sent };
}

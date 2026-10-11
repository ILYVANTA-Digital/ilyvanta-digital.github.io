import { createHmac, createHash } from "node:crypto";
import postgres from "postgres";
import { type Inquiry, scoreInquiry } from "./schema.ts";
let client: ReturnType<typeof postgres> | undefined;
export function database() {
  if (!process.env.DATABASE_URL) throw new Error("Database unavailable");
  client ??= postgres(process.env.DATABASE_URL, {
    max: 3,
    idle_timeout: 20,
    connect_timeout: 8,
    prepare: false,
  });
  return client;
}
export function contactConfigured() {
  return Boolean(
    process.env.DATABASE_URL &&
      process.env.RESEND_API_KEY &&
      process.env.CONTACT_FROM &&
      process.env.RATE_LIMIT_SECRET &&
      process.env.CONTACT_ENABLED === "true",
  );
}
function hash(value: string) {
  const secret = process.env.RATE_LIMIT_SECRET;
  if (!secret) throw new Error("Rate limit configuration missing");
  return createHmac("sha256", secret).update(value).digest("hex");
}
export async function consumeRateLimit(key: string, limit: number, seconds: number) {
  const sql = database();
  const bucket = Math.floor(Date.now() / (seconds * 1000));
  const expires = new Date((bucket + 1) * seconds * 1000);
  const rows =
    await sql`INSERT INTO contact_rate_limits(key,bucket,hits,expires_at) VALUES(${hash(key)},${bucket},1,${expires}) ON CONFLICT(key,bucket) DO UPDATE SET hits=contact_rate_limits.hits+1 RETURNING hits`;
  return rows[0].hits <= limit;
}
export async function saveInquiry(input: Inquiry) {
  const sql = database();
  const { submissionId, websiteCompany: _trap, ...payload } = input;
  const digest = createHash("sha256").update(JSON.stringify(payload)).digest("hex");
  return sql.begin(async (tx) => {
    const added =
      await tx`INSERT INTO leads(id,payload_hash,name,email,company,website,country,project_type,project_stage,problem,budget,timeline,services,message,source,utm_source,utm_campaign,lead_score) VALUES(${submissionId},${digest},${input.name},${input.email},${input.company},${input.website},${input.country},${input.projectType},${input.stage},${input.problem},${input.budget},${input.timeline},${tx.json(input.services)},${input.message},${input.source},${input.utmSource},${input.utmCampaign},${scoreInquiry(input)}) ON CONFLICT(id) DO NOTHING RETURNING id`;
    if (!added.length) {
      const existing = await tx`SELECT payload_hash FROM leads WHERE id=${submissionId}`;
      return { id: submissionId, conflict: existing[0]?.payload_hash !== digest };
    }
    await tx`INSERT INTO contact_outbox(lead_id,kind) VALUES(${submissionId},'agency'),(${submissionId},'receipt')`;
    return { id: submissionId, conflict: false };
  });
}
export async function closeDatabase() {
  await client?.end();
  client = undefined;
}

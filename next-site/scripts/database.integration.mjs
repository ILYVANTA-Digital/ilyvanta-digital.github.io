import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
const connection = process.env.TEST_DATABASE_URL;
if (!connection || new URL(connection).pathname !== "/ilyvanta_test")
  throw new Error("Use a dedicated disposable database named ilyvanta_test via TEST_DATABASE_URL.");
process.env.DATABASE_URL = connection;
process.env.RATE_LIMIT_SECRET = "integration-test-secret-not-for-production";
process.env.RESEND_API_KEY = "test-only-intercepted";
process.env.CONTACT_FROM = "Studio <studio@example.com>";
const { database, saveInquiry, consumeRateLimit, closeDatabase } = await import(
  "../lib/contact/store.ts"
);
const { inquirySchema } = await import("../lib/contact/schema.ts");
const { deliverOutbox } = await import("../lib/contact/email.ts");
const sql = database();
await sql.unsafe(await fs.readFile(new URL("../db/001_leads.sql", import.meta.url), "utf8"));
await sql`TRUNCATE contact_outbox,leads,contact_rate_limits RESTART IDENTITY CASCADE`;
const fixture = () =>
  inquirySchema.parse({
    submissionId: randomUUID(),
    name: "Test Person",
    email: "person@example.com",
    company: "Demo",
    website: "https://example.com",
    country: "Pakistan",
    projectType: "New website",
    stage: "Ready to plan",
    problem: "A fictional project used for isolated integration testing.",
    budget: "Not sure",
    timeline: "Flexible",
    services: ["Web experiences"],
    source: "test",
    message: "",
    consent: true,
  });
test("real PostgreSQL: concurrent duplicate submissions store one lead and two outbox messages", async () => {
  const input = fixture();
  const results = await Promise.all(Array.from({ length: 5 }, () => saveInquiry(input)));
  assert.ok(results.every((r) => !r.conflict));
  const rows = await sql`SELECT * FROM leads WHERE id=${input.submissionId}`;
  assert.equal(rows.length, 1);
  assert.equal(rows[0].email, input.email);
  assert.deepEqual(rows[0].services, input.services);
  assert.equal(
    (await sql`SELECT * FROM contact_outbox WHERE lead_id=${input.submissionId}`).length,
    2,
  );
  const changed = await saveInquiry({
    ...input,
    problem: "Different content using the same reference.",
  });
  assert.equal(changed.conflict, true);
});
test("real PostgreSQL: concurrent rate limiter cannot admit more than its limit", async () => {
  const key = `test:${randomUUID()}`;
  const results = await Promise.all(
    Array.from({ length: 12 }, () => consumeRateLimit(key, 3, 900)),
  );
  assert.equal(results.filter(Boolean).length, 3);
  const rows = await sql`SELECT key FROM contact_rate_limits`;
  assert.ok(rows.every((r) => !r.key.includes("test:")));
});
test("real PostgreSQL: provider failure keeps durable retryable outbox; intercepted retry sends each message once", async () => {
  const input = fixture();
  await saveInquiry(input);
  const original = globalThis.fetch;
  const keys = [];
  try {
    globalThis.fetch = async () => new Response("{}", { status: 500 });
    const failed = await deliverOutbox(input.submissionId);
    assert.equal(failed.sent, 0);
    assert.equal(
      (
        await sql`SELECT * FROM contact_outbox WHERE lead_id=${input.submissionId} AND state='failed'`
      ).length,
      2,
    );
    globalThis.fetch = async (url, init) => {
      assert.equal(url, "https://api.resend.com/emails");
      const body = JSON.parse(init.body);
      assert.ok(body.text);
      assert.equal(body.html, undefined);
      keys.push(init.headers["Idempotency-Key"]);
      return Response.json({ id: randomUUID() });
    };
    const sent = await deliverOutbox(input.submissionId);
    assert.equal(sent.sent, 2);
    assert.equal(new Set(keys).size, 2);
    assert.equal((await deliverOutbox(input.submissionId)).attempted, 0);
  } finally {
    globalThis.fetch = original;
  }
});
test.after(async () => {
  await closeDatabase();
});

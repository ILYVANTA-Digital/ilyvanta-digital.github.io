import test from "node:test";
import assert from "node:assert/strict";
import { inquirySchema, scoreInquiry } from "../lib/contact/schema.ts";
import { readInquiryBody, contactReply, maxBodyBytes } from "../lib/contact/http.ts";
import { submitNetlifyInquiry } from "../lib/contact/netlify-form.ts";
import { readFileSync } from "node:fs";
export const valid = {
  submissionId: "ac23936f-a2f3-4b8d-a3ed-93db0bc73e0a",
  name: " Demo   Person ",
  email: "DEMO@example.com",
  company: "Example",
  website: "https://example.com",
  country: "Pakistan",
  projectType: "New website",
  stage: "Exploring options",
  problem: "Visitors cannot find the right service or send an inquiry.",
  budget: "Under $1k",
  timeline: "Flexible",
  services: ["Web experiences"],
  source: "",
  message: "",
  consent: true,
  websiteCompany: "",
  utmSource: "",
  utmCampaign: "",
};
test("valid inquiry is normalized; modest budgets remain accepted", () => {
  const result = inquirySchema.parse(valid);
  assert.equal(result.name, "Demo Person");
  assert.equal(result.email, "demo@example.com");
  assert.ok(scoreInquiry(result) > 0);
});
test("Netlify transport posts URL-encoded fields to the registered static form", async () => {
  let calls = 0;
  const skeleton = readFileSync(new URL("../public/__forms.html", import.meta.url), "utf8");
  const result = await submitNetlifyInquiry(valid, async (url, init) => {
    calls++;
    assert.equal(url, "/__forms.html");
    assert.equal(init.method, "POST");
    assert.equal(init.headers["Content-Type"], "application/x-www-form-urlencoded");
    const body = new URLSearchParams(init.body);
    assert.equal(body.get("form-name"), "project-inquiry");
    assert.equal(body.get("email"), "demo@example.com");
    assert.equal(body.get("consent"), "true");
    assert.equal(body.get("services"), "Web experiences");
    for (const key of body.keys()) assert.ok(skeleton.includes(`name="${key}"`), key);
    return new Response("<html>Success</html>", { status: 200 });
  });
  assert.equal(calls, 1);
  assert.equal(result.ok, true);
  assert.match(result.message, /received for review/);
});
test("Netlify transport rejects invalid inquiries and does not report HTTP failures as success", async () => {
  let calls = 0;
  const send = async () => { calls++; return new Response("Unavailable", { status: 503 }); };
  const invalid = await submitNetlifyInquiry({ ...valid, services: [] }, send);
  assert.equal(invalid.ok, false);
  assert.match(invalid.fields.services, /Choose at least one service/);
  assert.equal(calls, 0);
  const unavailable = await submitNetlifyInquiry(valid, send);
  assert.equal(unavailable.ok, false);
  assert.match(unavailable.message, /could not confirm/);
  await assert.rejects(submitNetlifyInquiry(valid, async () => { throw new Error("offline"); }), /offline/);
});
test("server schema rejects injection-like URLs, extra keys, missing consent and oversize values", () => {
  for (const patch of [
    { website: "javascript:alert(1)" },
    { email: "x@example.com\r\nBcc:a@example.com" },
    { consent: false },
    { services: [] },
    { problem: "x".repeat(1501) },
    { name: "" },
    { admin: true },
  ])
    assert.equal(
      inquirySchema.safeParse({ ...valid, ...patch }).success,
      false,
      JSON.stringify(patch).slice(0, 80),
    );
});
test("JSON and browser form submissions parse consistently", async () => {
  const json = await readInquiryBody(
    new Request("http://localhost/api/contact/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valid),
    }),
  );
  assert.deepEqual(json, valid);
  const values = new URLSearchParams({ ...valid, services: undefined, consent: "true" });
  values.delete("services");
  values.append("services", "Web experiences");
  values.append("services", "Dashboards");
  const form = await readInquiryBody(
    new Request("http://localhost/api/contact/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: values,
    }),
  );
  assert.deepEqual(form.services, ["Web experiences", "Dashboards"]);
  assert.equal(form.consent, true);
});
test("body reader rejects unsupported, malformed and oversized data even without content-length", async () => {
  for (const [headers, body, status] of [
    [{ "Content-Type": "text/plain" }, "hello", 415],
    [{ "Content-Type": "application/json" }, "{", 400],
    [{ "Content-Type": "application/json" }, "x".repeat(maxBodyBytes + 1), 413],
  ]) {
    await assert.rejects(
      () => readInquiryBody(new Request("http://localhost", { method: "POST", headers, body })),
      (e) => e.status === status,
    );
  }
});
test("error responses are uncached and HTML-safe without reflecting submitted content", async () => {
  const r = contactReply(new Request("http://localhost"), 503, "Try <again> & email");
  assert.equal(r.headers.get("cache-control"), "no-store");
  assert.match(await r.text(), /Try &lt;again&gt; &amp; email/);
  const j = contactReply(
    new Request("http://localhost", { headers: { Accept: "application/json" } }),
    429,
    "Please wait",
  );
  assert.equal(j.headers.get("retry-after"), "900");
  assert.equal((await j.json()).ok, false);
});

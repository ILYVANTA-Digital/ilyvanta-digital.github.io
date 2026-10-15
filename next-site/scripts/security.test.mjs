import test from "node:test";
import assert from "node:assert/strict";
import { trustedNetwork, allowedContactOrigin } from "../lib/contact/network.ts";
import { safeEvent } from "../lib/analytics-policy.ts";
test("provider IP selection ignores visitor forwarding headers and invalid addresses", () => {
  const request = new Request("https://preview.example/api/contact/", {
    headers: {
      "x-forwarded-for": "1.2.3.4",
      "x-nf-client-connection-ip": "2001:db8::1",
      "x-vercel-forwarded-for": "192.0.2.1",
    },
  });
  assert.equal(trustedNetwork(request, {}), "unknown-network");
  assert.equal(trustedNetwork(request, { NETLIFY: "true" }), "2001:db8::1");
  assert.equal(trustedNetwork(request, { VERCEL: "1" }), "192.0.2.1");
  const malformed = new Request(request, { headers: { "x-nf-client-connection-ip": "invalid" } });
  assert.equal(trustedNetwork(malformed, { NETLIFY: "true" }), "unknown-network");
});
test("contact origin accepts exact provider preview, rejects suffix spoofing and null origin", () => {
  const env = { NETLIFY: "true", DEPLOY_PRIME_URL: "https://preview.example" };
  for (const origin of ["https://evil.example", "https://preview.example.evil.example", "null"]) {
    assert.equal(
      allowedContactOrigin(
        new Request("https://internal.example/api/contact", { headers: { origin } }),
        env,
      ),
      false,
    );
  }
  assert.equal(
    allowedContactOrigin(
      new Request("https://internal.example/api/contact", {
        headers: { origin: "https://preview.example" },
      }),
      env,
    ),
    true,
  );
  assert.equal(
    allowedContactOrigin(new Request("https://preview.example/api/contact"), env),
    false,
  );
});
test("analytics payloads only contain known event names and registered paths", () => {
  const paths = ["/contact/", "/services/"];
  assert.deepEqual(
    safeEvent("contact_submitted", "/contact/?email=private@example.com#secret", paths),
    { name: "contact_submitted", path: "/contact/" },
  );
  assert.equal(safeEvent("email:private@example.com", "/contact/", paths), null);
  assert.equal(safeEvent("page_view", "/unknown-person@example.com/", paths), null);
});

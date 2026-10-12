import assert from "node:assert/strict";
import fs from "node:fs";
const root = process.env.TEST_BASE_URL || "http://localhost:4173";
const pages = JSON.parse(fs.readFileSync(new URL("../content/pages.json", import.meta.url)));
const paths = new Set(pages.map((p) => p.path));
let checks = 0;
for (const p of pages) {
  const r = await fetch(root + p.path);
  assert.equal(r.status, 200, p.path);
  const html = await r.text();
  assert.ok(
    html.includes(p.title.replaceAll("&", "&amp;")) || html.includes(p.title),
    `${p.path} title`,
  );
  assert.match(html, /<main/);
  assert.match(html, /application\/ld\+json/);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  assert.equal(new URL(canonical[1]).pathname, p.path);
  assert.doesNotMatch(html, /<meta name="keywords"/);
  checks += 6;
  for (const match of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    const href = match[1];
    if (
      href.startsWith("/_next/") ||
      href.startsWith("/assets/") ||
      href.startsWith("/demo/") ||
      href === "/manifest.webmanifest" ||
      href === "/icon.svg"
    )
      continue;
    assert.ok(paths.has(href), `${p.path} links to ${href}`);
    checks++;
  }
  for (const schema of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) {
    assert.equal(JSON.parse(schema[1])["@context"], "https://schema.org");
    checks++;
  }
}
for (const slug of ["hotel", "clinic", "cafe", "sports"]) {
  const r = await fetch(`${root}/demo/${slug}/`, { redirect: "manual" });
  assert.equal(r.status, 307);
  assert.equal(
    r.headers.get("location"),
    `https://ilyvanta-digital.umarilyas.chatgpt.site/demo/${slug}/`,
  );
  checks += 2;
}
for (const path of ["/sitemap.xml", "/robots.txt", "/manifest.webmanifest", "/icon.svg"]) {
  assert.equal((await fetch(root + path)).status, 200, path);
  checks++;
}
const sitemap = await (await fetch(`${root}/sitemap.xml`)).text();
for (const p of pages) {
  assert.ok(sitemap.includes(`${p.path}</loc>`));
  checks++;
}
assert.equal((await fetch(`${root}/does-not-exist/`)).status, 404);
checks++;
const robots = await (await fetch(`${root}/robots.txt`)).text();
assert.match(robots, /Disallow: \//);
checks++;
const post = async (body, origin = root, type = "application/json") =>
  fetch(`${root}/api/contact/`, {
    method: "POST",
    headers: { Origin: origin, "Content-Type": type, Accept: "application/json" },
    body: JSON.stringify(body),
  });
assert.equal((await post({}, "https://untrusted.example")).status, 403);
checks++;
assert.equal((await post({})).status, 400);
checks++;
assert.equal((await post({ message: "x".repeat(17000) })).status, 413);
checks++;
const valid = {
  submissionId: "ac23936f-a2f3-4b8d-a3ed-93db0bc73e0a",
  name: "Test Visitor",
  email: "test@example.com",
  company: "",
  website: "",
  country: "Pakistan",
  projectType: "New website",
  stage: "Exploring options",
  problem: "A useful business website.",
  budget: "Not sure",
  timeline: "Flexible",
  services: ["Web experiences"],
  source: "",
  message: "",
  consent: true,
  websiteCompany: "",
};
assert.equal((await post({ ...valid, websiteCompany: "spam" })).status, 202);
checks++;
const unavailable = await post(valid);
assert.equal(unavailable.status, 503);
assert.match((await unavailable.json()).message, /not been saved/);
checks += 2;
console.log(
  "PASS",
  checks,
  "production route, internal-link, metadata, schema, redirect and safe contact API checks.",
);

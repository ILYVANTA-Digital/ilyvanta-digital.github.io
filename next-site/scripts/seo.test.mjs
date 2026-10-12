import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { resolveSitePolicy } from "../lib/site-policy.ts";
const read = (name) =>
  JSON.parse(fs.readFileSync(new URL(`../content/${name}.json`, import.meta.url)));
test("preview deployments stay noindex even with copied production variables", () => {
  for (const env of [
    { CONTEXT: "deploy-preview" },
    { CONTEXT: "branch-deploy" },
    { VERCEL_ENV: "preview" },
  ]) {
    assert.equal(
      resolveSitePolicy({ ...env, SITE_URL: "https://studio.example/", SITE_INDEXABLE: "true" })
        .indexable,
      false,
    );
  }
  assert.equal(resolveSitePolicy({ SITE_INDEXABLE: "true" }).indexable, false);
  assert.deepEqual(
    resolveSitePolicy({
      CONTEXT: "production",
      SITE_URL: "https://studio.example/",
      SITE_INDEXABLE: "true",
    }),
    { siteOrigin: "https://studio.example", indexable: true },
  );
});
test("canonical configuration rejects unsafe or ambiguous origins", () => {
  for (const value of [
    "http://studio.example",
    "https://user:password@studio.example",
    "https://studio.example/subpath",
    "https://studio.example/?x=y",
    "https://studio.example/#a",
  ]) {
    assert.throws(() => resolveSitePolicy({ SITE_URL: value }));
  }
});
test("every service has buyer answers and every article has a reachable service", () => {
  const faqs = read("service-faqs"),
    pages = read("pages");
  for (const service of read("services")) {
    assert.equal(faqs[service.slug].length, 3);
    for (const q of faqs[service.slug])
      assert.ok(q.answer.length > 100 && q.question.endsWith("?"));
  }
  for (const article of read("articles")) {
    assert.ok(pages.some((p) => p.path === `/insights/${article.slug}/`));
    assert.ok(pages.some((p) => p.path === `/services/${article.service}/`));
    assert.ok(article.sections.length >= 4);
    for (const source of article.sources) assert.equal(new URL(source.url).protocol, "https:");
  }
});

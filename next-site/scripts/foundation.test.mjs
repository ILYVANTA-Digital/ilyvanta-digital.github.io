import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const read = (name) =>
  JSON.parse(fs.readFileSync(new URL(`../content/${name}.json`, import.meta.url)));
const pages = read("pages");
const legacy = read("legacy-pages");
const projects = read("projects");
test("legacy URLs are preserved and all native routes have unique concise metadata", () => {
  for (const old of legacy)
    assert.ok(
      pages.some((p) => p.path === old.path),
      old.path,
    );
  assert.equal(pages.length, 26);
  assert.equal(new Set(pages.map((p) => p.path)).size, pages.length);
  assert.equal(new Set(pages.map((p) => p.title)).size, pages.length);
  assert.equal(new Set(pages.map((p) => p.description)).size, pages.length);
  for (const p of pages) {
    assert.ok(p.description.length < 155, `${p.path}: ${p.description.length}`);
    assert.ok(p.description.length > 35);
    assert.ok(fs.existsSync(new URL(`../public${p.image}`, import.meta.url)));
  }
});
test("every case study has its own social image, working-demo destination and honest scope", () => {
  assert.equal(projects.length, 4);
  assert.equal(new Set(projects.map((p) => p.image)).size, 4);
  assert.equal(new Set(projects.map((p) => p.demo)).size, 4);
  for (const p of projects) {
    for (const key of [
      "challenge",
      "research",
      "architecture",
      "ux",
      "ui",
      "tests",
      "limits",
      "lesson",
      "next",
      "metrics",
    ])
      assert.ok(p[key].length > 40, `${p.slug}/${key}`);
    assert.equal(p.steps.length, 3);
  }
});
test("services and solutions link to real content, not placeholder destinations", () => {
  for (const s of read("services")) {
    assert.ok(projects.some((p) => p.slug === s.project));
    assert.equal(s.deliverables.length, 4);
  }
  for (const s of read("solutions")) {
    assert.ok(projects.some((p) => p.slug === s.project));
    assert.ok(read("services").some((p) => p.slug === s.service));
  }
});
test("native content no longer loads the legacy HTML adapter or scripts", () => {
  const layout = fs.readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(layout, /legacy|afterInteractive/);
  for (const name of fs.readdirSync(new URL("../components/", import.meta.url))) {
    const source = fs.readFileSync(new URL(`../components/${name}`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /<img\b/, name);
  }
});

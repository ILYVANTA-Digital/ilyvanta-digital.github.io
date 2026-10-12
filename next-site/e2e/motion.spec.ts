import { test, expect } from "@playwright/test";
import fs from "node:fs";
const manifest = JSON.parse(fs.readFileSync(".next/react-loadable-manifest.json", "utf8"));
const sceneFiles = (Object.values(manifest) as { files: string[] }[]).flatMap((v) => v.files);
test("3D stays out of the initial page load and mobile keeps the image fallback", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".hero-art img")).toBeVisible();
  await expect(page.getByRole("button", { name: "Explore in 3D" })).toHaveCount(0);
  await expect(page.locator(".hero-art canvas")).toHaveCount(0);
  expect(requests.filter((url) => sceneFiles.some((file) => url.endsWith(file)))).toEqual([]);
});
test("reduced motion suppresses the optional WebGL experience", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Explore in 3D" })).toHaveCount(0);
  await expect(page.locator(".hero-art img")).toBeVisible();
});
test("unsupported WebGL preserves artwork and contact navigation", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "hardwareConcurrency", { value: 8 });
    Object.defineProperty(navigator, "deviceMemory", { value: 8 });
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      kind: string,
      ...args: unknown[]
    ) {
      if (kind === "webgl2") return null;
      return Reflect.apply(original, this, [kind, ...args]);
    } as typeof original;
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Explore in 3D" }).click();
  await expect(page.getByRole("status")).toContainText("Still artwork");
  await expect(page.locator(".hero-art img")).toBeVisible();
  await page.locator('.hero a[href="/contact/"]').click();
  await expect(page.locator("main h1")).toContainText("working towards");
});
test("3D activation has a safe result and can return to still artwork", async ({ page }, info) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "hardwareConcurrency", { value: 8 });
    Object.defineProperty(navigator, "deviceMemory", { value: 8 });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Explore in 3D" }).click();
  await expect(page.locator('.hero-live.scene-ready, .art-controls [role="status"]')).toBeVisible({
    timeout: 20000,
  });
  if (await page.locator(".hero-live.scene-ready").count()) {
    await page.getByRole("button", { name: "Pause 3D" }).click();
    await expect(page.getByRole("button", { name: "Resume 3D" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await info.attach("active-3d", { body: await page.screenshot(), contentType: "image/png" });
    await page.getByRole("button", { name: "Still image" }).click();
    await expect(page.locator(".hero-live")).toHaveCount(0);
  } else {
    info.annotations.push({
      type: "WebGL limitation",
      description: "Runner GPU unavailable; verified fallback only, not successful rendering.",
    });
  }
  await expect(page.locator(".hero-art img")).toBeVisible();
});

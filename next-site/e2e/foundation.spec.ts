import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import pages from "../content/pages.json" with { type: "json" };
const representatives = [
  "/",
  "/services/ai-automation/",
  "/solutions/healthcare/",
  "/work/aurelia-house/",
  "/work/umar-clinic/",
  "/about/",
  "/contact/",
  "/insights/prepare-a-project-brief/",
];
for (const entry of pages) {
  test(`${entry.path} has accessible, error-free native content`, async ({ page }) => {
    const failures: string[] = [];
    page.on("pageerror", (error) => failures.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") failures.push(message.text());
    });
    const response = await page.goto(entry.path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      new RegExp(`${entry.path}$`),
    );
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(scan.violations).toEqual([]);
    expect(failures).toEqual([]);
  });
}
for (const width of [320, 360, 390, 430, 768, 1024, 1280, 1440, 1920]) {
  test(`${width}px: representative native layouts fit the viewport`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of representatives) {
      await page.goto(path);
      await expect(page.locator("main h1")).toBeVisible();
      const size = await page.evaluate(() => ({
        content: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth,
      }));
      expect(size.content, path).toBeLessThanOrEqual(size.viewport + 1);
      if (
        [390, 1440].includes(width) &&
        ["/", "/contact/", "/work/aurelia-house/"].includes(path)
      ) {
        for (const img of await page.locator("main img").all()) {
          await img.scrollIntoViewIfNeeded();
          await expect
            .poll(() => img.evaluate((el) => (el as HTMLImageElement).naturalWidth))
            .toBeGreaterThan(0);
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await info.attach(`${path.replaceAll("/", "-")}-${width}`, {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      }
    }
  });
}
test("mobile menu works by keyboard, Escape and route navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: /Menu/ });
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page).toHaveURL(/\/services\/$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});
test("project navigation and custom 404 recovery work", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Read Aurelia House project study" }).click();
  await expect(page.locator("main h1")).toContainText("A better stay");
  expect((await page.goto("/missing-core-test/"))?.status()).toBe(404);
  await page.getByRole("link", { name: "Return to the studio" }).click();
  await expect(page.locator("main h1")).toContainText("Thoughtful design");
});
test("reduced motion disables movement without hiding content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const state = await page
    .locator(".project-image img")
    .first()
    .evaluate((el) => ({
      transition: getComputedStyle(el).transitionDuration,
      animation: getComputedStyle(el).animationName,
    }));
  expect(state.transition).toBe("0s");
  expect(state.animation).toBe("none");
  await expect(page.locator("main h1")).toBeVisible();
});
test("mobile navigation, useful content and contact remain usable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  await expect(page.locator("main")).toContainText("Give reception a shared view");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: /Let’s talk/ })
    .click();
  await expect(
    page.locator('main a[href="mailto:ilyvantadigital@gmail.com"]').first(),
  ).toBeVisible();
  await expect(
    page
      .getByRole("form", { name: "Project inquiry" })
      .locator('noscript a[href="mailto:ilyvantadigital@gmail.com"]'),
  ).toBeVisible();
  await context.close();
});
async function fillForm(page: import("@playwright/test").Page) {
  await page.goto("/contact/");
  await page.getByLabel("Name *", { exact: true }).fill("Demo Person");
  await page.getByLabel("Work email *").fill("demo@example.com");
  await page.getByLabel("Country *").fill("Pakistan");
  await page.getByLabel("Project type *").selectOption("New website");
  await page.getByLabel("Project stage *").selectOption("Exploring options");
  await page.getByLabel("Expected budget").selectOption("Not sure");
  await page.getByLabel("Ideal timeline *").selectOption("Flexible");
  await page
    .getByLabel("What would you like to improve?")
    .fill("A clearer service website and project inquiry flow.");
  await page.getByLabel("Web experiences", { exact: true }).check();
  await page.getByLabel("I agree to be contacted").check();
}
test("contact keyboard submission reports actual unavailable backend and retains entries", async ({
  page,
}) => {
  await fillForm(page);
  const button = page.getByRole("button", { name: "Send project inquiry" });
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toContainText("have not been saved");
  await expect(page.getByLabel("Name *", { exact: true })).toHaveValue("Demo Person");
  await expect(page.getByRole("status")).toBeFocused();
});
test("contact success UI and duplicate prevention with explicitly intercepted transport", async ({
  page,
}) => {
  let calls = 0;
  await page.route("**/api/contact/", async (route) => {
    calls++;
    expect(route.request().postDataJSON().consent).toBe(true);
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, message: "Test transport: inquiry saved." }),
    });
  });
  await fillForm(page);
  await page.getByRole("button", { name: "Send project inquiry" }).click();
  await expect(page.getByRole("status")).toContainText("Test transport: inquiry saved.");
  await expect(page.getByRole("button", { name: "Inquiry saved" })).toBeDisabled();
  expect(calls).toBe(1);
});
test("contact server-validation errors are announced and preserve the brief", async ({ page }) => {
  await fillForm(page);
  await page.getByLabel("Web experiences", { exact: true }).uncheck();
  await page.getByRole("button", { name: "Send project inquiry" }).click();
  await expect(page.getByRole("status")).toContainText("Choose at least one service");
  await expect(page.getByLabel("What would you like to improve?")).toHaveValue(
    "A clearer service website and project inquiry flow.",
  );
});

for (const [project, demo, heading] of [
  ["aurelia-house", "hotel", "Aurelia House"],
  ["umar-clinic", "clinic", "Umar Clinic"],
  ["cafe-workflow", "cafe", "Café Order Workflow"],
  ["sportshub", "sports", "SportsHub"],
]) {
  test(`${demo}: project link opens the real hosted sample workspace`, async ({ page }) => {
    await page.goto(`/work/${project}/`);
    await page.getByRole("link", { name: "Open interactive sample" }).click();
    await expect(page).toHaveURL(`https://ilyvanta-digital.umarilyas.chatgpt.site/demo/${demo}/`);
    await expect(page.locator("main h1")).toHaveText(heading);
    await expect(page.locator("#demo-surface")).toHaveAttribute("aria-busy", "false", {
      timeout: 20000,
    });
    await expect(page.locator("#demo-surface")).not.toBeEmpty();
    await expect(page.locator(".sample-notice")).toContainText("Fictional data only");
  });
}

import { test, expect } from "@playwright/test";
test("service answers remain accessible without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/services/web-design-development/");
  await page.getByText("How much does a business website cost?", { exact: true }).click();
  await expect(page.locator("details[open]")).toContainText("scope before quoting");
  await context.close();
});
test("preview does not request analytics, including after a contact interaction", async ({
  page,
}) => {
  const calls: string[] = [];
  page.on("request", (request) => {
    if (/google-analytics|googletagmanager/.test(request.url())) calls.push(request.url());
  });
  await page.goto("/contact/?email=private-test@example.com");
  await page.getByLabel("Name *", { exact: true }).fill("Test Visitor");
  await expect(page.getByRole("button", { name: "Allow analytics" })).toHaveCount(0);
  expect(calls).toEqual([]);
});
test("content security policy supports hydration without runtime errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto("/insights/website-or-business-software/");
  expect(response?.headers()["content-security-policy"]).toContain("frame-ancestors 'none'");
  await page.getByRole("link", { name: "Explore the related service" }).click();
  await expect(page).toHaveURL(/\/services\/custom-business-software\/$/);
  expect(errors).toEqual([]);
});

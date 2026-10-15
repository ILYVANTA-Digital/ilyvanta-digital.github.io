import { expect, test } from "@playwright/test";

test.skip(process.env.NETLIFY_FORM_TEST !== "true", "Requires a build with CONTACT_PROVIDER=netlify");

async function fill(page: import("@playwright/test").Page) {
  await page.goto("/contact/");
  await page.getByLabel("Name *", { exact: true }).fill("Demo Person");
  await page.getByLabel("Work email *").fill("demo@example.com");
  await page.getByLabel("Country *").fill("Pakistan");
  await page.getByLabel("Project type *").selectOption("New website");
  await page.getByLabel("Project stage *").selectOption("Exploring options");
  await page.getByLabel("Expected budget").selectOption("Not sure");
  await page.getByLabel("Ideal timeline *").selectOption("Flexible");
  await page.getByLabel("What would you like to improve?").fill("A clearer website and project inquiry flow.");
  await page.getByLabel("Web experiences", { exact: true }).check();
  await page.getByLabel("I agree to be contacted").check();
}

test("Netlify contact receives HTML success and prevents a second submission", async ({ page }) => {
  let calls = 0;
  await page.route("**/__forms.html", async route => {
    calls++;
    const body = new URLSearchParams(route.request().postData() || "");
    expect(body.get("form-name")).toBe("project-inquiry");
    expect(body.get("consent")).toBe("true");
    await route.fulfill({ status: 200, contentType: "text/html", body: "<html>Received</html>" });
  });
  await fill(page);
  await page.getByRole("button", { name: "Send project inquiry" }).click();
  await expect(page.getByRole("status")).toContainText("received for review");
  await expect(page.getByRole("status")).toBeFocused();
  await expect(page.getByRole("button", { name: "Inquiry received" })).toBeDisabled();
  expect(calls).toBe(1);
});

test("Netlify HTTP failure preserves the inquiry and permits retry", async ({ page }) => {
  await page.route("**/__forms.html", route => route.fulfill({ status: 503, body: "Unavailable" }));
  await fill(page);
  await page.getByRole("button", { name: "Send project inquiry" }).click();
  await expect(page.getByRole("status")).toContainText("could not confirm");
  await expect(page.getByLabel("Name *", { exact: true })).toHaveValue("Demo Person");
  await expect(page.getByRole("button", { name: "Send project inquiry" })).toBeEnabled();
});

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import pages from '../content/legacy-pages.json' with { type: 'json' };

for (const entry of pages) {
  test(`${entry.path} renders without runtime errors and passes automated accessibility checks`, async ({ page }) => {
    const failures: string[] = [];
    page.on('pageerror', error => failures.push(error.message));
    page.on('console', message => { if (message.type() === 'error') failures.push(message.text()); });
    const response = await page.goto(entry.path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /https:\/\//);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(results.violations).toEqual([]);
    expect(failures).toEqual([]);
  });
}

for (const width of [320, 360, 390, 430, 768, 1024, 1280, 1440, 1920]) {
  test(`${width}px: preserved routes have no horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const entry of pages) {
      await page.goto(entry.path);
      await expect(page.locator('main h1')).toBeVisible();
      const size = await page.evaluate(() => ({ content: document.documentElement.scrollWidth, viewport: document.documentElement.clientWidth }));
      expect(size.content, entry.path).toBeLessThanOrEqual(size.viewport + 1);
    }
  });
}

test('mobile menu supports keyboard activation, escape and return focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: /Menu/ });
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();
});

test('work link and custom 404 recovery use functioning full document navigation', async ({ page }) => {
  await page.goto('/');
  await page.locator('a.project-card[href="/work/aurelia-house/"]').click();
  await expect(page).toHaveURL(/\/work\/aurelia-house\/$/);
  await expect(page.locator('main h1')).toContainText('A better stay');
  const response = await page.goto('/missing-foundation-test/');
  expect(response?.status()).toBe(404);
  await page.getByRole('link', { name: 'Return to the studio' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('main h1')).toContainText('Design that');
});

test('reduced motion starts paused', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/motion-paused/);
  await expect(page.locator('.motion-button')).toHaveAttribute('aria-pressed', 'true');
});

test('without JavaScript the mobile navigation, content and direct contact remain usable', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Selected work', exact: true })).toBeVisible();
  await expect(page.locator('main')).toContainText('Give reception a shared view');
  await expect(page.locator('.contact-brief a[href^="mailto:ilyvantadigital@gmail.com"]')).toBeVisible();
  await context.close();
});

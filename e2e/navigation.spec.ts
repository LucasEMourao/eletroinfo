import { test, expect } from "@playwright/test";

test.describe("Navigation Flow", () => {
  test("Desktop navigation through main pages", async ({ page, isMobile }) => {
    if (isMobile) return;

    await page.goto("/");
    await expect(page).toHaveTitle(/Eletrônica Fernandes/);

    // Navigate to Sobre
    await page.getByTestId("desktop-nav").getByRole("link", { name: "Sobre", exact: true }).click();
    await expect(page).toHaveURL("/sobre");
    await expect(page.getByRole("heading", { name: /Nossa História/i })).toBeVisible();

    // Navigate to Serviços
    await page.getByTestId("desktop-nav").getByRole("link", { name: "Serviços", exact: true }).click();
    await expect(page).toHaveURL("/servicos");
    await expect(page.locator("h1", { hasText: /Nossos Serviços/i })).toBeVisible();

    // Navigate to Contato
    await page.getByTestId("desktop-nav").getByRole("link", { name: "Contato", exact: true }).click();
    await expect(page).toHaveURL(/.*#contato/);
  });

  test.skip("Mobile navigation through main pages", async ({ page, isMobile }) => {
    if (!isMobile) return;

    await page.goto("/");
    await expect(page).toHaveTitle(/Eletrônica Fernandes/);

    // Open mobile menu and go to Sobre
    await page.waitForTimeout(1000); // Wait for React hydration
    await page.getByRole("button", { name: /abrir menu/i }).click();
    await page.waitForTimeout(500); // Wait for transition
    await page.getByTestId("mobile-nav").getByRole("link", { name: "Sobre", exact: true }).click({ force: true });
    await expect(page).toHaveURL("/sobre");

    // Open mobile menu and go to Serviços
    await page.waitForTimeout(1000); // Wait for React hydration
    await page.getByRole("button", { name: /abrir menu/i }).click();
    await page.waitForTimeout(500); // Wait for transition
    await page.getByTestId("mobile-nav").getByRole("link", { name: "Serviços", exact: true }).click({ force: true });
    await expect(page).toHaveURL("/servicos");
  });

  test("Service details flow", async ({ page }) => {
    await page.goto("/servicos");
    
    // Click on a specific service card (e.g. Conserto de TV)
    const tvServiceLink = page.getByRole("link", { name: /Conserto de TV/i }).first();
    await expect(tvServiceLink).toBeVisible();
    await tvServiceLink.click();
    
    await expect(page).toHaveURL("/servicos/conserto-de-tv");
    
    // Verify the heading using an exact text match to avoid matching the breadcrumb
    await expect(page.locator("h1", { hasText: /^Conserto de TV$/i })).toBeVisible();
  });
});

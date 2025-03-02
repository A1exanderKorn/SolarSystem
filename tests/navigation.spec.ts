import { test, expect } from "@playwright/test";

test("Главная страница загружается", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("nav")).toBeVisible();
});

const planets = ["Earth", "Mars", "Sun", "Nep", "Sat", "Ur", "Jup", "Merc", "Ven"];

planets.forEach((planet) => {
  test(`Навигация на страницу ${planet}`, async ({ page }) => {
    await page.goto("/");

    await page.click(`a[href="/planet/${planet}"]`);

    await expect(page).toHaveURL(`/planet/${planet}`);
  });
});

test("Переход через бургер-меню", async ({ page }) => {
  await page.goto("/");

  await page.click(".burger");

  await page.click('nav.burgerNav a[href="/planet/Mars"]');

  await expect(page.locator("h1")).toContainText("Mars");
});

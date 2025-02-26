const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("user can log in", async ({ page }) => {
    await page.getByRole("button", { name: "login" }).click();

    await page.getByTestId("username").fill("admin");
    await page.getByTestId("password").fill("admin");
    await page.getByRole("button", { name: "login" }).click();

    await expect(page.getByText("blogs")).toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();

      await page.getByTestId("username").fill("admin");
      await page.getByTestId("password").fill("admin");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();

      await page.getByTestId("title-input").fill("New blog by playwright 5");
      await page.getByTestId("author-input").fill("Blog Author");
      await page.getByTestId("url-input").fill("https://fullstackopen.com");
      await page.getByRole("button", { name: "create" }).click();
      await expect(
        page.getByText("New blog by playwright 5 Blog Author")
      ).toBeVisible();
    });
  });
});

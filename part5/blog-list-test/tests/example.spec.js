const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createBlog, likeBlog } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "admin",
        password: "admin",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await page.getByRole("button", { name: "login" }).click();

    await expect(page.getByTestId("username")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "admin", "admin");

      await expect(page.getByText("blogs")).toBeVisible();
    });
    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "admin", "fail");
      await page.locator(".notification").waitFor();

      await expect(page.getByText("Wrong username or password")).toBeVisible();
    });
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "admin", "admin");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, {
        title: "New blog by playwright",
        author: "Blog Author",
        url: "https://fullstackopen.com",
      });
      await expect(
        page.getByText("New blog by playwright Blog Author")
      ).toBeVisible();
    });

    test("blogs are arranged in descending order based on likes", async ({
      page,
      request,
    }) => {
      await createBlog(page, {
        title: "Least liked blog",
        author: "Author A",
        url: "https://fullstackopen.com/",
      });

      await createBlog(page, {
        title: "Most liked blog",
        author: "Author B",
        url: "https://fullstackopen.com/",
      });

      await createBlog(page, {
        title: "Medium liked blog",
        author: "Author C",
        url: "https://fullstackopen.com/",
      });

      await page
        .getByTestId("blog-title")
        .filter({ hasText: "Medium liked blog" })
        .waitFor();

      await likeBlog(page, "Most liked blog", 3);
      await likeBlog(page, "Medium liked blog", 2);
      await likeBlog(page, "Least liked blog", 1);

      await page.getByRole("button", { name: "logout" }).click();
      await loginWith(page, "admin", "admin");

      await expect(page.getByTestId("blog-title").first()).toHaveText(
        "Most liked blog"
      );
      await expect(page.getByTestId("blog-title").nth(1)).toHaveText(
        "Medium liked blog"
      );
      await expect(page.getByTestId("blog-title").nth(2)).toHaveText(
        "Least liked blog"
      );
    });

    describe("and a blog exists", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, {
          title: "New blog by playwright",
          author: "Blog Author",
          url: "https://fullstackopen.com",
        });
      });

      test("blog can be liked", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();
        await expect(page.getByText("like")).toBeVisible();
      });

      test("blog can be deleted", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).click();

        await page.on("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "delete" }).click();

        await page.locator(".notification").waitFor();

        await expect(page.getByText("Blog deleted successfully")).toBeVisible();
      });

      test("only the user who added the blog sees the delete button", async ({
        page,
      }) => {
        await page.getByRole("button", { name: "view" }).click();
        await expect(
          page.getByRole("button", { name: "delete" })
        ).toBeVisible();

        await page.getByRole("button", { name: "logout" }).click();

        await page.request.post("/api/users", {
          data: {
            name: "Another User",
            username: "user",
            password: "user",
          },
        });
        await loginWith(page, "user", "user");

        await page.getByRole("button", { name: "view" }).click();
        await expect(
          page.getByRole("button", { name: "delete" })
        ).not.toBeVisible();
      });
    });
  });
});

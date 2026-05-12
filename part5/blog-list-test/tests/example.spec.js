const { test, expect } = require("@playwright/test");
const {
  resetDatabase,
  createUser,
  loginWith,
  loginByApi,
  createBlog,
  createBlogByApi,
  openBlog,
  likeBlog,
} = require("./helper");

const user = {
  name: "Matti Luukkainen",
  username: "admin",
  password: "admin",
};

test.describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await resetDatabase(request);
    await createUser(request, user);
    await page.goto("/");
  });

  test("Login succeeds with the correct username/password combination", async ({
    page,
  }) => {
    await loginWith(page, user.username, user.password);

    await expect(page.getByRole("button", { name: "logout" })).toBeVisible();
    await expect(page.getByRole("link", { name: "new blog" })).toBeVisible();
    await expect(page.getByText("Logged in")).toBeVisible();
  });

  test("Login fails if the username/password is incorrect", async ({
    page,
  }) => {
    await loginWith(page, user.username, "wrong-password");

    await expect(page.getByText("Wrong username or password")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "logout" }),
    ).not.toBeVisible();
    await expect(page.getByTestId("username")).toBeVisible();
  });

  test.describe("when logged in", () => {
    let loggedInUser;

    test.beforeEach(async ({ page, request }) => {
      loggedInUser = await loginByApi(
        page,
        request,
        user.username,
        user.password,
      );
    });

    test("A logged-in user can create a blog", async ({ page }) => {
      const blog = {
        title: "New blog by playwright",
        author: "Blog Author",
        url: "https://fullstackopen.com",
      };

      await createBlog(page, blog);

      await expect(
        page.getByText(
          `A new blog titled ${blog.title} by ${blog.author} was added`,
        ),
      ).toBeVisible();
      await expect(
        page.getByTestId("blog").filter({ hasText: blog.title }),
      ).toBeVisible();
    });

    test("A logged-in user can like blogs", async ({ page, request }) => {
      const blog = {
        title: "Blog to like",
        author: "Like Author",
        url: "https://example.com/like",
      };

      await createBlogByApi(request, loggedInUser.token, blog);
      await page.goto("/");

      await openBlog(page, blog.title);
      await expect(page.getByText("likes 0")).toBeVisible();

      await likeBlog(page);

      await expect(page.getByText("likes 1")).toBeVisible();
    });

    test("A logged-in user can delete a blog", async ({ page, request }) => {
      const blog = {
        title: "Blog to remove",
        author: "Delete Author",
        url: "https://example.com/delete",
      };

      await createBlogByApi(request, loggedInUser.token, blog);
      await page.goto("/");

      await openBlog(page, blog.title);
      page.once("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: "remove" }).click();

      await expect(page.getByText("Blog deleted successfully")).toBeVisible();
      await expect(
        page.getByTestId("blog").filter({ hasText: blog.title }),
      ).toHaveCount(0);
    });

    test("Blogs are sorted by likes in descending order", async ({
      page,
      request,
    }) => {
      await createBlogByApi(request, loggedInUser.token, {
        title: "Least liked blog",
        author: "Author A",
        url: "https://example.com/least",
        likes: 1,
      });
      await createBlogByApi(request, loggedInUser.token, {
        title: "Most liked blog",
        author: "Author B",
        url: "https://example.com/most",
        likes: 10,
      });
      await createBlogByApi(request, loggedInUser.token, {
        title: "Medium liked blog",
        author: "Author C",
        url: "https://example.com/medium",
        likes: 5,
      });

      await page.goto("/");
      await expect(page.getByTestId("blog-title").first()).toBeVisible();

      await expect(page.getByTestId("blog-title").nth(0)).toHaveText(
        "Most liked blog",
      );
      await expect(page.getByTestId("blog-title").nth(1)).toHaveText(
        "Medium liked blog",
      );
      await expect(page.getByTestId("blog-title").nth(2)).toHaveText(
        "Least liked blog",
      );
    });
  });
});

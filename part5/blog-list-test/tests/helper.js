const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "login" }).click();
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, newBlog) => {
  await page.getByRole("button", { name: "new blog" }).click();

  await page.getByTestId("title-input").fill(newBlog.title);
  await page.getByTestId("author-input").fill(newBlog.author);
  await page.getByTestId("url-input").fill(newBlog.url);
  await page.getByRole("button", { name: "create" }).click();
};

const likeBlog = async (page, title, times) => {
  const blogLocator = page.getByTestId("blog").filter({ hasText: title });
  await blogLocator.getByRole("button", { name: "view" }).click();
  for (let i = 0; i < times; i++) {
    await page.getByRole("button", { name: "like" }).click();
  }
  await blogLocator.getByRole("button", { name: "hide" }).click();
};

export { loginWith, createBlog, likeBlog };

const resetDatabase = async (request) => {
  await request.post("/api/testing/reset");
};

const createUser = async (request, user) => {
  await request.post("/api/users", {
    data: user,
  });
};

const loginWith = async (page, username, password) => {
  await page.getByRole("link", { name: "login" }).click();
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const loginByApi = async (page, request, username, password) => {
  const response = await request.post("/api/login", {
    data: { username, password },
  });
  const user = await response.json();

  await page.addInitScript((loggedUser) => {
    window.localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
  }, user);

  await page.goto("/");
  return user;
};

const createBlog = async (page, newBlog) => {
  await page.getByRole("link", { name: "new blog" }).click();
  await page.getByTestId("title-input").fill(newBlog.title);
  await page.getByTestId("author-input").fill(newBlog.author);
  await page.getByTestId("url-input").fill(newBlog.url);
  await page.getByRole("button", { name: "create" }).click();
};

const createBlogByApi = async (request, token, newBlog) => {
  await request.post("/api/blogs", {
    data: newBlog,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const openBlog = async (page, title) => {
  await page
    .getByTestId("blog")
    .filter({ hasText: title })
    .getByRole("button", { name: "show" })
    .click();
};

const likeBlog = async (page, times = 1) => {
  for (let i = 0; i < times; i += 1) {
    await page.getByRole("button", { name: "like" }).click();
  }
};

module.exports = {
  resetDatabase,
  createUser,
  loginWith,
  loginByApi,
  createBlog,
  createBlogByApi,
  openBlog,
  likeBlog,
};

const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Blog = require("../models/blog");
const helper = require("./test-helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });
  const savedUser = await user.save();

  const blogObjects = helper.initialBlogs.map(
    (blog) => new Blog({ ...blog, user: savedUser._id.toString() })
  );

  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs returned", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("all blogs returned have unique id", async () => {
  const response = await api.get("/api/blogs");
  const uniqueIds = new Set(response.body.map((blog) => blog.id));
  assert.strictEqual(uniqueIds.size, response.body.length);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Go To Statement",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const blogTitles = blogsAtEnd.map((n) => n.title);

  assert(blogTitles.includes(newBlog.title));
});

test("a blog added without likes defaults to 0", async () => {
  const newBlog = {
    title: "Go To Statement",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const addedBlog = blogsAtEnd.find((blog) => blog.title === newBlog.title);

  assert.strictEqual(addedBlog.likes, 0);
});

test("blog without title or url is bad request", async () => {
  const blogWithoutTitle = {
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  };
  const blogWIthoutUrl = {
    title: "Go To Statement",
    author: "Edsger W. Dijkstra",
  };

  await api.post("/api/blogs").send(blogWithoutTitle).expect(400);

  await api.post("/api/blogs").send(blogWIthoutUrl).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

test("a blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

  const titles = blogsAtEnd.map((b) => b.title);
  assert.ok(!titles.includes(blogToDelete.title));
});

test("deleting a blog with invalid id returns 400", async () => {
  const invalidId = "invalid-id";

  await api.delete(`/api/blogs/${invalidId}`).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

test("deleting a blog with nonexistent id returns 204", async () => {
  const nonExistentId = await helper.nonExistingId();

  await api.delete(`/api/blogs/${nonExistentId}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

test("blog can be updated", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  const updatedBlog = {
    title: "Updated Blog Title",
    author: "Updated Author",
    url: "http://example.com",
    likes: 99,
  };

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200);

  const blogsAtEnd = await helper.blogsInDb();
  const updatedBlogInDb = blogsAtEnd.find(
    (blog) => blog.id === blogToUpdate.id
  );

  assert.deepStrictEqual(updatedBlogInDb.title, updatedBlog.title);
  assert.deepStrictEqual(updatedBlogInDb.author, updatedBlog.author);
  assert.deepStrictEqual(updatedBlogInDb.url, updatedBlog.url);
  assert.deepStrictEqual(updatedBlogInDb.likes, updatedBlog.likes);
});

test("fails with status code 400 id is invalid", async () => {
  const invalidId = "invalididda";

  await api.put(`/api/blogs/${invalidId}`).send({}).expect(400);
});

after(async () => {
  await mongoose.connection.close();
});

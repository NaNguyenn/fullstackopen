const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test-helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
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

test.only("blog without title or url is bad request", async () => {
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

after(async () => {
  await mongoose.connection.close();
});

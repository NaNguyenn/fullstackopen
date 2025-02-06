const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

// get all blogs
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

// add new blog
blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const user = await User.findById(request.user.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

// delete a blog
blogsRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;

  try {
    const user = await User.findById(request.user.id);
    const blog = await Blog.findById(id);
    if (!blog) {
      return response.status(204).end();
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response
        .status(403)
        .json({ error: "You are not authorized to delete this blog" });
    }
    await Blog.findByIdAndDelete(id);

    user.blogs = user.blogs.filter(
      (blogId) => blogId.toString() !== id.toString()
    );
    await user.save();

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

// update a blog
blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
      runValidators: true,
      context: "query",
    });
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;

import { useState } from "react";
import blogService from "../services/blogs";

const CreateBlogForm = ({
  handleUpdateNotification,
  handleUpdateBlogs,
  blogs,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = async (event) => {
    event.preventDefault();

    try {
      const blog = await blogService.createBlog({
        title,
        author,
        url,
      });
      setTitle("");
      setAuthor("");
      setUrl("");
      handleUpdateNotification({
        message: `A new blog titled ${blog.title} by ${blog.author} was added`,
        type: "success",
      });
      handleUpdateBlogs(blogs.concat(blog));
    } catch (exception) {
      handleUpdateNotification({
        message: "Error adding new blog",
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="author"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="url"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default CreateBlogForm;

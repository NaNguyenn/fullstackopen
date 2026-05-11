import { useState } from "react";
import { useNotificationActions } from "../store/notification";
import { useBlogActions } from "../store/blogs";
import { useNavigate } from "react-router-dom";

const CreateBlogForm = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotificationActions();
  const { addBlog } = useBlogActions();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleAddBlog = async (blogObject) => {
    try {
      await addBlog(blogObject);
      showNotification({
        message: `A new blog titled ${blogObject.title} by ${blogObject.author} was added`,
        type: "success",
      });
    } catch (exception) {
      showNotification({
        message: "Error adding new blog",
        type: "error",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleAddBlog({
      title,
      author,
      url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
    navigate("/");
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            data-testid="title-input"
          />
        </div>
        <div>
          author
          <input
            type="author"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            data-testid="author-input"
          />
        </div>
        <div>
          url
          <input
            type="url"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            data-testid="url-input"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default CreateBlogForm;

import { useState } from "react";
import { useNotificationActions } from "../store/notification";
import { useBlogActions } from "../store/blogs";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/useField";

const CreateBlogForm = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotificationActions();
  const { addBlog } = useBlogActions();
  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetUrl, ...url } = useField("url");

  const handleAddBlog = async (blogObject) => {
    try {
      await addBlog(blogObject);
      showNotification({
        message: `A new blog titled ${blogObject.title.value} by ${blogObject.author.value} was added`,
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
      title: title.value,
      author: author.value,
      url: url.value,
    });
    resetTitle();
    resetAuthor();
    resetUrl();
    navigate("/");
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input {...title} name="Title" data-testid="title-input" />
        </div>
        <div>
          author
          <input {...author} name="author" data-testid="author-input" />
        </div>
        <div>
          url
          <input {...url} name="url" data-testid="url-input" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default CreateBlogForm;

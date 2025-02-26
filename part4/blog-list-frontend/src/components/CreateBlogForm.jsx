import { useState } from "react";

const CreateBlogForm = ({ handleAddBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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
  };

  return (
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
  );
};

export default CreateBlogForm;

import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, handleUpdateNotification, user, handleDeleteBlog }) => {
  const [isDetailShown, setIsDetailShown] = useState("");
  const [likes, setLikes] = useState(blog.likes);

  const toggleIsDetailShown = () => {
    setIsDetailShown((prev) => !prev);
  };

  const handleLike = async () => {
    try {
      const newLikes = likes + 1;
      setLikes(newLikes);
      await blogService.updateBlog(blog.id, {
        likes: newLikes,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      });
    } catch (err) {
      handleUpdateNotification({
        message: "Error liking blog",
        type: "error",
      });
    }
  };

  return (
    <div data-testid="blog">
      <div>
        <span data-testid="blog-title">{blog.title}</span> {blog.author}
        <button onClick={toggleIsDetailShown}>
          {isDetailShown ? "hide" : "view"}
        </button>
      </div>
      {isDetailShown && (
        <div>
          <div>{blog.url}</div>
          <div>
            {likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user?.username === blog.user.username && (
            <button onClick={() => handleDeleteBlog(blog)}>delete</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;

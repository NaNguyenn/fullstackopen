import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import { useParams } from "react-router-dom";

const BlogDetail = ({
  blogs,
  handleUpdateNotification,
  user,
  handleDeleteBlog,
}) => {
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);
  const [likes, setLikes] = useState(blog.likes);

  useEffect(() => {
    setLikes(blog.likes);
  }, [blog.likes]);

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
    <>
      <div>{blog.title}</div>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          likes {likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>Added by {blog.user.name}</div>
        {user?.username === blog.user.username && (
          <button onClick={() => handleDeleteBlog(blog)}>remove</button>
        )}
      </div>
    </>
  );
};

export default BlogDetail;

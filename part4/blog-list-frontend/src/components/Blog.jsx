import { useState } from "react";

const Blog = ({ blog }) => {
  const [isDetailShown, setIsDetailShown] = useState("");

  const toggleIsDetailShown = () => {
    setIsDetailShown((prev) => !prev);
  };

  return (
    <>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleIsDetailShown}>
          {isDetailShown ? "hide" : "view"}
        </button>
      </div>
      {isDetailShown && (
        <div>
          <div>{blog.url}</div>
          <div>{blog.likes}</div>
          <div>{blog.user.name}</div>
        </div>
      )}
    </>
  );
};

export default Blog;

import { useState, useEffect } from "react";
import blogService from "../services/blogs";
import { useParams } from "react-router-dom";
import { useNotificationActions } from "../store/notification";
import { useBlogDetail } from "../hooks/useBlogDetail";
import { useUser } from "../store/user";

const BlogDetail = () => {
  const user = useUser();
  const id = useParams().id;
  const { blog, handleDeleteBlog, handleLikeBlog } = useBlogDetail();

  return (
    <>
      <div>{blog.title}</div>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          likes {blog.likes}
          <button onClick={handleLikeBlog}>like</button>
        </div>
        <div>Added by {blog.user.name}</div>
        {user?.username === blog.user.username && (
          <button onClick={handleDeleteBlog}>remove</button>
        )}
      </div>
    </>
  );
};

export default BlogDetail;

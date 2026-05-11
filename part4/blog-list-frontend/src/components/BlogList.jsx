import { useState, useEffect, useRef } from "react";

import Blog from "./Blog";
import CreateBlogForm from "./CreateBlogForm";
import Toggleable from "./Toggleable";
import { useNotificationActions } from "../store/notification";
import { useBlogActions, useBlogs } from "../store/blogs";
import { useUser } from "../store/user";

const BlogList = () => {
  const user = useUser();
  const { showNotification } = useNotificationActions();
  const { initializeBlogs } = useBlogActions();
  const sortedBlogs = useBlogs();

  useEffect(() => {
    if (user) {
      initializeBlogs();
    }
  }, [initializeBlogs, user]);

  return (
    <>
      <h2>blogs</h2>
      {user && (
        <>
          {sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </>
  );
};

export default BlogList;

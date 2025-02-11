import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import CreateBlogForm from "./components/CreateBlogForm";
import Toggleable from "./components/Toggleable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [notification, setNotification] = useState();
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    if (user) {
      fetchBlogs();
    }
  }, [user]);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    blogService.setToken(null);
  };

  const handleAddBlog = async (blogObject) => {
    try {
      const addedBlog = await blogService.createBlog(blogObject);
      setNotification({
        message: `A new blog titled ${addedBlog.title} by ${addedBlog.author} was added`,
        type: "success",
      });
      const addedBlogWithUserInfo = { ...addedBlog, user: { name: user.name } };
      setBlogs(blogs.concat(addedBlogWithUserInfo));
      blogFormRef.current.toggleVisibility();
    } catch (exception) {
      setNotification({
        message: "Error adding new blog",
        type: "error",
      });
    }
  };

  return (
    <div>
      <Notification
        notification={notification}
        handleUpdateNotification={setNotification}
      />
      {user ? (
        <>
          <h2>blogs</h2>
          <span>{user.name}</span>
          <button onClick={handleLogout}>logout</button>
          <h2>create new</h2>
          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <CreateBlogForm handleAddBlog={handleAddBlog} />
          </Toggleable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleUpdateNotification={setNotification}
            />
          ))}
        </>
      ) : (
        <Toggleable buttonLabel="login">
          <LoginForm
            handleUpdateUser={setUser}
            handleUpdateNotification={setNotification}
          />
        </Toggleable>
      )}
    </div>
  );
};

export default App;

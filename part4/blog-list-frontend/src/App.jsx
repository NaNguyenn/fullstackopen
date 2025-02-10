import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import CreateBlogForm from "./components/CreateBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [notification, setNotification] = useState();

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
          <CreateBlogForm
            handleUpdateNotification={setNotification}
            handleUpdateBlogs={setBlogs}
            blogs={blogs}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      ) : (
        <LoginForm
          handleUpdateUser={setUser}
          handleUpdateNotification={setNotification}
        />
      )}
    </div>
  );
};

export default App;

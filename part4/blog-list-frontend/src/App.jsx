import { useState, useEffect, useRef } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Blog from "./components/Blog";
import BlogDetail from "./components/BlogDetail";
import blogService from "./services/blogs";
import { setAuthToken } from "./services/api";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import CreateBlogForm from "./components/CreateBlogForm";
import Toggleable from "./components/Toggleable";
import ErrorBoundary from "./components/ErrorBoundary";
import { useNotificationActions } from "./store/notification";
import BlogList from "./components/BlogList";
import { useUser, useUserActions } from "./store/user";
import { getUser, removeUser } from "./services/persistentUser";
import { UserList } from "./components/UserList";
import { UserDetail } from "./components/UserDetail";

const App = () => {
  const user = useUser();
  const { setUser } = useUserActions();
  const blogFormRef = useRef();
  const { showNotification } = useNotificationActions();

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUser(user);
      setAuthToken(user.token);
    }
  }, [setUser]);

  const handleLogout = () => {
    removeUser();
    setUser(null);
    setAuthToken(null);
  };

  return (
    <Router>
      <Notification />
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">blogs</Link>
        {user ? (
          <>
            <Link to="/create">new blog</Link>
            <Link to="/users">users</Link>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <Link to="/login">login</Link>
        )}
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <BlogList />
            </ErrorBoundary>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <ErrorBoundary>
              <BlogDetail />
            </ErrorBoundary>
          }
        />
        <Route
          path="/create"
          element={
            <ErrorBoundary>
              <CreateBlogForm />
            </ErrorBoundary>
          }
        />
        <Route
          path="/login"
          element={
            <ErrorBoundary>
              <LoginForm />
            </ErrorBoundary>
          }
        />
        <Route
          path="/users"
          element={
            <ErrorBoundary>
              <UserList />
            </ErrorBoundary>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ErrorBoundary>
              <UserDetail />
            </ErrorBoundary>
          }
        />
        <Route path="*" element={<div>404 - Page not found</div>} />
      </Routes>
    </Router>
  );
};

export default App;

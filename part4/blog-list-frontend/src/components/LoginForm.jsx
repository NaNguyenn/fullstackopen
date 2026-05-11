import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../store/user";
import { useNotificationActions } from "../store/notification";
import { saveUser } from "../services/persistentUser";
import { useField } from "../hooks/useField";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useUserActions();
  const { showNotification } = useNotificationActions();
  const { reset: resetUsername, ...username } = useField("text");
  const { reset: resetPassword, ...password } = useField("password");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });
      saveUser(user);
      blogService.setToken(user.token);
      setUser(user);
      resetUsername();
      resetPassword();
      showNotification({ message: "Logged in", type: "success" });
      navigate("/");
    } catch (exception) {
      showNotification({
        message: "Wrong username or password",
        type: "error",
      });
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...username} name="Username" data-testid="username" />
      </div>
      <div>
        password
        <input {...password} name="Password" data-testid="password" />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;

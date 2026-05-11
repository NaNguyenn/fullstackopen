import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../store/user";
import { useNotificationActions } from "../store/notification";
import { saveUser } from "../services/persistentUser";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useUserActions();
  const { showNotification } = useNotificationActions();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      saveUser(user);
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
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
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          data-testid="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          data-testid="password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;

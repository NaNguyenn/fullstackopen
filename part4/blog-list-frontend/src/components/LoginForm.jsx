import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const LoginForm = ({ handleUpdateUser, handleUpdateNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      handleUpdateUser(user);
      setUsername("");
      setPassword("");
      handleUpdateNotification({ message: "Logged in", type: "success" });
    } catch (exception) {
      handleUpdateNotification({
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

LoginForm.propTypes = {
  handleUpdateUser: PropTypes.func.isRequired,
  handleUpdateNotification: PropTypes.func.isRequired,
};

export default LoginForm;

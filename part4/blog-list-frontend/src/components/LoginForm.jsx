import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

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
      setTimeout(() => {
        handleUpdateNotification(null);
      }, 3000);
    } catch (exception) {
      handleUpdateNotification({ message: "Wrong credentials", type: "error" });
      setTimeout(() => {
        handleUpdateNotification(null);
      }, 3000);
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
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;

import { useState, useEffect, useRef } from "react";

import Blog from "./Blog";
import CreateBlogForm from "./CreateBlogForm";
import Toggleable from "./Toggleable";
import { useNotificationActions } from "../store/notification";
import { useUser } from "../store/user";
import { useUsers, useUsersActions } from "../store/users";

export const UserList = () => {
  const user = useUser();
  const { initializeUsers } = useUsersActions();
  const users = useUsers();

  useEffect(() => {
    if (user && !users?.length) {
      initializeUsers();
    }
  }, [initializeUsers, users?.length, user]);

  return (
    <>
      <h2>users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.blogs?.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

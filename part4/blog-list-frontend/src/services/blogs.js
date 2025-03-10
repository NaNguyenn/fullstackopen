import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const createBlog = (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const req = axios.post(baseUrl, newObject, config);
  return req.then((res) => res.data);
};

const updateBlog = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const req = axios.put(`${baseUrl}/${id}`, newObject, config);
  return req.then((res) => res.data);
};

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const req = axios.delete(`${baseUrl}/${id}`, config);
  return req.then((res) => res.data);
};

export default { getAll, setToken, createBlog, updateBlog, deleteBlog };

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("<Blog /> renders title and author but not URL or likes by default", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 1,
    user: {
      username: "first",
      name: "Matti Luukkainen",
      id: "678a2458c3c9bd4f50bdefd8",
    },
    id: "678a2e379c3089cad37a2941",
  };

  render(<Blog blog={blog} />);

  const titleElement = screen.getByText(blog.title, { exact: false });
  const authorElement = screen.getByText(blog.author, { exact: false });
  expect(titleElement).toBeInTheDocument();
  expect(authorElement).toBeInTheDocument();

  const urlElement = screen.queryByText(blog.url);
  const likesElement = screen.queryByText(`likes ${blog.likes}`);
  expect(urlElement).not.toBeInTheDocument();
  expect(likesElement).not.toBeInTheDocument();
});

test("<Blog /> renders url and likes after clicking the 'view' button", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 1,
    user: {
      username: "first",
      name: "Matti Luukkainen",
      id: "678a2458c3c9bd4f50bdefd8",
    },
    id: "678a2e379c3089cad37a2941",
  };

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const viewButton = screen.getByText("view");

  await user.click(viewButton);

  const urlElement = screen.getByText(blog.url);
  const likesElement = screen.getByText(`${blog.likes}`);
  expect(urlElement).toBeInTheDocument();
  expect(likesElement).toBeInTheDocument();
});

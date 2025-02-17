import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlogForm from "./CreateBlogForm";

test("<CreateBlogForm /> event handler props called", async () => {
  const mockHandleAddBlog = vi.fn();

  render(<CreateBlogForm handleAddBlog={mockHandleAddBlog} />);

  const user = userEvent.setup();
  const createButton = screen.getByText("create");

  await user.click(createButton);

  expect(mockHandleAddBlog).toHaveBeenCalledTimes(1);
});

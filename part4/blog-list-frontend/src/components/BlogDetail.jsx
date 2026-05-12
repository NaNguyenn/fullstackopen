import { Box, Button, Typography } from "@mui/material";
import { useBlogDetail } from "../hooks/useBlogDetail";
import { useField } from "../hooks/useField";
import { useUser } from "../store/user";

const BlogDetail = () => {
  const user = useUser();
  const { blog, handleDeleteBlog, handleLikeBlog, handleAddComment } =
    useBlogDetail();
  const { reset: resetComment, ...comment } = useField("text");

  return (
    <>
      <Typography variant="h4">{blog.title}</Typography>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>Added by {blog.user.name}</div>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {blog.likes} likes
          {!!user && (
            <Button onClick={handleLikeBlog} variant="contained">
              like
            </Button>
          )}
          {user?.username === blog.user.username && (
            <Button
              onClick={handleDeleteBlog}
              variant="contained"
              color="error"
            >
              remove
            </Button>
          )}
        </Box>
      </div>
      <div>
        <p>comments</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleAddComment(comment.value);
            resetComment();
          }}
        >
          <input {...comment} name="Comment" />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BlogDetail;

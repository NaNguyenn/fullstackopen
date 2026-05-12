import { useBlogDetail } from "../hooks/useBlogDetail";
import { useField } from "../hooks/useField";
import { useUser } from "../store/user";

const BlogDetail = () => {
  const user = useUser();
  const { blog, handleDeleteBlog, handleLikeBlog, handleAddComment } = useBlogDetail();
  const { reset: resetComment, ...comment } = useField("text");

  return (
    <>
      <div>{blog.title}</div>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          likes {blog.likes}
          <button onClick={handleLikeBlog}>like</button>
        </div>
        <div>Added by {blog.user.name}</div>
        {user?.username === blog.user.username && (
          <button onClick={handleDeleteBlog}>remove</button>
        )}
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

import { useBlogDetail } from "../hooks/useBlogDetail";
import { useUser } from "../store/user";

const BlogDetail = () => {
  const user = useUser();
  const { blog, handleDeleteBlog, handleLikeBlog } = useBlogDetail();

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

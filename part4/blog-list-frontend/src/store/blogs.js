import { create } from "zustand";
import blogService from "../services/blogs";

const useBlogsStore = create((set, get) => ({
  blogs: [],
  actions: {
    initializeBlogs: async () => {
      const blogs = await blogService.getAll();
      set(() => ({ blogs }));
    },
    addBlog: async (blog) => {
      const newBlog = await blogService.createBlog(blog);
      set((state) => ({
        blogs: [...state.blogs, newBlog],
      }));
    },
    likeBlog: async (id) => {
      const blog = get().blogs.find((b) => b.id === id);
      await blogService.updateBlog(id, {
        ...blog,
        likes: blog.likes + 1,
      });
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog,
        ),
      }));
    },
    deleteBlog: async (id) => {
      await blogService.deleteBlog(id);
      set((state) => ({
        blogs: state.blogs.filter((blog) => blog.id !== id),
      }));
    },
  },
}));

export const useBlogs = () => {
  const blogs = useBlogsStore((state) => state.blogs);
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
  return sortedBlogs;
};
export const useBlogActions = () => useBlogsStore((state) => state.actions);

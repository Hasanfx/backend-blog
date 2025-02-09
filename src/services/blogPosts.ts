export type BlogPost = {
  id: string;
  title: string;
  content: string;
  authorId:number;
  createdAt: string;
};

export const fetchBlogs = async (): Promise<BlogPost[]> => {
  const response = await fetch("http://localhost:3000/api/posts");
  if (!response.ok) throw new Error("Failed to fetch blogs");
  return response.json();
};
export const fetchBlog = async (id: number): Promise<BlogPost> => {
  const response = await fetch(`http://localhost:3000/api/posts/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch blog with id: ${id}`);
  return response.json();
};


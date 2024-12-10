export interface Tag {
  id: number;
  name: string;
}

export interface Blog {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type BlogContent = Omit<Blog, "id" | "createdAt" | "updatedAt">;

export interface BlogResponse extends Blog {
  tags: Tag[];
}

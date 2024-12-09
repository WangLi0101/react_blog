import fetch from "@/utils/http";
import { Blog, BlogContent, OssSign, Tag } from "./blog";
import { PageResult } from "../system/system";

// 获取tags
export function getTagsApi() {
  return fetch<Tag[]>("/tags", "MANGMENT", {
    method: "get",
  });
}

// 创建tag
export function createTagApi(data: Omit<Tag, "id">) {
  return fetch<Tag>("/tags", "MANGMENT", {
    method: "post",
    body: JSON.stringify(data),
  });
}

// 编辑tag
export function editTagApi(id: number, data: Omit<Tag, "id">) {
  return fetch<Tag>(`/tags/${id}`, "MANGMENT", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

// 删除tag
export function deleteTagApi(id: number) {
  return fetch<Tag>(`/tags/${id}`, "MANGMENT", {
    method: "DELETE",
  });
}

// 获取博客
export function getBlogsApi(data: {
  page: number;
  pageSize: number;
  title: string;
}) {
  return fetch<PageResult<Blog>>("/blog/list", "MANGMENT", {
    method: "post",
    body: JSON.stringify(data),
  });
}

// 新增博客
export function createBlogApi(data: BlogContent) {
  return fetch<Blog>("/blog", "MANGMENT", {
    method: "post",
    body: JSON.stringify(data),
  });
}

// 编辑博客
export function editBlogApi(id: number, data: BlogContent) {
  return fetch<Blog>(`/blog/${id}`, "MANGMENT", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

// 删除博客
export function deleteBlogApi(id: number) {
  return fetch<Blog>(`/blog/${id}`, "MANGMENT", {
    method: "DELETE",
  });
}

// 获取博客详情
export function getBlogDetailApi(id: number) {
  return fetch<Blog>(`/blog/${id}`, "MANGMENT", {
    method: "get",
  });
}

// 获取oss签名
export function getOssSignApi() {
  return fetch<OssSign>("/blog/oss/sign", "MANGMENT", {
    method: "get",
  });
}

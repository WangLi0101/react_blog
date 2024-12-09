import fetch from "@/utils/http";
import { Blog, Tag } from "./blog";
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

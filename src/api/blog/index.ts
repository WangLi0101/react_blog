import fetch from "@/utils/http";
import { Tag } from "./blog";

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

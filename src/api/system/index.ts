import fetch from "@/utils/http";
import type {
  CreateUserParams,
  LoginParams,
  PageParams,
  PageResult,
  Role,
  UserInfo,
} from "./system";
export function createUser(data: CreateUserParams) {
  return fetch("/user", "MANGMENT", {
    method: "post",
    body: JSON.stringify(data),
  });
}

// 登录
export function login(data: LoginParams) {
  return fetch<string>("/user/login", "MANGMENT", {
    method: "post",
    body: JSON.stringify(data),
  });
}

// 获取用户信息
export function getUserInfo() {
  return fetch<UserInfo>("/user/my/info", "MANGMENT", {
    method: "get",
  });
}

// 获取角色
export function getRolesApi() {
  return fetch<Role[]>("/role", "MANGMENT", {
    method: "get",
  });
}

// 创建角色
export function createRoleApi(data: Omit<Role, "id">) {
  return fetch<Role>("/role", "MANGMENT", {
    method: "post",
    body: JSON.stringify(data),
  });
}

// 编辑角色
export function editRoleApi(id: number, data: Omit<Role, "id">) {
  return fetch<Role>(`/role/${id}`, "MANGMENT", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

// 删除角色
export function deleteRoleApi(id: number) {
  return fetch(`/role/${id}`, "MANGMENT", {
    method: "delete",
  });
}

// 分页获取用户
export function getUsersPageApi(data: PageParams) {
  return fetch<PageResult<UserInfo>>("/user/page", "MANGMENT", {
    method: "post",
    body: JSON.stringify(data),
  });
}

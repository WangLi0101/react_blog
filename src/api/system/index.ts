import fetch from "@/utils/http";
import type { CreateUserParams, LoginParams, UserInfo } from "./system";
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

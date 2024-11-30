import fetch from "@/utils/http";
export function getUserInfo() {
  return fetch("/user/11", "MANGMENT", {
    method: "get",
  });
}

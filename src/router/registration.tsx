import { Register } from "@/views/register";
import { RouteObject } from "react-router";
import { Auth } from "@/components/Auth";
import { Login } from "@/views/login";
export default [
  {
    path: "/login",
    handle: {
      title: "登录",
    },
    element: (
      <Auth>
        <Login />
      </Auth>
    ),
  },
  {
    path: "/register",
    handle: {
      title: "注册",
    },
    Component: Register,
  },
] as RouteObject[];

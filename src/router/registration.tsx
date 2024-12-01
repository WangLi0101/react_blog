import { Register } from "@/views/register";
import { RouteObject } from "react-router";

import { Login } from "@/views/login";
export default [
  {
    path: "/login",
    handle: {
      title: "登录",
    },
    element: <Login />,
  },
  {
    path: "/register",
    handle: {
      title: "注册",
    },
    element: <Register />,
  },
] as RouteObject[];

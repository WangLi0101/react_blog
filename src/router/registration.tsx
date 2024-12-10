import { Register } from "@/views/register";
import { RouteObject } from "react-router";

import { Login } from "@/views/login";
import Home from "@/views/blog/home";
import BlogIndex from "@/views/blog";
import Detail from "@/views/blog/detail";
export default [
  {
    path: "/",
    handle: {
      title: "home",
    },
    element: <BlogIndex />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/blog/detail",
        element: <Detail />,
      },
    ],
  },
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

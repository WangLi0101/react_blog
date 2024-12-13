import { Register } from "@/views/register";
import { RouteObject } from "react-router";

import { Login } from "@/views/login";
import Home from "@/views/blog/home";
import BlogIndex from "@/views/blog";
import Detail from "@/views/blog/detail";
import Blog from "@/views/blog/blog";
import About from "@/views/blog/about";
export default [
  {
    path: "/front",
    handle: {
      title: "home",
    },
    element: <BlogIndex />,
    children: [
      {
        path: "/front/home",
        element: <Home />,
      },
      {
        path: "/front/blog",
        element: <Blog />,
      },
      {
        path: "/front/blog/detail",
        element: <Detail />,
      },
      {
        path: "/front/about",
        element: <About />,
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

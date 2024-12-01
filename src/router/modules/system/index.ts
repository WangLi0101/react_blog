import { lazy } from "react";
import { RouteObject } from "react-router";

export default [
  {
    path: "/system",
    handle: {
      title: "系统管理",
      icon: "material-symbols-light:settings-photo-camera-outline",
    },
    children: [
      {
        path: "/system/roles",
        Component: lazy(() => import("@/views/system/roles/index")),
        handle: {
          title: "角色管理",
        },
      },
      {
        path: "/system/user",
        Component: lazy(() => import("@/views/system/roles/index")),
        handle: {
          title: "用户管理",
        },
      },
    ],
  },
] as RouteObject[];

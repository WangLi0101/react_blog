import { RouteObject, useLocation, useNavigate, useRoutes } from "react-router";
import Layout from "@/Layout";
import { useMenuStore } from "@/store/menu";
import registerRoutes from "./registration";
import NotFound from "@/views/error/404";
import { Navigate } from "react-router";
import { useEffect, useMemo } from "react";
import { useUserStore } from "@/store/user";
import { getToken } from "@/utils/auth";
import { emitter } from "@/utils/mitt";
import { useMeta } from "@/hooks/useMeta";
import Forbidden from "@/views/error/403";
import { generateDynamicRoutes } from "./utils/dynamicRoutes";

const routes: RouteObject[] = [
  {
    path: "/back",
    Component: Layout,
    children: [],
  },

  ...registerRoutes,

  // 403
  {
    path: "/403",
    Component: Forbidden,
  },

  // 404
  {
    path: "/404",
    Component: NotFound,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
];

/**
 * 动态路由
 */

const whiteList = [
  "/",
  "/login",
  "/register",
  "/home",
  "/blog",
  "/blog/detail",
  "/about",
];
export function Router() {
  const userStore = useUserStore();
  const navigate = useNavigate();
  const token = getToken();
  const pathname = useLocation().pathname;
  const userInfo = userStore.userInfo;
  const meta = useMeta();
  const menuStore = useMenuStore();

  // 生成动态路由
  const dynamicRoutes = useMemo(() => {
    return generateDynamicRoutes(menuStore.myMenuFlattenList);
  }, [menuStore.myMenuFlattenList]);

  // 合并静态路由和动态路由
  const allRoutes = useMemo(() => {
    // 将动态路由添加到 /back 路由的 children 中
    const updatedRoutes = [...routes];
    const backRouteIndex = updatedRoutes.findIndex(
      (route) => route.path === "/back"
    );

    if (backRouteIndex !== -1 && updatedRoutes[backRouteIndex]) {
      const backRoute = updatedRoutes[backRouteIndex];
      updatedRoutes[backRouteIndex] = {
        ...backRoute,
        children: [...(backRoute.children || []), ...dynamicRoutes],
      } as RouteObject;
    }
    return updatedRoutes;
  }, [dynamicRoutes]);

  const element = useRoutes(allRoutes);

  useEffect(() => {
    // 设置title
    const title = meta?.title || "Blog";
    document.title = title;

    // 如果当前路径是根路径，且有topMenuPath，则导航到topMenuPath
    if (pathname === "/") {
      navigate("/home");
    }
    if (!token && !whiteList.includes(pathname)) {
      navigate("/home");
    }

    if (token && !userInfo) {
      userStore.getUserInfo();
    }
  }, [pathname]);

  useEffect(() => {
    emitter.on("goLogin", () => {
      navigate("/home");
    });
  }, [navigate]);

  // 没有token且不在白名单中，重定向到登录页
  if (!token && !whiteList.includes(pathname)) {
    return <Navigate to="/home" replace />;
  }

  return element;
}

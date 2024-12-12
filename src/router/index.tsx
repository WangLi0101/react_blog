import { RouteObject, useLocation, useNavigate, useRoutes } from "react-router";
import Layout from "@/Layout";
import { useMenuStore } from "@/store/menu";
import registerRoutes from "./registration";
import NotFound from "@/views/error/404";
import { Navigate } from "react-router";
import { ComponentType, lazy, useEffect } from "react";
import { useUserStore } from "@/store/user";
import { getToken } from "@/utils/auth";
import { emitter } from "@/utils/mitt";
import { useMeta } from "@/hooks/useMeta";
import Forbidden from "@/views/error/403";
import { MenuItem } from "@/api/system/system";

const routes: RouteObject[] = [
  {
    path: "/",
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
const routerModules = import.meta.glob("@/views/**/*.tsx");

const addRoutes = (callBackRoutes: MenuItem[]) => {
  const rootRoute = routes.find((el) => el.path === "/");
  if (!rootRoute) return;

  const hasComponent = callBackRoutes.filter((el) => el.component);

  hasComponent.forEach((el) => {
    const isNotAdd = !rootRoute.children?.find(
      (route) => route.path === el.path
    );
    if (isNotAdd) {
      const Component = lazy(
        routerModules[`/src/views${el.component}.tsx`] as () => Promise<{
          default: ComponentType;
        }>
      );
      rootRoute.children?.push({
        path: el.path,
        handle: {
          title: el.title,
          icon: el.icon,
        },
        Component,
      });
    }
  });
};

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

  addRoutes(menuStore.myMenuFlattenList);

  const element = useRoutes(routes);

  useEffect(() => {
    // 设置title
    const title = meta?.title || "Auth";
    document.title = title;

    // 如果当前路径是根路径，且有topMenuPath，则导航到topMenuPath
    if (pathname === "/") {
      navigate("/home");
    }

    if (token && !userInfo) {
      userStore.getUserInfo();
    }

    // 无权限去403
    if (
      !whiteList.includes(pathname) &&
      !menuStore.myMenuFlattenList.find((el) => el.path === pathname)
    ) {
      navigate("/403");
    }
  }, [pathname]);

  useEffect(() => {
    emitter.on("goLogin", () => {
      navigate("/login");
    });
  }, [navigate]);

  // 没有token且不在白名单中，重定向到登录页
  if (!token && !whiteList.includes(pathname)) {
    return <Navigate to="/login" replace />;
  }

  return element;
}

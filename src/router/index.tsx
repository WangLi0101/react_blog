import { RouteObject, useLocation, useNavigate, useRoutes } from "react-router";
import Layout from "@/Layout";
import { flattenRoutes } from "./utils/flatten";
import { useMenuStore } from "@/store/menu";
import registerRoutes from "./registration";
import NotFound from "@/views/error/404";
import { Navigate } from "react-router";
import { useEffect } from "react";
import { useUserStore } from "@/store/user";
import { getToken } from "@/utils/auth";
import { useTopMenu } from "@/hooks/useTopMenu";
import { emitter } from "@/utils/mitt";
import { useMeta } from "@/hooks/useMeta";
import Forbidden from "@/views/error/403";
// 加载modules下所有的文件
const getStaticRoutes = () => {
  const arr = [];
  const treeMenu = [];
  const flatArr: RouteObject[] = [];
  const modules = import.meta.glob("./modules/*/*.{ts,tsx}", {
    eager: true,
  });

  for (const key in modules) {
    const moduleRoutes = (modules[key] as { default: RouteObject[] }).default;
    treeMenu.push(...moduleRoutes);

    // 扁平化对象
    const flattenRoutesArr = flattenRoutes(moduleRoutes);
    flatArr.push(...flattenRoutesArr);

    // 过滤掉没有Component的元素
    const filterRoutes = flattenRoutesArr.filter(
      (el) => el.Component || el.element
    );
    arr.push(...filterRoutes);
  }

  // 存储菜单
  useMenuStore.getState().setMenuList(treeMenu);
  useMenuStore.getState().setFlattenMenuList(flatArr);
  return arr;
};

const routes = [
  {
    path: "/",
    Component: Layout,
    children: getStaticRoutes() as RouteObject[],
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

const whiteList = ["/login", "/register"];
export function Router() {
  const userStore = useUserStore();
  const navigate = useNavigate();
  const topMenuPath = useTopMenu();
  const token = getToken();
  const pathname = useLocation().pathname;
  const element = useRoutes(routes);
  const userInfo = userStore.userInfo;
  const meta = useMeta();
  const menuStore = useMenuStore();

  useEffect(() => {
    // 设置title
    const title = meta.title || "Auth";
    document.title = title;
    // 如果当前路径是根路径，且有topMenuPath，则导航到topMenuPath
    if (pathname === "/" && topMenuPath) {
      navigate(topMenuPath);
    }
    if (token) {
      if (!userInfo) {
        userStore.getUserInfo();
      }
      // 如果token存在且在白名单中，则导航到上一个页面
      if (whiteList.includes(pathname)) {
        navigate(-1);
      }
    }

    // 无权限去403
    if (
      !whiteList.includes(pathname) &&
      !menuStore.myMenuFlattenList.find((el) => el.path === pathname)
    ) {
      navigate("/403");
    }
  }, [
    token,
    pathname,
    userStore,
    navigate,
    topMenuPath,
    userInfo,
    meta.title,
    menuStore,
  ]);

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

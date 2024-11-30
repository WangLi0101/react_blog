import { createBrowserRouter, RouteObject } from "react-router";
import Layout from "@/Layout";
import { flattenRoutes } from "./utils/flatten";
import { useMenuStore } from "@/store/menu";

// 加载modules下所有的文件
const getStaticRoutes = () => {
  const arr = [];
  const treeMenu = [];
  const flatArr: RouteObject[] = [];
  const modules = import.meta.glob("./modules/*/*.ts", {
    eager: true,
  });
  for (const key in modules) {
    const moduleRoutes = (modules[key] as { default: RouteObject[] }).default;
    treeMenu.push(...moduleRoutes);
    // 扁平化对象
    const flattenRoutesArr = flattenRoutes(moduleRoutes);
    flatArr.push(...flattenRoutesArr);
    // 过滤掉没有Component的元素
    const filterRoutes = flattenRoutesArr.filter((el) => el.Component);
    arr.push(...filterRoutes);
  }
  // 存储菜单
  useMenuStore.getState().setMenuList(treeMenu);
  useMenuStore.getState().setFlattenMenuList(flatArr);
  return arr;
};
const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: getStaticRoutes() as RouteObject[],
  },
]);

export default router;

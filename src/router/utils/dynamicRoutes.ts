import { RouteObject } from "react-router";
import { MenuItem } from "@/api/system/system";
import { lazy, ComponentType } from "react";
import React from "react";

/**
 * 动态路由模块映射
 * 使用相对路径匹配，因为 Vite 的 import.meta.glob 使用相对路径
 */
const routerModules = import.meta.glob("../../views/**/*.tsx");

/**
 * 动态加载组件
 * @param componentPath 组件路径
 * @returns 懒加载的组件
 */
const loadComponent = (componentPath: string): ComponentType<any> => {
  // 处理不同格式的组件路径
  let relativePath = componentPath;

  // 如果路径以 @/views 开头，转换为相对路径
  if (relativePath.startsWith("@/views")) {
    relativePath = relativePath.replace("@/views", "");
  }

  // 确保路径以 / 开头
  if (!relativePath.startsWith("/")) {
    relativePath = "/" + relativePath;
  }

  // 确保路径以 .tsx 结尾
  if (!relativePath.endsWith(".tsx")) {
    relativePath += ".tsx";
  }

  // 构建完整的相对路径
  const fullPath = `../../views${relativePath}`;

  // 查找匹配的模块
  const moduleLoader = routerModules[fullPath];

  if (!moduleLoader) {
    // 返回一个默认的错误组件
    return lazy(() =>
      Promise.resolve({
        default: () =>
          React.createElement(
            "div",
            null,
            `Component not found: ${componentPath}`
          ),
      })
    );
  }
  return lazy(() => moduleLoader() as Promise<{ default: ComponentType<any> }>);
};

/**
 * 将 MenuItem 转换为 RouteObject
 * @param menuItem 菜单项
 * @param parentPath 父路由路径，用于计算相对路径
 * @returns 路由对象
 */
const convertMenuItemToRoute = (
  menuItem: MenuItem,
  parentPath: string = ""
): RouteObject => {
  let routePath = menuItem.path;

  // 如果是嵌套在父路由下，需要计算相对路径
  if (parentPath && routePath.startsWith(parentPath)) {
    // 移除父路径前缀，得到相对路径
    routePath = routePath.substring(parentPath.length);
    // 移除开头的斜杠
    if (routePath.startsWith("/")) {
      routePath = routePath.substring(1);
    }
  } else if (routePath.startsWith("/")) {
    // 如果路径以 / 开头但不包含父路径，直接移除开头的斜杠
    // 这样可以将绝对路径转换为相对路径
    routePath = routePath.substring(1);
  }

  const route: RouteObject = {
    path: routePath,
    Component: loadComponent(menuItem.component),
  };

  return route;
};

/**
 * 生成动态路由
 * @param menuList 菜单列表
 * @param parentPath 父路由路径，默认为 "/back"
 * @returns 路由对象数组
 */
export const generateDynamicRoutes = (
  menuList: MenuItem[],
  parentPath: string = "/back"
): RouteObject[] => {
  if (!menuList || menuList.length === 0) {
    return [];
  }

  // 过滤掉隐藏的菜单项，并转换为路由对象
  const routes = menuList
    .filter((item) => item.component) // 只处理非隐藏且有组件的菜单项
    .map((item) => convertMenuItemToRoute(item, parentPath));

  return routes;
};

/**
 * 构建嵌套路由结构
 * @param menuList 扁平化的菜单列表
 * @returns 嵌套的路由对象数组
 */
export const buildNestedRoutes = (menuList: MenuItem[]): RouteObject[] => {
  if (!menuList || menuList.length === 0) {
    return [];
  }

  // 创建路由映射
  const routeMap = new Map<number, RouteObject & { menuItem: MenuItem }>();
  const rootRoutes: RouteObject[] = [];

  // 第一遍遍历：创建所有路由对象
  menuList.forEach((item) => {
    if (!item.isHidden && item.component) {
      const route: RouteObject & { menuItem: MenuItem } = {
        path: item.path,
        Component: loadComponent(item.component),
        children: [],
        menuItem: item,
      };
      routeMap.set(item.id, route);
    }
  });

  // 第二遍遍历：构建父子关系
  routeMap.forEach((route, id) => {
    const menuItem = route.menuItem;

    if (menuItem.parentId === null) {
      // 根级路由
      const { menuItem: _, ...routeWithoutMenuItem } = route;
      rootRoutes.push(routeWithoutMenuItem);
    } else {
      // 子路由
      const parentRoute = routeMap.get(menuItem.parentId);
      if (parentRoute) {
        if (!parentRoute.children) {
          parentRoute.children = [];
        }
        const { menuItem: _, ...routeWithoutMenuItem } = route;
        parentRoute.children.push(routeWithoutMenuItem);
      }
    }
  });

  return rootRoutes;
};

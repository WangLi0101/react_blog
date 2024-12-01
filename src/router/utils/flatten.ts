import { RouteObject } from "react-router";

export function flattenRoutes(routes: RouteObject[]): RouteObject[] {
  return routes.reduce<RouteObject[]>((flat, route) => {
    const flattenedRoute = { ...route };
    delete flattenedRoute.children;
    return route.children
      ? [...flat, flattenedRoute, ...flattenRoutes(route.children)]
      : [...flat, flattenedRoute];
  }, []);
}

export function findParentAndSelf(
  path: string,
  routes: RouteObject[]
): {
  parents: RouteObject[];
  self: RouteObject;
} | null {
  let result = null;

  // 遍历 routes 查找匹配路径的项
  for (const route of routes) {
    // 如果路径匹配，返回当前 route 和它的所有父级
    if (route.path === path) {
      result = { parents: [], self: route };
      break;
    }

    // 如果有子路由，递归查找
    if (route.children) {
      const childResult = findParentAndSelf(path, route.children);
      if (childResult) {
        result = {
          parents: [route, ...childResult.parents], // 记录父级路由
          self: childResult.self,
        };
        break;
      }
    }
  }

  return result;
}

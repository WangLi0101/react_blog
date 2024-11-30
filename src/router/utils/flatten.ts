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

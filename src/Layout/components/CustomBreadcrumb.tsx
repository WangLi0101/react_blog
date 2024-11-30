import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { useMenuStore } from "@/store/menu";
import { RouteObject, useLocation } from "react-router";

const CustomBreadcrumb: React.FC = () => {
  const flattenMenuList = useMenuStore((state) => state.flattenMenuList);
  const [parentMenu, setParentMenu] = useState<{ title: string }[]>([]);
  const location = useLocation();
  const getAllParentMenu = useCallback(() => {
    const path = location.pathname;
    const pathArrs = path.split("/").filter(Boolean);
    const openPaths = pathArrs.reduce(
      (prev: string[], _curr: string, index: number) => {
        const path = `/${pathArrs.slice(0, index + 1).join("/")}`;
        return [...prev, path];
      },
      []
    );
    const parentMenu: RouteObject[] = [];
    openPaths.forEach((path) => {
      const menu = flattenMenuList.find((item) => item.path === path);
      if (menu) {
        parentMenu.push(menu);
      }
    });
    return parentMenu;
  }, [location.pathname, flattenMenuList]);

  useEffect(() => {
    const res = getAllParentMenu();
    const items = res.map((item) => ({
      title: item.handle.title,
    }));
    setParentMenu(items);
  }, [getAllParentMenu, location]);

  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={parentMenu}></Breadcrumb>
  );
};

export default CustomBreadcrumb;

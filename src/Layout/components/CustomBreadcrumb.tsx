import React, { useCallback, useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { useMenuStore } from "@/store/menu";
import { useLocation } from "react-router";
import { findParentAndSelf } from "@/router/utils/flatten";

const CustomBreadcrumb: React.FC = () => {
  const menuList = useMenuStore((state) => state.myMenuList);
  const [parentMenu, setParentMenu] = useState<{ title: string }[]>([]);
  const location = useLocation();

  const getAllParentMenu = useCallback(() => {
    const res = findParentAndSelf(location.pathname, menuList);
    return [...(res?.parents || []), res?.self];
  }, [location.pathname, menuList]);

  useEffect(() => {
    const res = getAllParentMenu();
    const items = res.map((item) => ({
      title: item?.title || "",
    }));
    setParentMenu(items);
  }, [getAllParentMenu, location]);

  return (
    <Breadcrumb style={{ margin: "16px 0" }} items={parentMenu}></Breadcrumb>
  );
};

export default CustomBreadcrumb;

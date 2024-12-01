import React, { useCallback, useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { useMenuStore } from "@/store/menu";
import { Icon } from "@iconify/react";
import { RouteObject, useLocation, useNavigate } from "react-router";
import { findParentAndSelf } from "@/router/utils/flatten";
const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
};
interface CustomSiderProps {
  collapsed: boolean;
  onCollapse: (value: boolean) => void;
}

const CustomSider: React.FC<CustomSiderProps> = ({ collapsed, onCollapse }) => {
  const menuList = useMenuStore((state) => state.menuList);
  const location = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const convertToMenuItems = useCallback(
    (menuArray: RouteObject[]): MenuItem[] => {
      return menuArray.map((item) => {
        const { title, icon } = item.handle;
        return getItem(
          title,
          item.path!,
          <Icon icon={icon} style={{ fontSize: "24px" }} />,
          item.children ? convertToMenuItems(item.children) : undefined
        );
      });
    },
    []
  );

  useEffect(() => {
    const menuItems = convertToMenuItems(menuList);

    setItems(menuItems);
  }, [convertToMenuItems, menuList]);

  useEffect(() => {
    const path = location.pathname;
    const parentMenu = findParentAndSelf(path, menuList)?.parents;
    if (parentMenu) {
      const openPaths = parentMenu.map((item) => item.path!);
      setOpenKeys(openPaths);
    }

    // 设置选中的菜单项为完整的当前路径
    setSelectedKeys([path]);
  }, [location.pathname, menuList]);

  const onSelect = ({ key }: { key: string }) => {
    navigate(key);
  };

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        items={items}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onSelect={onSelect}
        onOpenChange={onOpenChange}
      />
    </Sider>
  );
};

export default CustomSider;

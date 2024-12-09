import React, { useCallback, useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { useMenuStore } from "@/store/menu";
import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router";
import { findParentAndSelf } from "@/router/utils/flatten";
import { TreeNode } from "@/utils/tree";
import { MenuItem as MyMenuItem } from "@/api/system/system";
const { Sider } = Layout;

type AntMenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: AntMenuItem[]
): AntMenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as AntMenuItem;
};
interface CustomSiderProps {
  collapsed: boolean;
  onCollapse: (value: boolean) => void;
}

const CustomSider: React.FC<CustomSiderProps> = ({ collapsed, onCollapse }) => {
  const menuList = useMenuStore((state) => state.myMenuList);
  const location = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState<AntMenuItem[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const convertToMenuItems = useCallback(
    (menuArray: TreeNode<MyMenuItem>[]): AntMenuItem[] => {
      return menuArray.map((item) => {
        const { title, icon, isHidden } = item;
        if (isHidden) return null;
        return getItem(
          title,
          item.path!,
          <Icon icon={icon} style={{ fontSize: "24px" }} />,
          item.children
            ? convertToMenuItems(item.children).filter(Boolean).length
              ? convertToMenuItems(item.children).filter(Boolean)
              : undefined
            : undefined
        );
      });
    },
    []
  );

  useEffect(() => {
    const menuItems = convertToMenuItems(menuList);
    console.log(menuItems);

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

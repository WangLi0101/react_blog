import React, { useCallback, useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { useMenuStore } from "@/store/menu";
import { Icon } from "@iconify/react";
import { RouteObject, useLocation, useNavigate } from "react-router";
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
    const pathArrs = path.split("/").filter(Boolean);
    const openPaths = pathArrs.reduce(
      (prev: string[], _curr: string, index: number) => {
        const path = `/${pathArrs.slice(0, index + 1).join("/")}`;
        return [...prev, path];
      },
      []
    );
    // 设置展开的菜单项为除了最后一个路径外的所有父级路径
    setOpenKeys(openPaths.slice(0, -1));
    // 设置选中的菜单项为完整的当前路径
    setSelectedKeys([path]);
  }, [location.pathname]);

  const onSelect = ({ key }: { key: string }) => {
    navigate(key);
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
      />
    </Sider>
  );
};

export default CustomSider;

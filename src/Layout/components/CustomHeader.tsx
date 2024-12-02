import React from "react";
import { Layout, theme, Dropdown, Avatar, Space } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useUserStore } from "@/store/user";

const { Header } = Layout;

const CustomHeader: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const userStore = useUserStore();
  const userInfo = userStore.userInfo;

  const handleLogout = () => {
    // 在这里处理退出登录逻辑
    userStore.logout();
  };

  const dropdownItems: MenuProps["items"] = [
    {
      key: "1",
      label: "个人信息",
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "退出登录",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Header
      className="flex justify-end items-center px-6"
      style={{ background: colorBgContainer }}
    >
      <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
        <Space className="cursor-pointer">
          <Avatar icon={<UserOutlined />} className="bg-blue-400" />
          <span className="text-gray-700">{userInfo?.username}</span>
        </Space>
      </Dropdown>
    </Header>
  );
};

export default CustomHeader;

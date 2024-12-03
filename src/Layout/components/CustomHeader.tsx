import React, { useState } from "react";
import { Layout, theme, Dropdown, Avatar, Space, message } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined, LogoutOutlined, LockOutlined } from "@ant-design/icons";
import { useUserStore } from "@/store/user";
import ResetPasswordDialog from "@/views/system/user/components/ResetPasswordDialog";
import { resetPasswordPersonalApi } from "@/api/system";

const { Header } = Layout;

const CustomHeader: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const userStore = useUserStore();
  const userInfo = userStore.userInfo;
  const [resetPasswordVisible, setResetPasswordVisible] = useState(false);
  const handleLogout = () => {
    // 在这里处理退出登录逻辑
    userStore.logout();
  };

  const resetPassword = () => {
    setResetPasswordVisible(true);
  };

  const submitResetPassword = async (values: { password: string }) => {
    const res = await resetPasswordPersonalApi({
      password: values.password,
    });
    if (res.code === 0) {
      setResetPasswordVisible(false);
      message.success("重置密码成功");
      userStore.logout();
    }
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
    {
      key: "3",
      label: "重制密码",
      icon: <LockOutlined />,
      onClick: resetPassword,
    },
  ];

  return (
    <>
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
      <ResetPasswordDialog
        visible={resetPasswordVisible}
        setVisible={setResetPasswordVisible}
        onSubmit={submitResetPassword}
      />
    </>
  );
};

export default CustomHeader;

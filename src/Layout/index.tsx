import React, { useState, useEffect, Suspense } from "react";
import { Layout, theme } from "antd";
import CustomHeader from "./components/CustomHeader";
import CustomSider from "./components/CustomSider";
import CustomBreadcrumb from "./components/CustomBreadcrumb";
import { Outlet } from "react-router";
import { Auth } from "@/components/Auth";
import Loading from "./components/Loading";
const { Content } = Layout;

// 固定高度常量
const HEADER_HEIGHT = 64; // antd 默认 header 高度
const BREADCRUMB_HEIGHT = 48; // 面包屑区域高度（包含margin）
const FOOTER_HEIGHT = 0; // footer 高度
const CONTENT_PADDING = 48; // 内容区域上下padding总和

const LayoutPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const calculateHeight = () => {
      const windowHeight = window.innerHeight;
      const availableHeight =
        windowHeight -
        (HEADER_HEIGHT + BREADCRUMB_HEIGHT + FOOTER_HEIGHT + CONTENT_PADDING);
      setContentHeight(availableHeight);
    };

    // 初始计算
    calculateHeight();

    // 监听窗口大小变化
    window.addEventListener("resize", calculateHeight);

    // 清理监听器
    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <CustomSider collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout>
        <CustomHeader />
        <Content style={{ margin: "0 16px" }}>
          <CustomBreadcrumb />
          <div
            style={{
              padding: 24,
              height: contentHeight,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: "auto", // 添加滚动条
            }}
          >
            <Auth>
              <Suspense fallback={<Loading />}>
                <Outlet />
              </Suspense>
            </Auth>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;

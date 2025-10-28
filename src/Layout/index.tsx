import React, { useState, useEffect, Suspense } from "react";
import { Layout } from "antd";
import CustomHeader from "./components/CustomHeader";
import CustomSider from "./components/CustomSider";
import { Outlet } from "react-router";
import Loading from "./components/Loading";
import { CustomDrawer } from "./components/CustomDrawer";
import { PageTransition } from "@/components/PageTransition";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router";
const { Content } = Layout;

// 固定高度常量
const HEADER_HEIGHT = 64; // antd 默认 header 高度
const FOOTER_HEIGHT = 0; // footer 高度
const CONTENT_PADDING = 48; // 内容区域上下padding总和

const LayoutPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const calculateHeight = () => {
      const windowHeight = window.innerHeight;
      const availableHeight =
        windowHeight - (HEADER_HEIGHT + FOOTER_HEIGHT + CONTENT_PADDING);
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
    <>
      <style>{`
        .modern-layout {
          background: var(--bg);
        }
        
        .layout-main {
          background: transparent;
        }
        
        .content-wrapper {
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-light);
          transition: all 0.3s ease;
        }
        
        .content-wrapper:hover {
          box-shadow: var(--shadow-hover);
        }
        
        .bg-decoration {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }
        
        .decoration-circle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(75, 107, 251, 0.1), rgba(102, 126, 234, 0.05));
          animation: float 6s ease-in-out infinite;
        }
        
        .decoration-circle-1 {
          width: 200px;
          height: 200px;
          top: -100px;
          right: -100px;
          animation-delay: 0s;
        }
        
        .decoration-circle-2 {
          width: 150px;
          height: 150px;
          bottom: -75px;
          left: -75px;
          animation-delay: 2s;
        }
        
        .decoration-circle-3 {
          width: 100px;
          height: 100px;
          top: 50%;
          right: 10%;
          animation-delay: 4s;
        }
        
        @media (max-width: 768px) {
          .content-wrapper {
            margin: 0 8px;
            padding: 16px;
            border-radius: 12px;
          }
          
          .decoration-circle {
            display: none;
          }
        }
      `}</style>

      <Layout style={{ minHeight: "100vh" }} className="modern-layout">
        <CustomSider collapsed={collapsed} onCollapse={setCollapsed} />
        <Layout className="layout-main">
          <CustomHeader />
          <Content style={{ margin: "16px" }}>
            <div
              className="content-wrapper modern-card"
              style={{
                padding: 20,
                height: contentHeight,
                background: "var(--bg-card)",
                borderRadius: 16,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                className="content-inner"
                style={{
                  height: "100%",
                  overflowX: "hidden",
                  overflowY: "auto",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <AnimatePresence initial={false}>
                  <Suspense fallback={<Loading />}>
                    <PageTransition key={location.pathname}>
                      <Outlet />
                    </PageTransition>
                  </Suspense>
                </AnimatePresence>
              </div>
            </div>
          </Content>
        </Layout>
        <CustomDrawer />
      </Layout>
    </>
  );
};

export default LayoutPage;

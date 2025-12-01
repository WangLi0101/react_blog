import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Header } from "./components/Header";
import { motion } from "framer-motion";

const BlogIndex: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-theme-bg transition-colors duration-500">
      {/* 动态背景网格 - 覆盖全屏 */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* 基础网格 */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* 顶部左侧装饰光斑 */}
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />

        {/* 底部右侧装饰光斑 */}
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-400/10 dark:bg-purple-500/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* 中间补充光斑 - 增加丰富度 */}
        <div className="absolute top-[40%] left-[60%] w-[400px] h-[400px] bg-pink-400/5 dark:bg-pink-500/5 rounded-full blur-[100px]" />

        {/* 鼠标跟随光斑 */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-primary/15 dark:bg-primary/10 blur-[100px]"
          animate={{
            x: mousePosition.x - 300,
            y: mousePosition.y - 300,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      </div>

      {/* 内容区域 - 确保在背景之上 */}
      <div className="relative z-10 h-screen overflow-y-auto scroll-smooth">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default BlogIndex;

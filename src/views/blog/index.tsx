import React from "react";
import { Outlet } from "react-router";
import { Header } from "./components/Header";

const BlogIndex: React.FC = () => {
  return (
    <div className="w-[85%] mx-auto flex flex-col h-screen ">
      <Header />
      <div className="content flex-1 overflow-hidden py-[50px]">
        <Outlet />
      </div>
    </div>
  );
};
export default BlogIndex;

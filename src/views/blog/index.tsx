import React from "react";
import { Outlet } from "react-router";
import { Header } from "./components/Header";

const BlogIndex: React.FC = () => {
  return (
    <div className="w-[85%] mx-auto">
      <Header />
      <div className="content mt-[50px]">
        <Outlet />
      </div>
    </div>
  );
};
export default BlogIndex;

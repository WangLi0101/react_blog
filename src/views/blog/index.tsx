import React from "react";
import { Outlet } from "react-router";
import { Header } from "./components/Header";

const BlogIndex: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="w-[85%] mx-auto">
        <div className="content py-[50px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default BlogIndex;

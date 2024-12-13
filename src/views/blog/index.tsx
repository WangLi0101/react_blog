import React from "react";
import { Outlet } from "react-router";
import { Header } from "./components/Header";

const BlogIndex: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="w-[85%] mx-auto max-md:w-[90%]">
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default BlogIndex;

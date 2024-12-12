import React from "react";
import Blogging from "@/assets/images/blogging.svg?react";
import "./index.scss";
const Home: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="left">
        <div className="title">
          <h2 className="text-2xl font-bold">
            <span className="text-theme-primary">BLOG</span>
            <span className="text-theme-secondary">BLOG</span>
          </h2>
        </div>
      </div>
      <div className="right w-1/2">
        <Blogging className="w-full h-auto blogging" />
      </div>
    </div>
  );
};
export default Home;

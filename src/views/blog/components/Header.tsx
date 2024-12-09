import React from "react";
import { NavLink, useLocation } from "react-router";
import logo from "@/assets/images/logo.png";
import clsx from "clsx";
import { Switch } from "antd";
import { Moon, Sun } from "lucide-react";
export const Header: React.FC = () => {
  const location = useLocation();
  return (
    <div>
      <div className="logo h-[36px] py-[35px] flex items-center justify-between">
        <h1>
          <NavLink to="/home">
            <img src={logo} alt="logo" className="w-[158px] h-[36px]" />
          </NavLink>
        </h1>
        <div className="flex items-center">
          <div className="nav-item space-x-[40px]">
            <NavLink
              to="/home"
              className={clsx("font-bold", {
                "text-primary": location.pathname === "/home",
                "font-weight-bold": location.pathname === "/home",
              })}
            >
              首页
            </NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/tga">TAG</NavLink>
            <NavLink to="/about">ABOUT</NavLink>
          </div>
        </div>
        <div className="right">
          <Switch
            checkedChildren={<Sun className="h-[16px] w-[16px] mt-[2px]" />}
            unCheckedChildren={<Moon className="h-[16px] w-[16px] mt-[1px]" />}
            defaultChecked
          />
        </div>
      </div>
    </div>
  );
};

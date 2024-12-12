import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import logo from "@/assets/images/logo.png";
import clsx from "clsx";
import { Switch } from "antd";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/theme";

export const Header: React.FC = () => {
  const location = useLocation();
  const themeStore = useThemeStore();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const change = (flag: boolean) => {
    themeStore.setMode(flag ? "dark" : "light");
  };

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        "bg-theme-bg dark:bg-black",
        {
          "shadow-md": isScrolled,
        }
      )}
    >
      <div className="w-[85%] mx-auto flex justify-between items-center h-20">
        <div className="logo cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" className="w-[158px] h-[36px]" />
        </div>
        <div className="flex items-center">
          <div className="nav-item space-x-[40px]">
            <NavLink
              to="/home"
              className={clsx({
                "text-theme-primary": location.pathname === "/home",
                "font-bold": location.pathname === "/home",
              })}
            >
              Home
            </NavLink>
            <NavLink
              to="/blog"
              className={clsx({
                "text-theme-primary": location.pathname === "/blog",
                "font-bold": location.pathname === "/blog",
              })}
            >
              Blog
            </NavLink>
            {/* <NavLink
              to="/tga"
              className={clsx({
                "text-theme-primary": location.pathname === "/tga",
                "font-bold": location.pathname === "/tga",
              })}
            >
              TAG
            </NavLink> */}
            <NavLink
              to="/about"
              className={clsx({
                "text-theme-primary": location.pathname === "/about",
                "font-bold": location.pathname === "/about",
              })}
            >
              ABOUT
            </NavLink>
          </div>
        </div>
        <div className="right">
          <Switch
            value={themeStore.mode === "dark"}
            onChange={change}
            checkedChildren={<Sun className="h-[16px] w-[16px] mt-[2px]" />}
            unCheckedChildren={<Moon className="h-[16px] w-[16px] mt-[1px]" />}
            defaultChecked
          />
        </div>
      </div>
    </header>
  );
};

import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import Logo from "@/assets/images/logo.svg?react";
import clsx from "clsx";
import { Switch } from "antd";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/theme";
import "./header.scss";
const menuList = [
  {
    path: "/front/home",
    name: "Home",
  },
  {
    path: "/front/blog",
    name: "Blog",
  },
  {
    path: "/front/about",
    name: "About",
  },
];
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
    themeStore.setIsDark(flag);
  };

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        "bg-theme-bg",
        {
          "shadow-md": isScrolled,
        }
      )}
    >
      <div className="w-[85%] mx-auto flex justify-between items-center h-20">
        <div className="logo cursor-pointer" onClick={() => navigate("/")}>
          <Logo className="w-[150px] h-auto logoSvg" />
        </div>
        <div className="flex items-center">
          <div className="nav-item space-x-[40px]">
            {menuList.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={clsx({
                  "text-theme-primary": location.pathname === item.path,
                  "font-bold": location.pathname === item.path,
                })}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="right">
          <Switch
            value={themeStore.isDark}
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

import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Logo from "@/assets/images/logo.svg?react";
import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/store/theme";
import "./header.scss";
import { MenuIcon } from "./MenuIcon";
import { motion, AnimatePresence } from "framer-motion";

const menuList = [
  {
    path: "/home",
    name: "Home",
  },
  {
    path: "/blog",
    name: "Blog",
  },
  {
    path: "/about",
    name: "About",
  },
];

export const Header: React.FC = () => {
  const themeStore = useThemeStore();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const scrollPosition = target.scrollTop;
      setIsScrolled(scrollPosition > 0);
    };

    const container = document.querySelector(".h-screen.overflow-y-auto");
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !themeStore.isDark;
    themeStore.setIsDark(newIsDark);
    themeStore.setMode(newIsDark ? "dark" : "light");
  };

  return (
    <header
      className={clsx("sticky top-0 z-50 transition-all duration-300", {
        "bg-theme-bg/80 backdrop-blur-md shadow-sm border-b border-theme-border":
          isScrolled || isMenuOpen,
        "bg-transparent border-b border-transparent":
          !isScrolled && !isMenuOpen,
      })}
    >
      <div className="w-[85%] mx-auto flex justify-between items-center h-20">
        <div
          className="logo cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/")}
          onDoubleClick={() => navigate("/login")}
        >
          <Logo className="w-[140px] h-auto logoSvg" />
        </div>

        <div className="flex items-center max-md:hidden">
          <div className="nav-item flex space-x-8">
            {menuList.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    "relative px-3 py-2 text-base font-medium transition-colors duration-300 group",
                    isActive
                      ? "text-theme-primary"
                      : "text-theme-text-secondary hover:text-theme-text-primary"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    <span
                      className={clsx(
                        "absolute bottom-0 left-0 w-full h-0.5 bg-theme-primary transform transition-transform duration-300 origin-left",
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="right flex items-center gap-4">
          {/* Modern Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            className="relative w-12 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center px-1 shadow-inner hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors duration-300"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
          >
            {/* Track icons */}
            <div className="absolute left-1.5 text-yellow-500">
              <Sun size={14} strokeWidth={2.5} />
            </div>
            <div className="absolute right-1.5 text-blue-400">
              <Moon size={14} strokeWidth={2.5} />
            </div>

            {/* Moving thumb */}
            <motion.div
              className="relative z-10 w-5 h-5 bg-white dark:bg-gray-900 rounded-full shadow-md flex items-center justify-center"
              layout
              transition={{
                type: "spring",
                stiffness: 700,
                damping: 30,
              }}
              animate={{
                x: themeStore.isDark ? 20 : 0,
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={themeStore.isDark ? "dark" : "light"}
                  initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {themeStore.isDark ? (
                    <Moon
                      size={12}
                      className="text-blue-400"
                      fill="currentColor"
                    />
                  ) : (
                    <Sun
                      size={12}
                      className="text-yellow-500"
                      fill="currentColor"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.button>

          <MenuIcon
            className="hidden max-md:flex"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            isMenuOpen={isMenuOpen}
          />
        </div>
      </div>

      {/* Mobile Menu Overlay - 当菜单打开时遮罩背景 */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-20 bg-black/20 dark:bg-black/40 backdrop-blur-[2px] z-[-1]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={clsx(
          "md:hidden absolute top-20 left-0 w-full bg-theme-bg border-b border-theme-border shadow-xl transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col items-start py-2">
          {menuList.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  "w-full px-6 py-4 text-lg transition-colors border-l-4 font-medium",
                  isActive
                    ? "border-theme-primary text-theme-primary bg-theme-primary/5 font-bold"
                    : "border-transparent text-theme-text-primary hover:bg-theme-bg-secondary hover:text-theme-text-primary"
                )
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

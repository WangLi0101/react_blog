import { BrowserRouter } from "react-router";
import { Router } from "./router";
import { ConfigProvider, message, theme } from "antd";
import { useThemeStore } from "./store/theme";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [_messageApi, contextHolder] = message.useMessage();
  const themeStore = useThemeStore();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (themeStore.mode === "auto") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(isDark);
    } else {
      setIsDark(themeStore.mode === "dark");
    }
  }, [themeStore.mode]);

  useEffect(() => {
    AOS.init({
      duration: 600, // 适中的动画时长
      offset: 80, // 减小偏移量
      delay: 0,
      easing: "ease-out", // 使用更流畅的缓动函数
      throttleDelay: 99, // 节流延迟
      disableMutationObserver: false, // 禁用突变观察器以提高性能
    });

    // 使用 requestAnimationFrame 优化滚动性能
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        AOS.refresh();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    // @ts-expect-error startViewTransition is not yet in all TS definitions
    if (!document.startViewTransition) {
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light"
      );
      return;
    }
    // @ts-expect-error startViewTransition is not yet in all TS definitions
    document.startViewTransition(() => {
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light"
      );
    });
  }, [isDark]);
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: themeStore.colorTheme.colorPrimary,
          },
          components: {
            Button: {
              colorLink: themeStore.colorTheme.colorPrimary,
            },
          },
        }}
      >
        {contextHolder}
        <Router />
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;

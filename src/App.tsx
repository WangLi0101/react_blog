import { BrowserRouter } from "react-router";
import { Router } from "./router";
import { ConfigProvider, message, theme } from "antd";
import { useThemeStore } from "./store/theme";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [_messageApi, contextHolder] = message.useMessage();
  const themeStore = useThemeStore();

  const getIsDark = () => {
    if (themeStore.mode === "auto") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      themeStore.setIsDark(isDark);
    } else {
      themeStore.setIsDark(themeStore.mode === "dark");
    }
  };

  useEffect(() => {
    getIsDark();
    AOS.init({
      duration: 600, // 适中的动画时长
      offset: 80, // 减小偏移量
      delay: 0,
      easing: "ease-out", // 使用更流畅的缓动函数
      throttleDelay: 99, // 节流延迟
      disableMutationObserver: false, // 禁用突变观察器以提高性能
    });
  }, [themeStore.mode]);

  useEffect(() => {
    if (!document.startViewTransition) {
      document.documentElement.setAttribute(
        "data-theme",
        themeStore.isDark ? "dark" : "light"
      );
      return;
    }
    document.startViewTransition(() => {
      document.documentElement.setAttribute(
        "data-theme",
        themeStore.isDark ? "dark" : "light"
      );
    });
  }, [themeStore.isDark]);
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          algorithm: themeStore.isDark
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
          token: {
            colorPrimary: themeStore.colorTheme.colorPrimary,
            borderRadius: 6,
            fontFamily:
              '"WorkSans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          },
          components: {
            Button: {
              controlHeight: 36,
              borderRadius: 6,
              defaultShadow: "0 2px 0 rgba(0, 0, 0, 0.02)",
              primaryShadow: "0 2px 0 rgba(0, 0, 0, 0.045)",
              paddingInline: 18,
              fontWeight: 500,
            },
            Pagination: {
              itemActiveBg: themeStore.colorTheme.colorPrimary,
              borderRadius: 6,
              itemSize: 36,
            },
            Input: {
              controlHeight: 36,
              borderRadius: 6,
              activeShadow: "0 0 0 2px rgba(75, 107, 251, 0.1)",
            },
            Select: {
              controlHeight: 36,
              borderRadius: 6,
            },
            Table: {
              headerBg: "transparent",
              headerSplitColor: "transparent",
              rowHoverBg: themeStore.isDark ? "#1e293b" : "#f8fafc",
              headerColor: themeStore.isDark ? "#94a3b8" : "#64748b",
            },
            Card: {
              borderRadiusLG: 16,
            },
            Modal: {
              borderRadiusLG: 16,
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

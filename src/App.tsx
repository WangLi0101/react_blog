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
  }, []);

  useEffect(() => {
    // @ts-expect-error startViewTransition is not yet in all TS definitions
    if (!document.startViewTransition) {
      document.documentElement.setAttribute(
        "data-theme",
        themeStore.isDark ? "dark" : "light"
      );
      return;
    }
    // @ts-expect-error startViewTransition is not yet in all TS definitions
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

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
      duration: 1000, // 动画持续时间（毫秒）
      offset: 120, // 偏移量，控制动画开始的位置
      delay: 0, // 动画延迟时间
      easing: "ease-in-out", // 动画缓动函数
    });
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

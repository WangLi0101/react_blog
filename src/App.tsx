import { HashRouter } from "react-router";
import { Router } from "./router";
import { ConfigProvider, message, theme } from "antd";
import { useThemeStore } from "./store/theme";
import { useEffect, useState } from "react";

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
  return (
    <HashRouter>
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
    </HashRouter>
  );
}

export default App;

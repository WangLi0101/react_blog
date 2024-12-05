import "./App.css";
import { HashRouter } from "react-router";
import { Router } from "./router";
import { ConfigProvider, message } from "antd";

function App() {
  const [_messageApi, contextHolder] = message.useMessage();
  return (
    <HashRouter>
      <ConfigProvider>
        {contextHolder}
        <Router />
      </ConfigProvider>
    </HashRouter>
  );
}

export default App;

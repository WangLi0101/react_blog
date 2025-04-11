import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// 导入 antd 样式
import "antd/dist/reset.css";
import "./style/index.scss";
import { init } from "./utils/serviceWorker";

init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

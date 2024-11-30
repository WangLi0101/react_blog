import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
// 导入 antd 样式
import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

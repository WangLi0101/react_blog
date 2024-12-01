import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface LoadingProps {
  tip?: string;
}

const Loading: React.FC<LoadingProps> = ({ tip = "加载中..." }) => {
  const antIcon = <LoadingOutlined spin />;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/90 z-[9999]">
      <div className="text-center">
        <Spin
          indicator={antIcon}
          size="large"
          className="[&_.anticon]:text-4xl"
        />
        <div className="mt-4 text-base font-medium text-blue-500">{tip}</div>
      </div>
    </div>
  );
};

export default Loading;

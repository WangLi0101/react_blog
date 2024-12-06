import { Drawer, Radio, RadioChangeEvent } from "antd";
import { emitter } from "@/utils/mitt";
import React, { useEffect, useState } from "react";
import { useThemeStore } from "@/store/theme";
import { Icon } from "@iconify/react";
import { themeList } from "@/utils/theme";

export const CustomDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const themeStore = useThemeStore();
  const mode = themeStore.mode;
  const modeChange = (e: RadioChangeEvent) => {
    themeStore.setMode(e.target.value);
  };
  useEffect(() => {
    emitter.on("setOpen", (event: boolean) => {
      setOpen(event);
    });
    return () => {
      emitter.off("setOpen");
    };
  }, []);
  return (
    <Drawer title="系统配置" onClose={() => setOpen(false)} open={open}>
      <div className="item">
        <h1 className="mb-4 text-[16px]">整体风格</h1>
        <Radio.Group
          optionType="button"
          className="w-full"
          value={mode}
          onChange={modeChange}
          buttonStyle="solid"
        >
          <Radio value="light" className="w-1/3">
            <div className="flex justify-center">Light</div>
          </Radio>
          <Radio value="dark" className="w-1/3">
            <div className="flex justify-center">Dark</div>
          </Radio>
          <Radio value="auto" className="w-1/3">
            <div className="flex justify-center">Auto</div>
          </Radio>
        </Radio.Group>
      </div>
      <div className="item mt-10">
        <h2 className="mb-4 text-[16px]">主题色</h2>
        <div className="list flex flex-wrap gap-4">
          {Object.keys(themeList).map((item) => (
            <div
              onClick={() => themeStore.setColorTheme(themeList[item])}
              key={item}
              className="w-[20px] h-[20px] rounded-[4px] cursor-pointer flex justify-center items-center"
              style={{ backgroundColor: item }}
            >
              {themeStore.colorTheme.colorPrimary === item && (
                <Icon icon="ic:round-check" color="#fff" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

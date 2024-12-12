import React from "react";
import Dark from "@/assets/images/dark.svg?react";
import Light from "@/assets/images/light.svg?react";

import { useThemeStore } from "@/store/theme";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";

const Home: React.FC = () => {
  const themeStore = useThemeStore();
  const navigate = useNavigate();
  return (
    <div className="flex items-center w-[80%] mx-auto h-[calc(100vh-80px)]">
      <div className="left w-1/2">
        <div className="title">
          <h2 className="text-4xl font-bold leading-[60px]" data-aos="fade-up">
            Enjoy the moment,
            <br /> and keep progressing endlessly
          </h2>
          <div className="operator mt-5" data-aos="fade-up">
            <Button onClick={() => navigate("/blog")}>go blog</Button>
          </div>
        </div>
      </div>
      <div className="right w-1/2">
        {themeStore.mode === "dark" ? (
          <Dark className="w-full h-auto" data-aos="zoom-in" />
        ) : (
          <Light className="w-full h-auto" data-aos="zoom-in" />
        )}
      </div>
    </div>
  );
};
export default Home;

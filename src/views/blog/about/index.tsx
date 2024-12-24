import React from "react";
import Dark from "@/assets/images/dark.svg?react";
import Light from "@/assets/images/light.svg?react";
import { useThemeStore } from "@/store/theme";
import avatar from "@/assets/images/avatar.jpg";
import { Icon } from "@iconify/react";
import { Tag } from "../components/Tag";
const skills = ["Vue", "React", "NestJS", "TypeScript", "Node.js", "Electron"];
const githubUsername = "WangLi0101";
const email = "uer1366197226@gmail.com";

const About: React.FC = () => {
  const themeStore = useThemeStore();
  return (
    <div className="flex items-center w-[80%] mx-auto h-[calc(100dvh-80px)] max-md:flex-col max-md:w-full max-md:justify-center">
      <div className="left w-1/2 max-md:w-full max-md:mt-10 max-md:hidden">
        {themeStore.isDark ? (
          <Dark className="w-full h-auto" data-aos="zoom-in" />
        ) : (
          <Light className="w-full h-auto" data-aos="zoom-in" />
        )}
      </div>
      <div className="right w-1/2 max-md:w-full p-8 space-y-6 ml-[50px] max-md:ml-0">
        <div
          className="flex items-center space-x-4 mb-6 max-md:flex-col max-md:space-x-0"
          data-aos="fade-up"
        >
          <img
            src={avatar}
            alt="GitHub Avatar"
            className="rounded-full w-20 h-20 max-md:mb-5"
          />
          <h1 className="text-4xl font-bold">About Me</h1>
        </div>
        <p className="text-lg mb-4" data-aos="fade-up" data-aos-delay="100">
          Hi, I'm WangL, a passionate web developer with a love for creating
          beautiful and functional websites.
        </p>

        <div className="space-y-2 mt-6" data-aos="fade-up" data-aos-delay="300">
          <div className="flex items-center space-x-2">
            <Icon icon="mdi:github" fontSize={20} />
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              {githubUsername}
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <Icon icon="material-symbols:attach-email-outline" fontSize={20} />
            <a href={`mailto:${email}`} className="font-bold">
              {email}
            </a>
          </div>
        </div>
        <div className="mt-8" data-aos="fade-up" data-aos-delay="400">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

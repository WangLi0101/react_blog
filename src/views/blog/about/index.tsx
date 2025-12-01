import React from "react";
import Dark from "@/assets/images/dark.svg?react";
import Light from "@/assets/images/light.svg?react";
import { useThemeStore } from "@/store/theme";
import avatar from "@/assets/images/avatar.jpg";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { skills, basicInfo, projectList } from "@/views/resume";
import {
  Github,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  FolderOpen,
} from "lucide-react";

const About: React.FC = () => {
  const themeStore = useThemeStore();
  const githubUsername = "WangLi0101";
  const email = "uer1366197226@gmail.com";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="w-[1200px] max-w-full mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 min-h-[calc(100vh-80px)] flex items-center">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column - Image & Visuals */}
        <motion.div
          className="relative hidden lg:flex justify-center items-center"
          variants={itemVariants}
        >
          <div className="relative w-full max-w-[500px] aspect-square">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse" />
            {themeStore.isDark ? (
              <Dark className="w-full h-auto drop-shadow-2xl" />
            ) : (
              <Light className="w-full h-auto drop-shadow-2xl" />
            )}
          </div>
        </motion.div>

        {/* Right Column - Content */}
        <div className="space-y-10">
          {/* Profile Header */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-6">
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-primary rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
                <img
                  src={avatar}
                  alt="Avatar"
                  className="relative w-24 h-24 rounded-full object-cover border-4 border-theme-bg shadow-xl"
                />
              </motion.div>
              <div>
                <h1 className="text-4xl font-extrabold text-theme-text-primary mb-2">
                  {basicInfo.title}
                </h1>
                <p className="text-xl text-primary font-medium">
                  {basicInfo.subtitle}
                </p>
              </div>
            </div>

            <p className="text-lg text-theme-text-secondary leading-relaxed max-w-xl">
              Hi there! I'm a passionate developer dedicated to building
              beautiful, functional, and user-friendly web applications. I love
              exploring new technologies and turning creative ideas into
              reality.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-theme-bg-secondary text-theme-text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-theme-bg-secondary text-theme-text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-theme-bg-secondary/50 text-theme-text-secondary border border-theme-border/50">
                <MapPin className="w-4 h-4" />
                <span>Beijing, China</span>
              </div>
            </div>
          </motion.div>

          {/* Stats / Info Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4"
          >
            <div className="p-4 rounded-2xl bg-theme-card border border-theme-border/60 shadow-sm hover:shadow-md transition-shadow">
              <Briefcase className="w-6 h-6 text-blue-500 dark:text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-theme-text-primary">
                3+ Years
              </div>
              <div className="text-sm text-theme-text-secondary">
                Experience
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-theme-card border border-theme-border/60 shadow-sm hover:shadow-md transition-shadow">
              <FolderOpen className="w-6 h-6 text-purple-500 dark:text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-theme-text-primary">
                {projectList.length}+
              </div>
              <div className="text-sm text-theme-text-secondary">Projects</div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-theme-text-primary mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-theme-card border border-theme-border/60 shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-default"
                >
                  <Icon icon={skill.icon} className="w-5 h-5" />
                  <span className="font-medium text-theme-text-primary">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;

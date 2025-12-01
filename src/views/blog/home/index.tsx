import React from "react";
import Dark from "@/assets/images/dark.svg?react";
import Light from "@/assets/images/light.svg?react";
import { useThemeStore } from "@/store/theme";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { Footer } from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { skills } from "@/views/resume";

const Home: React.FC = () => {
  const themeStore = useThemeStore();
  const navigate = useNavigate();

  // 技能图标动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-[calc(100vh-82px)] flex flex-col py-10 lg:py-0">
      <div className="container mx-auto px-6 lg:px-12 flex-1 flex flex-col justify-center relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* 左侧内容区域 */}
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                Welcome to my space
              </span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-theme-text-primary mb-8">
              Enjoy the moment,
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 animate-gradient-shift bg-[length:200%_auto]">
                  keep progressing
                </span>
                <motion.span
                  className="absolute -bottom-4 left-0 w-full h-2 bg-primary/30 rounded-full -z-10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
            </h2>

            <motion.p
              className="text-lg sm:text-xl text-theme-text-secondary mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Exploring the endless possibilities of frontend development.
              Crafting beautiful, responsive, and user-friendly experiences.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button
                onClick={() => navigate("/blog")}
                className="!h-[3.2em] !w-[11em] !text-lg shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1"
              >
                Explore Blog
              </Button>
              <Button
                onClick={() => navigate("/about")}
                className="!h-[3.2em] !w-[11em] !text-lg shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1 !border-theme-text-secondary !text-theme-text-secondary hover:!text-theme-bg hover:!border-theme-text-primary"
              >
                Contact Me
              </Button>
            </motion.div>

            {/* 技能图标展示 */}
            <motion.div
              className="mt-16 flex flex-wrap justify-center lg:justify-start gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-500"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {skills.slice(0, 6).map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-theme-bg-secondary/50 p-2 rounded-lg backdrop-blur-sm border border-theme-border hover:border-primary/50 transition-colors"
                  title={skill.name}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon icon={skill.icon} className="w-6 h-6" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* 右侧视觉区域 */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">
              {/* 背景装饰圆环 */}
              <motion.div
                className="absolute inset-0 border-2 border-dashed border-primary/10 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[15%] border border-primary/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />

              {/* 核心图片 */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 w-full"
              >
                <AnimatePresence mode="wait">
                  {themeStore.isDark ? (
                    <motion.div
                      key="dark"
                      initial={{ opacity: 0, rotate: -10 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 10 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Dark className="w-full h-auto drop-shadow-[0_0_50px_rgba(59,130,246,0.3)]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="light"
                      initial={{ opacity: 0, rotate: 10 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -10 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Light className="w-full h-auto drop-shadow-[0_0_50px_rgba(59,130,246,0.2)]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Home;

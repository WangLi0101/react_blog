import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  FolderOpen,
  GraduationCap,
  Rocket,
  Sparkles,
} from "lucide-react";
import ResumeHeader from "./components/ResumeHeader";
import EducationList from "./components/EducationList";
import ExperienceTimeline from "./components/ExperienceTimeline";
import SkillsGrid from "./components/SkillsGrid";
import ProjectCards from "./components/ProjectCards";
import MyProjectsGrid from "./components/MyProjectsGrid";
import {
  basicInfo,
  projectList,
  timeline,
  educations,
  skills,
  myProjectList,
} from "./index";
import { BackgroundDecor } from "./components/BackgroundDecor";
import { motion } from "framer-motion";

const SectionTitle: React.FC<{ icon: LucideIcon; title: string }> = ({
  icon: Icon,
  title,
}) => (
  <div className="flex items-center gap-3 mb-6 pb-2 border-b border-theme-border/50">
    <div className="p-2 rounded-lg bg-primary/10 text-primary shadow-sm">
      <Icon className="h-5 w-5" aria-hidden="true" />
    </div>
    <span className="text-lg font-bold text-theme-text-primary tracking-tight">
      {title}
    </span>
  </div>
);

const Resume: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isPdf = searchParams.has("isPdf");

  const t = {
    ...basicInfo,
    sections: {
      experience: "工作经历",
      education: "教育背景",
      skills: "专业技能",
      projects: "企业项目",
      myProjects: "个人项目",
    },
  } as const;

  useEffect(() => {
    document.title = `${t.title} - 简历`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        `${t.title}的专业简历：${t.subtitle}，包含工作经历、教育背景、技能与项目经验。`
      );
    }
  }, []);

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      },
    },
  };

  // Glassmorphism style
  const glassCard =
    "relative overflow-hidden rounded-2xl border border-white/40 dark:border-white/5 bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl shadow-sm transition-all hover:shadow-md hover:border-primary/20";

  return (
    // 外层容器：承载背景装饰并保证内容层级在上
    <div className="relative min-h-screen overflow-hidden font-sans">
      {/* 背景渲染层（print 隐藏，避免打印干扰） */}
      <BackgroundDecor variant="texture" />

      <main
        className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 text-theme-text-primary"
        aria-label="简历页面"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* 个人信息区 */}
          <motion.div variants={itemVariants}>
            <ResumeHeader
              title={t.title}
              subtitle={t.subtitle}
              contact={t.contact}
            />
          </motion.div>

          {/* 主内容区：两列栅格 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 左侧主栏：工作经历 + 项目经验 (占 8/12) */}
            <div className="lg:col-span-8 space-y-8">
              {/* 教育背景（移动端显示） */}
              <motion.section
                variants={itemVariants}
                aria-label={t.sections.education}
                className={`${glassCard} block lg:hidden p-6`}
              >
                <SectionTitle
                  icon={GraduationCap}
                  title={t.sections.education}
                />
                <EducationList items={educations} />
              </motion.section>

              {/* 工作经历时间轴 */}
              <motion.section
                variants={itemVariants}
                aria-label={t.sections.experience}
                className={`${glassCard} p-6 md:p-8`}
              >
                <SectionTitle icon={Briefcase} title={t.sections.experience} />
                <ExperienceTimeline items={timeline} />
              </motion.section>

              {/* 专业技能（移动端显示） */}
              <motion.section
                variants={itemVariants}
                aria-label={t.sections.skills}
                className={`${glassCard} block lg:hidden p-6`}
              >
                <SectionTitle icon={Sparkles} title={t.sections.skills} />
                <SkillsGrid items={skills} />
              </motion.section>

              {/* 项目经验 */}
              <motion.section
                variants={itemVariants}
                aria-label={t.sections.projects}
                className={`${glassCard} p-6 md:p-8`}
              >
                <SectionTitle icon={FolderOpen} title={t.sections.projects} />
                <ProjectCards items={projectList as any} />
              </motion.section>

              {/* 我的项目 */}
              <motion.section
                variants={itemVariants}
                aria-label={t.sections.myProjects}
                className={`${glassCard} p-6 md:p-8`}
              >
                <SectionTitle icon={Rocket} title={t.sections.myProjects} />
                <MyProjectsGrid
                  items={myProjectList as any}
                  showLinkDetails={isPdf}
                />
              </motion.section>
            </div>

            {/* 右侧侧边栏：教育背景 + 专业技能 (占 4/12) */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="sticky top-24 space-y-8">
                {/* 教育背景 */}
                <motion.section
                  variants={itemVariants}
                  aria-label={t.sections.education}
                  className={`${glassCard} hidden lg:block p-6`}
                >
                  <SectionTitle
                    icon={GraduationCap}
                    title={t.sections.education}
                  />
                  <EducationList items={educations} />
                </motion.section>

                {/* 专业技能 */}
                <motion.section
                  variants={itemVariants}
                  aria-label={t.sections.skills}
                  className={`${glassCard} hidden lg:block p-6`}
                >
                  <SectionTitle icon={Sparkles} title={t.sections.skills} />
                  <SkillsGrid items={skills} />
                </motion.section>
              </div>
            </aside>
          </div>
        </motion.div>

        {/* 页脚：可读性与版权 */}
        {!isPdf && (
          <motion.footer
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="mt-12 text-center text-sm text-theme-text-secondary border-t border-theme-border/30 pt-8"
          >
            <p>
              © {new Date().getFullYear()} {t.title}. All rights reserved.
            </p>
          </motion.footer>
        )}
      </main>
    </div>
  );
};

export default Resume;

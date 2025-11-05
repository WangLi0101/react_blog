import React, { useEffect, useState } from "react";
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

const Resume: React.FC = () => {
  // 背景方案：提供三种可选风格，默认“纹理渐变”
  type BgVariant = "texture" | "geometric" | "grid";
  const [bgStyle, setBgStyle] = useState<BgVariant>("texture");

  const t = {
    ...basicInfo,
    sections: {
      experience: "工作经历",
      education: "教育背景",
      skills: "专业技能",
      projects: "企业项目",
      myProjects: "我的项目",
    },
    actions: { download: "下载PDF", theme: "主题" },
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

  return (
    // 外层容器：承载背景装饰并保证内容层级在上
    <div className="relative min-h-screen overflow-hidden">
      {/* 背景渲染层（print 隐藏，避免打印干扰） */}
      <BackgroundDecor variant={bgStyle} />

      {/* 右上角背景风格切换控件（不影响现有功能组件） */}
      <div className="fixed right-4 top-4 z-20 print:hidden">
        <label className="sr-only" htmlFor="bg-switch">
          背景风格
        </label>
        <select
          id="bg-switch"
          value={bgStyle}
          onChange={(e) => setBgStyle(e.target.value as BgVariant)}
          className="appearance-none rounded-full border border-black/5 bg-white/70 backdrop-blur px-3 py-1.5 text-xs shadow-sm hover:shadow transition focus:outline-none focus:ring-2 focus:ring-sky-400/50"
          aria-label="选择背景风格"
        >
          <option value="texture">纹理渐变（专业柔和）</option>
          <option value="geometric">几何图形（现代科技）</option>
          <option value="grid">网格线稿（极简清爽）</option>
        </select>
      </div>

      <main
        className="relative z-10 mx-auto max-w-5xl px-4 py-6 text-theme-primary"
        aria-label="简历页面"
      >
        {/* 个人信息区 */}
        <ResumeHeader
          title={t.title}
          subtitle={t.subtitle}
          contact={t.contact}
        />

        {/* 主内容区：两列栅格 */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* 左侧：教育背景（移动端）+ 工作经历 + 项目经验 */}
          <article className="lg:col-span-2 space-y-6">
            {/* 教育背景（仅移动端显示，置于工作经历上方） */}
            <section
              aria-label={t.sections.education}
              className="modern-card block lg:hidden"
            >
              <h2 className="text-xl font-semibold mb-4">
                {t.sections.education}
              </h2>
              <EducationList items={educations} />
            </section>
            {/* 工作经历时间轴 */}
            <section aria-label={t.sections.experience} className="modern-card">
              <h2 className="text-xl font-semibold mb-4">
                {t.sections.experience}
              </h2>
              <ExperienceTimeline items={timeline} />
            </section>

            {/* 专业技能（移动端放在工作经历下） */}
            <section
              aria-label={t.sections.skills}
              className="modern-card block lg:hidden"
            >
              <h2 className="text-xl font-semibold mb-4">
                {t.sections.skills}
              </h2>
              <SkillsGrid items={skills} />
            </section>

            {/* 项目经验 */}
            <section aria-label={t.sections.projects} className="modern-card">
              <h2 className="text-xl font-semibold mb-4">
                {t.sections.projects}
              </h2>
              <ProjectCards items={projectList as any} />
            </section>

            {/* 我的项目（精简展示） */}
            <section aria-label={t.sections.myProjects} className="modern-card">
              <h2 className="text-xl font-semibold mb-4">
                {t.sections.myProjects}
              </h2>
              <MyProjectsGrid items={myProjectList as any} />
            </section>
          </article>

          {/* 右侧：教育背景 + 专业技能 */}
          <aside className="space-y-6">
            {/* 教育背景 */}
            <section
              aria-label={t.sections.education}
              className="modern-card hidden lg:block"
            >
              <h2 className="text-xl font-semibold mb-4">
                {t.sections.education}
              </h2>
              <EducationList items={educations} />
            </section>

            {/* 专业技能 */}
            {/* 专业技能（桌面端右侧显示） */}
            <section
              aria-label={t.sections.skills}
              className="modern-card hidden lg:block"
            >
              <h2 className="text-xl font-semibold mb-4">
                {t.sections.skills}
              </h2>
              <SkillsGrid items={skills} />
            </section>
          </aside>
        </section>

        {/* 页脚：可读性与版权 */}
        <footer className="mt-8 text-center text-xs text-theme-secondary">
          <p>
            © {new Date().getFullYear()} {t.title}. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Resume;

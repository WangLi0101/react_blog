import React, { useEffect } from "react";
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

const Resume: React.FC = () => {
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
    <main
      className="mx-auto max-w-5xl px-4 py-6 text-theme-primary"
      aria-label="简历页面"
    >
      {/* 个人信息区 */}
      <ResumeHeader title={t.title} subtitle={t.subtitle} contact={t.contact} />

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
            <h2 className="text-xl font-semibold mb-4">{t.sections.skills}</h2>
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
            <h2 className="text-xl font-semibold mb-4">{t.sections.skills}</h2>
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
  );
};

export default Resume;

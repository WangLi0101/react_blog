import React, { useEffect } from "react";
import avatar from "@/assets/images/avatar.jpg";
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
      <header className="resume-print bg-theme-secondary/60 rounded-2xl p-4 md:p-6 shadow-custom-shadow">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <img
            src={avatar}
            alt="职业照片"
            loading="lazy"
            className="h-28 w-28 rounded-2xl object-cover shadow-lg ring-1 ring-theme-border mx-auto md:mx-0"
          />
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight mb-2">
              {t.title}
            </h1>
            <p className="text-sm md:text-base text-theme-secondary mb-4">
              {t.subtitle}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <span className="text-theme-secondary">{t.contact.phone}</span>
              <span className="text-theme-secondary">{t.contact.email}</span>
              <span className="text-theme-secondary">{t.contact.location}</span>
              <span className="text-theme-secondary">{t.contact.website}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区：两列栅格 */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* 左侧：工作经历 + 项目经验 */}
        <article className="lg:col-span-2 space-y-6">
          {/* 工作经历时间轴 */}
          <section aria-label={t.sections.experience} className="modern-card">
            <h2 className="text-xl font-semibold mb-4">
              {t.sections.experience}
            </h2>
            <div className="relative ml-3">
              <div
                className="absolute left-0 top-0 h-full w-0.5 bg-theme-border"
                aria-hidden="true"
              />
              <ul className="space-y-6">
                {timeline.map((item, idx) => (
                  <li key={idx} className="pl-6">
                    <div className="relative">
                      <span className="absolute -left-3 top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="font-medium">
                          {item.company} · {item.role}
                        </div>
                        <div className="text-xs text-theme-secondary">
                          {item.period}
                        </div>
                      </div>
                      <ul className="mt-2 list-disc pl-4 text-sm text-theme-secondary space-y-1">
                        {item.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 专业技能（移动端放在工作经历下） */}
          <section
            aria-label={t.sections.skills}
            className="modern-card block lg:hidden"
          >
            <h2 className="text-xl font-semibold mb-4">{t.sections.skills}</h2>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-theme-border p-3"
                >
                  <span className="text-sm">{s.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 项目经验 */}
          <section aria-label={t.sections.projects} className="modern-card">
            <h2 className="text-xl font-semibold mb-4">
              {t.sections.projects}
            </h2>
            <div className="space-y-4">
              {projectList.map((p, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-theme-border p-4 hover:shadow-hover transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{p.name}</h3>
                  </div>
                  <p className="text-xs text-theme-secondary mt-1">{p.role}</p>
                  <p className="text-sm text-theme-secondary mt-2">{p.desc}</p>
                  <div className="mt-3">
                    <div className="text-sm font-medium mb-1">技术栈</div>
                    <div className="flex flex-wrap gap-2">
                      {p.techStack.map((s: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-theme-secondary/60 text-theme-secondary"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="text-sm font-medium mb-1">职责</div>
                    <ul className="list-disc pl-5 text-sm text-theme-secondary space-y-1">
                      {p.responsibility.map((r: string, i: number) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3">
                    <div className="text-sm font-medium mb-1">亮点</div>
                    <ul className="list-disc pl-5 text-sm text-theme-secondary space-y-1">
                      {p.highlight.map((h: { desc: string }, i: number) => (
                        <li key={i}>{h.desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 我的项目（精简展示） */}
          <section aria-label={t.sections.myProjects} className="modern-card">
            <h2 className="text-xl font-semibold mb-4">
              {t.sections.myProjects}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {myProjectList.map((p, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-theme-border p-4 hover:shadow-hover transition-shadow"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold leading-tight">{p.name}</h3>
                      {p.role && (
                        <p className="text-xs text-theme-secondary mt-0.5">
                          {p.role}
                        </p>
                      )}
                    </div>
                    {Array.isArray(p.github) && p.github[0] && (
                      <a
                        href={p.github[0]}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 text-xs px-2 py-1 rounded-md border border-theme-border text-theme-primary hover:bg-theme-secondary/60"
                        aria-label="查看GitHub"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                  {p.desc && (
                    <p className="text-sm text-theme-secondary mt-2">
                      {p.desc}
                    </p>
                  )}
                  {Array.isArray(p.techStack) && p.techStack.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.techStack.map((s: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-theme-secondary/60 text-theme-secondary"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* 右侧：教育背景 + 专业技能 */}
        <aside className="space-y-6">
          {/* 教育背景 */}
          <section aria-label={t.sections.education} className="modern-card">
            <h2 className="text-xl font-semibold mb-4">
              {t.sections.education}
            </h2>
            <ul className="space-y-4">
              {educations.map((e, idx) => (
                <li
                  key={idx}
                  className="rounded-xl border border-theme-border p-4"
                >
                  <div className="font-medium">{e.school}</div>
                  <div className="text-sm text-theme-secondary">{e.degree}</div>
                  <div className="text-xs text-theme-secondary mt-1">
                    {e.period}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* 专业技能 */}
          {/* 专业技能（桌面端右侧显示） */}
          <section
            aria-label={t.sections.skills}
            className="modern-card hidden lg:block"
          >
            <h2 className="text-xl font-semibold mb-4">{t.sections.skills}</h2>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-theme-border p-3"
                >
                  <span className="text-sm">{s.name}</span>
                </div>
              ))}
            </div>
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

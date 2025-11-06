import React from "react";

export type MyProject = {
  name: string;
  role?: string;
  desc?: string;
  techStack?: string[];
  github?: string[];
  url?: string;
};

type Props = {
  items: MyProject[];
};

const MyProjectsGrid: React.FC<Props> = ({ items }) => {
  const visibleItems = Array.isArray(items) ? items.filter((p) => !!p.url) : [];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {visibleItems.map((p, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-theme-border p-4 hover:shadow-hover transition-shadow"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold leading-tight">{p.name}</h3>
              {p.role && (
                <p className="text-xs text-theme-secondary mt-0.5">{p.role}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 text-xs px-2 py-1 rounded-md border border-theme-border text-theme-primary hover:bg-theme-secondary/60"
                  aria-label="访问项目"
                >
                  访问
                </a>
              )}
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
          </div>
          {p.desc && <p className="text-sm text-theme-secondary mt-2">{p.desc}</p>}
          {Array.isArray(p.techStack) && p.techStack.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {p.techStack.map((s, i) => (
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
  );
};

export default MyProjectsGrid;
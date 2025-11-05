import React from "react";

export type Project = {
  name: string;
  role?: string;
  desc?: string;
  techStack: string[];
  responsibility: string[];
  highlight: { desc: string }[];
};

type Props = {
  items: Project[];
};

const ProjectCards: React.FC<Props> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((p, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-theme-border p-4 hover:shadow-hover transition-shadow"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{p.name}</h3>
          </div>
          {p.role && <p className="text-xs text-theme-secondary mt-1">{p.role}</p>}
          {p.desc && <p className="text-sm text-theme-secondary mt-2">{p.desc}</p>}

          <div className="mt-3">
            <div className="text-sm font-medium mb-1">技术栈</div>
            <div className="flex flex-wrap gap-2">
              {p.techStack.map((s, i) => (
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
              {p.responsibility.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          <div className="mt-3">
            <div className="text-sm font-medium mb-1">亮点</div>
            <ul className="list-disc pl-5 text-sm text-theme-secondary space-y-1">
              {p.highlight.map((h, i) => (
                <li key={i}>{h.desc}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCards;
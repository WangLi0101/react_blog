import React from "react";
import { ExternalLink, Github } from "lucide-react";

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
  showLinkDetails?: boolean;
};

const MyProjectsGrid: React.FC<Props> = ({ items, showLinkDetails = false }) => {
  const visibleItems = Array.isArray(items)
    ? items.filter((p) => (showLinkDetails ? true : !!p.url))
    : [];
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
            {!showLinkDetails && (
              <div className="flex items-center gap-2">
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-theme-border text-theme-primary hover:bg-theme-secondary/60"
                    aria-label="访问项目"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    访问
                  </a>
                )}
                {Array.isArray(p.github) && p.github[0] && (
                  <a
                    href={p.github[0]}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-theme-border text-theme-primary hover:bg-theme-secondary/60"
                    aria-label="查看GitHub"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    GitHub
                  </a>
                )}
              </div>
            )}
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
          {showLinkDetails && (
            <div className="mt-3 space-y-1 text-xs text-theme-secondary">
              {p.url && (
                <p className="flex items-center gap-2 break-all">
                  <ExternalLink className="h-3.5 w-3.5 text-theme-primary" aria-hidden="true" />
                  <span>{p.url}</span>
                </p>
              )}
              {Array.isArray(p.github) && p.github.length > 0 &&
                p.github.map((link, linkIdx) => (
                  <p key={`${idx}-github-${linkIdx}`} className="flex items-center gap-2 break-all">
                    <Github className="h-3.5 w-3.5 text-theme-primary" aria-hidden="true" />
                    <span>{link}</span>
                  </p>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyProjectsGrid;
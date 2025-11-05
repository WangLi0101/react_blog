import React from "react";

export type TimelineItem = {
  company: string;
  role: string;
  period: string;
  details: string[];
};

type Props = {
  items: TimelineItem[];
};

const ExperienceTimeline: React.FC<Props> = ({ items }) => {
  return (
    <div className="relative ml-3">
      <div className="absolute left-0 top-0 h-full w-0.5 bg-theme-border" aria-hidden="true" />
      <ul className="space-y-6">
        {items.map((item, idx) => (
          <li key={idx} className="pl-6">
            <div className="relative">
              <span className="absolute -left-3 top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-medium">
                  {item.company} · {item.role}
                </div>
                <div className="text-xs text-theme-secondary">{item.period}</div>
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
  );
};

export default ExperienceTimeline;
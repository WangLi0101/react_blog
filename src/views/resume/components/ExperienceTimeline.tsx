import React from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  UserRound,
} from "lucide-react";

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
          <li key={idx} className="pl-10">
            <div className="relative">
              <span className="absolute -left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-theme-bg text-primary shadow-sm">
                <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="rounded-xl border border-theme-border bg-theme-secondary/30 p-4 shadow-sm">
                <div className="flex flex-col gap-2">
                  <div className="text-theme-primary font-medium">
                    {item.company}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-theme-secondary">
                    <span className="inline-flex items-center gap-1">
                      <UserRound className="h-4 w-4 text-primary/80" aria-hidden="true" />
                      {item.role}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-4 w-4 text-primary/80" aria-hidden="true" />
                      {item.period}
                    </span>
                  </div>
                  <ul className="mt-1 space-y-1 text-sm text-theme-secondary">
                    {item.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2
                          className="mt-[3px] h-4 w-4 text-primary"
                          aria-hidden="true"
                        />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceTimeline;
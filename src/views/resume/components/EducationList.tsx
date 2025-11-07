import React from "react";
import { Award, Building2, CalendarDays } from "lucide-react";

export type Education = {
  school: string;
  degree: string;
  period: string;
};

type Props = {
  items: Education[];
};

const EducationList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="space-y-4">
      {items.map((e, idx) => (
        <li
          key={idx}
          className="rounded-xl border border-theme-border p-4 bg-theme-secondary/40"
        >
          <div className="flex items-center gap-2 font-medium text-theme-primary">
            <Building2 className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>{e.school}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-theme-secondary">
            <Award className="h-3.5 w-3.5 text-primary/80" aria-hidden="true" />
            <span>{e.degree}</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-theme-secondary">
            <CalendarDays className="h-3.5 w-3.5 text-primary/80" aria-hidden="true" />
            <span>{e.period}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default EducationList;
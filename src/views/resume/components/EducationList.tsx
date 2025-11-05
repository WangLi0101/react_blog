import React from "react";

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
        <li key={idx} className="rounded-xl border border-theme-border p-4">
          <div className="font-medium">{e.school}</div>
          <div className="text-sm text-theme-secondary">{e.degree}</div>
          <div className="text-xs text-theme-secondary mt-1">{e.period}</div>
        </li>
      ))}
    </ul>
  );
};

export default EducationList;
import React from "react";

export type Skill = { name: string };

type Props = {
  items: Skill[];
};

const SkillsGrid: React.FC<Props> = ({ items }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((s, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between rounded-xl border border-theme-border p-3"
        >
          <span className="text-sm">{s.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SkillsGrid;
import React from "react";
import { Icon } from "@iconify/react";
import { Check } from "lucide-react";

export type Skill = {
  name: string;
  icon?: string;
};

type Props = {
  items: Skill[];
};

const SkillsGrid: React.FC<Props> = ({ items }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((s, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2 rounded-xl border border-theme-border p-3"
        >
          {s.icon ? (
            <Icon
              icon={s.icon}
              className="h-5 w-5"
              aria-hidden="true"
              height="20"
              width="20"
            />
          ) : (
            <Check className="h-5 w-5 text-primary" aria-hidden="true" />
          )}
          <span className="text-sm text-theme-secondary">{s.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SkillsGrid;
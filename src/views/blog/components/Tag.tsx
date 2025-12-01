import React from "react";
interface TagProps {
  children: React.ReactNode;
}
export const Tag: React.FC<TagProps> = ({ children }) => {
  return (
    <div className="bg-primary/10 text-primary border border-primary/20 text-sm px-[12px] py-[6px] rounded-md flex items-center justify-center font-medium">
      {children}
    </div>
  );
};

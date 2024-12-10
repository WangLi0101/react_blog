import React from "react";
interface TagProps {
  children: React.ReactNode;
}
export const Tag: React.FC<TagProps> = ({ children }) => {
  return (
    <div className="bg-theme-primary text-white px-[12px] py-[6px] rounded-md flex items-center justify-center text-sm">
      {children}
    </div>
  );
};

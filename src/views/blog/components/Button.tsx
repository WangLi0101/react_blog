import React from "react";
import "./button.scss";
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button className={`my_button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

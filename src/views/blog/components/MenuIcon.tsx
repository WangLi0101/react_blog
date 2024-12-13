import clsx from "clsx";

interface Props {
  onClick: () => void;
  isMenuOpen: boolean;
  className?: string;
}
export const MenuIcon = ({ onClick, isMenuOpen, className }: Props) => {
  const handlerClick = () => {
    onClick();
  };
  return (
    <label onClick={handlerClick}>
      <div
        className={clsx(
          "w-9 h-10 cursor-pointer flex flex-col items-center justify-center",
          className
        )}
      >
        <input
          id="check"
          className="hidden peer"
          type="checkbox"
          onClick={(e) => e.stopPropagation()}
        />
        <div
          className={`w-[50%] h-[2px] bg-theme-text-primary rounded-sm transition-all duration-500 origin-left translate-y-[0.45rem] ${
            isMenuOpen && "rotate-[-45deg]"
          }`}
        />
        <div
          className={`w-[50%] h-[2px] bg-theme-text-primary rounded-md transition-all duration-500 origin-center ${
            isMenuOpen && "hidden"
          }`}
        />
        <div
          className={`w-[50%] h-[2px] bg-theme-text-primary rounded-md transition-all duration-500 origin-left -translate-y-[0.45rem] ${
            isMenuOpen && "rotate-[45deg]"
          }`}
        />
      </div>
    </label>
  );
};

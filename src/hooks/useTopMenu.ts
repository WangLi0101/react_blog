import { useMenuStore } from "@/store/menu";

export const useTopMenu = () => {
  const path = useMenuStore().myMenuFlattenList.filter(
    (el) => el.component && !el.isHidden
  )[0]?.path;
  return path;
};

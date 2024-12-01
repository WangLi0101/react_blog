import { useMenuStore } from "@/store/menu";

export const useTopMenu = () => {
  const path = useMenuStore().flattenMenuList.filter(
    (item) => item.path !== "/login" && (item.Component || item.element)
  )[0].path;
  return path;
};

import { useMenuStore } from "@/store/menu";
import { useLocation } from "react-router";

interface Meta {
  title: string;
  icon?: string;
}

export const useMeta = (): Meta => {
  const menuStore = useMenuStore();
  const pathName = useLocation().pathname;
  const res = menuStore.flattenMenuList.find((el) => el.path === pathName);
  return res ? res.handle : {};
};

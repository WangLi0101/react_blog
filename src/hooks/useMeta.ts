import { MenuItem } from "@/api/system/system";
import { useMenuStore } from "@/store/menu";
import { useLocation } from "react-router";

export const useMeta = (): MenuItem | undefined => {
  const menuStore = useMenuStore();
  const pathName = useLocation().pathname;
  const res = menuStore.myMenuFlattenList.find((el) => el.path === pathName);
  return res;
};

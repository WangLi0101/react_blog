import { RouteObject } from "react-router";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
type State = {
  menuList: RouteObject[];
  flattenMenuList: RouteObject[];
};
type Actions = {
  setMenuList: (menuList: RouteObject[]) => void;
  setFlattenMenuList: (flattenMenuList: RouteObject[]) => void;
};
export const useMenuStore = create<State & Actions>()(
  devtools((set) => ({
    menuList: [],
    flattenMenuList: [],
    setMenuList: (menuList) => set({ menuList }),
    setFlattenMenuList: (flattenMenuList) => set({ flattenMenuList }),
  }))
);

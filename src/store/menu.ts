import { getMyMenuApi } from "@/api/system";
import { MenuItem } from "@/api/system/system";
import { flattenRoutes } from "@/router/utils/flatten";
import { TreeNode } from "@/utils/tree";
import { RouteObject } from "react-router";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
type State = {
  menuList: RouteObject[];
  flattenMenuList: RouteObject[];
  myMenuList: TreeNode<MenuItem>[];
  myMenuFlattenList: MenuItem[];
};

type Actions = {
  setMenuList: (menuList: RouteObject[]) => void;
  setFlattenMenuList: (flattenMenuList: RouteObject[]) => void;
  getMyMenu: () => Promise<void>;
};

export const useMenuStore = create<State & Actions>()(
  persist(
    devtools((set) => ({
      menuList: [],
      flattenMenuList: [],
      myMenuList: [],
      showMenuList: [],
      myMenuFlattenList: [],

      // Actions
      setMenuList: (menuList) => set({ menuList }),

      setFlattenMenuList: (flattenMenuList) => set({ flattenMenuList }),

      getMyMenu: async () => {
        const res = await getMyMenuApi();
        if (res.code === 0) {
          set({ myMenuList: res.data });
          const flattenList = flattenRoutes(res.data);
          set({ myMenuFlattenList: flattenList });
        }
      },
    })),
    {
      name: "menu",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

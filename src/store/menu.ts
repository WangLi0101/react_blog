import { getMyMenuApi } from "@/api/system";
import { MenuItem } from "@/api/system/system";
import { buildTree, TreeNode } from "@/utils/tree";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
type State = {
  myMenuList: TreeNode<MenuItem>[];
  myMenuFlattenList: MenuItem[];
};

type Actions = {
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
      getMyMenu: async () => {
        const res = await getMyMenuApi();
        if (res.code === 0) {
          set({ myMenuFlattenList: res.data });
          const tree = buildTree(res.data);
          set({ myMenuList: tree });
        }
      },
    })),
    {
      name: "menu",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

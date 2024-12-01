import { getUserInfo, login } from "@/api/system";
import { LoginParams, Role, UserInfo } from "@/api/system/system";
import { setToken } from "@/utils/auth";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
type State = {
  userInfo: UserInfo | null;
  roles: Role[];
};
type Actions = {
  login: (data: LoginParams) => Promise<string>;
  getUserInfo: () => Promise<void>;
};
export const useUserStore = create<State & Actions>()(
  devtools((set) => ({
    userInfo: null,
    roles: [],
    login: (data) => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        const res = await login(data);
        if (res.code === 0) {
          // 存储token
          setToken(res.data);
          resolve(res.data);
        } else {
          reject("");
        }
      });
    },

    getUserInfo: async () => {
      const res = await getUserInfo();
      if (res.code === 0) {
        set({ userInfo: res.data, roles: res.data.roles });
      }
    },
  }))
);

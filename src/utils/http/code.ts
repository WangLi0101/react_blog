import type { ResponseData } from ".";
import { useUserStore } from "@/store/user";
import { message } from "antd";
export function handleCode(res: ResponseData<string>) {
  switch (res.code) {
    case 403:
      // 登录失败
      message.error(res.message);
      break;
    case 401:
      message.error("token过期,请重新登录");
      useUserStore.getState().logout();
      break;
    default:
      message.error(res.message);
      break;
  }
}

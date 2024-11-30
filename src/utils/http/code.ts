import type { ResponseData } from ".";

import { message } from "antd";
export function handleCode(res: ResponseData<string>) {
  switch (res.code) {
    case 403:
      // 登录失败
      message.error(res.message);
      break;
    case 409:
      message.error("账号在其他地方登录,请重新登录");
      break;
    default:
      message.error(res.message);
      break;
  }
}

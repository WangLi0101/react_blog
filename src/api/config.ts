export type service = {
  MOCK: string;
  MANGMENT: string;
};
// dev环境
// const dev_url = "http://localhost:3000";
const dev_url = "http://47.120.58.223:3000";
const dev_oss_url = "https://supernova-exam-test.oss-cn-beijing.aliyuncs.com";
const dev_service: service = {
  MOCK: ``,
  MANGMENT: `${dev_url}/api/v1`,
};

// 生产环境
const prod_url = "http://47.120.58.223:3000";
const prod_oss_url = "https://supernova-file.iguokao.com";
const prod_server: service = {
  MOCK: `/mock`,
  MANGMENT: `${prod_url}/management/api/v1`,
};

let config: service;
let fileHost: string;

switch (import.meta.env.MODE) {
  case "development":
    config = dev_service;
    fileHost = dev_oss_url;
    break;
  case "production":
    config = prod_server;
    fileHost = prod_oss_url;
    break;
  default:
    break;
}
export { config, fileHost };

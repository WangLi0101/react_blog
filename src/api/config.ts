export type service = {
  MOCK: string;
  MANGMENT: string;
};
const protocol = window.location.protocol;
const gemini_key = "AIzaSyDttWY15SdTpIBIgJwf3U8eUhEPXiDiQrs";
// dev环境
// const dev_url = "http://localhost:3000";
const dev_url = `https://sys-api.betterme.cyou`;
const oss_url = "https://betterme-blog.oss-cn-beijing.aliyuncs.com";
const dev_service: service = {
  MOCK: ``,
  MANGMENT: `${dev_url}/api/v1`,
};

// 生产环境
const prod_url = `${protocol}//sys-api.betterme.cyou`;
const prod_server: service = {
  MOCK: `/mock`,
  MANGMENT: `${prod_url}/api/v1`,
};
let config: service;

switch (import.meta.env.MODE) {
  case "development":
    config = dev_service;
    break;
  case "production":
    config = prod_server;
    break;
  default:
    break;
}
export { config, oss_url, gemini_key };

import { getOssSignApi } from "@/api/system";
import { OssSign } from "@/api/system/system";

/**
 * 判断是否过期
 * @returns {Promise<ossSign>}
 */
function getOss(): Promise<OssSign> {
  return new Promise((resolve, reject) => {
    const nowTime = new Date().getTime() / 1000;
    const osign: OssSign = JSON.parse(window.localStorage.getItem("ossign")!);
    const expire = osign?.expire || 0;
    if (nowTime > expire) {
      getOssSignApi().then(
        (res) => {
          if (res.code === 0) {
            window.localStorage.setItem("ossign", JSON.stringify(res.data));
            resolve(res.data);
          } else {
            reject("");
          }
        },
        (err) => {
          reject(err);
        }
      );
    } else {
      resolve(osign);
    }
  });
}
/**
 * 上传
 * @param {File} file 文件
 * @param {string} dir 文件目录
 * @param {boolean} isNewName 是否加时间戳
 * @param {boolean} isToUpperCase 是否大写
 * @returns {Promise<string>}
 */

export function upload(
  file: File,
  dir: string,
  isNewName = true,
  isToUpperCase = false
): Promise<string> {
  return new Promise((resolve, reject) => {
    getOss().then(async (response) => {
      try {
        // 上传
        let name = isNewName ? new Date().getTime() + file.name : file.name;
        name = isToUpperCase
          ? `${name.split(".")[0].toUpperCase()}.${name.split(".")[1]}`
          : name;
        const { host, accessId, policy, signature } = response;
        const formData = new FormData();
        formData.append("key", `${dir}/${name}`);
        formData.append("OSSAccessKeyId", accessId);
        formData.append("policy", policy);
        formData.append("signature", signature);
        formData.append("file", file);
        formData.append("name", name);
        const res = await fetch(host, {
          method: "POST",
          body: formData,
        });
        if (res.status === 204) {
          resolve(`${dir}/${name}`);
        } else {
          reject("");
        }
      } catch (err) {
        reject(err);
      }
    });
  });
}

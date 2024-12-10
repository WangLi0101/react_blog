import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 * 下载文件blob
 */
export function downloadFile(blob: Blob, name: string) {
  // 创建一个下载链接并将文件内容附加到链接上
  const url = window.URL.createObjectURL(blob);
  // 创建一个隐藏的 <a> 标签用于下载
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = name; // 设置下载文件的名称
  document.body.appendChild(a);

  // 触发点击事件以开始下载
  a.click();

  // 清理资源
  window.URL.revokeObjectURL(url);
}

export function formatDate(date: string) {
  return dayjs(date).format("YYYY-MM-DD HH:mm");
}

export function formateMarkdown(str: string) {
  const unescapedStr = str
    .replace(/\\n/g, "\n") // 替换换行符
    .replace(/\\t/g, "\t") // 替换制表符
    .replace(/\\"/g, '"') // 替换转义双引号
    .replace(/\\\\/g, "\\") // 替换转义反斜杠
    .replace(/\\'/g, "'"); // 替换转义单引号（如果有）
  return unescapedStr;
}

/**
 * url只保留路径
 */
export const getPath = (urlString: string) => {
  // 如果不是url直接返回
  const urlRegex = /^https?/i;
  if (!urlRegex.test(urlString)) {
    return urlString;
  }
  // 创建 URL 对象
  const url = new URL(urlString);

  // 获取路径部分
  let path = url.pathname;

  // 去除第一个斜杠
  if (path.startsWith("/")) {
    path = path.substring(1);
  }
  return path;
};

import { type ClassValue, clsx } from "clsx";
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

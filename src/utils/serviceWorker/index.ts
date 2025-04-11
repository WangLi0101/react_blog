import { subscribeApi } from "@/api/system";
import { urlB64ToUint8Array } from "./utils";

const VAPID_PUBLIC_KEY =
  "BIzHIzpnq9Ytlu90jS67iZl_kEEwBhfdEAJcDJLBqCGxzQ_UD5aBvckVrCaHU-YZHdf48hcmc57ZyJCuTjJ28cE";

const swPath = `${import.meta.env.BASE_URL}sw.js`;

// 检查浏览器支持
if ("serviceWorker" in navigator && "PushManager" in window) {
  console.log("支持Service Worker和Push API");

  navigator.serviceWorker
    .register(swPath)
    .then(function (registration) {
      console.log("Service Worker注册成功:", registration);
    })
    .catch(function (error) {
      console.error("Service Worker注册失败:", error);
    });
} else {
  console.warn("不支持Push通知");
}

const getSubscription = async () => {
  const reg = await navigator.serviceWorker.ready;
  const subscription = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY), // 注意转为 Uint8Array
  });
  return subscription;
};

export const init = async () => {
  const subscription = await getSubscription();
  subscribeApi(subscription);
};

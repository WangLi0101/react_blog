// 处理推送事件
self.addEventListener("push", function(event) {
  console.log("[Service Worker] 收到推送");

  let notificationData = {};

  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (e) {
      notificationData = {
        title: "新消息",
        body: event.data.text()
      };
    }
  } else {
    notificationData = {
      title: "新消息",
      body: "您有一条新的通知"
    };
  }

  const title = notificationData.title || "新消息";
  const options = {
    body: notificationData.body || "您有一条新的通知",
    icon: notificationData.icon || "icon.png",
    data: notificationData.data || {},
    actions: notificationData.actions || [],
    vibrate: [100, 50, 100], // 振动模式
    timestamp: notificationData.timestamp || Date.now()
  };

  if ("waitUntil" in event && "registration" in self) {
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  }
});

 
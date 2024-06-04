// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw";
// import { onBackgroundMessage } from "firebase/messaging/sw";

importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging-compat.js')

// sw에서 따로 다시 초기화
const config = {
  apiKey: process.env.FCM_API_KEY,
  authDomain: process.env.FCM_AUTH_DOMAIN,
  projectId: process.env.FCM_PROJECT_ID,
  storageBucket: process.env.FCM_STORAGE_BUCKET,
  messagingSenderId: process.env.FCM_MESSAGING_SENDER_ID,
  appId: process.env.FCM_APP_ID
};
firebase.initializeApp(config);
// // const messaging = getMessaging(firebaseApp);
const messaging = firebase.messaging();
//푸시
self.addEventListener("push", async (event) => {

  if (event.data) {

    // const { data } = event.data.json();
    const data = event.data.json().data;

    const options = {
      body: data.body,
      icon: "/icons/logo.PNG",
      // image: data.image,
      data: {
        click_action: data.click_action, // 이 필드는 밑의 클릭 이벤트 처리에 사용됨
      },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

/**
 * notificationclick
 */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  try {
    const openLink = event.notification.data.click_action;
    // self.clients.openWindow(openLink);
    event.waitUntil(
      clients.openWindow(openLink)
    );
  } catch {
    // self.clients.openWindow("/login");
    event.waitUntil(
      clients.openWindow("/login")
    );
  }
});
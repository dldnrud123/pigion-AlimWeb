// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getMessaging, onMessage, getToken} from "firebase/messaging";

export const initFirebaseApp = () => {

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: process.env.FCM_API_KEY,
    authDomain: process.env.FCM_AUTH_DOMAIN,
    projectId: process.env.FCM_PROJECT_ID,
    storageBucket: process.env.FCM_STORAGE_BUCKET,
    messagingSenderId: process.env.FCM_MESSAGING_SENDER_ID,
    appId: process.env.FCM_APP_ID
  };

  const apps = getApps();

  
  if (!apps.length) {
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
   
  }
}



'use client';
import { useEffect } from "react";
import { initFirebaseApp } from "../lib/firebase";

export default function Firebase({ children }) {
    useEffect(() => {
        initFirebaseApp();

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
              .register('/firebase-messaging-sw.js')
              .then(function (registration) {
                // ...
              })
              .catch(function (error) {
                console.log('Service worker registration failed:', error)
              })
          } else {
            console.log('Service workers are not supported.')
          };
          
      }, []);

    return (
        <>
            {children}
        </>
    )
}

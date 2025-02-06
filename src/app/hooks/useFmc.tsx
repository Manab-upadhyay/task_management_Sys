import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebase/firebase";  // Your Firebase messaging initialization
import { toast } from "react-toastify";  // Importing react-toastify


export function useFCM() {
  const [token, setToken] = useState("");  // Token state to hold device token

 
    const requestPermission = async () => {
      const permission = await Notification.requestPermission();
      console.log("Permission", permission);

      if (permission === "granted") {
        // Generate Device Token for notifications
        const fcmToken = await getToken(messaging, {
          vapidKey: "BLbzVZPhdsvDJCmkxO0ItWikHh_FuUvyHl_FHasa0BgTEFCx-rxmZjP5D4YPyyTOi1FEX5YZ_QYXsURtGaHzDYM",
        });
        sessionStorage.setItem("fmc", fcmToken);
        setToken(fcmToken);  // Set the token in state
        console.log("Token Generated", fcmToken);
      } else if (permission === "denied") {
        alert("You denied the notification permision")
        console.log("Notification permission denied");
      }
    };

    // Request permission when the hook runs

    // Handle messages received in the foreground
    useEffect(()=>{

    
    const setupListener = async () => {
      if (!token) return;  // If there's no token, we can't listen for messages

      console.log("Message listener registered with token", token);

      // Listen for foreground messages using onMessage
      onMessage(messaging, (payload) => {
        console.log("Foreground message received", payload);
      
        const title = payload.notification?.title || payload.data?.title;
        const body = payload.notification?.body || payload.data?.body;
        const link = payload.fcmOptions?.link || payload.data?.link || "/";
      
        toast.info(
          <div>
            <strong>{title}</strong>
            <p>{body}</p>
            <button onClick={() => window.open(link, "_blank")}>View</button>
          </div>,
          { position: "bottom-right", autoClose: 5000 }
        );
      });
      
    };

    setupListener();  // Setup the listener after requesting permission

    return () => {
      // Clean up listener on unmount (if necessary)
    };
  }, [token, toast]);  // Only run this effect when `token` changes

  return {requestPermission};  // This hook doesn't render anything
}

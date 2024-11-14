import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../firebase/notification";  // Your Firebase messaging initialization
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

  
        toast.info(
          <div
            style={{
              backgroundColor: '#fff',
              color: '#000',
              padding: '10px 15px',
              borderRadius: '6px',
              border: '1px solid #e0e0e0',
              fontFamily: 'Arial, sans-serif',
              maxWidth: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <strong style={{ fontSize: '15px', marginBottom: '5px' }}>
              {payload.notification?.title}
            </strong>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', lineHeight: '1.4' }}>
              {payload.notification?.body}
            </p>
            <button
              style={{
                backgroundColor: 'transparent',
                color: '#007bff',
                fontSize: '14px',
                padding: '0',
                cursor: 'pointer',
                border: 'none',
                textDecoration: 'underline',
                alignSelf: 'flex-start',
              }}
              onClick={() => window.open(payload.fcmOptions?.link || "/", '_blank')}
            >
              View
            </button>
          </div>,
          {
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            position: 'bottom-right',  // Position the toast in bottom-right corner
            theme: 'light',
          }
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

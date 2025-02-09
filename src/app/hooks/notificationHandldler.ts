import { useEffect, useState } from "react";
import { useSessionData } from "./useSession";
import { AnyRecord } from "dns";
import { useUser } from "@clerk/nextjs";

function NotificationHandler() {const [notifications, setNotifications] = useState<any[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const { session } = useSessionData();

const {user}= useUser()

async function fetchNotifications() {
  try {
    const response = await fetch("https://localhost:3000/api/send-notification");
    const response1 = await fetch("https://localhost:3000/api/send-teamNoti");

    if (response.ok && response1.ok) {
      const data = await response.json();
      const data1 = await response1.json();
      console.log(data)

      // Combine both notifications arrays
      const combinedNotifications = [...data.notifications, ...data1.notifications];
console.log("cm",combinedNotifications)
      // Filter notifications for the logged-in user
      const userNotifications = combinedNotifications.filter(
        (noti) => noti.userid === user?.emailAddresses[0]?.emailAddress
      );

      console.log("Filtered Notifications:", userNotifications);
      
      // Update state
      setNotifications(userNotifications);
    } else {
      console.error("Error fetching notifications");
    }
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
}

  

  const handleDelete = async (id:any) => {
    try {
      console.log("Deleting notification with id:", id);
      
      const response = await fetch('https://localhost:3000/api/send-notification', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id }) // Pass id as JSON
      });

      if (response.ok) {
        console.log("notification fetched")
    
      } else {
        console.error("Failed to delete notification:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };
  return {notifications,handleDelete, fetchNotifications,notificationCount}
}


export { NotificationHandler };

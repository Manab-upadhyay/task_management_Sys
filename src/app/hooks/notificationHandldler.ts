import { useEffect, useState } from "react";
import { useSessionData } from "./useSession";
import { AnyRecord } from "dns";

function NotificationHandler() {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const { session } = useSessionData();

  useEffect(() => {
    fetchNotifications();

    // Polling for new notifications every 30 seconds
    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  async function fetchNotifications() {
    try {
      setNotificationCount(0);
      const response = await fetch("https://localhost:3000/api/send-notification");
      if (response.ok) {
        const data = await response.json();
        const userNotifications = data.notifications.filter(
          (noti:any) => noti.userid === session?.user?.email
        );
        
 
        if (userNotifications.length > notifications.length) {
          setNotificationCount((prevCount) => prevCount + (userNotifications.length - notifications.length));
        }
        
       
        setNotifications(userNotifications);
      } else {
        console.error("Error fetching notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }

  const handleViewNotifications = () => {
    // Reset notification count to 0 when notifications are viewed
  
  };

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
  return {notifications,handleDelete, fetchNotifications}
}


export { NotificationHandler };
